import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { Marquee } from "@/components/sections/Marquee";
import { MenuSection } from "@/components/sections/MenuSection";
import { SalsasBand } from "@/components/sections/SalsasBand";
import { About } from "@/components/sections/About";
import { Branches } from "@/components/sections/Branches";
import { Contact } from "@/components/sections/Contact";
import { restaurantJsonLd } from "@/lib/structured-data";

export default function Home() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(restaurantJsonLd()) }} />
      <Navbar />
      <main id="contenido">
        <Hero />
        <Marquee />
        <MenuSection />
        <SalsasBand />
        <About />
        <Branches />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
