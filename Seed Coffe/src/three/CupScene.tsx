import { Canvas, useFrame } from '@react-three/fiber'
import { Environment, Lightformer } from '@react-three/drei'
import { useEffect, useMemo, useRef, useState } from 'react'
import * as THREE from 'three'
import type { MotionValue } from 'motion/react'

type Pointer = { x: number; y: number }

/* ───────── Geometry helpers ───────── */

function cupGeometry() {
  const pts = [
    [0, 0.05],
    [0.6, 0.05],
    [0.66, 0.1],
    [0.72, 0.62],
    [0.78, 1.22],
    [0.795, 1.27],
    [0.78, 1.3],
    [0.74, 1.26],
    [0.68, 0.66],
    [0.61, 0.18],
    [0, 0.17],
  ].map(([x, y]) => new THREE.Vector2(x, y))
  return new THREE.LatheGeometry(pts, 96)
}

function saucerGeometry() {
  const pts = [
    [0, 0],
    [0.9, 0],
    [1.18, 0.07],
    [1.32, 0.17],
    [1.3, 0.2],
    [1.12, 0.12],
    [0.7, 0.07],
    [0, 0.07],
  ].map(([x, y]) => new THREE.Vector2(x, y))
  return new THREE.LatheGeometry(pts, 96)
}

function beanGeometry() {
  const g = new THREE.SphereGeometry(1, 32, 24)
  const p = g.attributes.position
  const v = new THREE.Vector3()
  for (let i = 0; i < p.count; i++) {
    v.fromBufferAttribute(p, i)
    if (v.z > 0) {
      const cx = v.x - 0.12 * Math.sin(v.y * 2.4)
      v.z -= Math.exp(-(cx * cx) / 0.006) * 0.38 * v.z
      v.z *= 0.8
    }
    p.setXYZ(i, v.x * 0.5, v.y * 0.7, v.z * 0.36)
  }
  g.computeVertexNormals()
  return g
}

function checkerTexture() {
  const cols = 18
  const rows = 3
  const s = 48
  const c = document.createElement('canvas')
  c.width = cols * s
  c.height = rows * s
  const ctx = c.getContext('2d')!
  for (let i = 0; i < cols; i++)
    for (let j = 0; j < rows; j++) {
      ctx.fillStyle = (i + j) % 2 ? '#151311' : '#f7f3ec'
      ctx.fillRect(i * s, j * s, s, s)
    }
  const t = new THREE.CanvasTexture(c)
  t.wrapS = THREE.RepeatWrapping
  t.repeat.set(2, 1)
  t.colorSpace = THREE.SRGBColorSpace
  t.anisotropy = 8
  return t
}

/* ───────── Shaders ───────── */

const coffeeVert = /* glsl */ `
  varying vec2 vUv;
  void main() { vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }
`
const coffeeFrag = /* glsl */ `
  uniform float uTime;
  varying vec2 vUv;
  void main() {
    vec2 p = vUv - 0.5;
    float r = length(p) * 2.0;
    float a = atan(p.y, p.x);
    vec3 coffee = vec3(0.10, 0.05, 0.025);
    vec3 crema  = vec3(0.62, 0.40, 0.22);
    vec3 milk   = vec3(0.93, 0.86, 0.74);
    // rosetta-ish leaf: stacked arcs that slowly breathe
    float leaf = sin((p.y + 0.06 * sin(uTime * 0.6)) * 34.0 + abs(p.x) * 18.0);
    float body = smoothstep(0.62, 0.15, length(vec2(p.x * 1.7, p.y + 0.02)) * 2.0);
    float art = smoothstep(0.1, 0.7, leaf) * body;
    float stem = smoothstep(0.035, 0.0, abs(p.x)) * smoothstep(0.42, 0.0, abs(p.y - 0.05));
    float rim = smoothstep(0.72, 0.98, r);
    float swirl = 0.5 + 0.5 * sin(r * 22.0 - a * 3.0 + uTime * 0.8);
    vec3 col = mix(coffee, crema, rim * 0.85 + swirl * 0.12 * (1.0 - body));
    col = mix(col, milk, clamp(art + stem, 0.0, 1.0) * 0.92);
    gl_FragColor = vec4(col, 1.0);
  }
`

