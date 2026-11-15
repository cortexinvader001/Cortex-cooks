import type { Metadata } from "next";
import { Hero } from "@/components/Hero";
import { Marquee } from "@/components/Marquee";
import { Menu } from "@/components/Menu";
import { Showcase } from "@/components/Showcase";
import { Method } from "@/components/Method";
import { Visit } from "@/components/Visit";
import { findImages } from "@/lib/images";
import { site } from "@/lib/site.config";

export const dynamic = "force-static";

export function generateMetadata(): Metadata {
  const heroImage = findImages().hero;
  const title = `${site.name} | Grill, Fries, Chicken, Cocktails & Smoothies`;
  const description =
    "Grill, fries, chicken, cocktails and smoothies. Pick what you like and order straight on WhatsApp.";

  return {
    openGraph: {
      title,
      description,
      ...(heroImage
        ? {
            images: [
              {
                url: heroImage,
                alt: `${site.name} grill showcase`,
              },
            ],
          }
        : {}),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      ...(heroImage ? { images: [heroImage] } : {}),
    },
  };
}

export default function Home() {
  const images = findImages();
  return (
    <main id="main">
      <Hero image={images.hero} />
      <Marquee />
      <Menu images={images} />
      <Showcase image={images.grill} />
      <Method />
      <Visit />
    </main>
  );
}
