# Speedy Type AdSense Rejection Audit

**Audit date:** 20 November 2026  
**Production:** https://www.speedytypeapp.com  
**Repository:** `AshutoshKumaar/speedy-tester-alter`  
**Scope:** Read-only audit; only this report is created. “Confirmed” means visible in production text or source; “Potential” needs further deployment/interactive verification; “Not verified” means unavailable evidence. This report does not assert Google's internal criteria or guarantee approval.

## Executive summary

Speedy Type provides real browser typing tests, drills, score history, lessons, games and themes. The strongest quality concerns are trust, evidence and product/content consistency, not insufficient blog volume.

Confirmed: the About page says no individual or organization is identified as the operator; Contact says no message-delivery service or support inbox exists; homepage and accuracy page state unsupported exact WPM, job, accuracy, error-cost and practice-effectiveness claims; the homepage/test crawler output includes 15, 22, 29, 43 WPM sample-looking runs beside auto-save language; `/typing-test`, `/typing-speed`, and `/typing-accuracy` substantially repeat the same test UI; production snapshots of the same article slug differ in title/byline/claims. These impair accountability, editorial trust and visitor clarity.

**Ownership is separate.** Source `src/app/layout.js` puts the AdSense loader with client ID in `<head>`. No Google verification meta or HTML file was evident in inspected source inventory. Exact dashboard method, deployed raw head, Search Console, DNS and ads.txt are **not verified**. AdSense script presence does not establish ownership success. Do not confuse this issue with the low-value-content diagnosis.

## Most likely quality contributors

| Finding | Status | Evidence |
|---|---|---|
| No operator identity or working contact | **Confirmed** | About explicitly says operator is not identified. Contact says no form, inbox or delivery path; legal pages repeat that messages cannot be sent. |
| Unsupported/conflicting claims | **Confirmed** | Homepage lists global/job WPM tiers, top-1% and accuracy figures, productivity and routine claims without sources. `/typing-accuracy` says 98%+ target, one second per correction, 10–15 WPM penalty, over-60% typo attribution and auditory-cortex training. Newer articles caution against universal benchmarks. |
| Demo data may look like user history | **Confirmed in crawler output; intent unclear** | Homepage and `/typing-test` show 15/22/29/43 WPM runs near automatic-save copy. `/typing-speed` instead shows an empty state. Label/remove sample values and verify a fresh browser profile. |
| Repeated/overlapping pages | **Confirmed** | Test, speed and accuracy pages share the same test/history panel. Homepage repeats generic advice; article CTA/FAQ/related modules recur. |
| Deployment/editorial inconsistency | **Confirmed** | Same slug has older and newer versions, including generic editorial byline/statistics in one snapshot. Reconcile build/cache and live source. |
| Product promises not fully verified | **Potential** | Lessons claim progress advancement and saving; full lessons, tests, games, local storage, mobile and accessibility were not exercised end-to-end. |
| Technical crawl readiness | **Partly confirmed / partly not verified** | Source has AdSense code, index/follow metadata, robots and sitemap route handlers. Production robots/sitemap could not be retrieved by text crawler; redirects, deployed head, verification and ads.txt unverified. |

## Page-by-page assessment

