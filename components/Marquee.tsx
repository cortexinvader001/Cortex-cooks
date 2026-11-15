import ScrollVelocity from "./reactbits/ScrollVelocity/ScrollVelocity";

/** Decorative ticker built on the React Bits ScrollVelocity component. Hidden from screen readers. */
export function Marquee() {
  return (
    <div aria-hidden="true" className="on-dark bg-ember-deep py-5 text-cream md:py-7">
      <ScrollVelocity
        texts={["Grill  Fries  Chicken  Cocktails  Smoothies"]}
        velocity={70}
        numCopies={6}
        separator="/"
        gap={48}
        fontSize="clamp(2.25rem, 6vw, 5rem)"
        fontWeight={700}
        scrollerStyle={{ fontFamily: "var(--font-display)", textTransform: "uppercase", letterSpacing: "-0.03em" }}
      />
    </div>
  );
}
