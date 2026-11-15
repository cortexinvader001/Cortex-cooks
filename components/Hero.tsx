import { Split } from "./Split";
import { ImageSlot } from "./ImageSlot";
import { MagneticLink } from "./MagneticLink";
import CircularText from "./reactbits/CircularText/CircularText";
import { whatsappLink } from "@/lib/site.config";

export function Hero({ image }: { image: string | null }) {
  return (
    <section
      id="top"
      className="hero-img on-dark relative isolate flex flex-col overflow-hidden bg-ink text-cream"
      style={{ minHeight: "100svh" }}
    >
      {/* Full-bleed photo, revealed with a mask and drifting slightly on scroll (desktop) */}
      <div data-mask="" data-hero-mask="" className="absolute inset-0">
        <ImageSlot
          fill
          src={image}
          alt="Flames licking a charred skewer of grilled meat, with sparks and smoke"
          aspect="16 / 9"
          label="IMAGE 1 · HERO"
          brief="Grill hero shot. See IMAGE_PROMPTS.md, prompt 1."
          priority
          sizes="100vw"
          objectPosition="75% 55%"
          parallax
        />
      </div>

      {/* Legibility scrim: darkens the left (where the type sits) and the bottom (copy + buttons) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(90deg, rgba(14,11,9,0.8) 0%, rgba(14,11,9,0.5) 45%, rgba(14,11,9,0) 75%), linear-gradient(0deg, rgba(14,11,9,0.75) 0%, rgba(14,11,9,0) 42%), linear-gradient(180deg, rgba(14,11,9,0.5) 0%, rgba(14,11,9,0) 22%)",
        }}
      />

      <div
        data-hero-exit=""
        className="relative z-10 mx-auto flex w-full max-w-[1440px] flex-1 flex-col justify-between px-[var(--gutter)] pb-10 pt-24 md:pb-14"
      >
        <div>
          <div className="eyebrow flex flex-wrap justify-between gap-x-6 gap-y-1 text-cream/85">
            <span>Grill / Fries / Chicken / Cocktails / Smoothies</span>
          </div>

          <h1 aria-label="Cortex Cooks" className="m-0 mt-6 md:mt-10" style={{ textShadow: "0 2px 40px rgba(0,0,0,0.35)" }}>
            <Split hero text="CORTEX" className="display-hero" />
            <Split hero text="Cooks" className="display-hero hero-cooks serif-italic text-ember-light lg:ml-[3%]" />
          </h1>
        </div>

        <div className="mt-10 flex flex-wrap items-end justify-between gap-8">
          <div data-reveal="" className="max-w-[44ch]">
            <p className="text-lg leading-snug">
              Grill, fries, chicken, cocktails and smoothies. Pick what you like and order straight on WhatsApp.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-4">
              <MagneticLink
                href={whatsappLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="eyebrow inline-flex min-h-14 items-center bg-ember-deep px-7 text-cream transition-colors duration-200 hover:bg-cream hover:text-ink"
              >
                Order on WhatsApp
              </MagneticLink>
              <a href="#menu" className="eyebrow inline-flex min-h-11 items-center border-b border-cream">
                See the menu
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Spinning badge (React Bits CircularText) linking to the menu */}
      <a
        href="#menu"
        aria-label="Jump to the menu"
        className="absolute bottom-10 left-[40%] z-10 hidden rounded-full bg-ink/70 sm:block md:bottom-14 lg:left-[38%]"
      >
        <CircularText
          text="GRILL • FRIES • CHICKEN • COCKTAILS • SMOOTHIES • "
          size={150}
          fontSize={13}
          fontWeight={600}
          letterSpacing={2}
          color="#F4EFE6"
          spinDuration={22}
          onHover="slowDown"
        >
          <span aria-hidden="true" className="font-display text-3xl leading-none text-cream">
            ↓
          </span>
        </CircularText>
      </a>
    </section>
  );
}