| Route | Purpose / target | Original usefulness and overlap | Functionality, misleading claims, improvements |
|---|---|---|---|
| `/` | Entry hub for typing learners. | Real tools are useful; long generic speed, accuracy and home-row advice duplicates tool pages/blog. | **Confirmed:** test controls/history and 15/22/29/43 chart. Label/remove demo values; remove or source benchmarks, job tiers, “top 1%,” productivity and practice claims. Explain actual scoring and provide a direct first exercise. |
| `/typing-test` | Timed general assessment. | Durations offer utility; prose duplicates homepage/test guide. | **Confirmed:** 1/3/5/10 min choices, history messaging, sample-like chart. **Potential:** timer, wrong keys, corrections and save behavior need interactive verification. Explain passage/difficulty/scoring. |
| `/typing-practice` | Home/top/bottom/number-symbol drills. | Most differentiated route; concrete sample text and four drill groups. Some advice repeats accuracy guidance. | Crawler exposes selection, duration and metrics. **Potential:** verify selecting each drill changes passage and saved result. Explain layout variation and metric interpretation. |
| `/typing-speed` | WPM explanation and pace test. | Useful score topic but overlaps `/typing-test`, homepage measurement and WPM blog. | Same test/history UI; make this genuinely WPM-specific with exact formula, worked example, limitations and a focused exercise. Remove uncited comparisons. |
| `/typing-accuracy` | Error measurement/training. | Potentially useful, but weakest evidence quality and overlaps other accuracy/test pages. | **Confirmed:** 98%+ target, quantified error cost/typo causes, audio/neural assertion. Remove or substantiate and qualify; distinguish site metric from standard; link advice to targeted drills. |
| `/lessons` | Video-assisted lessons/missions for beginners. | Could be useful if videos/tasks teach and produce feedback; overlaps drills and beginner guides. | **Confirmed:** videos, missions, 0% progress. **Potential:** verify mission completion truly advances progress/saves score, video availability, captions/transcripts and mobile use. |
| `/games` | Four themed typing games. | Interactive gameplay could differentiate; descriptions alone are not educational value. | Lists Princess Letter Rescue, Dinosaur Dash, Rocket Racer, Ocean Bubble. **Potential:** verify play, levels, controls, scores, WebGL fallback, mobile and accessible alternatives. Avoid unsupported training claims. |
| `/themes` | Choose visual theme/avatar. | Useful personalization but limited learning content. | Shows 12 themes and active Princess Castle. **Potential:** verify preview/activation, persistence, keyboard operation, contrast, reduced motion and artwork. |
| `/blog` | Browse 13 learning guides. | Range is useful but intents overlap; editorial owner/evidence method unclear. | All 13 listed. Reconcile article versions, dates, authors, links, canonicals and sitemap; don't claim updates without meaningful revision. |
| `/about` | Explain product and operator. | Primarily feature copy. **Confirmed trust gap:** says operator is not identified. | Identify genuine operator/rights holder; describe scoring, local storage and limits accurately. No invented credentials. |
| `/contact` | Reach support/operator. | Fails stated purpose. **Confirmed:** no messages can be delivered. | Provide a real monitored channel and test it; state expectations and privacy handling. Update legal references. |
| `/privacy-policy` | Explain storage, ads, videos, third parties. | Detailed but says live behavior/provider processing needs confirmation. **Potential** policy/deployment mismatch. | Verify actual browser requests/storage/ad/video behavior, identify operator and accurate choices/contact. |
| `/terms` | Conditions and ownership/use terms. | Template-like and repeats dead contact path. | Terms claim ownership by Speedy Type/contributors without identifying rights holder. Verify licenses and make terms reflect real operator/service. |
| `/disclaimer` | Score, education, third-party limits. | Some useful limits; contact limitation undermines accountability. | Align statements with live scoring/services and add a real channel. Disclaimer does not cure unsupported claims. |

## Blog assessment: all 13

The production listing has 13 entries. Same-slug live snapshots differ for some entries. Consolidation below means preserve useful content and URLs with considered canonical/redirect mapping, not mass-delete.

