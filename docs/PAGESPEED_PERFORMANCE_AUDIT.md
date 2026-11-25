# PageSpeed Performance Audit

**Scope:** Source and production audit only. No application source files were changed. No fixes have been implemented.  
**Report supplied:** PageSpeed Insights capture dated November 21, 2026.  
**Production checked:** `https://www.speedytypeapp.com` on November 22, 2026.

## Executive findings

The supplied PSI summary reports unusually high CLS on both device classes (mobile 1.0, desktop 1.674), a mobile LCP of 4.2 s, and roughly 1.2 MiB of estimated image savings. The exact PSI HTML/JSON trace was not present in the repository or workspace, so the exact LCP node, shift timestamps, affected nodes, and exact unused bundle URLs cannot be recovered from the summary alone.

The source and production checks confirm several concrete contributors and risks:

- Theme state is read from `localStorage` in a client effect, then the theme background, theme colors, and avatar CSS variables are changed in a second effect. This creates post-hydration visual changes. It is a credible CLS contributor if content dimensions or line wraps change, but changing a CSS background image by itself does not change layout geometry.
- The two PSI-highlighted assets are JPEG-encoded, 1024×1024 files named `.png`, delivered with `Content-Type: image/png`. The princess scene is 976,535 bytes (953.6 KiB); the princess avatar is 628,731 bytes (614.0 KiB). The header renders that avatar in a 36–38 px circle, so the full source is excessive for that use.
- Theme scenes are CSS backgrounds, including the global theme background and the test hero. They are not responsive image elements and have no native image `fetchpriority`/`loading` attributes. The global theme artwork is introduced after hydration; the homepage server HTML inspected did not contain the theme or avatar image URLs or an image preload.
- Global CSS imports Google Fonts using CSS `@import`. This adds an external font stylesheet dependency to the global stylesheet and uses `display=swap`, so font replacement can change glyph widths and wrapping after first paint.
- The production HTML includes the asynchronous AdSense loader globally. The PSI summary reports `show_ads_impl`, which is evidence the ad runtime appeared in its captured execution. No ad slot markup or explicit `adsbygoogle.push` call was found in `src` or `public`. Account approval, Auto Ads configuration, and whether an injected ad contributed to CLS cannot be confirmed from this source audit.
- Dynamic imports for the activity views are already present in the current working tree. Whether these imports were present in the exact production build measured by PSI is uncertain; the exact ~173–175 KiB unused-JS attribution cannot be mapped without the raw PSI report/coverage trace.
- Production image responses used `Cache-Control: public, max-age=0, must-revalidate`; the inspected hashed Next CSS chunk used a one-year immutable cache policy. This is an opportunity to review image caching after immutable/versioned derivatives are created.

## Routes inspected

The route inventory is based on the current `src/app` route files. Dynamic article routes are listed once; each article is generated from the shared article template/data.

