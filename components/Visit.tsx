import { site, whatsappLink } from "@/lib/site.config";
import { Split } from "./Split";
import { MagneticLink } from "./MagneticLink";

function Row({ label, value, href }: { label: string; value: string; href?: string }) {
  return (
    <div className="grid gap-1 border-t border-cream/30 py-5 sm:grid-cols-[10rem_1fr] sm:gap-6">
      <dt className="eyebrow text-cream/70">{label}</dt>
      <dd className="m-0 text-lg">
        {value ? (
          href ? (
            <a href={href} className="underline underline-offset-4">
              {value}
            </a>
          ) : (
            value
          )
        ) : (
          <span className="text-cream/70">To be added</span>
        )}
      </dd>
    </div>
  );
}

export function Visit() {
  return (
    <section
      id="visit"
      className="on-dark bg-forest px-[var(--gutter)] py-[var(--section-pad)] text-cream"
    >
      <div className="mx-auto grid max-w-[1440px] gap-14 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <p className="eyebrow mb-8 text-cream/70">03 / Visit</p>
          <h2 className="display-section text-[clamp(3.25rem,11vw,11rem)]">
            <Split text="Come" />
            <Split text="hungry." className="serif-italic" />
          </h2>
        </div>

        <div className="self-end lg:col-span-5">
          <dl data-reveal="" className="m-0">
            <Row label="Address" value={site.address} href={site.mapsUrl || undefined} />
            <Row label="Hours" value={site.hours} />
            <Row label="Phone" value={site.phone} href={site.phone ? `tel:${site.phone.replace(/\s/g, "")}` : undefined} />
            <Row
              label="Instagram"
              value={site.instagram ? `@${site.instagram}` : ""}
              href={site.instagram ? `https://instagram.com/${site.instagram}` : undefined}
            />
            <div className="border-t border-cream/30" />
          </dl>
          <MagneticLink
            href={whatsappLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="eyebrow mt-10 inline-flex min-h-14 items-center bg-cream px-7 text-forest transition-colors duration-200 hover:bg-ink hover:text-cream"
          >
            Order on WhatsApp
          </MagneticLink>
        </div>
      </div>
    </section>
  );
}
