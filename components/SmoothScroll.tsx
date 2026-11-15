"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger } from "@/lib/gsap";

export function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({ lerp: 0.1, anchors: true });
    (window as unknown as { __lenis?: Lenis }).__lenis = lenis; // used by the header for anchor scrolling
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
      delete (window as unknown as { __lenis?: Lenis }).__lenis;
      gsap.ticker.remove(onTick);
      lenis.destroy();
    };
  }, []);

  return null;
}
