"use client";

import { useEffect } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { whenReady } from "@/lib/ready";

/**
 * One place that wires every scroll and entrance animation, so section components stay plain markup.
 * Hooks used in markup:
 *   [data-split]   masked character rise      ([data-hero] waits for the preloader)
 *   [data-reveal]  fade + rise
 *   [data-mask]    clip-path reveal (inner [data-parallax] drifts on desktop)
 *   [data-words]   word-by-word scrub
 *   [data-exit]    gentle fade as the block leaves the top
 *   [data-hero-exit] hero type lifts and fades as it scrolls away
 */
export function MotionController() {
  useEffect(() => {
    const root = document.documentElement;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      root.setAttribute("data-motion", "reduce");
      return;
    }

    const heroTweens: gsap.core.Tween[] = [];

    const ctx = gsap.context(() => {
      // Kinetic type
      gsap.utils.toArray<HTMLElement>("[data-split]").forEach((el) => {
        const chars = el.querySelectorAll(".char");
        const tween = gsap.fromTo(
          chars,
          { yPercent: 110, opacity: 1 },
          { yPercent: 0, opacity: 1, duration: 1.05, ease: "power4.out", stagger: 0.03, paused: true },
        );
        if (el.hasAttribute("data-hero")) heroTweens.push(tween);
        else
          ScrollTrigger.create({
            trigger: el,
            start: "top 88%",
            once: true,
            onEnter: () => tween.play(),
          });
      });

      // Fade + rise
      gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((el) => {
        gsap.fromTo(
          el,
          { y: 32, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 90%", once: true },
          },
        );
      });

      // Image masks
      gsap.utils.toArray<HTMLElement>("[data-mask]").forEach((el) => {
        const hero = el.hasAttribute("data-hero-mask");
        const tween = gsap.fromTo(
          el,
          { clipPath: "inset(100% 0% 0% 0%)" },
          { clipPath: "inset(0% 0% 0% 0%)", duration: 1.2, ease: "power4.inOut", paused: hero },
        );
        if (hero) {
          heroTweens.push(tween as gsap.core.Tween);
        } else {
          tween.pause();
          ScrollTrigger.create({ trigger: el, start: "top 88%", once: true, onEnter: () => tween.play() });
        }
      });

      // Word-by-word statement
      gsap.utils.toArray<HTMLElement>("[data-words]").forEach((el) => {
        gsap.fromTo(
          el.querySelectorAll(".word"),
          { opacity: 0.18 },
          {
            opacity: 1,
            ease: "none",
            stagger: 0.1,
            scrollTrigger: { trigger: el, start: "top 82%", end: "bottom 55%", scrub: 0.6 },
          },
        );
      });

      // Exits: each block eases out as it leaves the viewport top
      gsap.utils.toArray<HTMLElement>("[data-exit]").forEach((el) => {
        gsap.to(el, {
          opacity: 0.25,
          y: -24,
          ease: "none",
          scrollTrigger: { trigger: el, start: "bottom 35%", end: "bottom top", scrub: true },
        });
      });

      // Hero exit
      const heroExit = document.querySelector("[data-hero-exit]");
      if (heroExit) {
        gsap.to(heroExit, {
          yPercent: -10,
          opacity: 0.15,
          ease: "none",
          scrollTrigger: { trigger: "#top", start: "top top", end: "bottom top", scrub: true },
        });
      }

      // Subtle image parallax, desktop only
      const mm = gsap.matchMedia();
      mm.add("(min-width: 1024px)", () => {
        gsap.utils.toArray<HTMLElement>("[data-parallax]").forEach((inner) => {
          gsap.fromTo(
            inner,
            { yPercent: 6 },
            {
              yPercent: -6,
              ease: "none",
              scrollTrigger: { trigger: inner.parentElement, start: "top bottom", end: "bottom top", scrub: 0.8 },
            },
          );
        });
      });
    });

    const stopWaiting = whenReady(() => heroTweens.forEach((t) => t.play()));
    const failsafe = window.setTimeout(() => heroTweens.forEach((t) => t.play()), 13000);

    // Fonts and images change layout: refresh trigger positions.
    document.fonts?.ready.then(() => ScrollTrigger.refresh());
    const onLoad = () => ScrollTrigger.refresh();
    window.addEventListener("load", onLoad);

    return () => {
      stopWaiting();
      clearTimeout(failsafe);
      window.removeEventListener("load", onLoad);
      ctx.revert();
    };
  }, []);

  return null;
}
