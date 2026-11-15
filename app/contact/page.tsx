import type { Metadata } from "next";
import { ContactSection } from "@/components/ContactSection";
import { site } from "@/lib/site.config";

export const metadata: Metadata = {
  title: `Contact | ${site.name}`,
  description: "Find Cortex Cooks on Google Maps, view details, or connect on social media.",
};

export default function ContactPage() {
  return (
    <main id="main">
      <ContactSection />
    </main>
  );
}