| Route | Source | Readability/performance finding |
|---|---|---|
| `/` | `src/app/page.js` | Inherits the global theme backdrop, header, footer, font import and AdSense loader. Source is mostly text/card sections on light surfaces; theme CSS background remains behind the page. The top activity UI is shared with `/typing-test`. |
| `/typing-test` | `src/app/typing-test/page.js`, `src/app/components/TypingApp.js`, `TestsPage.js` | Shared theme state/background; hero uses a CSS scene background at `TestsPage.js:107–110`. This is a strong LCP candidate, but the exact LCP element is unconfirmed. |
| `/typing-practice` | `src/app/typing-practice/page.js`, `layout.js`, `TypingApp.js` | Shared theme and activity shell; hydration/theme state applies after the initial render. |
| `/typing-speed` | `src/app/typing-speed/page.js` | Shared global theme background and global font; content styles primarily use dark text and light cards. |
| `/typing-accuracy` | `src/app/typing-accuracy/page.js` | Shared global theme background and global font; same theme-state/font/third-party risks. |
| `/lessons` | `src/app/lessons/page.js`, `src/app/components/LessonsPage.js` | Shared global theme; lesson thumbnails use CSS background images and need responsive/lazy delivery review. Avatar is a CSS background. |
| `/games` | `src/app/games/page.js`, `src/app/components/GamesPage.js` | Theme scene backgrounds on game cards (`GamesPage.js:2479+`); card text is layered over dark gradient overlay. Large game module imports Three.js and is route-specific; current `TypingApp` uses dynamic imports. |
| `/themes` | `src/app/themes/page.js`, `src/app/components/ThemesPage.js` | Twelve theme-card scene backgrounds (`ThemesPage.js:420–433`) and preview backgrounds (`:486`, `:616`). Several below-fold full-size images can be requested as CSS backgrounds without explicit lazy loading. |
| `/scores` | `src/app/scores/page.js`, `src/app/components/ScoresPage.js` | Shared theme and local-storage scores state can update after hydration; inspect with trace for content-height changes. |
| `/settings` | `src/app/settings/page.js`, `src/app/components/SettingsPage.js` | Shared theme state; avatar/theme preview assets and settings form controls need responsive/background and contrast checks in browser. |
| `/blog` | `src/app/blog/page.js` | Shared header/footer/theme background; listing cards use the shared global font and dynamic theme colors. |
| `/blog/[slug]` (all articles) | `src/app/blog/[slug]/page.js`, `src/app/data/articles.js` | Shared article template; body is mostly dark-on-light, with theme-colored links/buttons and shared global theme/font/ad behavior. Inspect every generated article for content-specific image/media differences in browser. |
| `/about` | `src/app/about/page.js` | Shared global background and shell; portrait uses `next/image`, unlike most background artwork. |
| `/contact` | `src/app/contact/page.js`, `src/app/components/ContactForm.js` | Shared global background behind the contact content, as visible in the supplied screenshot. Intro uses a local readability backing; form and email cards are distinct light/dark panels. Its scene is the same theme background, applied after hydration. |
| `/privacy-policy` | `src/app/privacy-policy/page.js` | Shared shell/theme; long-form content is dark-on-light. Font swap can change line wrapping and page height. |
| `/terms` | `src/app/terms/page.js` | Shared shell/theme; same long-form/font and link contrast review as Privacy Policy. |
| `/disclaimer` | `src/app/disclaimer/page.js` | Shared shell/theme; same long-form/font and link contrast review as Privacy Policy. |
| Not-found route | `src/app/not-found.js` | Shared shell and CSS; not one of the requested canonical content pages, but part of the app route surface. |

### Shared components inspected

- `src/app/layout.js`: global document, viewport, and AdSense loader.
- `src/app/providers.js`: shared flex/min-height shell and theme provider.
- `src/app/ThemeContext.js`: persisted theme, avatar and score initialization; body and CSS variable updates.
- `src/app/globals.css`: global font import, body/theme artwork layers, header overlay, readability backing, focus outline, reduced-motion rules, placeholder and muted text utilities.
- `src/app/components/Header.js` and `Footer.js`: shared navigation, avatar and footer colors.
- `src/app/components/TypingApp.js`: client-side dynamic imports for activity views.
- `ContactForm.js` and `FaqAccordion.js`: shared form/accordion components (where used).

## Exact findings and source evidence

### 1. LCP element and image delivery

**Exact PSI LCP element:** Cannot be established from the supplied metrics. The PSI HTML/JSON report is not present in the workspace. The likely candidates from source are the first viewport's theme scene (a CSS background), the test hero, or a foreground text/container. A source guess is not a verified LCP attribution.

**Confirmed source behavior:**

- `src/app/ThemeContext.js:190–196` initializes a default theme, avatar, and score state.
- `src/app/ThemeContext.js:199–222` reads the saved theme/avatar/scores only in `useEffect`, after the initial render.
- `src/app/ThemeContext.js:226–258` applies theme CSS variables, avatar and scene image, and body background in a later effect.
- `src/app/components/TestsPage.js:107–110` sets a CSS `backgroundImage` on the test hero. The wrapper has `min-h-[230px]`, which reserves a minimum box but can grow with content.
- `src/app/layout.js:1–14` has no explicit preload for the dynamic theme scene.
- The production homepage HTML inspected had no `/themes/princess.png` or `/avatars/princess.png` references and no image preload; the CSS background is selected after hydration.
- `src/app/components/Header.js:43–44` uses the avatar as a CSS background in a 36–38 px circle.

