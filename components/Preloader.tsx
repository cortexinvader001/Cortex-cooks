"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";
import { markReady } from "@/lib/ready";

const CRITICAL_TIMEOUT_MS = 3500;
const SKIP_AFTER_MS = 800;

const lock = (on: boolean) => {
  const el = document.documentElement;
  if (on) el.setAttribute("data-scroll-locked", "");
  else el.removeAttribute("data-scroll-locked");
};

const BRAND = "CORTEX".split("");
const SECOND = "Cooks".split("");

/**
 * First-load scene (about 5s, skippable after 0.8s):
 *  1. Caret types C-O-R-T-E-X: orange extruded letters flip up in 3D and bounce.
 *  2. "Cooks" types in below, then the letters ripple in a bouncing wave.
 *  3. Three circles slide in with a springy settle.
 *  4. They gather, then grow one after another (orange, green, ink) and swallow the text.
 *  5. A circular hole opens from the centre and reveals the site.
 * The exit waits for real readiness (fonts + page load) with a timeout fallback.
 */
export function Preloader() {
  const root = useRef<HTMLDivElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const caret = useRef<HTMLSpanElement>(null);
  const counter = useRef<HTMLSpanElement>(null);
  const circles = useRef<(HTMLSpanElement | null)[]>([]);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const el = root.current;
    const stageEl = stage.current;
    if (!el || !stageEl) return;

    const finishSession = () => {
      try {
        sessionStorage.setItem("cx-visited", "1");
      } catch {}
    };

    // Repeat visit this session: overlay is already hidden by CSS, start the page.
    if (document.documentElement.hasAttribute("data-visited")) {
      markReady();
      setDone(true);
      return;
    }

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    lock(true);

    // ---- Real readiness: fonts + full page load, weighted into the counter ----
    const fontsP: Promise<unknown> = document.fonts?.ready ?? Promise.resolve();
    const loadP = new Promise<void>((res) => {
      if (document.readyState === "complete") res();
      else window.addEventListener("load", () => res(), { once: true });
    });
    const state = { progress: 0, shown: 0 };
    const render = () => {
      if (counter.current) counter.current.textContent = String(Math.round(state.shown)).padStart(3, "0");
    };
    const toProgress = (target: number) =>
      gsap.to(state, { shown: target, duration: 0.6, ease: "power2.out", onUpdate: render });
    [fontsP, loadP].forEach((p) =>
      Promise.resolve(p).finally(() => {
        state.progress += 50;
        toProgress(state.progress);
      }),
    );
    const readyP = Promise.race([
      Promise.allSettled([fontsP, loadP]),
      new Promise((r) => setTimeout(r, CRITICAL_TIMEOUT_MS)),
    ]);

    let skipped = false;
    let cancelled = false;
    let introTl: gsap.core.Timeline | null = null;
    let exitTl: gsap.core.Timeline | null = null;

    const end = () => {
      finishSession();
      lock(false);
      setDone(true);
    };

    // ---- Reduced motion: short fade only ----
    if (reduce) {
      readyP.then(() => {
        markReady();
        gsap.to(el, { opacity: 0, duration: 0.3, onComplete: end });
      });
      return () => {
        lock(false);
        gsap.killTweensOf([el, state]);
      };
    }

    const ctx = gsap.context(() => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      const [cEmber, cForest, cInk] = circles.current as HTMLSpanElement[];
      const letters = Array.from(stageEl.querySelectorAll<HTMLElement>(".pl-letter"));
      const cooks = Array.from(stageEl.querySelectorAll<HTMLElement>(".pl-cook"));

      const start = () => {
        if (cancelled) return;

        // Measure caret stops before any transforms exist.
        const sr = stageEl.getBoundingClientRect();
        const stop = (n: HTMLElement) => {
          const r = n.getBoundingClientRect();
          return { x: r.right - sr.left + 3, y: r.top - sr.top + r.height * 0.12, h: r.height * 0.76 };
        };
        const stops1 = letters.map(stop);
        const stops2 = cooks.map(stop);
        const firstStop = { x: letters[0].getBoundingClientRect().left - sr.left - 6, y: stops1[0].y, h: stops1[0].h };

        // Circle geometry
        const D = Math.max(56, Math.min(w, h) * 0.16);
        const rowY = Math.min(sr.bottom - h / 2 + D * 0.95, h / 2 - D * 0.5 - 56);
        const cover = (Math.hypot(w, h) / D) * 1.15;
        [cEmber, cForest, cInk].forEach((c) => gsap.set(c, { width: D, height: D, marginLeft: -D / 2, marginTop: -D / 2 }));

        // ---------- Intro ----------
        const tl = gsap.timeline({
          paused: true,
          onComplete: () => {
            (skipped ? Promise.resolve() : readyP).then(runExit);
          },
        });
        introTl = tl;

        gsap.set(caret.current, { x: firstStop.x, y: firstStop.y, height: firstStop.h, opacity: 0 });
        // Circles stay hidden until now; their slide-in tweens place them off-screen immediately.
        tl.fromTo(
          [cEmber, cForest, cInk],
          { opacity: 0 },
          { opacity: 1, duration: 0.01 },
          0,
        );
        tl.to(caret.current, { opacity: 1, duration: 0.1, repeat: 3, yoyo: true, ease: "none" }, 0);
        tl.set(caret.current, { opacity: 1 }, 0.4);

        // 1. CORTEX types in: 3D flip + bounce
        const t0 = 0.45;
        letters.forEach((n, i) => {
          const at = t0 + i * 0.1;
          tl.set(caret.current, { x: stops1[i].x, y: stops1[i].y, height: stops1[i].h }, at);
          tl.fromTo(n, { opacity: 0 }, { opacity: 1, duration: 0.1, ease: "none" }, at);
          tl.fromTo(
            n,
            { y: -110, rotationX: -105, scale: 0.5, transformOrigin: "50% 100%" },
            { y: 0, rotationX: 0, scale: 1, duration: 0.7, ease: "back.out(2.4)" },
            at,
          );
        });

        // 2. "Cooks" types in, caret follows
        const c0 = t0 + letters.length * 0.1 + 0.2;
        cooks.forEach((n, i) => {
          const at = c0 + i * 0.07;
          tl.set(caret.current, { x: stops2[i].x, y: stops2[i].y, height: stops2[i].h }, at);
          tl.fromTo(
            n,
            { opacity: 0, y: 36, scale: 0.6 },
            { opacity: 1, y: 0, scale: 1, duration: 0.45, ease: "back.out(2.2)" },
            at,
          );
        });
        const typedAt = c0 + cooks.length * 0.07 + 0.25;
        tl.to(caret.current, { opacity: 0, duration: 0.08, repeat: 3, yoyo: true, ease: "none" }, typedAt);
        tl.set(caret.current, { opacity: 0 }, typedAt + 0.4);

        // Bouncing wave with a 3D twist across the orange letters
        tl.to(
          letters,
          { y: -22, rotationY: 32, duration: 0.28, ease: "sine.out", yoyo: true, repeat: 1, stagger: 0.06 },
          typedAt - 0.1,
        );

        // 3. Circles slide in with a springy settle
        const k0 = typedAt + 0.05;
        const spring = "elastic.out(1, 0.55)";
        tl.fromTo(cEmber, { x: -(w / 2 + D), y: rowY }, { x: -D * 1.35, y: rowY, duration: 1, ease: spring }, k0);
        tl.fromTo(cInk, { x: w / 2 + D, y: rowY }, { x: D * 1.35, y: rowY, duration: 1, ease: spring }, k0 + 0.12);
        tl.fromTo(cForest, { x: 0, y: h / 2 + D }, { x: 0, y: rowY, duration: 1, ease: spring }, k0 + 0.24);

        // ---------- Exit ----------
        const runExit = () => {
          if (cancelled) return;
          const R = Math.hypot(w, h) / 2 + 60;
          const ex = gsap.timeline({ onComplete: end });
          exitTl = ex;
          if (skipped) ex.timeScale(2.2);

          // gather to the centre
          ex.to([cEmber, cForest, cInk], { x: 0, y: 0, duration: 0.45, ease: "back.in(1.6)", stagger: 0.05 });
          // grow: orange, then green, then ink, each swallowing the last
          ex.to(cEmber, { scale: cover, duration: 0.75, ease: "power3.in" }, ">-0.05");
          ex.to(cForest, { scale: cover, duration: 0.75, ease: "power3.in" }, "<0.17");
          ex.to(cInk, { scale: cover, duration: 0.75, ease: "power3.in" }, "<0.17");
          // circular hole opens from the centre, revealing the site
          ex.add(() => {
            markReady(); // hero entrance starts as the hole opens
            const mask = "radial-gradient(circle at 50% 50%, transparent var(--r), #000 calc(var(--r) + 2px))";
            el.style.setProperty("--r", "0px");
            el.style.setProperty("-webkit-mask-image", mask);
            el.style.setProperty("mask-image", mask);
          }, ">-0.3");
          ex.to(el, { "--r": `${R}px`, duration: 1, ease: "power3.inOut" }, "<");
        };

        tl.play();
      };

      // Letters are measured, so wait for the fonts (short fallback).
      Promise.race([Promise.resolve(fontsP), new Promise((r) => setTimeout(r, 1500))]).then(start);
    }, el);

    // Skip with any key or click after 800ms: speed everything up.
    let skipOk = false;
    const t = window.setTimeout(() => (skipOk = true), SKIP_AFTER_MS);
    const skip = () => {
      if (!skipOk || skipped) return;
      skipped = true;
      introTl?.timeScale(4);
      exitTl?.timeScale(2.2);
    };
    window.addEventListener("keydown", skip);
    window.addEventListener("pointerdown", skip);

    return () => {
      cancelled = true;
      clearTimeout(t);
      window.removeEventListener("keydown", skip);
      window.removeEventListener("pointerdown", skip);
      ctx.revert();
      gsap.killTweensOf([el, state]);
      lock(false);
    };
  }, []);

  if (done) return null;

  return (
    <div
      ref={root}
      className="preloader fixed inset-0 z-[100] overflow-hidden bg-cream text-ink"
      style={{ minHeight: "100dvh" }}
      role="status"
      aria-live="polite"
    >
      <span className="sr-only">Loading Cortex Cooks</span>

      <div aria-hidden="true" className="absolute inset-0 grid place-items-center px-[var(--gutter)]">
        <div ref={stage} className="relative text-center" style={{ perspective: "900px" }}>
          <div
            className="font-display font-bold uppercase leading-none"
            style={{ fontSize: "clamp(3.25rem, 18vw, 16rem)", letterSpacing: "-0.03em" }}
          >
            {BRAND.map((c, i) => (
              <span key={i} className="pl-letter inline-block text-ember">
                {c}
              </span>
            ))}
          </div>
          <div className="serif-italic leading-none" style={{ fontSize: "clamp(2rem, 8vw, 7rem)" }}>
            {SECOND.map((c, i) => (
              <span key={i} className="pl-cook inline-block">
                {c}
              </span>
            ))}
          </div>
          <span
            ref={caret}
            className="absolute left-0 top-0 bg-ink"
            style={{ width: "max(3px, 0.4vw)", opacity: 0 }}
          />
        </div>
      </div>

      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        {["bg-ember", "bg-forest", "bg-ink"].map((bg, i) => (
          <span
            key={bg}
            ref={(n) => {
              circles.current[i] = n;
            }}
            className={`absolute left-1/2 top-1/2 rounded-full ${bg}`}
            style={{ width: 80, height: 80, marginLeft: -40, marginTop: -40, opacity: 0, willChange: "transform" }}
          />
        ))}
      </div>

      <div
        aria-hidden="true"
        className="eyebrow absolute inset-x-0 bottom-0 z-10 flex justify-between px-[var(--gutter)] pb-6 text-ink-2"
      >
        <span>Loading</span>
        <span ref={counter} className="font-num">
          000
        </span>
      </div>
    </div>
  );
}
