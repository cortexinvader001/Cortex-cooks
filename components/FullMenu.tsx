"use client";

import { useMemo, useState } from "react";
import { LayoutGrid, List, Search, X } from "lucide-react";
import { menu, site } from "@/lib/site.config";
import { useOrder } from "@/lib/order";
import { ImageSlot } from "./ImageSlot";
import ClickSpark from "./reactbits/ClickSpark/ClickSpark";
import { Split } from "./Split";

type ViewMode = "grid" | "list";

export function FullMenu({ images }: { images: Record<string, string | null> }) {
  const [view, setView] = useState<ViewMode>("grid");
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [query, setQuery] = useState("");
  const { cart, add, remove } = useOrder();

  const normalizedQuery = query.trim().toLowerCase();

  const visibleCategories = useMemo(() => {
    return menu
      .filter((cat) => activeCategory === "all" || cat.id === activeCategory)
      .map((cat) => {
        if (!normalizedQuery) return cat;
        const matchesCategory =
          cat.title.toLowerCase().includes(normalizedQuery) ||
          cat.blurb.toLowerCase().includes(normalizedQuery);
        const filteredItems = matchesCategory
          ? cat.items
          : cat.items.filter(
              (item) =>
                item.name.toLowerCase().includes(normalizedQuery) ||
                item.note.toLowerCase().includes(normalizedQuery),
            );
        return { ...cat, items: filteredItems };
      })
      .filter((cat) => cat.items.length > 0);
  }, [activeCategory, normalizedQuery]);

  const totalShownItems = visibleCategories.reduce((sum, cat) => sum + cat.items.length, 0);

  return (
    <ClickSpark
      sparkColor={["#D9542B", "#B8431E", "#2F4B3A", "#1A1714"]}
      sparkCount={10}
      sparkRadius={34}
      sparkSize={11}
      duration={550}
      shape="streak"
    >
      <section className="px-[var(--gutter)] pb-[var(--section-pad)] pt-28 md:pt-36">
        <div className="mx-auto max-w-[1440px]">
          {/* Header */}
          <div data-exit="" className="mb-12 grid gap-6 md:mb-16 lg:grid-cols-12">
            <p className="eyebrow text-ink-2 lg:col-span-12">The Menu</p>
            <h1 className="display-section text-[clamp(3.25rem,9vw,8.5rem)] lg:col-span-8">
              <Split text="Pick your" />
              <Split text="fire." className="serif-italic text-ember" />
            </h1>
            <p data-reveal="" className="max-w-[36ch] self-end text-ink-2 lg:col-span-4">
              Every category open at once. Switch between grid or list view, filter by craving, and send your order on WhatsApp.
            </p>
          </div>

          {/* Versatile controls: category tabs, search, grid/list toggle */}
          <div className="mb-12 border-y border-ink py-5 md:mb-16">
            <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
              {/* Category filter / jump tabs */}
              <div className="flex flex-wrap gap-2" role="tablist" aria-label="Menu categories">
                <button
                  type="button"
                  role="tab"
                  aria-selected={activeCategory === "all"}
                  onClick={() => setActiveCategory("all")}
                  className={`eyebrow min-h-11 border px-4 transition-colors duration-200 ${
                    activeCategory === "all"
                      ? "border-ink bg-ink text-cream"
                      : "border-ink/40 bg-transparent text-ink hover:border-ink hover:bg-sand"
                  }`}
                >
                  All
                </button>
                {menu.map((cat) => {
                  const active = activeCategory === cat.id;
                  return (
                    <button
                      key={cat.id}
                      type="button"
                      role="tab"
                      aria-selected={active}
                      onClick={() => setActiveCategory(cat.id)}
                      className={`eyebrow min-h-11 border px-4 transition-colors duration-200 ${
                        active
                          ? "border-ink bg-ink text-cream"
                          : "border-ink/40 bg-transparent text-ink hover:border-ink hover:bg-sand"
                      }`}
                    >
                      {cat.title}
                    </button>
                  );
                })}
              </div>

              {/* Search + Grid/List toggle */}
              <div className="flex flex-wrap items-center gap-3">
                <div className="relative min-w-[220px] flex-1 sm:w-64 sm:flex-none">
                  <Search
                    className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-2"
                    aria-hidden="true"
                  />
                  <input
                    type="search"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search menu..."
                    aria-label="Search menu items"
                    className="min-h-11 w-full border border-ink/40 bg-transparent pl-10 pr-9 text-sm text-ink placeholder:text-ink-2 focus:border-ink focus:outline-none"
                  />
                  {query && (
                    <button
                      type="button"
                      onClick={() => setQuery("")}
                      aria-label="Clear search"
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 text-ink-2 hover:text-ink"
                    >
                      <X className="h-4 w-4" aria-hidden="true" />
                    </button>
                  )}
                </div>

                <div
                  className="inline-flex border border-ink"
                  role="group"
                  aria-label="Menu view mode"
                >
                  <button
                    type="button"
                    aria-pressed={view === "grid"}
                    onClick={() => setView("grid")}
                    className={`eyebrow inline-flex min-h-11 items-center gap-2 px-4 transition-colors duration-200 ${
                      view === "grid"
                        ? "bg-ink text-cream"
                        : "bg-transparent text-ink hover:bg-sand"
                    }`}
                  >
                    <LayoutGrid className="h-4 w-4" aria-hidden="true" />
                    <span>Grid</span>
                  </button>
                  <button
                    type="button"
                    aria-pressed={view === "list"}
                    onClick={() => setView("list")}
                    className={`eyebrow inline-flex min-h-11 items-center gap-2 border-l border-ink px-4 transition-colors duration-200 ${
                      view === "list"
                        ? "bg-ink text-cream"
                        : "bg-transparent text-ink hover:bg-sand"
                    }`}
                  >
                    <List className="h-4 w-4" aria-hidden="true" />
                    <span>List</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Results */}
          {visibleCategories.length === 0 ? (
            <div className="border border-ink/30 bg-sand/50 px-6 py-14 text-center">
              <p className="font-display text-2xl font-bold">No items match &ldquo;{query}&rdquo;</p>
              <p className="mt-2 text-ink-2">Try another keyword or clear your filters to see the full menu.</p>
              <button
                type="button"
                onClick={() => {
                  setQuery("");
                  setActiveCategory("all");
                }}
                className="eyebrow mt-6 inline-flex min-h-11 items-center border border-ink px-5 transition-colors hover:bg-ink hover:text-cream"
              >
                Reset filters
              </button>
            </div>
          ) : (
            <div className="space-y-16 md:space-y-24">
              {visibleCategories.map((cat) => (
                <section key={cat.id} aria-labelledby={`cat-heading-${cat.id}`}>
                  {/* Category heading row */}
                  <div className="mb-8 flex flex-col gap-3 border-b border-ink pb-5 md:flex-row md:items-end md:justify-between">
                    <div>
                      <h2
                        id={`cat-heading-${cat.id}`}
                        className="font-display text-[clamp(2.5rem,6vw,5rem)] font-bold leading-[0.9] tracking-[-0.04em]"
                      >
                        {cat.title}
                      </h2>
                    </div>
                    <div className="flex items-baseline justify-between gap-6 md:justify-end">
                      <p className="text-ink-2">{cat.blurb}</p>
                      <span className="eyebrow font-num shrink-0 text-ink-2">
                        {cat.items.length} {cat.items.length === 1 ? "item" : "items"}
                      </span>
                    </div>
                  </div>

                  {view === "grid" ? (
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-12">
                      {/* Featured category image card */}
                      <div className="lg:col-span-4">
                        <div className="h-full border border-ink/25 bg-sand/40 p-3">
                          <ImageSlot
                            src={images[cat.imageKey] ?? null}
                            alt={`${cat.title} at Cortex Cooks`}
                            aspect="4 / 3"
                            label={`IMAGE · ${cat.title.toUpperCase()}`}
                            brief={`See IMAGE_PROMPTS.md for the ${cat.title} prompt.`}
                            tone="light"
                            sizes="(min-width: 1024px) 32vw, (min-width: 768px) 50vw, 100vw"
                          />
                        </div>
                      </div>

                      {/* Item cards grid */}
                      <ul className="grid gap-4 sm:grid-cols-2 lg:col-span-8">
                        {cat.items.map((item) => {
                          const qty = cart[item.id] ?? 0;
                          return (
                            <li
                              key={item.id}
                              className="flex flex-col justify-between gap-6 border border-ink/30 bg-surface/60 p-5 transition-colors duration-200 hover:border-ink"
                            >
                              <div>
                                <div className="flex items-start justify-between gap-4">
                                  <h3 className="font-display text-xl font-semibold leading-tight md:text-2xl">
                                    {item.name}
                                  </h3>
                                  <span className="font-num eyebrow shrink-0 pt-1 text-ink">
                                    {item.price === null
                                      ? "Price TBC"
                                      : `${site.currency}${item.price.toLocaleString("en-NG")}`}
                                  </span>
                                </div>
                                <p className="mt-2 text-sm text-ink-2">{item.note}</p>
                              </div>

                              <div className="flex items-center justify-between border-t border-line pt-4">
                                <span className="eyebrow text-ink-2">{cat.title}</span>
                                {qty === 0 ? (
                                  <button
                                    type="button"
                                    onClick={() => add(item.id)}
                                    aria-label={`Add ${item.name} to order`}
                                    className="eyebrow min-h-11 min-w-24 border border-ink px-4 transition-colors duration-200 hover:bg-ink hover:text-cream"
                                  >
                                    Add
                                  </button>
                                ) : (
                                  <div
                                    className="flex items-center"
                                    role="group"
                                    aria-label={`${item.name} quantity`}
                                  >
                                    <button
                                      type="button"
                                      onClick={() => remove(item.id)}
                                      aria-label={`Remove one ${item.name}`}
                                      className="min-h-11 min-w-11 border border-ink text-xl leading-none transition-colors hover:bg-sand"
                                    >
                                      −
                                    </button>
                                    <span
                                      className="font-num min-w-10 text-center font-semibold"
                                      aria-live="polite"
                                    >
                                      {qty}
                                    </span>
                                    <button
                                      type="button"
                                      onClick={() => add(item.id)}
                                      aria-label={`Add one more ${item.name}`}
                                      className="min-h-11 min-w-11 bg-ink text-xl leading-none text-cream transition-colors hover:bg-ember-deep"
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
                    </div>
                  ) : (
                    <div className="grid gap-8 lg:grid-cols-12 lg:gap-12">
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
                                  <div
                                    className="flex items-center"
                                    role="group"
                                    aria-label={`${item.name} quantity`}
                                  >
                                    <button
                                      type="button"
                                      onClick={() => remove(item.id)}
                                      aria-label={`Remove one ${item.name}`}
                                      className="min-h-11 min-w-11 border border-ink text-xl leading-none"
                                    >
                                      −
                                    </button>
                                    <span
                                      className="font-num min-w-10 text-center font-semibold"
                                      aria-live="polite"
                                    >
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
                  )}
                </section>
              ))}
            </div>
          )}

          {totalShownItems > 0 && (
            <p className="eyebrow mt-14 border-t border-ink/20 pt-6 text-ink-2">
              Showing {totalShownItems} {totalShownItems === 1 ? "item" : "items"}
            </p>
          )}
        </div>
      </section>
    </ClickSpark>
  );
}
