import type { ElementType } from "react";

/**
 * Splits text into masked characters for the rise-from-baseline reveal.
 * Screen readers get the full string via aria-label; the characters are hidden from them.
 */
export function Split({
  text,
  as: Tag = "span",
  className = "",
  charClassName = "",
  hero = false,
}: {
  text: string;
  as?: ElementType;
  className?: string;
  charClassName?: string;
  hero?: boolean;
}) {
  return (
    <Tag
      className={`split-line ${className}`}
      data-split=""
      {...(hero ? { "data-hero": "" } : {})}
      aria-label={text}
    >
      <span aria-hidden="true">
        {text.split("").map((c, i) => (
          <span key={i} className={`char ${charClassName}`}>
            {c === " " ? " " : c}
          </span>
        ))}
      </span>
    </Tag>
  );
}

/** Words for the scroll-scrubbed statement reveal. */
export function Words({ text, className = "" }: { text: string; className?: string }) {
  return (
    <p className={className} data-words="" aria-label={text}>
      <span aria-hidden="true">
        {text.split(" ").map((w, i) => (
          <span key={i} className="word inline-block">
            {w}&nbsp;
          </span>
        ))}
      </span>
    </p>
  );
}
