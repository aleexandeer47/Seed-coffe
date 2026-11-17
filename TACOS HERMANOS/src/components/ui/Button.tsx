import type { AnchorHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "light" | "outline-light" | "outline" | "ghost";

const base =
  "group relative inline-flex min-h-12 items-center justify-center gap-2 overflow-hidden rounded-full px-6 text-[0.95rem] font-bold tracking-tight transition-[transform,background-color,color,box-shadow] duration-300 ease-[var(--ease-out-soft)] active:scale-[0.97] disabled:pointer-events-none disabled:opacity-60";

const variants: Record<Variant, string> = {
  primary:
    "bg-brand text-white shadow-[0_10px_30px_-12px_rgb(28_127_95/0.7)] hover:bg-brand-700 hover:shadow-[0_16px_40px_-14px_rgb(28_127_95/0.8)] hover:-translate-y-0.5",
  light: "bg-cream text-forest hover:bg-white hover:-translate-y-0.5",
  "outline-light": "border border-white/35 text-white hover:border-white hover:bg-white/10",
  outline: "border border-ink/20 text-ink hover:border-brand hover:text-brand",
  ghost: "text-brand hover:text-brand-700 px-0 min-h-0",
};

interface ButtonLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  variant?: Variant;
  icon?: ReactNode;
  external?: boolean;
}

export function ButtonLink({ variant = "primary", icon, external, className = "", children, ...props }: ButtonLinkProps) {
  return (
    <a
      className={`${base} ${variants[variant]} ${className}`}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      {...props}
    >
      <span>{children}</span>
      {icon && (
        <span className="transition-transform duration-300 ease-[var(--ease-out-soft)] group-hover:translate-x-1" aria-hidden="true">
          {icon}
        </span>
      )}
    </a>
  );
}

export const buttonClasses = (variant: Variant = "primary", className = "") => `${base} ${variants[variant]} ${className}`;
