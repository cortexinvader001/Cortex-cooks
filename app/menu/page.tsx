import type { Metadata } from "next";
import { FullMenu } from "@/components/FullMenu";
import { findImages } from "@/lib/images";
import { site } from "@/lib/site.config";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: `Menu | ${site.name}`,
  description: "Explore grill, fries, chicken, cocktails and smoothies and order straight on WhatsApp.",
};

export default function MenuPage() {
  const images = findImages();
  return (
    <main id="main">
      <FullMenu images={images} />
    </main>
  );
}
