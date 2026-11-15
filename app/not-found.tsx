import Link from "next/link";

export default function NotFound() {
  return (
    <main
      id="main"
      className="flex flex-col justify-between bg-ink px-[var(--gutter)] pb-12 pt-28 text-cream"
      style={{ minHeight: "calc(100svh - 5rem)" }}
    >
      <p className="eyebrow">Cortex Cooks / 404</p>
      <div>
        <h1 className="display-hero m-0 text-[clamp(5rem,26vw,24rem)]">404</h1>
        <p className="serif-italic mt-2 text-[clamp(2rem,6vw,5rem)] leading-none text-ember">
          This plate is off the menu.
        </p>
      </div>
      <Link
        href="/menu"
        className="eyebrow inline-flex min-h-14 w-fit items-center bg-cream px-7 text-ink transition-colors duration-200 hover:bg-ember-deep hover:text-cream"
      >
        Back to the menu
      </Link>
    </main>
  );
}