**Asset evidence:**

| URL | Local encoded file | Dimensions / encoding | Local bytes | Production response |
|---|---:|---|---:|---|
| `/themes/princess.png` | `public/themes/princess.png` | 1024×1024 JPEG (baseline), despite `.png` suffix | 976,535 (953.6 KiB) | 200; `Content-Type: image/png`; `Cache-Control: public, max-age=0, must-revalidate` |
| `/avatars/princess.png` | `public/avatars/princess.png` | 1024×1024 JPEG (baseline), despite `.png` suffix | 628,731 (614.0 KiB) | 200; `Content-Type: image/png`; `Cache-Control: public, max-age=0, must-revalidate` |

The filename/actual encoding mismatch is confirmed from file signatures and the production response headers. It is a format correctness and optimization opportunity; do not simply rename the files without verifying every reference and production MIME behavior. PSI estimates are user-provided: 783 KiB scene saving and 443.3 KiB avatar saving. Converting to optimized responsive WebP/AVIF variants is likely to reduce bytes substantially, but the final savings depend on visual quality, format support, dimensions and the PSI test viewport.

### 2. CLS root-cause investigation

**Exact cause of CLS 1.0 mobile / 1.674 desktop:** Not confirmable from the summary. PSI says the `body` was the shifting element, but the body is often an affected ancestor, not the original cause. Need the raw Layout Shift records, `hadRecentInput` values, affected nodes and before/after screenshots from a Chrome Performance trace.

**Candidates supported by source:**

1. **Post-hydration theme update (medium/high priority to profile):** `ThemeContext.js:199–222` loads preferences after mount. `:226–258` then changes colors, CSS variables, body background and avatar. The theme/background image alone does not reserve or alter layout dimensions. However, persisted content/theme labels or widths can change line wrapping; the root provider begins with default values. This could contribute to CLS depending on the saved state and viewport.
2. **Ad runtime injection (high priority to profile):** `layout.js:64–70` globally adds the async AdSense script. The PSI summary reports `show_ads_impl`. Ad insertion can shift content if an ad slot is inserted without reserved space, but no slot markup was found in local source and the runtime's actual injected DOM/impact was not traced. Need Chrome network/performance evidence and the AdSense account's Auto Ads/slot configuration.
3. **Font swap (medium priority to profile):** `globals.css:1, 7–16` imports Mooli and JetBrains Mono via Google Fonts with `display=swap`. Late font replacement may change line widths/heights and create shifts. Confirm with Layout Shift attribution and font timing.
4. **Client-rendered data/content (profile dependent):** `ThemeContext.js:207–218` populates scores after mount. `TestsPage.js:213+` displays score-dependent chart/list content. The chart has a fixed 120px chart area, but surrounding content can still differ if server/client state or conditional sections change. Compare initial HTML and post-hydration geometry.
5. **Image intrinsic sizing:** The reported theme/avatar files are CSS backgrounds and do not intrinsically size their boxes. Fixed/minimum CSS dimensions exist for the header avatar (`Header.js:43`) and test hero (`TestsPage.js:107`). Therefore the source does not support attributing the large CLS directly to those image files lacking HTML width/height. Check all other DOM images and actual shift records before deciding.

**Mobile vs desktop:** Different PSI values suggest viewport-specific wrapping, responsive layout, or different ad placement/viewport coverage may amplify shifts. Theme artwork remains a CSS cover background and can be repositioned/cropped as viewport changes, affecting perceived contrast but not layout geometry. A desktop CLS higher than mobile is not explained by image byte size alone. No source proof identifies the distinct trigger; reproduce at 390, 768, 1366 and 1920 px with a cold cache and both default and persisted theme/scores.

### 3. JavaScript and CSS

