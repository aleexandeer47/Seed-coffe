import Lenis from 'lenis'
import { MotionConfig } from 'motion/react'
import { useEffect } from 'react'
import { Branches } from './components/Branches'
import { Footer } from './components/Footer'
import { Hero } from './components/Hero'
import { Nav, Preloader } from './components/Intro'
import { Marquee } from './components/Marquee'
import { Menu } from './components/Menu'
import { Signature } from './components/Signature'
import { Story } from './components/Story'

export default function App() {
  useEffect(() => {
    // Deep links (/#menu): content mounts after the browser's own hash jump, so redo it.
    const hashTarget = location.hash.length > 1 ? document.querySelector<HTMLElement>(location.hash) : null
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      hashTarget?.scrollIntoView()
      return
    }
    const lenis = new Lenis({ lerp: 0.09 })
    if (hashTarget) setTimeout(() => lenis.scrollTo(hashTarget, { immediate: true, offset: -72 }), 50)
    let id = requestAnimationFrame(function raf(t) {
      lenis.raf(t)
      id = requestAnimationFrame(raf)
    })
    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement).closest<HTMLAnchorElement>('a[href^="#"]')
      const target = a && document.querySelector<HTMLElement>(a.getAttribute('href')!)
      if (!target) return
      e.preventDefault()
      lenis.scrollTo(target, { offset: a!.getAttribute('href') === '#top' ? 0 : -72, duration: 1.4 })
    }
    document.addEventListener('click', onClick)
    return () => {
      cancelAnimationFrame(id)
      document.removeEventListener('click', onClick)
      lenis.destroy()
    }
  }, [])

  return (
    <MotionConfig reducedMotion="user">
      <Preloader />
      <Nav />
      <main>
        <Hero />
        <Marquee />
        <Story />
        <Signature />
        <Menu />
        <Branches />
      </main>
      <Footer />
    </MotionConfig>
  )
}