const steamFrag = /* glsl */ `
  uniform float uTime;
  uniform float uSeed;
  uniform float uOpacity;
  varying vec2 vUv;
  void main() {
    float y = vUv.y;
    float off = sin(y * 6.0 - uTime * 1.4 + uSeed) * 0.13 * y
              + sin(y * 13.0 - uTime * 2.1 + uSeed * 2.0) * 0.035 * y;
    float d = abs(vUv.x - 0.5 - off);
    float width = mix(0.03, 0.17, y);
    float a = smoothstep(width, 0.0, d);
    a *= smoothstep(0.0, 0.22, y) * smoothstep(1.0, 0.5, y);
    a *= 0.55 + 0.45 * sin(y * 9.0 - uTime * 2.6 + uSeed);
    gl_FragColor = vec4(vec3(1.0), a * 0.5 * uOpacity);
  }
`

/* ───────── Scene parts ───────── */

const easeOut = (t: number) => 1 - Math.pow(1 - Math.min(Math.max(t, 0), 1), 4)

function Cup({ progress, pointer, introDelay }: { progress: MotionValue<number>; pointer: React.MutableRefObject<Pointer>; introDelay: number }) {
  const group = useRef<THREE.Group>(null!)
  const spin = useRef<THREE.Group>(null!)
  const cup = useMemo(cupGeometry, [])
  const saucer = useMemo(saucerGeometry, [])
  const checker = useMemo(checkerTexture, [])
  const coffeeMat = useMemo(
    () => new THREE.ShaderMaterial({ vertexShader: coffeeVert, fragmentShader: coffeeFrag, uniforms: { uTime: { value: 0 } } }),
    [],
  )
  const steam = useMemo(
    () =>
      [0, 1, 2].map(
        (i) =>
          new THREE.ShaderMaterial({
            vertexShader: coffeeVert,
            fragmentShader: steamFrag,
            transparent: true,
            depthWrite: false,
            uniforms: { uTime: { value: 0 }, uSeed: { value: i * 2.1 }, uOpacity: { value: 0 } },
          }),
      ),
    [],
  )

  useEffect(
    () => () => {
      cup.dispose()
      saucer.dispose()
      checker.dispose()
      coffeeMat.dispose()
      steam.forEach((m) => m.dispose())
    },
    [cup, saucer, checker, coffeeMat, steam],
  )

  useFrame((state, dt) => {
    const t = state.clock.elapsedTime
    const intro = easeOut((t - introDelay) / 1.6)
    const p = progress.get()
    coffeeMat.uniforms.uTime.value = t
    steam.forEach((m) => {
      m.uniforms.uTime.value = t
      m.uniforms.uOpacity.value = intro * (1 - p * 1.6)
    })

    const g = group.current
    const s = 0.82 * intro
    g.scale.setScalar(Math.max(s, 0.0001))
    g.position.y = -0.55 + (1 - intro) * -1.2 + Math.sin(t * 1.1) * 0.04 - p * 0.6
    // tilt toward pointer, damped
    const k = 1 - Math.pow(0.002, dt)
    g.rotation.x += (pointer.current.y * 0.18 + 0.12 + p * 0.5 - g.rotation.x) * k
    g.rotation.z += (-pointer.current.x * 0.12 - g.rotation.z) * k
    // slow turntable + scroll spin + intro spin
    spin.current.rotation.y = t * 0.25 + p * Math.PI * 1.5 + (1 - intro) * 2.5 + pointer.current.x * 0.35
  })

  return (
    <group ref={group}>
      <group ref={spin}>
        <mesh geometry={saucer}>
          <meshPhysicalMaterial color="#f7f3ec" roughness={0.28} clearcoat={1} clearcoatRoughness={0.15} />
        </mesh>
        <group position={[0, 0.12, 0]}>
          <mesh geometry={cup}>
            <meshPhysicalMaterial color="#f7f3ec" roughness={0.28} clearcoat={1} clearcoatRoughness={0.12} side={THREE.DoubleSide} />
          </mesh>
          {/* checker band */}
          <mesh position={[0, 0.58, 0]}>
            <cylinderGeometry args={[0.737, 0.698, 0.36, 96, 1, true]} />
            <meshPhysicalMaterial map={checker} roughness={0.32} clearcoat={1} clearcoatRoughness={0.15} />
          </mesh>
          {/* handle */}
          <mesh position={[0.74, 0.7, 0]} rotation={[0, 0, -Math.PI / 2]}>
            <torusGeometry args={[0.26, 0.065, 20, 48, Math.PI]} />
            <meshPhysicalMaterial color="#f7f3ec" roughness={0.28} clearcoat={1} clearcoatRoughness={0.12} />
          </mesh>
          {/* coffee surface */}
          <mesh position={[0, 1.12, 0]} rotation={[-Math.PI / 2, 0, 0]} material={coffeeMat}>
            <circleGeometry args={[0.724, 64]} />
          </mesh>
        </group>
      </group>
      {steam.map((m, i) => (
        <mesh key={i} position={[(i - 1) * 0.28, 2.15 + i * 0.08, 0.1]} material={m}>
          <planeGeometry args={[0.7, 1.7]} />
        </mesh>
      ))}
    </group>
  )
}

