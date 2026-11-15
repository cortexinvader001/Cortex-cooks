import { site } from "@/lib/site.config";

export function Footer() {
  return (
    <footer className="px-[var(--gutter)] py-10">
      <div className="mx-auto flex max-w-[1440px] flex-col gap-3 text-sm text-ink-2 md:flex-row md:items-center md:justify-between">
        <p>
          © {new Date().getFullYear()} {site.name}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
