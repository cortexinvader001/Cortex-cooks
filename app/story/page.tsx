import type { Metadata } from "next";
import { StorySection } from "@/components/StorySection";
import { findImages } from "@/lib/images";
import { site } from "@/lib/site.config";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: `Story | ${site.name}`,
  description: "Cortex Cooks runs on one idea: think first, cook second, serve it hot.",
};

export default function StoryPage() {
  const images = findImages();
  return (
    <main id="main">
      <StorySection images={images} />
    </main>
  );
}
