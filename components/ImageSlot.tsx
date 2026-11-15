"use client";

import Image from "next/image";
import { useState } from "react";

/**
 * Shows the real photo when a file exists in /public/images, otherwise a clearly labelled
 * placeholder. Reserves its aspect ratio so nothing shifts, and shows a skeleton until decode.
 */
export function ImageSlot({
  src,
  alt,
  aspect,
  label,
  brief,
  priority = false,
  sizes = "(min-width: 1024px) 40vw, 100vw",
  objectPosition = "50% 50%",
  tone = "dark",
  parallax = false,
  fill = false,
  className = "",
}: {
  src: string | null;
  alt: string;
  aspect: string; // e.g. "4 / 5"
  label: string; // e.g. "IMAGE 2"
  brief: string; // short note shown on the placeholder
  priority?: boolean;
  sizes?: string;
  objectPosition?: string;
  tone?: "dark" | "light";
  parallax?: boolean;
  /** Fill the parent (absolute, full size) instead of using the aspect ratio. */
  fill?: boolean;
  className?: string;
}) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div
      className={`w-full overflow-hidden ${fill ? "absolute inset-0 h-full" : "relative"} ${className}`}
      style={fill ? undefined : { aspectRatio: aspect }}
      aria-busy={src ? !loaded : undefined}
    >
      {src ? (
        <>
          {!loaded && <div aria-hidden="true" className="skeleton absolute inset-0" />}
          <div
            data-parallax={parallax ? "" : undefined}
            className="absolute inset-0 scale-[1.14]"
          >
            <Image
              src={src}
              alt={alt}
              fill
              sizes={sizes}
              priority={priority}
              style={{ objectFit: "cover", objectPosition }}
              onLoad={() => setLoaded(true)}
            />
          </div>
        </>
      ) : (
        <div
          role="img"
          aria-label={`Placeholder: ${alt}`}
          className={`absolute inset-0 flex flex-col justify-end p-4 ${
            tone === "dark" ? "grill-bars text-cream" : "grill-bars-light text-ink"
          }`}
        >
          <span
            className={`eyebrow inline-block w-fit px-2 py-1 ${
              tone === "dark" ? "bg-ink text-cream" : "bg-cream text-ink"
            }`}
          >
            {label}: add photo
          </span>
          <span
            className={`mt-1 inline-block w-fit max-w-[28ch] px-2 py-1 text-xs leading-snug ${
              tone === "dark" ? "bg-ink text-cream" : "bg-cream text-ink"
            }`}
          >
            {brief}
          </span>
        </div>
      )}
    </div>
  );
}
