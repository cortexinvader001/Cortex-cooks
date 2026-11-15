"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { site, whatsappLink } from "@/lib/site.config";
import { useOrder } from "@/lib/order";
import { whenReady } from "@/lib/ready";

const links = [
  { href: "#menu", label: "Menu" },
  { href: "#story", label: "Story" },
  { href: "#visit", label: "Visit" },
];

const BAR_H = 52;

type LenisLike = { start: () => void; scrollTo: (t: Element, o?: { duration?: number }) => void };

/**
 * Floating "dynamic island" header. A dark pill centred at the top with the hamburger on its left.
 * Tapping it morphs the pill into a pull-down drawer (width, height and radius spring open with a
 * slight overshoot, then ease shut with the iOS curve). Content fades in with a stagger.
 */
export function Nav() {
  const [open, setOpen] = useState(false);
  const [entered, setEntered] = useState(false);
  const [bodyH, setBodyH] = useState(0);
  const island = useRef<HTMLElement>(null);
  const body = useRef<HTMLDivElement>(null);
  const toggle = useRef<HTMLButtonElement>(null);
  const { count, link } = useOrder();

  // Drop in as the preloader opens (or immediately with reduced motion).
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setEntered(true);
      return;
    }
    let t: number;
    const stop = whenReady(() => {
      t = window.setTimeout(() => setEntered(true), 350);
    });
    return () => {
      stop();
      clearTimeout(t);
    };
  }, []);

  // Measure the drawer content so the height can animate to a real number.
  useLayoutEffect(() => {
    const el = body.current;
    if (!el) return;
    const measure = () => setBodyH(el.offsetHeight);
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const close = useCallback(() => setOpen(false), []);

  // Scroll lock, focus trap, Escape, focus restore.
  useEffect(() => {
    if (!open) return;
    const html = document.documentElement;
    html.setAttribute("data-scroll-locked", "");
    const focusables = () =>
      Array.from(island.current?.querySelectorAll<HTMLElement>("a[href], button:not([disabled])") ?? []).filter(
        (n) => !n.closest("[inert]"),
      );
    // preventScroll: focusing inside the still-short, clipped pill would otherwise scroll its content up.
    const raf = requestAnimationFrame(() =>
      body.current?.querySelector<HTMLElement>("a")?.focus({ preventScroll: true }),
    );

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        return;
      }
      if (e.key !== "Tab") return;
      const f = focusables();
      if (!f.length) return;
      const first = f[0];
      const last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    const trigger = toggle.current;
    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener("keydown", onKey);
      html.removeAttribute("data-scroll-locked");
      if (island.current?.contains(document.activeElement) || document.activeElement === document.body) {
        trigger?.focus();
      }
    };
  }, [open]);

  // Close, unlock, then scroll (smooth-scroll ignores requests while locked).
  const go = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (!href.startsWith("#")) return;
    e.preventDefault();
    setOpen(false);
    document.documentElement.removeAttribute("data-scroll-locked");
    requestAnimationFrame(() => {
      const target = href === "#top" ? document.body : document.querySelector(href);
      if (!target) return;
      const lenis = (window as unknown as { __lenis?: LenisLike }).__lenis;
      if (lenis) {
        lenis.start();
        lenis.scrollTo(href === "#top" ? document.documentElement : target, { duration: 1.3 });
      } else {
        target.scrollIntoView({ behavior: "smooth" });
      }
      history.replaceState(null, "", href);
    });
  };

  return (
    <>
      <div
        aria-hidden="true"
        data-open={open}
        onClick={close}
        className="island-backdrop"
      />

      <header>
        <nav
          ref={island}
          aria-label="Main"
          data-open={open}
          data-in={entered}
          className="island on-dark"
          style={{ height: open ? BAR_H + bodyH : BAR_H }}
        >
          {/* Top bar: hamburger left, brand centre, order right */}
          <div className="flex items-center justify-between gap-2 pl-1.5 pr-2" style={{ height: BAR_H }}>
            <button
              ref={toggle}
              type="button"
              aria-expanded={open}
              aria-controls="island-body"
              aria-label={open ? "Close menu" : "Open menu"}
              onClick={() => setOpen((v) => !v)}
              className="island-burger"
              data-open={open}
            >
              <span />
              <span />
              <span />
            </button>

            <a
              href="#top"
              onClick={(e) => go(e, "#top")}
              className="font-display text-[1.05rem] font-bold leading-none tracking-tight"
            >
              Cortex <span className="serif-italic text-[1.35rem] text-ember-light">Cooks</span>
            </a>

            <a
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className="eyebrow inline-flex h-9 items-center rounded-full bg-ember-deep px-4 text-cream transition-colors duration-200 hover:bg-cream hover:text-ink"
            >
              Order{count > 0 && <span className="font-num ml-1.5">· {count}</span>}
            </a>
          </div>

          {/* Drawer content */}
          <div id="island-body" ref={body} inert={!open} className="island-body px-5 pb-4 pt-2 sm:px-7">
            {/* Phones: links stacked. PC (sm+): links side by side in a row. */}
            <ul className="m-0 list-none p-0 sm:grid sm:grid-cols-3">
              {links.map((l, i) => (
                <li
                  key={l.href}
                  className="island-item border-t border-cream/15 sm:border-l sm:pl-6 sm:first:border-l-0 sm:first:pl-0"
                  style={{ ["--i" as string]: i }}
                >
                  <a
                    href={l.href}
                    onClick={(e) => go(e, l.href)}
                    className="island-link group flex items-baseline justify-between gap-4 py-3.5 sm:flex-col sm:items-start sm:justify-start sm:gap-3 sm:py-6"
                  >
                    <span className="font-display text-[clamp(2.5rem,9vw,3.75rem)] font-bold leading-none tracking-[-0.03em] transition-[transform,color] duration-300 group-hover:translate-x-2 group-hover:text-ember-light group-focus-visible:translate-x-2 group-focus-visible:text-ember-light sm:text-[clamp(2.25rem,4vw,3.5rem)]">
                      {l.label}
                    </span>
                    <span className="eyebrow font-num text-cream/60 sm:order-first">0{i + 1}</span>
                  </a>
                </li>
              ))}
            </ul>

            {/* Phones: button then tagline. PC: tagline on the left, button on the right, in one row. */}
            <div className="sm:flex sm:flex-row-reverse sm:items-center sm:justify-between sm:gap-6 sm:border-t sm:border-cream/15 sm:pt-4">
              <div className="island-item mt-3 sm:mt-0" style={{ ["--i" as string]: 3 }}>
                <a
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="eyebrow flex min-h-14 items-center justify-center bg-cream text-ink transition-colors duration-200 hover:bg-ember-deep hover:text-cream sm:px-8"
                >
                  Order on WhatsApp{count > 0 ? ` · ${count} ${count === 1 ? "item" : "items"}` : ""}
                </a>
              </div>

              <div
                className="island-item eyebrow mt-4 flex flex-wrap justify-between gap-x-4 gap-y-1 text-cream/60 sm:mt-0 sm:justify-start"
                style={{ ["--i" as string]: 4 }}
              >
                <span>Grill / Fries / Chicken / Cocktails / Smoothies</span>
                {site.instagram && (
                  <a href={`https://instagram.com/${site.instagram}`} className="underline underline-offset-4">
                    @{site.instagram}
                  </a>
                )}
              </div>
            </div>

            <button
              type="button"
              onClick={close}
              aria-label="Close menu"
              className="island-item mx-auto mt-2 flex h-11 w-24 items-center justify-center"
              style={{ ["--i" as string]: 5 }}
            >
              <span className="block h-[5px] w-10 rounded-full bg-cream/35" />
            </button>
          </div>
        </nav>
      </header>
    </>
  );
}