function Beans({ progress, pointer, count = 22, introDelay }: { progress: MotionValue<number>; pointer: React.MutableRefObject<Pointer>; count?: number; introDelay: number }) {
  const ref = useRef<THREE.InstancedMesh>(null!)
  const geo = useMemo(beanGeometry, [])
  const dummy = useMemo(() => new THREE.Object3D(), [])
  const data = useMemo(() => {
    // deterministic pseudo-random so layout is stable between reloads
    let seed = 7
    const rnd = () => ((seed = (seed * 16807) % 2147483647) - 1) / 2147483646
    return Array.from({ length: count }, (_, i) => ({
      r: 1.4 + rnd() * 0.7,
      a: (i / count) * Math.PI * 2 + rnd() * 0.4,
      y: -0.7 + rnd() * 2.4,
      s: 0.13 + rnd() * 0.07,
      speed: 0.12 + rnd() * 0.1,
      rx: rnd() * 6,
      ry: rnd() * 6,
      spin: 0.3 + rnd() * 0.9,
    }))
  }, [count])

  useEffect(() => () => geo.dispose(), [geo])

  useFrame((state) => {
    const t = state.clock.elapsedTime
    const p = progress.get()
    const intro = easeOut((t - introDelay - 0.3) / 1.8)
    data.forEach((d, i) => {
      const ang = d.a + t * d.speed + p * 1.2
      const rad = d.r * (0.4 + intro * 0.6) * (1 + p * 1.1)
      dummy.position.set(
        Math.cos(ang) * rad + pointer.current.x * 0.15 * d.s * 6,
        d.y + Math.sin(t * 0.9 + i) * 0.1 + p * (d.y - 0.5) * 1.2,
        Math.sin(ang) * rad * 0.7,
      )
      dummy.rotation.set(d.rx + t * d.spin * 0.6, d.ry + t * d.spin, 0)
      dummy.scale.setScalar(d.s * intro)
      dummy.updateMatrix()
      ref.current.setMatrixAt(i, dummy.matrix)
    })
    ref.current.instanceMatrix.needsUpdate = true
  })

  return (
    <instancedMesh ref={ref} args={[geo, undefined, count]}>
      <meshStandardMaterial color="#5a3420" roughness={0.38} metalness={0.05} />
    </instancedMesh>
  )
}

/* ───────── Canvas wrapper ───────── */

function hasWebGL() {
  try {
    const c = document.createElement('canvas')
    return !!(c.getContext('webgl2') || c.getContext('webgl'))
  } catch {
    return false
  }
}

export default function CupScene({ progress, introDelay = 1.3 }: { progress: MotionValue<number>; introDelay?: number }) {
  const wrap = useRef<HTMLDivElement>(null)
  const pointer = useRef<Pointer>({ x: 0, y: 0 })
  const [visible, setVisible] = useState(true)
  const [ok] = useState(hasWebGL)

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1
      pointer.current.y = (e.clientY / window.innerHeight) * 2 - 1
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting))
    if (wrap.current) io.observe(wrap.current)
    return () => {
      window.removeEventListener('pointermove', onMove)
      io.disconnect()
    }
  }, [])

  if (!ok) return null

  return (
    <div ref={wrap} className="stage-canvas" aria-hidden="true">
      <Canvas
        dpr={[1, 2]}
        frameloop={visible ? 'always' : 'never'}
        camera={{ position: [0, 1.6, 6.95], fov: 34 }}
        gl={{ alpha: true, antialias: true, powerPreference: 'high-performance' }}
        onCreated={({ camera }) => camera.lookAt(0, 0.45, 0)}
      >
        <ambientLight intensity={0.35} />
        <directionalLight position={[-3, 5, 4]} intensity={2.2} color="#fff4e6" />
        <directionalLight position={[4, 2, -3]} intensity={1.2} color="#c99a6b" />
        <Environment resolution={256}>
          <Lightformer form="rect" intensity={3} position={[-4, 3, 3]} scale={[4, 2, 1]} />
          <Lightformer form="rect" intensity={1.5} position={[4, 1, 2]} scale={[2, 4, 1]} color="#ffe2c4" />
          <Lightformer form="ring" intensity={2} position={[0, 5, -2]} scale={3} />
        </Environment>
        <Cup progress={progress} pointer={pointer} introDelay={introDelay} />
        <Beans progress={progress} pointer={pointer} introDelay={introDelay} />
      </Canvas>
    </div>
  )
}
