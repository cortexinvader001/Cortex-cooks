# Cortex Cooks website

Next.js (App Router), TypeScript, Tailwind CSS, GSAP + ScrollTrigger, Lenis smooth scroll, and one React Bits component (the marquee).

## Run it

```bash
npm install
npm run dev      # http://localhost:3000
npm run build && npm start   # production
```

## Edit your details

Everything the business owner needs to change is in **`lib/site.config.ts`**:

- `whatsappNumber`: digits only with country code, for example `2348012345678`. Until it is set, the order buttons open WhatsApp with a contact picker.
- `address`, `hours`, `phone`, `instagram`, `mapsUrl`: empty values show "To be added" on the page.
- `menu`: categories, items and prices. Items are **samples**. Set `price` to a number in naira, or leave it `null` to show "Price TBC".

## Add photos

See `IMAGE_PROMPTS.md`. Save files into `public/images/` as `hero`, `grill`, `fries`, `chicken`, `cocktails`, `smoothies`
(`.jpg`, `.webp`, `.avif` or `.png`). They replace the placeholders automatically.

## How ordering works

Visitors add items on the menu, then tap **Send order on WhatsApp**. The site opens WhatsApp with the order already written out,
including a total when every chosen item has a price. There is no payment or server involved.

## Credits and licenses

- **React Bits** by David Haz (https://github.com/DavidHDev/react-bits), in `components/reactbits/`:
  `ScrollVelocity` (ticker), `CircularText` (hero badge), `ClickSpark` (menu), `ScrollExpand` (grill showcase),
  `ScrollReveal` and `ScrollStack` (story section).
  License: MIT + Commons Clause (see `REACTBITS_LICENSE.md`). Fine for this website. It may **not** be resold or redistributed as part of a template, kit or component pack.
- Fonts: Space Grotesk, Inter and Instrument Serif via Fontsource (SIL Open Font License).
- Photos: six images supplied by the owner (`public/images/`). If any came from a stock site, add its source and license here.
