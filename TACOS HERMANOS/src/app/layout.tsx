import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Manrope } from "next/font/google";
import { site } from "@/data/site";
import { MotionProvider } from "@/components/layout/MotionProvider";
import "./globals.css";

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  variable: "--font-bricolage",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-manrope",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Tacos Hermanos | Taquería mexicana en El Salvador",
    template: "%s | Tacos Hermanos",
  },
  description: site.description,
  keywords: [
    "Tacos Hermanos",
    "tacos El Salvador",
    "taquería San Salvador",
    "quesabirrias",
    "tacos San Benito",
    "tacos La Gran Vía",
    "Paseo Venecia Soyapango",
    "comida mexicana El Salvador",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: site.locale,
    url: site.url,
    siteName: site.name,
    title: "Tacos Hermanos | Lo bonito se comparte",
    description: site.description,
    images: [{ url: "/images/tacos-de-asada.webp", width: 765, height: 1020, alt: "Tacos de asada de Tacos Hermanos" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Tacos Hermanos | Lo bonito se comparte",
    description: site.description,
    images: ["/images/tacos-de-asada.webp"],
  },
  robots: { index: true, follow: true },
  formatDetection: { telephone: true },
};

export const viewport: Viewport = {
  themeColor: "#0c3227",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es-SV" className={`${bricolage.variable} ${manrope.variable}`}>
      <body>
        <a
          href="#menu"
          className="sr-only z-[100] rounded-full bg-pina px-5 py-3 font-bold text-forest focus:not-sr-only focus:fixed focus:top-4 focus:left-4"
        >
          Saltar al contenido
        </a>
        <MotionProvider>{children}</MotionProvider>
      </body>
    </html>
  );
}
