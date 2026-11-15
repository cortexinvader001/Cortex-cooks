import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { whatsappLink } from "@/lib/site.config";
import { ImageSlot } from "./ImageSlot";
import { MagneticLink } from "./MagneticLink";
import { Split } from "./Split";
import ScrollReveal from "./reactbits/ScrollReveal/ScrollReveal";

export function StorySection({ images }: { images: Record<string, string | null> }) {
  return (
    <>
      {/* Hero */}
      <section className="px-[var(--gutter)] pb-14 pt-28 md:pb-20 md:pt-36">
        <div className="mx-auto max-w-[1440px]">
          <div data-exit="" className="grid gap-6 lg:grid-cols-12">
            <p className="eyebrow text-ink-2 lg:col-span-12">Our Story</p>
            <h1 className="display-section text-[clamp(3.25rem,9vw,8.5rem)] lg:col-span-8">
              <Split text="Think first." />
              <Split text="Serve it hot." className="serif-italic text-ember" />
            </h1>
            <p data-reveal="" className="max-w-[36ch] self-end text-ink-2 lg:col-span-4">
              Cortex Cooks is built on intentional cooking, honest fire, and drinks poured cold right next to the grill.
            </p>
          </div>
        </div>
      </section>

      {/* Dark statement + single short story */}
      <section className="on-dark bg-ink px-[var(--gutter)] py-[var(--section-pad)] text-cream">
        <div className="mx-auto max-w-[1440px]">
          <p className="eyebrow mb-8 text-cream/70">The Idea</p>
          <ScrollReveal
            baseOpacity={0.14}
            enableBlur
            baseRotation={1.5}
            blurStrength={5}
            containerClassName="max-w-5xl"
            textClassName="font-display text-[clamp(2rem,5.5vw,5.25rem)] font-bold leading-[1.02] tracking-[-0.03em] text-cream"
          >
            Good food is never an accident: think first, cook with purpose, and serve it hot.
          </ScrollReveal>

          <div
            data-reveal=""
            className="mt-16 grid gap-10 border-t border-cream/20 pt-14 lg:grid-cols-12 lg:items-center md:mt-20 md:pt-16"
          >
            <div className="space-y-6 text-lg leading-relaxed text-cream/85 lg:col-span-6">
              <p className="max-w-[48ch]">
                Every plate at Cortex Cooks starts with a plan before the coals are lit. Cuts are trimmed and marinated early, sauces are balanced fresh each morning, and every pairing from smoky grill plates to bright drinks is built to work together.
              </p>
              <p className="max-w-[48ch]">
                Once service begins, it comes down to heat and timing. Chicken is cooked for crunch outside and juice within, fries are pulled crisp to order, and open flame gives the grill its char without rushing the middle.
              </p>
              <p className="max-w-[48ch]">
                Food leaves the pass hot and fast, alongside shaken cocktails and fresh smoothies blended cold all day.
              </p>
            </div>

            <div className="lg:col-span-6">
              <div className="border border-cream/20 bg-ink p-3">
                <ImageSlot
                  src={images.grill ?? null}
                  alt="From the grill at Cortex Cooks"
                  aspect="4 / 3"
                  label="STORY · THE GRILL"
                  brief="Fire-cooked grill plates, chicken, fries, and cold drinks."
                  tone="dark"
                  sizes="(min-width: 1024px) 45vw, 100vw"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="on-dark bg-forest px-[var(--gutter)] py-[var(--section-pad)] text-cream">
        <div className="mx-auto flex max-w-[1440px] flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="eyebrow mb-6 text-cream/75">Ready to order</p>
            <h2 className="display-section text-[clamp(3rem,9vw,7.5rem)]">
              <Split text="Taste the" />
              <Split text="work." className="serif-italic" />
            </h2>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <Link
              href="/menu"
              className="eyebrow inline-flex min-h-14 items-center gap-2 bg-cream px-7 text-forest transition-colors duration-200 hover:bg-ink hover:text-cream"
            >
              <span>Explore Full Menu</span>
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <MagneticLink
              href={whatsappLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="eyebrow inline-flex min-h-14 items-center bg-ember-deep px-7 text-cream transition-colors duration-200 hover:bg-cream hover:text-ink"
            >
              Order on WhatsApp
            </MagneticLink>
          </div>
        </div>
      </section>
    </>
  );
}
