import Image from "next/image";

interface LogoProps {
  variant?: "green" | "white";
  className?: string;
  priority?: boolean;
}

/** Official Tacos Hermanos wordmark (512×133 source). */
export function Logo({ variant = "green", className = "h-9 w-auto", priority }: LogoProps) {
  return (
    <Image
      src={variant === "white" ? "/images/logo-tacos-hermanos-blanco.png" : "/images/logo-tacos-hermanos.png"}
      alt="Tacos Hermanos"
      width={512}
      height={133}
      className={className}
      priority={priority}
    />
  );
}
