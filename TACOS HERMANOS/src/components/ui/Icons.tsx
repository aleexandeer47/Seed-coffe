import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement> & { size?: number };

/** Brand icons (Lucide no longer ships social brand marks). */
export function InstagramIcon({ size = 20, ...props }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} aria-hidden="true" {...props}>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function TikTokIcon({ size = 20, ...props }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M16.6 5.82A4.28 4.28 0 0 1 15.54 3h-3.09v12.4a2.59 2.59 0 1 1-2.59-2.6c.27 0 .53.04.77.11V9.75a5.68 5.68 0 1 0 4.91 5.65V9.01a7.3 7.3 0 0 0 4.27 1.37V7.29a4.28 4.28 0 0 1-3.21-1.47Z" />
    </svg>
  );
}

export function WhatsAppIcon({ size = 20, ...props }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M12.04 2a9.9 9.9 0 0 0-8.5 14.98L2 22l5.17-1.5A9.9 9.9 0 1 0 12.04 2Zm0 18.1a8.2 8.2 0 0 1-4.18-1.15l-.3-.18-3.07.89.9-2.99-.2-.31a8.2 8.2 0 1 1 6.85 3.74Zm4.5-6.14c-.25-.12-1.46-.72-1.69-.8-.23-.08-.39-.12-.55.12-.16.25-.63.8-.78.97-.14.16-.29.18-.53.06-.25-.12-1.04-.38-1.98-1.22a7.4 7.4 0 0 1-1.37-1.7c-.14-.25 0-.38.11-.5.11-.11.25-.29.37-.43.12-.15.16-.25.25-.41.08-.17.04-.31-.02-.43-.06-.13-.55-1.33-.76-1.82-.2-.48-.4-.41-.55-.42h-.47a.9.9 0 0 0-.65.31c-.23.25-.86.84-.86 2.04 0 1.2.88 2.37 1 2.53.12.17 1.73 2.64 4.2 3.7.58.25 1.04.4 1.4.52.59.18 1.12.16 1.54.1.47-.07 1.46-.6 1.66-1.18.2-.57.2-1.07.15-1.17-.06-.11-.22-.17-.47-.29Z" />
    </svg>
  );
}

/** The arch mark seen on the house salsa bottles and placemats. */
export function ArchMark({ size = 28, ...props }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth={3} strokeLinecap="round" aria-hidden="true" {...props}>
      <path d="M5 27V17a11 11 0 0 1 22 0v10" />
      <path d="M11 27v-6a5 5 0 0 1 10 0v6" />
    </svg>
  );
}
