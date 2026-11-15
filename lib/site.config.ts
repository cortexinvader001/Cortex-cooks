/**
 * EDIT THIS FILE to change the business details, menu and prices.
 * Anything left empty shows as "To be added" on the site.
 */

export const site = {
  name: "Cortex Cooks",
  // Digits only, with country code, e.g. "2348012345678". Empty = WhatsApp opens a contact picker.
  whatsappNumber: "",
  address: "", // e.g. "12 Example Road, Warri, Delta"
  hours: "", // e.g. "Mon–Sun, 12pm – 11pm"
  phone: "",
  instagram: "", // handle without @, e.g. "cortexcooks"
  mapsUrl: "", // Google Maps share link
  currency: "₦",
};

export type MenuItem = {
  id: string;
  name: string;
  note: string;
  /** Number in naira, or null while the price is not decided. */
  price: number | null;
};

export type MenuCategory = {
  id: string;
  title: string;
  blurb: string;
  imageKey: string;
  items: MenuItem[];
};

/**
 * SAMPLE MENU. Item names and notes are placeholders to show the layout.
 * Replace with the real menu and prices.
 */
export const menu: MenuCategory[] = [
  {
    id: "grill",
    title: "Grill",
    blurb: "Fire-cooked, served hot.",
    imageKey: "grill",
    items: [
      { id: "g1", name: "Sample grill plate 1", note: "Short description goes here", price: null },
      { id: "g2", name: "Sample grill plate 2", note: "Short description goes here", price: null },
      { id: "g3", name: "Sample grill plate 3", note: "Short description goes here", price: null },
    ],
  },
  {
    id: "fries",
    title: "Fries",
    blurb: "Crisp outside, soft inside.",
    imageKey: "fries",
    items: [
      { id: "f1", name: "Sample fries 1", note: "Short description goes here", price: null },
      { id: "f2", name: "Sample fries 2", note: "Short description goes here", price: null },
    ],
  },
  {
    id: "chicken",
    title: "Chicken",
    blurb: "The one everyone orders twice.",
    imageKey: "chicken",
    items: [
      { id: "c1", name: "Sample chicken 1", note: "Short description goes here", price: null },
      { id: "c2", name: "Sample chicken 2", note: "Short description goes here", price: null },
      { id: "c3", name: "Sample chicken 3", note: "Short description goes here", price: null },
    ],
  },
  {
    id: "cocktails",
    title: "Cocktails",
    blurb: "Shaken, stirred, never rushed.",
    imageKey: "cocktails",
    items: [
      { id: "k1", name: "Sample cocktail 1", note: "Short description goes here", price: null },
      { id: "k2", name: "Sample cocktail 2", note: "Short description goes here", price: null },
    ],
  },
  {
    id: "smoothies",
    title: "Smoothies",
    blurb: "Cold, fresh, blended to order.",
    imageKey: "smoothies",
    items: [
      { id: "s1", name: "Sample smoothie 1", note: "Short description goes here", price: null },
      { id: "s2", name: "Sample smoothie 2", note: "Short description goes here", price: null },
    ],
  },
];

export function whatsappLink(lines?: string[]) {
  const base = site.whatsappNumber
    ? `https://wa.me/${site.whatsappNumber}`
    : "https://wa.me/";
  const text = lines && lines.length
    ? lines.join("\n")
    : `Hello ${site.name}, I'd like to place an order.`;
  return `${base}?text=${encodeURIComponent(text)}`;
}
