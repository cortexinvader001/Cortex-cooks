import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Split } from "./Split";

const destinations = [
  {
    href: "/menu",
    eyebrow: "Menu",
    title: "Pick your fire",
    description: "Browse grill plates, fries, chicken, cocktails, and smoothies and build your WhatsApp order.",
  },
  {
    href: "/story",
    eyebrow: "Story",
    title: "Think, cook, serve",
    description: "See the method behind every plate — how we prep, fire, and get food out hot.",
  },
  {
    href: "/contact",
    eyebrow: "Contact",
    title: "Find us & reach out",
    description: "Check opening hours, open directions on Google Maps, call, or send a quick message.",
  },
];

export function HomeExplore() {
  return (
    <section className="px-[var(--gutter)] py-[var(--section-pad)]">
      <div className="mx-auto max-w-[1440px]">
        <div className="mb-12 grid gap-6 md:mb-16 lg:grid-cols-12">
          <p className="eyebrow text-ink-2 lg:col-span-12">Explore</p>
          <h2 className="display-section text-[clamp(2.75rem,7vw,6.5rem)] lg:col-span-8">
            <Split text="More from" />
            <Split text="the kitchen." className="serif-italic text-ember" />
          </h2>
          <p data-reveal="" className="max-w-[34ch] self-end text-ink-2 lg:col-span-4">
            Jump straight to the full menu, read how we cook, or open our contact and directions page.
          </p>
        </div>

        <ul className="border-t border-ink">
          {destinations.map((item) => (
            <li key={item.href} data-reveal="" className="border-b border-ink">
              <Link
                href={item.href}
                className="group grid items-center gap-4 py-7 transition-colors md:grid-cols-12 md:gap-8 md:py-10"
              >
                <span className="eyebrow text-ink-2 md:col-span-2">{item.eyebrow}</span>
                <span className="font-display text-[clamp(2rem,5vw,4.5rem)] font-bold leading-[0.95] tracking-[-0.03em] transition-transform duration-500 group-hover:translate-x-2 group-hover:text-ember-deep md:col-span-5">
                  {item.title}
                </span>
                <span className="text-ink-2 md:col-span-4">{item.description}</span>
                <span className="flex justify-start md:col-span-1 md:justify-end">
                  <ArrowUpRight
                    aria-hidden="true"
                    className="h-7 w-7 transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-ember-deep"
                  />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
