import ScrollReveal from "./reactbits/ScrollReveal/ScrollReveal";
import ScrollStack, { ScrollStackItem } from "./reactbits/ScrollStack/ScrollStack";

const beats = [
  { title: "Think", line: "Every plate starts with a plan.", bg: "#B8431E", fg: "#F4EFE6" },
  { title: "Cook", line: "Heat and timing, done on purpose.", bg: "#2F4B3A", fg: "#F4EFE6" },
  { title: "Serve", line: "Hot, fast, and worth the wait.", bg: "#F4EFE6", fg: "#1A1714" },
];

/**
 * The story: a statement that fades and blurs in word by word (React Bits ScrollReveal),
 * then three cards that stack as you scroll (React Bits ScrollStack).
 */
export function Method() {
  return (
    <section
      id="story"
      className="on-dark bg-ink px-[var(--gutter)] pt-[var(--section-pad)] text-cream"
    >
      <div className="mx-auto max-w-[1440px]">
        <p className="eyebrow mb-10 text-cream/70">The Idea</p>
        <ScrollReveal
          baseOpacity={0.12}
          enableBlur
          baseRotation={2}
          blurStrength={6}
          containerClassName="max-w-5xl"
          textClassName="font-display text-[clamp(2.25rem,6.2vw,6.5rem)] font-bold leading-[0.98] tracking-[-0.035em] text-cream"
        >
          Cortex Cooks runs on one idea: think first, cook second, serve it hot.
        </ScrollReveal>

        <div className="mt-20 md:mt-32">
          <ScrollStack
            useWindowScroll
            smoothScroll={false}
            snap={false}
            stackPosition="18%"
            itemDistance={60}
            itemStackDistance={28}
            baseScale={0.86}
            itemScale={0.04}
            dimAmount={0.12}
            holdDistance={160}
          >
            {beats.map((b) => (
              <ScrollStackItem
                key={b.title}
                style={{
                  background: b.bg,
                  color: b.fg,
                  borderRadius: 0,
                  height: "min(62vh, 26rem)",
                  padding: "clamp(1.5rem, 4vw, 3.5rem)",
                }}
              >
                <div className="flex h-full flex-col justify-end">
                  <div>
                    <p className="serif-italic text-[clamp(4rem,13vw,11rem)] leading-[0.85]">{b.title}</p>
                    <p className="mt-4 max-w-[28ch] text-lg">{b.line}</p>
                  </div>
                </div>
              </ScrollStackItem>
            ))}
          </ScrollStack>
        </div>
      </div>
    </section>
  );
}
