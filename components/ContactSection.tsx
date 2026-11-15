"use client";

import { HugeiconsIcon } from "@hugeicons/react";
import {
  FacebookIcon,
  InstagramIcon,
  NewTwitterIcon,
  TiktokIcon,
  WhatsappIcon,
} from "@hugeicons/core-free-icons";
import { ArrowUpRight, MapPin } from "lucide-react";
import { site, whatsappLink } from "@/lib/site.config";
import { Split } from "./Split";
import { MagneticLink } from "./MagneticLink";

const SOCIALS = [
  { name: "Instagram", href: "https://www.instagram.com", icon: InstagramIcon },
  { name: "WhatsApp", href: "https://www.whatsapp.com", icon: WhatsappIcon },
  { name: "TikTok", href: "https://www.tiktok.com", icon: TiktokIcon },
  { name: "Facebook", href: "https://www.facebook.com", icon: FacebookIcon },
  { name: "X", href: "https://x.com", icon: NewTwitterIcon },
];

function DetailRow({ label, value, href }: { label: string; value: string; href?: string }) {
  return (
    <div className="grid gap-1 border-t border-cream/30 py-4 sm:grid-cols-[9rem_1fr] sm:gap-6">
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

export function ContactSection() {
  const mapQuery = encodeURIComponent(site.address || "United Kingdom");
  const embedSrc = `https://maps.google.com/maps?q=${mapQuery}&t=&z=6&ie=UTF8&iwloc=&output=embed`;
  const externalMapHref =
    site.mapsUrl || `https://www.google.com/maps/search/?api=1&query=${mapQuery}`;

  return (
    <>
      <section className="px-[var(--gutter)] pb-14 pt-28 md:pb-20 md:pt-36">
        <div className="mx-auto max-w-[1440px]">
          <div data-exit="" className="grid gap-6 lg:grid-cols-12">
            <p className="eyebrow text-ink-2 lg:col-span-12">Contact</p>
            <h1 className="display-section text-[clamp(3.25rem,9vw,8.5rem)] lg:col-span-8">
              <Split text="Get in" />
              <Split text="touch." className="serif-italic text-ember" />
            </h1>
            <p data-reveal="" className="max-w-[34ch] self-end text-ink-2 lg:col-span-4">
              Find us on the map, reach out directly, or connect on social media.
            </p>
          </div>
        </div>
      </section>

      <section className="on-dark bg-forest px-[var(--gutter)] py-[var(--section-pad)] text-cream">
        <div className="mx-auto grid max-w-[1440px] gap-12 lg:grid-cols-12 lg:items-start">
          {/* Google Map iframe */}
          <div data-reveal="" className="lg:col-span-7">
            <div className="overflow-hidden border border-cream/25 bg-ink">
              <iframe
                title="Cortex Cooks location on Google Maps"
                src={embedSrc}
                className="block h-[340px] w-full border-0 sm:h-[420px] lg:h-[460px]"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>
            <div className="mt-4 flex items-center justify-between gap-4">
              <span className="eyebrow inline-flex items-center gap-2 text-cream/75">
                <MapPin className="h-4 w-4 text-ember-light" aria-hidden="true" />
                {site.address || "United Kingdom"}
              </span>
              <a
                href={externalMapHref}
                target="_blank"
                rel="noopener noreferrer"
                className="eyebrow inline-flex items-center gap-1.5 border-b border-cream/60 pb-0.5 text-cream transition-colors hover:border-ember-light hover:text-ember-light"
              >
                Open in Google Maps
                <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
              </a>
            </div>
          </div>

          {/* Details + Social media buttons */}
          <div data-reveal="" className="flex flex-col gap-10 lg:col-span-5">
            <div>
              <dl className="m-0">
                <DetailRow
                  label="Address"
                  value={site.address || "United Kingdom"}
                  href={externalMapHref}
                />
                <DetailRow label="Hours" value={site.hours} />
                <DetailRow
                  label="Phone"
                  value={site.phone}
                  href={site.phone ? `tel:${site.phone.replace(/\s/g, "")}` : undefined}
                />
                <div className="border-t border-cream/30" />
              </dl>

              <MagneticLink
                href={whatsappLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="eyebrow mt-8 inline-flex min-h-14 items-center bg-cream px-7 text-forest transition-colors duration-200 hover:bg-ink hover:text-cream"
              >
                Order on WhatsApp
              </MagneticLink>
            </div>

            <div>
              <p className="eyebrow mb-4 text-cream/70">Follow us</p>
              <div className="flex flex-wrap gap-3">
                {SOCIALS.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.name}
                    className="eyebrow inline-flex min-h-12 items-center gap-2.5 border border-cream/35 px-4 text-cream transition-colors duration-200 hover:border-cream hover:bg-cream hover:text-forest"
                  >
                    <HugeiconsIcon icon={social.icon} size={18} strokeWidth={1.8} />
                    <span>{social.name}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
