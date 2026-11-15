"use client";

import { createContext, useCallback, useContext, useMemo, useState } from "react";
import { menu, site, whatsappLink } from "./site.config";

type Cart = Record<string, number>;

type OrderCtx = {
  cart: Cart;
  count: number;
  add: (id: string) => void;
  remove: (id: string) => void;
  clear: () => void;
  link: string;
};

const Ctx = createContext<OrderCtx | null>(null);

export function OrderProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<Cart>({});

  const add = useCallback(
    (id: string) => setCart((c) => ({ ...c, [id]: (c[id] ?? 0) + 1 })),
    [],
  );
  const remove = useCallback(
    (id: string) =>
      setCart((c) => {
        const next = { ...c };
        if ((next[id] ?? 0) <= 1) delete next[id];
        else next[id] -= 1;
        return next;
      }),
    [],
  );
  const clear = useCallback(() => setCart({}), []);

  const value = useMemo<OrderCtx>(() => {
    const all = menu.flatMap((cat) => cat.items);
    const lines: string[] = [];
    let count = 0;
    let total = 0;
    let totalKnown = true;
    for (const item of all) {
      const qty = cart[item.id];
      if (!qty) continue;
      count += qty;
      lines.push(`${qty} x ${item.name}`);
      if (item.price === null) totalKnown = false;
      else total += item.price * qty;
    }
    const message = count
      ? [
          `Hello ${site.name}, I'd like to order:`,
          "",
          ...lines,
          "",
          ...(totalKnown ? [`Total: ${site.currency}${total.toLocaleString("en-NG")}`, ""] : []),
          "Name:",
          "Delivery address / pickup:",
        ]
      : undefined;
    return { cart, count, add, remove, clear, link: whatsappLink(message) };
  }, [cart, add, remove, clear]);

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useOrder() {
  const v = useContext(Ctx);
  if (!v) throw new Error("useOrder must be used inside OrderProvider");
  return v;
}
