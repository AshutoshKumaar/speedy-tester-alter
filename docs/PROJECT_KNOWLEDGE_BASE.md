# SpeedyType Project Knowledge Base

Repository review date: 2026-11-17 (client timezone). This document describes the checked-out source, not a live production inspection. Application files were read without modification during the first audit.

## Project and architecture

- Next.js 16.2.6 App Router, React 19.2.4, JavaScript, Tailwind CSS 3, Three.js 0.184.
- `src/app` contains route segments, shared layouts, components, style, data, and metadata routes. No `src/pages`, API route handlers, backend, authentication provider, database, or remote score sync were found.
- Default route modules are Server Components. Browser-interactive experiences use Client Components; global `Providers` wraps the shared header, page content, and footer in the client-side `ThemeProvider`.
- User preferences and score history use browser `localStorage`. There is no account or cross-device persistence evidenced in source.

## Route inventory

| URL | Source | Purpose / implementation |
|---|---|---|
| `/` | `src/app/page.js` | Server-rendered educational homepage around interactive `TypingApp`; includes WebSite/WebApplication/FAQ JSON-LD. |
| `/typing-test` | `typing-test/page.js` | Timed test information and shared typing UI. |
| `/typing-practice` | `typing-practice/page.js`, `typing-practice/layout.js` | Client-rendered practice drills, FAQs, SEO metadata in segment layout. |
| `/typing-speed` | `typing-speed/page.js` | WPM explainer and practice links. |
| `/typing-accuracy` | `typing-accuracy/page.js` | Accuracy guidance and drill links. |
| `/lessons` | `lessons/page.js` | Lesson/missions experience, includes embedded video content (verify remote availability in production). |
| `/games` | `games/page.js` | WebGL typing games and interactive game UI. |
| `/themes` | `themes/page.js` | Theme gallery and 3D theme experiences. |
| `/scores` | `scores/page.js` | Local score history/analytics UI. |
| `/settings` | `settings/page.js` | Sound and preference controls. |
| `/blog` | `blog/page.js` | Server-rendered article listing and Blog JSON-LD. |
| `/blog/[slug]` | `blog/[slug]/page.js` | Dynamic article page, generated metadata, article content and related links. |
| `/about` | `about/page.js` | About page, Organization JSON-LD. |
| `/contact` | `contact/page.js` | Contact/support information; source explicitly says no message delivery or support inbox. |
| `/privacy-policy` | `privacy-policy/page.js` | Privacy policy. |
| `/terms` | `terms/page.js` | Terms. |
| `/disclaimer` | `disclaimer/page.js` | Disclaimer. |
| `/not-found` (framework fallback) | `not-found.js` | Branded not-found UI and metadata; actual response status should be verified. |
| `/robots.txt` | `robots.js` | Generated robots directives. |
| `/sitemap.xml` | `sitemap.js` | Generated from 16 static entries plus current article data (13 at audit). |

The declared sitemap list includes all 16 static routes, including utility pages (`settings`, `scores`, `themes`) that may be less valuable as search landing pages. Current total is 29 URLs if each article slug resolves.

## Source map

- `src/app/layout.js`: global metadata, HTML language, Google AdSense script, `Providers` root.
- `src/app/globals.css`, `page.module.css`: global styles and homepage CSS module. Tailwind content scanning/config is in `tailwind.config.js`; PostCSS config in `postcss.config.js`.
- `src/app/providers.js`: client wrapper with theme, shared header/footer.
- `src/app/ThemeContext.js`: 12 theme definitions, voice/speed modes, typing sentences and lesson data; state hydration and localStorage persistence.
- `src/app/components/TypingApp.js`: top-level tab/screen selection and smooth scroll for app sections.
- `TypingPage.js`, `ResultsPage.js`, `TestsPage.js`, `LessonsPage.js`, `GamesPage.js`, `ThemesPage.js`, `SettingsPage.js`, `ScoresPage.js`: feature UI. `GamesPage` and `ThemesPage` use Three.js/WebGL. `FaqAccordion.js`, `RelatedTypingTools.js`, `Header.js`, `Footer.js`: shared UI.
- `src/app/data/articles.js`: all 13 article objects, prose, FAQ, dates, slugs, and related-slug references.
- `sitemap.js`, `robots.js`: App Router metadata route conventions.
- `public/`: SVG icons, favicon/app icons, theme/avatars, lesson thumbnail.
- Root config: `next.config.mjs` only sets Turbopack root; `eslint.config.mjs`, `jsconfig.json`, Tailwind/PostCSS config, package manifests. `.gitignore` excludes build output, env files, and `.vercel`.
- `README.md` is largely the create-next-app starter and does not document actual architecture or operational deployment steps. No `vercel.json`, CI workflow, test suite, or deployment script was found in the tracked-file inventory.