- The supplied PSI audit identifies 173–175 KiB unused JavaScript. The raw report/chunk attribution is missing, so exact chunks/modules and whether the figure is compressed transfer or uncompressed bytes are unknown.
- `src/app/components/TypingApp.js:17–24` already dynamically imports Tests, Lessons, Games, Themes, Scores, Settings, Typing and Results views. The Games/Themes modules use Three.js; `GamesPage.js` is approximately 96 KB of source and `ThemesPage.js` approximately 29 KB. These are candidates for route-specific JS cost, but dynamic imports already split them in the current working tree. Confirm deployed bundle IDs and coverage before proposing additional split points.
- `src/app/globals.css:1` imports Google Fonts externally. The production homepage's emitted global CSS chunk was observed at 63,611 bytes and retained the Google Fonts `@import`. The stylesheet itself is render-blocking; the report does not include enough detail to determine the CSS opportunity's estimated delay or whether splitting is beneficial.
- Avoid asynchronous loading of the entire stylesheet as a blind fix; it can cause unstyled flash and layout shifts. Profile critical CSS and font requests first.

### 4. AdSense assessment

`src/app/layout.js:64–70` loads `adsbygoogle.js` asynchronously for all routes. Production homepage raw HTML also contains this script. PSI's `show_ads_impl` indicates the runtime was present in its capture. `rg` found no `<ins class="adsbygoogle">` or explicit `adsbygoogle.push` under `src` or `public`; Auto Ads may still inject placements, which requires runtime/account inspection.

Do **not** remove the loader as an unreviewed optimization. Removing or disabling it can stop ad delivery/revenue, alter account verification or ad setup, and affect any Auto Ads configuration. First confirm approval status and whether Auto Ads/ad units are intentionally enabled. If ads are intentionally active, determine which placement shifted and reserve the correct slot dimensions. If the site is not approved and the owner confirms ads are not needed now, a later approved change can defer/disable the loader and measure the impact.

## Prioritized implementation plan (for approval; not performed)

| Priority | Proposed work | Expected impact | Risks / validation needed |
|---|---|---|---|
| **P0** | Reproduce CLS with Chrome Performance trace / Web Vitals attribution at mobile and desktop. Identify the actual shifting node and the frame that moved it before changing code. | Highest confidence path to reduce the reported CLS; no numeric result can be promised before attribution. | Requires browser profiling with cold/warm cache, ad state, saved theme and score state. Body being named as the shift target is insufficient evidence by itself. |
| **P0** | Once attributed, stabilize the responsible geometry/state: reserve ad placement space if ad injection is causal; prevent visible theme/content reflow during initialization if hydration is causal; address font metric swap if font is causal. | Could materially reduce CLS on both viewports. | Avoid hiding content or suppressing legitimate state. Ad changes affect revenue/configuration. Font changes can alter brand appearance and line wrapping. |
| **P0** | Determine the actual LCP node from PSI trace; if it is the top theme scene/hero, serve an optimized initial viewport asset early with correct priority (not lazy-loaded). Preserve source artwork and crop/position. | Targets mobile LCP 4.2 s and the PSI-reported 783 KiB scene saving. | Do not preload every theme. Ensure preload matches saved theme and viewport or it can waste bandwidth. CSS background conversion to responsive `<Image fill sizes>` or `image-set()` needs visual positioning QA. |
| **P0** | Ensure foreground images use intrinsic dimensions/aspect-ratio or a fixed box, and ad/content placeholders reserve final geometry. | Prevents shifts from replaced/late content where present. | The current avatar and hero already have fixed/minimum CSS geometry; this alone will not solve unexplained CLS. |
| **P1** | Re-encode theme/avatars to properly named, compressed WebP/AVIF derivatives (plus fallback where needed); create appropriately sized variants, e.g. avatar-size and scene breakpoints. Update CSS background references safely. | PSI estimates ~1.2 MiB image savings; actual size and LCP gain require measurement. Smaller avatar derivative avoids downloading 1024 px for ~36 px UI. | Keep originals/visual quality; verify MIME, cache behavior, every theme, legacy/browser support and all current URL references. |
| **P1** | Lazy-load below-the-fold theme/game/lesson imagery or use browser-visible image elements with `loading="lazy"`; keep the confirmed LCP asset eager/high priority. | Reduces initial transfer and contention on long pages and galleries. | CSS backgrounds do not expose native `loading`; intersection-based loading can add complexity. Verify no flash/late visual pop and do not defer first-screen cards. |
| **P1** | Map PSI unused JS chunks to route imports. Preserve current `dynamic()` imports; verify deployed splitting and consider route-level loading for Three.js/game-only modules if the trace shows they are still downloaded early. | Could recover the reported ~173–175 KiB unused transfer and improve interactivity/CPU; TBT is already low at 20 ms, so expected main gain is transfer/parse and route startup, not necessarily TBT. | Avoid duplicate chunks or delayed essential interaction. Measure real route navigation and prefetch behavior. |
| **P1** | Replace the Google Fonts CSS `@import` with a controlled font-loading strategy (for example, self-hosted WOFF2 or `next/font` if compatible with this installed Next version) and tune fallback metrics. | Removes a font CSS dependency and can reduce font-related layout shifts/connection delay. | Typography should remain visually equivalent; inspect installed Next docs/version before implementation. Font files add local bytes and need subset/weight selection. |
| **P2** | Review immutable caching for versioned image derivatives. Current production images revalidate while hashed CSS is immutable for one year. | Repeat visits can avoid revalidation and reduce transfer/latency. | Only use long immutable caching for versioned URLs; mutable stable paths must revalidate or risk stale art. |
| **P2** | Review all third-party requests including AdSense after account/placement review. | Can reduce connection/setup overhead if a third-party request is unnecessary. | Removing/defering AdSense has business/account implications described above; confirm first and measure. |

