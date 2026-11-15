import fs from "node:fs";
import path from "node:path";
import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { Marquee } from "@/components/Marquee";
import { Menu } from "@/components/Menu";
import { Method } from "@/components/Method";
import { Showcase } from "@/components/Showcase";
import { Visit } from "@/components/Visit";
import { Footer } from "@/components/Footer";
import { OrderBar } from "@/components/OrderBar";

export const dynamic = "force-static";

const KEYS = ["hero", "grill", "fries", "chicken", "cocktails", "smoothies"];
const EXTS = ["avif", "webp", "jpg", "jpeg", "png"];

/** Drop hero.jpg, grill.webp, etc. into /public/images and they replace the placeholders. */
function findImages(): Record<string, string | null> {
  const dir = path.join(process.cwd(), "public", "images");
  const out: Record<string, string | null> = {};
  for (const key of KEYS) {
    const ext = EXTS.find((e) => fs.existsSync(path.join(dir, `${key}.${e}`)));
    // Relative paths in the static preview so it works from any folder or origin.
    const prefix = process.env.STATIC_PREVIEW === "1" ? "images" : "/images";
    out[key] = ext ? `${prefix}/${key}.${ext}` : null;
  }
  return out;
}

export default function Home() {
  const images = findImages();
  return (
    <>
      <Nav />
      <main id="main">
        <Hero image={images.hero} />
        <Marquee />
        <Menu images={images} />
        <Showcase image={images.grill} />
        <Method />
        <Visit />
      </main>
      <Footer />
      <OrderBar />
    </>
  );
}
