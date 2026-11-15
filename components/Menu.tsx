"use client";

import { useState } from "react";
import { menu, site } from "@/lib/site.config";
import { useOrder } from "@/lib/order";
import { ImageSlot } from "./ImageSlot";
import ClickSpark from "./reactbits/ClickSpark/ClickSpark";
import { Split } from "./Split";

export function Menu({ images }: { images: Record<string, string | null> }) {
  const [openId, setOpenId] = useState<string | null>("grill");
  const { cart, add, remove } = useOrder();

  return (
    <ClickSpark
      sparkColor={["#D9542B", "#B8431E", "#2F4B3A", "#1A1714"]}
      sparkCount={10}
      sparkRadius={34}
      sparkSize={11}
      duration={550}
      shape="streak"
    >
    <section id="menu" className="px-[var(--gutter)] py-[var(--section-pad)]">
      <div className="mx-auto max-w-[1440px]">
        <div data-exit="" className="mb-14 grid gap-6 md:mb-20 lg:grid-cols-12">
          <p className="eyebrow text-ink-2 lg:col-span-12">01 / The Menu</p>
          <h2 className="display-section text-[clamp(3rem,8vw,8rem)] lg:col-span-8">
            <Split text="Pick your" />
            <Split text="fire." className="serif-italic text-ember" />
          </h2>
          <p data-reveal="" className="max-w-[34ch] self-end text-ink-2 lg:col-span-4">
            Open a category, add what you want, then send the whole order on WhatsApp.
          </p>
        </div>

        <ul className="border-t border-ink">
          {menu.map((cat, idx) => {
            const open = openId === cat.id;
            const panelId = `panel-${cat.id}`;
            return (
              <li key={cat.id} className="border-b border-ink">
                <h3 className="m-0">
                  <button
                    type="button"
                    aria-expanded={open}
                    aria-controls={panelId}
                    onClick={() => setOpenId(open ? null : cat.id)}
                    className="group flex w-full items-baseline gap-4 py-5 text-left md:gap-8 md:py-7"
                  >
                    <span className="eyebrow font-num w-8 shrink-0 text-ink-2 md:w-12">
                      0{idx + 1}
                    </span>
                    <span className="font-display min-w-0 flex-1 text-[clamp(2.75rem,9vw,9rem)] font-bold leading-[0.9] tracking-[-0.04em] transition-transform duration-500 group-hover:translate-x-3 group-focus-visible:translate-x-3">
                      {cat.title}
                    </span>
                    <span className="hidden max-w-[24ch] text-ink-2 md:block">{cat.blurb}</span>
                    <span
                      aria-hidden="true"
                      className={`font-display shrink-0 text-4xl leading-none transition-transform duration-500 md:text-6xl ${
                        open ? "rotate-45" : ""
                      }`}
                    >
                      +
                    </span>
                  </button>
                </h3>

                <div id={panelId} role="region" aria-label={`${cat.title} items`} data-open={open} className="acc-panel">
                  <div>
                    <div className="grid gap-8 pb-10 pt-2 md:pl-20 lg:grid-cols-12 lg:gap-12">
                      <ul className="lg:col-span-7">
                        {cat.items.map((item) => {
                          const qty = cart[item.id] ?? 0;
                          return (
                            <li
                              key={item.id}
                              className="flex items-center justify-between gap-4 border-t border-line py-4 first:border-t-0"
                            >
                              <div className="min-w-0">
                                <p className="font-display text-xl font-semibold leading-tight md:text-2xl">
                                  {item.name}
                                </p>
                                <p className="text-sm text-ink-2">{item.note}</p>
                              </div>
                              <div className="flex shrink-0 items-center gap-4">
                                <span className="font-num eyebrow hidden w-24 text-right sm:inline">
                                  {item.price === null
                                    ? "Price TBC"
                                    : `${site.currency}${item.price.toLocaleString("en-NG")}`}
                                </span>
                                {qty === 0 ? (
                                  <button
                                    type="button"
                                    onClick={() => add(item.id)}
                                    aria-label={`Add ${item.name} to order`}
                                    className="eyebrow min-h-11 min-w-20 border border-ink px-4 transition-colors duration-200 hover:bg-ink hover:text-cream"
                                  >
                                    Add
                                  </button>
                                ) : (
                                  <div className="flex items-center" role="group" aria-label={`${item.name} quantity`}>
                                    <button
                                      type="button"
                                      onClick={() => remove(item.id)}
                                      aria-label={`Remove one ${item.name}`}
                                      className="min-h-11 min-w-11 border border-ink text-xl leading-none"
                                    >
                                      −
                                    </button>
                                    <span className="font-num min-w-10 text-center font-semibold" aria-live="polite">
                                      {qty}
                                    </span>
                                    <button
                                      type="button"
                                      onClick={() => add(item.id)}
                                      aria-label={`Add one more ${item.name}`}
                                      className="min-h-11 min-w-11 bg-ink text-xl leading-none text-cream"
                                    >
                                      +
                                    </button>
                                  </div>
                                )}
                              </div>
                            </li>
                          );
                        })}
                      </ul>
                      <div className="lg:col-span-5">
                        <ImageSlot
                          src={images[cat.imageKey] ?? null}
                          alt={`${cat.title} at Cortex Cooks`}
                          aspect="4 / 3"
                          label={`IMAGE · ${cat.title.toUpperCase()}`}
                          brief={`See IMAGE_PROMPTS.md for the ${cat.title} prompt.`}
                          tone="light"
                          sizes="(min-width: 1024px) 40vw, 100vw"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
        <p className="eyebrow mt-6 text-ink-2">Sample items shown. Final menu and prices to be added.</p>
      </div>
    </section>
    </ClickSpark>
  );
}
