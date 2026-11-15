import fs from "node:fs";
import path from "node:path";

const KEYS = ["hero", "grill", "fries", "chicken", "cocktails", "smoothies"];
const EXTS = ["avif", "webp", "jpg", "jpeg", "png"];

/** Drop hero.jpg, grill.webp, etc. into /public/images and they replace the placeholders. */
export function findImages(): Record<string, string | null> {
  const dir = path.join(process.cwd(), "public", "images");
  const out: Record<string, string | null> = {};
  for (const key of KEYS) {
    const ext = EXTS.find((e) => fs.existsSync(path.join(dir, `${key}.${e}`)));
    const prefix = process.env.STATIC_PREVIEW === "1" ? "images" : "/images";
    out[key] = ext ? `${prefix}/${key}.${ext}` : null;
  }
  return out;
}
