"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger } from "@/lib/gsap";

export function SmoothScroll() {
  const pathname = usePathname();
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({ lerp: 0.1, anchors: true });
    lenisRef.current = lenis;
    (window as unknown as { __lenis?: Lenis }).__lenis = lenis;
    if (document.documentElement.hasAttribute("data-scroll-locked")) lenis.stop();

    const onTick = (t: number) => lenis.raf(t * 1000);
    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add(onTick);
    gsap.ticker.lagSmoothing(0);

    // Menus and the preloader lock scrolling by toggling this attribute.
    const obs = new MutationObserver(() => {
      if (document.documentElement.hasAttribute("data-scroll-locked")) lenis.stop();
      else lenis.start();
    });
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ["data-scroll-locked"] });

    return () => {
      obs.disconnect();
      lenisRef.current = null;
      delete (window as unknown as { __lenis?: Lenis }).__lenis;
      gsap.ticker.remove(onTick);
      lenis.destroy();
    };
  }, []);

  useEffect(() => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo(0, 0);
    }
    requestAnimationFrame(() => ScrollTrigger.refresh());
  }, [pathname]);

  return null;
}