| # | Article | Recommendation and evidence issue |
|---|---|---|
| 1 | **How to Improve Typing Speed: A Practical, Accuracy-First Plan** | Useful baseline→identify pause→drill→retest, including capital example. Overlaps routine/accuracy articles. **Retain and add** an original progressive exercise or honest observed product example. |
| 2 | **What Is a Good Typing Speed? Set a Goal That Fits Your Work** (older live title: “Averages by Age, Profession & Skill Level”) | Overlaps homepage and age article. Older revision says global 40–45 WPM/92%, job ranges, top 1% and “50 WPM meets 85%” of office roles without substantiation. **Rewrite one canonical version** around context and self-comparison; cite precisely scoped data or omit. |
| 3 | **How WPM Is Calculated in a Typing Test** | Strong site-specific formula, worked example, spaces, Backspace and accuracy. **Retain**; add edge cases and verify against implementation. Overlaps speed page but has unique value. |
| 4 | **How to Improve Typing Accuracy with Focused Practice** | Concrete letter-pair/capital/punctuation drills; overlaps #10 and #12. **Retain/tighten** around diagnose→drill; verify correction rules against code. |
| 5 | **Touch Typing for Beginners: A Step-by-Step First Practice** | Useful finger map. Older revision promises 10–14 day keyboard learning / 40–50 WPM in 4–6 weeks and says never look down, unsupported. **Retain/rewrite** without guarantees; add a complete progressive exercise and source any timeline. |
| 6 | **How to Practise Typing Without Looking at the Keyboard** | Overlaps #5/#13; useful if distinct staged approach. **Retain/consolidate** with milestones and practice sequence. Body not independently retrieved. |
| 7 | **A 15-Minute Typing Practice Routine for Beginners** | Overlaps #1/#4 and lessons. **Retain only if** real minute-by-minute routine, exact drill and review are included; otherwise merge into #1/#5. No unsubstantiated superiority claims. Body not independently retrieved. |
| 8 | **QWERTY Keyboard Guide: Rows, Finger Zones, and a Practice Exercise** | Useful keyboard map and reach/return exercise; acknowledges layouts vary. **Retain** as reference and link to actual drills/accessible diagram. |
| 9 | **How Long Does It Take to Learn Touch Typing?** | Distinct question, overlaps #5/#11. Listing avoids promised timeline. **Retain with sourced milestones** defining “learn”; no universal timeline. Body not independently retrieved. |
| 10 | **Common Typing Mistakes: How to Spot and Practise Them** | Practical symptoms; overlaps accuracy guide/routine. **Retain/differentiate** with symptom→specific drill→self-check mapping. |
| 11 | **Average Typing Speed by Age: What the Evidence Can and Cannot Tell You** | Cautious about universal age tables and describes study samples. **Retain** if primary references and methods are verified; avoid implying population norms. Overlaps #2. |
| 12 | **WPM vs. Accuracy: Which Typing Measure Should You Focus On?** | Useful site-specific comparison and comma example; overlaps #3/#4. **Retain as decision guide or merge its decision tree** into #4; map URL appropriately. |
| 13 | **Touch Typing vs. Hunt and Peck: Choosing a Practice Method** | Balanced and gradual; overlaps #5/#6/#8. **Retain/consolidate** into a practical choice guide; don't imply touch typing is mandatory. |

