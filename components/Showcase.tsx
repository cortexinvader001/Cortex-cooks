import ScrollExpand from "./reactbits/ScrollExpand/ScrollExpand";
import { MagneticLink } from "./MagneticLink";
import { whatsappLink } from "@/lib/site.config";

/**
 * Scroll moment between the menu and the story: a framed photo grows to full screen,
 * then the copy and button fade in over it. React Bits ScrollExpand, driven by page scroll.
 */
export function Showcase({ image }: { image: string | null }) {
  if (!image) return null;

  return (
    <section aria-label="From the grill" className="on-dark bg-ink">
      <ScrollExpand
        useWindowScroll
        src={image}
        alt="A wooden board of grilled meats with herbs, lemon and sauces"
        title="Fire. Salt. Smoke."
        scrollHint="Keep scrolling"
        startWidth={44}
        startHeight={56}
        startRadius={0}
        mediaZoom={1.3}
        scrollDistance={1.1}
        holdDistance={0.4}
        overlayScrim={0.55}
        className="font-display"
      >
        <p className="eyebrow mb-4 text-cream/85">The Grill</p>
        <p className="font-display max-w-[16ch] text-[clamp(2.25rem,6vw,5.5rem)] font-bold leading-[0.95] tracking-[-0.03em] text-cream">
          Hungry yet?
        </p>
        <MagneticLink
          href={whatsappLink()}
          target="_blank"
          rel="noopener noreferrer"
          className="eyebrow mt-8 inline-flex min-h-14 items-center bg-ember-deep px-7 text-cream transition-colors duration-200 hover:bg-cream hover:text-ink"
        >
          Order on WhatsApp
        </MagneticLink>
      </ScrollExpand>
    </section>
  );
}
