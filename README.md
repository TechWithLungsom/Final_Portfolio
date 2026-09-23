# Lungsom Lamnio — Refined Portfolio

React 19, TypeScript and Vite portfolio following Portfolio Design.pdf and Design.pdf. Includes a shrinking glass navigation bar, pixel portrait flip badge, four floating 3D shapes, reversible scroll-driven word highlighting, sticky experience dates, pausing skill tickers, clickable project hover previews and minimal contact section.

## Run locally

```sh
npm ci
npm run dev
npm run build
```

Production files are generated in `dist/`. Vercel configuration is included.

## Customization

- `src/App.tsx`: content, booking destination, social links, project links and dates.
- `src/styles.css`: colors, typography, responsive layout and reduced-motion styles.
- `src/components/SpatialScene.tsx`: lazy-loaded React Three Fiber scene with pointer response and WebGL fallback.
- `src/components/PortfolioMotion.tsx`: skills ticker, cursor and illustrated project previews.
- `public/`: portrait and a white circular SVG favicon; older milestone images remain unused.

The booking URL, social URLs and project destinations remain sample links as requested. Project years are placeholders. Experience start dates come from the supplied TSX reference. Project preview artwork is illustrative rather than a live product screenshot.

The site supports keyboard navigation, light/dark themes, touch navigation and system reduced-motion preferences. Theme selection is saved locally. Earlier components and PreviousEdition.tsx are retained for reference; App.tsx is the active entry point.

No external account integration is required for local preview. Scheduling opens the sample Topmate destination; it does not book an appointment.

The latest revision removes Milestones, enlarges the transparent flip badge and cursor, widens the layout, and uses one social dock that moves from the hero to the viewport bottom. Free native scrolling supports wheel, touch and keyboard input, allowing stops anywhere between sections. The cursor uses a light, fast spring and follows pointer coordinates directly. Reduced-motion mode reveals all About words and uses the native cursor.

Design (1).pdf update: larger responsive typography and section spacing, overlapping reversible word-opacity fades, a stable wrapper to fade lazy-loaded 3D shapes, and an immediate cursor dot with a lightly trailing spring ring. Free scrolling is preserved.

Startup loader: inline yellow cube animation appears before React starts. It waits for the portrait, fonts and 3D module, with a 4.5-second maximum asset wait and a 750ms exit fade. Reduced-motion users skip the decorative delay and animation. Social links include circular hover effects and LeetCode.

Reload sequence: the loader stays visible for at least three seconds (except reduced-motion mode), followed by a 1.4-second page fade. About words lift six pixels individually in non-overlapping scroll-driven steps, with their brightness following the lift.

Latest design revision: new supplied portrait and favicon, filled LinkedIn mark, smaller social controls, clearer glass navbar, saturated gold accents, hover-only gold experience titles in light mode, gold terminal borders, and clickable/keyboard-accessible 3D rotation and color cycling.