## Component and data flow

`layout.js` → `Providers` → `ThemeProvider` + `Header` → route content → `Footer`. `ThemeContext` exposes themes, selected avatar, sound mode, speed feel, score records, and setters. The browser initializes saved preferences/scores from localStorage in effects, and writes changes back. Feature screens consume that shared state; game-specific high scores are separately persisted using game-specific localStorage keys. Article index/detail and sitemap read the same in-memory `BLOG_ARTICLES` list through `getAllArticles()` / `getArticleBySlug()`.

## SEO architecture (source-level)

- `layout.js` sets `metadataBase` to `https://www.speedytypeapp.com`, a title default/template, description, keywords, creator/publisher, canonical `/`, OG and Twitter fields, and index/follow robots directives. The preferred WWW origin is present here and in sitemap/robots; preserve it.
- Most static route modules export individual title, description, canonical, and OG data. `/typing-practice` defines metadata in its layout because its page is a Client Component. Blog article metadata is generated from article fields; unknown slugs return not-found metadata and call `notFound()` in the page.
- Sitemap uses a hard-coded WWW base. Static URLs now have per-route `lastModified` dates recorded from the latest meaningful route-source changes in Git history (2026-09-24 through 2026-10-18). Article URLs use a valid, non-future `updatedAt || publishedAt`; invalid or future article dates are omitted. Maintain static dates when the corresponding route content changes.
- Robots allows `/`, disallows `/api/`, and declares the WWW sitemap. No API routes were found, so the disallow is currently unnecessary but benign.
- JSON-LD exists for homepage (WebSite, WebApplication, FAQPage), blog index (Blog with BlogPosting list), article pages (Article/Breadcrumb data: see detail page), and About (Organization). No broad per-route WebPage/Breadcrumb schema system is evident. The home FAQ is on-page; whether FAQ rich results appear is a Google eligibility/display decision and must not be promised.
- No hreflang or localized route variants found. The site is English (`<html lang="en">`).
- No explicit redirect rules in `next.config.mjs`; production canonicalization for HTTP/HTTPS, WWW/non-WWW, trailing slash, and host redirects is controlled externally by hosting/DNS and is not verified from this checkout.

## Blog content inventory and positioning

All 13 articles have unique slugs, descriptions and dates, structured sections, FAQs, and three related slugs; most include tool or related-article links. Subjects: typing speed improvement; good typing speed; WPM calculation; accuracy; touch-typing beginners; typing without looking; beginner daily routine; QWERTY rows/finger zones; learning timeline; common mistakes; typing speed by age; WPM versus accuracy; touch typing versus hunt-and-peck. Their query intents cover informational guidance, definitions, benchmarks, and instructional practice. Main overlap risk is among `/typing-speed`, `what-is-a-good-typing-speed`, `average-typing-speed-by-age`, and `wpm-explained`; separate intent can be maintained if each page distinctly serves score calculation, task-based goal setting, evidence limits for age, and formula explanation. The reported GSC query “average typing speed” has one potentially relevant target (`/typing-speed`) plus the age article; validate query-to-page data before consolidating or changing targeting.

Content is hand-authored in source; no CMS, author profile/date attribution system, editorial workflow, or analytics integration is evidenced. External sources are used in some articles (OSHA, PubMed, Nature/Springer); audit claim/source freshness and source fit article by article before substantive copy edits. The separate GSC snapshot mentioned by the owner identifies three article URLs as discovered-not-indexed, which is not by itself proof of a code defect or quality judgment.

## Internal links

Shared navigation and footer provide broad site links. Homepage links to typing test, lessons, games, typing speed, accuracy and selected guides. Tools cross-link through `RelatedTypingTools`; blog articles render body links and related-article links from `relatedSlugs`, plus tool CTAs and breadcrumbs. Blog listing links every article. Contact/legal routes are reachable through the footer. Automated crawl/link graph and production status checks were not run; orphan status therefore remains unverified. A mismatch exists between user-supplied historical GSC paths and current code: the snapshot mentions `/scores`, `/themes`, etc., all present; it mentions `/blog/how-to-increase-typing-speed`, also present.

## Rendering, performance, images, and resilience

