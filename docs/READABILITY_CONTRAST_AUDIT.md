# Speedy Type readability and contrast audit

## Scope inspected

The App Router source and shared shell were reviewed: `src/app/layout.js`, `providers.js`, `ThemeContext.js`, `globals.css`, `Header.js`, `Footer.js`, page components, and the 13 slugs in `src/app/data/articles.js`. The theme system adds one of 12 illustrated scene images behind the app and the shared header/footer use theme gradients. Most informational cards use nearly opaque white surfaces; several live app/game/theme views instead layer text directly over image or colorful scene backgrounds.

## Route-by-route findings before changes

| Route | Readability findings |
| --- | --- |
| `/` | Theme illustration sits behind transparent test/dashboard sections. Small helper labels and chart ticks use very light slate shades; body panels are largely white and readable. |
| `/typing-test` | Reuses home test dashboard and transparent content regions; muted labels and history/chart annotations are small over the theme scene. |
| `/typing-practice` | Main drill controls are in white panels. The live typing session shares the scene and small labels; inactive/current quote characters use low contrast slate gray. |
| `/typing-speed` | Informational cards are mostly white; shared theme background can show through between sections and text there relies on muted slate shades. |
| `/typing-accuracy` | Same informational layout/background exposure as typing speed; body copy uses readable slate shades, with muted metadata needing stronger contrast. |
| `/lessons` | Lesson thumbnails/video cards overlay text on imagery; surrounding view contains small muted labels and progress metadata. |
| `/games` | Game selection cards have image gradients; page title and introduction were transparent over the shared scene; in-game HUD has tiny slate labels. |
| `/themes` | Theme cards and preview panel place labels over illustrations; overview title and preview description can sit over imagery without a solid backing. |
| `/scores` | Transparent page title/description and score area expose scene art; chart labels and secondary score metadata use light slate gray. |
| `/settings` | Transparent settings surface over themed scene; compact helper descriptions and captions use light slate shades. |
| `/blog` | Featured article uses a dark gradient; article cards are white. Some metadata and date labels use slate-400, which is too faint at small sizes. |
| `/blog/how-to-increase-typing-speed` | Shared article template over theme background; content card is readable, but metadata and inline links need review on theme surfaces. |
| `/blog/what-is-a-good-typing-speed` | Same shared article template and theme background; small metadata is the main concern. |
| `/blog/wpm-explained` | Same shared article template and theme background; small metadata is the main concern. |
| `/blog/how-to-improve-typing-accuracy` | Same shared article template and theme background; small metadata is the main concern. |
| `/blog/touch-typing-for-beginners` | Same shared article template and theme background; small metadata is the main concern. |
| `/blog/type-faster-without-looking` | Same shared article template and theme background; small metadata is the main concern. |
| `/blog/daily-typing-exercises-for-beginners` | Same shared article template and theme background; small metadata is the main concern. |
| `/blog/qwerty-keyboard-guide` | Same shared article template and theme background; small metadata is the main concern. |
| `/blog/how-long-to-learn-touch-typing` | Same shared article template and theme background; small metadata is the main concern. |
| `/blog/common-typing-mistakes-to-avoid` | Same shared article template and theme background; small metadata is the main concern. |
| `/blog/average-typing-speed-by-age` | Same shared article template and theme background; small metadata is the main concern. |
| `/blog/wpm-vs-accuracy-what-matters-more` | Same shared article template and theme background; small metadata is the main concern. |
| `/blog/touch-typing-vs-hunt-and-peck` | Same shared article template and theme background; small metadata is the main concern. |
| `/about` | Gradient hero is light, with dark text; content cards are white. Muted founder and section descriptions use slate-500/600. |
| `/contact` | Page title and introduction were directly over the colorful theme scene, matching the reported unreadable paragraph; email panel, form, and cards are surfaced. Placeholder and disabled-form states used pale slate tones. |
| `/privacy-policy` | White legal content panels over theme scene; secondary list copy and metadata use slate-500/600. |
| `/terms` | White legal content panels over theme scene; secondary copy and metadata use slate-500/600. |
| `/disclaimer` | White legal content panels over theme scene; secondary list copy and metadata use slate-500/600. |
| Shared header/mobile menu | Theme gradient generally supports white navigation; inactive mobile utility links use white/70 and keyboard focus treatment is not explicitly styled consistently. |
| Shared footer | Theme-dark varies in luminance across worlds; footer links at white/75 and copyright at white/60 could fall short against brighter theme gradients. |
| Not found | Custom 404 heading, description, and actions were transparent over the shared theme scene. |

## Responsive and accessibility review notes

The shared visual risks are small low-contrast labels, text with opacity on dark gradients, and text directly over game/theme imagery. Focus styling is inconsistent across legacy controls. Form fields have visible labels; placeholder styling must not replace those labels. Theme and game scenes need to remain recognizable while providing a local text backing layer. The dynamic article template covers all 13 articles.

## Changes made

- Increased contrast for shared muted text (`text-muted`, slate-400 and slate-350) on light surfaces, including metadata and supporting labels across the dashboard, score history, settings, lessons, theme cards, blog and legal pages.
- Scoped game HUD slate-400 labels to a light neutral because those labels sit on near-black panels.
- Darkened white text on theme color controls by using each theme's existing dark companion token. This also applies to `text-theme-main` text, preserving its hue while improving contrast on light backgrounds.
- Added a 34% dark navy overlay (`rgba(10, 18, 38, 0.34)`) over the shared header's existing theme gradient; foreground content remains above the separate overlay layer.
- Added reusable, local `rgba(255, 255, 255, 0.90)` backing overlays for the contact introduction, games heading, scores heading, theme overview heading, and not-found content. Added a local `rgba(15, 23, 42, 0.72)` backing behind copy on the illustrated theme preview. These are separate pseudo-element layers; the scene images remain visible around and through the translucent surfaces.
- Strengthened shared footer links from white/75 to white/90 and copyright text from white/60 to white/80 to accommodate brighter theme gradients.
- Improved placeholder contrast while retaining persistent form labels; removed group opacity from the disabled contact form fieldset.
- Removed dimming from disabled theme/settings controls, used a darker disabled contact action background, and removed opacity from placeholder chart columns so their labels remain legible.
- Added a keyboard focus ring (3px `#172554` with a 5px white halo) and a reduced-motion override.

No page copy, route metadata, images, scoring, contact delivery, or sitemap behavior was changed. Existing card and scene overlays remain in place, including dark 92%/70%/20% gradient stops on game cards and 90%/45%/10% stops on theme cards.

## Validation record

- `npm run lint`: passed.
- `npm run build`: passed; Next.js generated the app routes, including the 13 static blog articles.
- Responsive browser screenshots at 1920px, 1366px, 768px, and 390px were not captured. The browser access host reported unavailable, and the native Chrome fallback did not complete navigation to the local build. Do not treat this source audit as a route-by-route rendered visual pass.
- No automated contrast scanner or computed pixel sampling was run. Remaining theme-specific combinations, particularly the illustrative surfaces and all theme variants, need rendered manual verification at the four requested widths.
