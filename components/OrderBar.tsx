"use client";

import { useOrder } from "@/lib/order";

export function OrderBar() {
  const { count, link, clear } = useOrder();

  return (
    <div role="status" aria-live="polite">
      {count > 0 && (
        <div className="order-bar on-dark fixed inset-x-0 bottom-0 z-40 bg-ink text-cream">
          <div className="mx-auto flex max-w-[1440px] flex-wrap items-center justify-between gap-3 px-[var(--gutter)] py-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
            <p className="font-display text-lg font-semibold">
              <span className="font-num">{count}</span> {count === 1 ? "item" : "items"} in your order
            </p>
            <div className="flex items-center gap-3">
              <button type="button" onClick={clear} className="eyebrow min-h-11 px-3 underline underline-offset-4">
                Clear
              </button>
              <a
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="eyebrow inline-flex min-h-12 items-center bg-ember-deep px-6 text-cream transition-colors duration-200 hover:bg-cream hover:text-ink"
              >
                Send order on WhatsApp
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
