import type { ReactNode } from "react";
import { Reveal } from "./Reveal";

interface SectionHeadingProps {
  eyebrow: string;
  title: ReactNode;
  intro?: ReactNode;
  tone?: "light" | "dark";
  align?: "left" | "center";
  id?: string;
}

export function SectionHeading({ eyebrow, title, intro, tone = "light", align = "left", id }: SectionHeadingProps) {
  const dark = tone === "dark";
  return (
    <Reveal className={align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      <p className={`eyebrow mb-4 flex items-center gap-3 ${align === "center" ? "justify-center" : ""} ${dark ? "text-pina" : "text-brand"}`}>
        <span className={`h-px w-8 ${dark ? "bg-pina/60" : "bg-brand/50"}`} aria-hidden="true" />
        {eyebrow}
      </p>
      <h2 id={id} className={`text-[2.4rem] leading-[1.02] font-extrabold sm:text-5xl lg:text-[3.6rem] ${dark ? "text-cream" : "text-forest"}`}>
        {title}
      </h2>
      {intro && <p className={`mt-5 text-lg leading-relaxed ${dark ? "text-cream/75" : "text-muted"}`}>{intro}</p>}
    </Reveal>
  );
}