- Route shells/content are generally server components, while interactive stateful pages and the global provider are client components. Blog text/article sections and homepage explanatory content are server-rendered in source, improving baseline discoverability; test rendered HTML to confirm production behavior.
- Interactive game/theme pages load Three.js and canvases; exact JS transfer sizes, WebGL frame performance, and mobile behavior were not measured. Shared `Providers` is a client boundary, though children can still be server-rendered by composition.
- Images reside in `public` and inspected routes largely use direct static assets; no `next/image` usage was found in link/source scan. Need inspect rendered requests and dimensions before deciding whether image optimization is material. External Google Fonts CSS import may delay font display; no `next/font` setup found.
- AdSense script loads globally in the root document; its field impact and consent/legal configuration are not measured. No explicit loading/error route (`loading.js`, `error.js`, `global-error.js`) found in inventory; not-found UI exists.
- No performance lab, field Core Web Vitals, bundle analyzer, or real-user monitoring data supplied. LCP/INP/CLS/TTFB conclusions require field or controlled measurements.

## Dependencies and deployment

Scripts: `npm run dev`, `npm run build`, `npm run start`, `npm run lint`. Runtime dependencies are Next, React/React DOM and Three.js. Vercel is the stated deployment target, but this checkout contains no Vercel configuration or project settings; deployment behavior, redirects, domains, caching, environment variables and production build outcome remain unknown. No secrets or env files were inspected or exposed.

## Known issues and technical debt (audit observations)

1. Static sitemap date issue is fixed in the current source using route-level dates from Git history; production remains on the prior deployment until separately deployed.
2. The root title template is `"%s"`, so the root title is not appended to page-specific titles; page labels vary in brand suffix use. Inspect output to confirm each title.
3. Root metadata has one global canonical `/`, while most page routes override it; ensure every indexable route has the intended final canonical and private/session utility pages have an explicit indexation policy.
4. `/typing-accuracy` metadata description contains a specific “98%+” claim and an “unlock” outcome; align it with page content and avoid unsupported performance promises.
5. `contact/page.js` describes a contact route while policy/disclaimer text says messages cannot be submitted; user expectations should remain clear.
6. Article dates/metadata and all article content are source-maintained; no automated validation of duplicate slugs, missing related slugs, or date correctness is evident.
7. Global AdSense and remote Google Fonts are third-party dependencies; measure and review operational/privacy requirements.
8. Live redirects/statuses/metadata were checked on 2026-11-18. Search Console access and CWV measurements remain unavailable.

## Phase 2 production validation (2026-11-18)

Live requests were made to `https://www.speedytypeapp.com`:

- `http://speedytypeapp.com/` → 308 to `https://speedytypeapp.com/` → 308 to `https://www.speedytypeapp.com/` → 200.
- `http://www.speedytypeapp.com/` → 308 to `https://www.speedytypeapp.com/` → 200.
- `https://speedytypeapp.com/` → 308 to `https://www.speedytypeapp.com/` → 200.
- `/robots.txt` and `/sitemap.xml` returned 200. The live sitemap had 29 unique HTTPS WWW URLs; every listed URL returned 200.
- All 29 sitemap pages returned exactly one title, one meta description, one canonical, and an `index, follow` robots tag in fetched HTML. No duplicate title or canonical values were found.
- An unknown `/blog/` slug returned HTTP 404.
- The live sitemap's static `lastmod` values were all `2026-10-18`, not route-specific. The source fix now has route-specific dates. Production will continue serving its current sitemap until a future deployment; no deployment was performed.
- Search Console property data, Google-selected canonicals/indexation, and indexing status remain unavailable.

Build and lint were run after the sitemap change. Build completed successfully; lint completed successfully. Build reported stale Browserslist/caniuse-lite data (six months old), which does not affect this sitemap change.

## Ongoing maintenance

When architecture or SEO changes are implemented, update this file and `docs/SEO_AUDIT.md`. Record dated GSC metrics only from verified exports/screenshots or a connected property; maintain `docs/SEO_PROGRESS.md` separately when available. Do not treat sitemap membership or a successful build as proof of Google indexation.

### Typing practice experience (2026-11-18)
/typing-practice now initializes the shared TypingApp directly in its typing view with the selected drill's sample sentence, mode, and duration. The page exposes four drill cards and selectable 1/3/5/10-minute durations. Route-specific TypingApp props label the activity as practice and use H2 for its dashboard/results headings; default props retain the H1 and Typing Test labels used by other routes. The route layout owns its title, description, and canonical. Its FAQ accordion can retain collapsed answers in the initial DOM when keepAnswersInDom is set; other instances keep the previous lazy mounting behavior. The page links to /typing-test and /typing-speed.
