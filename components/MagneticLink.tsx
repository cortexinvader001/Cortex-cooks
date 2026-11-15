"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

/** Anchor that leans toward the cursor (max 0.3 of the offset). Off on touch and reduced motion. */
export function MagneticLink({
  href,
  children,
  className = "",
  target,
  rel,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
  target?: string;
  rel?: string;
}) {
  const ref = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduce) return;

    const x = gsap.quickTo(el, "x", { duration: 0.4, ease: "power2.out" });
    const y = gsap.quickTo(el, "y", { duration: 0.4, ease: "power2.out" });
    const move = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      x((e.clientX - (r.left + r.width / 2)) * 0.3);
      y((e.clientY - (r.top + r.height / 2)) * 0.3);
    };
    const leave = () => {
      x(0);
      y(0);
    };
    el.addEventListener("pointermove", move);
    el.addEventListener("pointerleave", leave);
    return () => {
      el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerleave", leave);
      gsap.killTweensOf(el);
    };
  }, []);

  return (
    <a ref={ref} href={href} target={target} rel={rel} className={className}>
      {children}
    </a>
  );
}
