import type { Metadata, Viewport } from "next";
import "@fontsource-variable/space-grotesk";
import "@fontsource-variable/inter";
import "@fontsource/instrument-serif/400-italic.css";
import "lenis/dist/lenis.css";
import "./globals.css";
import { OrderProvider } from "@/lib/order";
import { Preloader } from "@/components/Preloader";
import { SmoothScroll } from "@/components/SmoothScroll";
import { MotionController } from "@/components/MotionController";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { OrderBar } from "@/components/OrderBar";
import { site } from "@/lib/site.config";

export const metadata: Metadata = {
  title: `${site.name} | Grill, Fries, Chicken, Cocktails & Smoothies`,
  description:
    "Grill, fries, chicken, cocktails and smoothies. Pick what you like and order straight on WhatsApp.",
};

export const viewport: Viewport = {
  themeColor: "#F4EFE6",
  width: "device-width",
  initialScale: 1,
};

// Runs before paint: sets motion mode and skips the preloader on repeat visits this session.
const bootScript = `(function(){try{var d=document.documentElement;
var r=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
d.setAttribute('data-motion', r?'reduce':'full');
if(sessionStorage.getItem('cx-visited')){d.setAttribute('data-visited','')}
}catch(e){}})();`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: bootScript }} />
      </head>
      <body>
        <a
          href="#main"
          className="fixed left-4 top-4 z-[200] -translate-y-24 bg-ink px-4 py-3 text-cream focus:translate-y-0"
        >
          Skip to content
        </a>
        <Preloader />
        <SmoothScroll />
        <OrderProvider>
          <Nav />
          {children}
          <Footer />
          <OrderBar />
        </OrderProvider>
        <MotionController />
      </body>
    </html>
  );
}
