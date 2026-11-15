import { Hero } from "@/components/Hero";
import { Marquee } from "@/components/Marquee";
import { Menu } from "@/components/Menu";
import { Showcase } from "@/components/Showcase";
import { Method } from "@/components/Method";
import { Visit } from "@/components/Visit";
import { findImages } from "@/lib/images";

export const dynamic = "force-static";

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
