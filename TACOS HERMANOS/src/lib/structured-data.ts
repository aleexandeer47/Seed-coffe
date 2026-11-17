import { branches } from "@/data/branches";
import { site } from "@/data/site";

/** schema.org Restaurant graph — only verified fields are emitted (no prices, no unconfirmed hours). */
export function restaurantJsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${site.url}/#org`,
        name: site.name,
        url: site.url,
        logo: `${site.url}/images/logo-tacos-hermanos.png`,
        slogan: site.tagline,
        sameAs: [site.social.instagram.url, site.social.tiktok.url],
      },
      ...branches.map((b) => ({
        "@type": "Restaurant",
        "@id": `${site.url}/#${b.id}`,
        name: `${site.name} ${b.name}`,
        parentOrganization: { "@id": `${site.url}/#org` },
        servesCuisine: "Mexicana",
        image: `${site.url}/images/tacos-de-asada.webp`,
        address: {
          "@type": "PostalAddress",
          streetAddress: b.address,
          addressLocality: b.area,
          addressCountry: "SV",
        },
        ...(b.phone ? { telephone: b.phone.display } : {}),
        hasMap: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(b.mapsQuery)}`,
      })),
    ],
  };
}