**Blog-wide:** clusters are speed/benchmarks (#2/#11), accuracy (#3/#4/#10/#12), beginner method (#5/#6/#8/#13), routines/time (#7/#9). Repeated CTA, second CTA, FAQ and related links can outweigh article-specific content. Some specific examples exist (`th/he/in`, commas, capitals, 250 characters = 50 WPM), but many articles don't give a full exercise/feedback/review. Numerical/job/age/efficacy/timeline/auditory claims need reliable sources and scope or should be omitted. Preserve useful URLs and unique content; update internal links/sitemap and monitor Search Console if merging. Never invent authors, credentials, stats or first-hand experience.

## Trust and transparency

- **Operator — Confirmed issue:** About says no individual or organization is identified. Identify the real operator/rights holder truthfully.
- **Contact — Confirmed issue:** No support channel is shown on Contact, which expressly says messages cannot be sent. Elsewhere-existing channel is **not verified**. Add and test a monitored route.
- **Authors — Confirmed inconsistency:** Some production snapshots show generic “Editorial Team Typing Education Specialist”; others omit it. No substantiated author/reviewer found in workspace. Remove unsupported credential-like label or accurately attribute real work.
- **Copyright — Potential:** Terms claim ownership by Speedy Type/contributors but do not identify rights holder. Verify theme art, fonts, videos and content licenses.
- **Privacy — Potential:** Policy candidly describes local storage and third parties but asks that deployment be confirmed. Audit actual requests and revise to match; include contact.
- **Legal — Potential:** Terms are boilerplate-like; legal pages point to unavailable contact. No legal compliance conclusion is made.

## Actual product value and functionality

**Confirmed in `src/app/components/TypingPage.js`:** WPM is rounded net correct characters ÷ 5 ÷ elapsed minutes. Accuracy is correct printable attempts ÷ all printable attempts; wrong keys count, Backspace does not, and Backspace can undo WPM progress. Site-specific points combine WPM, accuracy, completed lines and progress. `TypingApp` saves finished scores through theme context. This is real potential product value if reliable and clearly explained.

| Feature | Finding |
|---|---|
| WPM/accuracy | Formula confirmed in source and broadly explained in one guide; end-to-end live behavior not tested. Explain rounding/correction semantics. |
| Timed tests | 1/3/5/10 minute controls and handlers confirmed; actual timer/completion not exercised. |
| Focused drills | Four sample groups visible; actual passage switching/result behavior not verified. |
| Lessons | Videos/missions exist; claimed progress persistence not verified. Check captions, transcripts, attribution. |
| Games | Three.js and word bank in source; live game play not verified. Check fallback, controls and scores. |
| History/storage | Source/policy say local storage without account/upload. Clearing, private mode, quota, cross-tab and demo isolation not verified. |
| Mobile/accessibility | **Not verified.** Test responsive layout, external keyboard expectation, focus, screen reader, motion and WebGL fallback. |
| Explanation | Add inline distinctions among WPM, accuracy, points, sample values and saved local history. |

**Potential scoring/interaction edge cases:** wrong-key forgiveness and advancement, interval timer/background-tab throttling, zero-input result, finite repeated passages, global key listener conflicts with controls/IME/non-US layouts, localStorage failure/clear behavior. Verify in real browser before making claims.

## Technical and ownership checks

| Check | Result |
|---|---|
| AdSense head | **Source confirmed:** `src/app/layout.js` includes async `adsbygoogle.js?client=ca-pub-3201639516497362` in `<head>`. Production raw HTML **not verified**. |
| Ownership/Search Console | **Not verified; dashboard says issue:** no verification meta/file evident in checked source/public inventory. Follow exact account instructions for `www`/domain property; DNS method may be external. |
| robots.txt | **Source confirmed:** `src/app/robots.js` allows except `/api/`, references sitemap. Production response/body not retrievable by text crawler; direct check needed. |
| sitemap.xml | **Source confirmed:** `src/app/sitemap.js` lists core routes and dynamic articles. Production response not retrieved. Verify HTTP/XML, all current article URLs, dates and host. |
| Canonicals | **Source confirmed:** root and route/article canonicals defined. Verify deployed absolute URL and host/trailing slash consistency. |
| HTTPS/WWW | **Not verified:** check HTTP, apex and WWW redirect chain and loops. |
| Accessibility/noindex | Main routes publicly opened; legal/crawler endpoints partly unavailable to crawler. Source global index/follow and no route noindex found; production headers/meta **not verified**. |
| Navigation | Sampled links work; exhaustive broken-link check **not performed**. |
| Mobile | **Not verified:** responsive classes are not a device test. |
| ads.txt | **Not verified:** not evident in public inventory; production endpoint not retrieved. Check AdSense status and publish exact requested line only if applicable. |
| Deployment parity | **Confirmed concern:** source/listing/live article snapshots disagree. Reconcile deployed commit/build/cache. |

## Prioritized remediation roadmap

### P0 — Must fix

1. Resolve ownership verification using exact AdSense/Search Console method and confirm dashboard plus production host. This is separate from content.
2. Identify real operator/rights holder and publish a functioning, tested, monitored contact channel; update legal references.
3. Remove or substantiate unsupported speed/job/age/accuracy/error-cost/timeline/productivity claims on homepage, accuracy page and article versions.
4. Label/remove demo scores and verify true clean-profile empty state and local history.
5. Reconcile deployment/cache to one reviewed version of all routes and 13 articles.
6. Manually verify tests, drills, lessons and games; fix incomplete behavior or overpromises.

### P1 — High impact

1. Differentiate test, speed and accuracy pages by visitor task; reduce repeated prose.
2. Add useful exercises, progression, feedback and results interpretation in the product itself.
3. Sharpen blog search intent; consolidate only genuine overlap, preserve URL value and map redirects/canonicals carefully.
4. Remove repeated generic CTA/FAQ blocks when they displace unique content.
5. Check mobile/accessibility, keyboard focus, captions, reduced motion and game fallback.
6. Match privacy text to actual deployed ads/storage/video/hosting behavior and provide accurate data controls/contact.

### P2 — Improvements

1. Add accessible score explainer and worked example matching code.
2. Provide real history reset and accurate empty/loading/sample states.
3. Add keyboard map/row exercise feedback if it improves learning.
4. Keep dates, sitemap and canonicals aligned to substantive updates.
5. Track real bugs/task completion/support issues; publish no invented usage figures.

## Exact files likely to change in later remediation

No application files changed in this audit.

| Concern | Files |
|---|---|
| AdSense/verification/canonical | `src/app/layout.js`; Google verification HTML or metadata only if account instructions require; DNS/hosting settings if external. |
| Identity/contact/legal | `src/app/about/page.js`, `src/app/contact/page.js`, `src/app/privacy-policy/page.js`, `src/app/terms/page.js`, `src/app/disclaimer/page.js`, `src/app/components/Footer.js`. |
| Homepage/demo | `src/app/page.js`, `src/app/components/TestsPage.js`, `src/app/components/ScoresPage.js`, `src/app/page.module.css`, `src/app/globals.css`. |
| Scoring/routes | `src/app/typing-test/page.js`, `src/app/typing-practice/page.js`, `src/app/typing-speed/page.js`, `src/app/typing-accuracy/page.js`, `src/app/components/TypingApp.js`, `src/app/components/TypingPage.js`, `src/app/ThemeContext.js`. |
| Blog | `src/app/data/articles.js`, `src/app/blog/page.js`, `src/app/blog/[slug]/page.js`, redirect/canonical config if consolidation occurs. |
| Lessons/games/themes | `src/app/components/LessonsPage.js`, `src/app/components/GamesPage.js`, `src/app/components/ThemesPage.js`, corresponding route pages. |
| Crawlers | `src/app/robots.js`, `src/app/sitemap.js`, `next.config.mjs` only if confirmed behavior requires it; `public/ads.txt` only if applicable. |

## Final checklist before requesting review

- [ ] Ownership verified in dashboard for correct canonical site.
- [ ] Production HTML includes intended verification/AdSense code and correct canonical/index metadata.
- [ ] Real operator and tested monitored contact channel published.
- [ ] Legal/privacy pages match deployed behavior and link to working support.
- [ ] Unsupported numerical, job, age, efficacy, timeline and health claims removed or sourced/qualified.
- [ ] Fresh profile shows true empty state; demo data cannot be mistaken for visitor data.
- [ ] Product flows manually exercised; claims match actual functionality.
- [ ] All 13 live articles match reviewed content/bylines/dates; overlap handled without mass deletion.
- [ ] Mobile, keyboard, screen reader, focus, captions and game fallback checked.
- [ ] Production robots, sitemap, canonical, redirects, routes, noindex and ads.txt (if applicable) checked directly.
- [ ] Search Console inspection and sitemap reflect live routes.
- [ ] No approval guarantee is claimed.

## Five most important actions next

1. Fix AdSense **ownership verification** with the account's exact method; confirm on production.
2. Publish the real operator identity and working contact route; repair legal references.
3. Remove or source unsupported claims and reconcile article versions.
4. Fix sample-score/empty-state ambiguity and verify local history behavior.
5. Reconcile deployment parity, exercise product paths and complete crawler/mobile checks before requesting review.

## Audit limitations

Workspace source, routes, product implementation and public production text reviewed 20 November 2026. Installed Next.js 16.2.6 App Router docs for layouts/pages, metadata, route handlers and project structure were consulted. Text crawler inspection is not interactive QA or direct response/header inspection. No Google account, DNS, Search Console or AdSense dashboard access was available. Only this report is created; no application/content/SEO/deployment code changed.