## Files likely to change after approval

No implementation is included in this audit. Likely files, based on findings:

- `src/app/ThemeContext.js` — stabilize theme initialization/background state only if trace attributes CLS here; adjust image delivery source if the theme background is confirmed LCP.
- `src/app/components/TestsPage.js` — hero image delivery/priority only if confirmed LCP.
- `src/app/components/Header.js`, `Footer.js`, `LessonsPage.js`, `ThemesPage.js`, `GamesPage.js` — correctly sized avatar/scene/thumbnail derivatives and below-fold image loading.
- `src/app/layout.js` — font strategy and, only after approval/account review, conditional/deferred AdSense loading.
- `src/app/globals.css` — remove external font import after migration and any measured font metric adjustments.
- `public/themes/*`, `public/avatars/*`, `public/lesson_thumbnail.png` — generated optimized derivatives; preserve source assets and visual identity.
- `src/app/components/TypingApp.js` — only if bundle trace shows current dynamic imports are insufficient or ineffective in deployed output.

Do not change SEO metadata, canonical URLs, robots, sitemap, contact delivery, typing/scoring behavior, or route content as part of this performance scope.

## Validation performed and limitations

### Production checks

- Homepage and contact production pages were fetched and checked for server HTML/script/style references. Homepage response was 200; HTML was approximately 77.9 KB.
- Production CSS chunk `/_next/static/chunks/1578j1lak~z-g.css` was approximately 63,611 bytes, retained the Google Fonts import, and returned `Cache-Control: public,max-age=31536000,immutable`.
- Both reported princess assets returned 200 with their full-size content lengths and `.png` MIME headers despite JPEG encoding.
- Production markup has the global AdSense loader. The runtime's injected layout and exact `show_ads_impl` network/DOM effects were not inspected in a real browser trace.

### Not performed

- No desktop/mobile visual screenshot comparison or Chrome DevTools responsive profile at 1920, 1366, 768 and 390 px. No browser automation/real-device verification was available in this audit pass.
- No exact PSI LCP element, LCP subpart timings, layout shift attribution records, long-task trace, unused-JS coverage map, or render-blocking opportunity details: the captured PSI HTML/JSON was not found in the workspace.
- No dashboard check of AdSense approval, Auto Ads settings, or live placements.
- No `npm run lint` or `npm run build`: this deliverable stops at audit/plan, and no source implementation was made.
- No contrast ratios were computed for every rendered foreground/background pair; source colors alone cannot prove WCAG AA over variable artwork. Those checks require rendered screenshots/pixel sampling, particularly for theme-dependent text.

## Approval boundary

This document records evidence and recommends a prioritized implementation. No application source, asset, metadata, route, or production setting was changed. Await approval before applying fixes.
