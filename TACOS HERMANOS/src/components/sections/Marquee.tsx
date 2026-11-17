import { signatureDishes } from "@/data/menu";
import { ArchMark } from "@/components/ui/Icons";

/** Ribbon of signature dishes named in the brand's official posts. */
export function Marquee() {
  const items = [...signatureDishes, ...signatureDishes];
  return (
    <div className="relative overflow-hidden border-y border-forest/10 bg-pina py-4 text-forest" aria-label="Platillos insignia">
      <ul className="animate-marquee flex w-max items-center gap-8 motion-reduce:animate-none">
        {items.map((dish, i) => (
          <li key={i} className="flex items-center gap-8 whitespace-nowrap" aria-hidden={i >= signatureDishes.length}>
            <span className="font-display text-xl font-extrabold tracking-tight sm:text-2xl">{dish}</span>
            <ArchMark size={20} className="text-forest/60" />
          </li>
        ))}
      </ul>
    </div>
  );
}
