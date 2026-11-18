import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const sitemapPath = new URL("../.next/server/app/sitemap.xml.body", import.meta.url);
const sitemapXml = await readFile(sitemapPath, "utf8");
const articleDataPath = new URL("../src/app/data/articles.js", import.meta.url);
const articleData = await readFile(articleDataPath, "utf8");
const expectedArticleSlugs = [...articleData.matchAll(/^\s{4}slug: "([^"]+)",$/gm)].map(([, slug]) => slug);
const entries = [...sitemapXml.matchAll(/<url>([\s\S]*?)<\/url>/g)].map(([, block]) => ({
  url: block.match(/<loc>([^<]+)<\/loc>/)?.[1],
  lastModified: block.match(/<lastmod>([^<]+)<\/lastmod>/)?.[1],
}));

const urls = entries.map(({ url }) => url);
const uniqueUrls = new Set(urls);
const duplicateUrls = [...new Set(urls.filter((url, index) => urls.indexOf(url) !== index))];
const staticEntries = entries.filter(({ url }) => url && !url.includes("/blog/"));
const blogEntries = entries.filter(({ url }) => url?.includes("/blog/"));
const expectedStaticPaths = new Set([
  "/",
  "/typing-test",
  "/typing-practice",
  "/typing-speed",
  "/typing-accuracy",
  "/lessons",
  "/games",
  "/blog",
  "/about",
  "/contact",
  "/privacy-policy",
  "/terms",
  "/disclaimer",
]);

assert.equal(entries.length, 26, "Expected 26 total sitemap entries.");
assert.equal(uniqueUrls.size, 26, "Expected 26 unique sitemap URLs.");
assert.deepEqual(duplicateUrls, [], "Sitemap contains duplicate URLs.");
assert.equal(staticEntries.length, 13, "Expected 13 static sitemap URLs.");
assert.equal(blogEntries.length, 13, "Expected 13 blog sitemap URLs.");
assert.equal(expectedArticleSlugs.length, 13, "Expected 13 source blog articles.");

const expectedBlogUrls = new Set(
  expectedArticleSlugs.map((slug) => `https://www.speedytypeapp.com/blog/${slug}`),
);
assert.deepEqual(
  new Set(blogEntries.map(({ url }) => url)),
  expectedBlogUrls,
  "Sitemap blog URLs do not match the expected article URLs.",
);

for (const excludedPath of ["/scores", "/settings", "/themes"]) {
  assert.ok(
    !urls.includes(`https://www.speedytypeapp.com${excludedPath}`),
    `${excludedPath} must not be included in the sitemap.`,
  );
}

for (const url of urls) {
  assert.ok(url, "Every sitemap entry must contain a URL.");
  const parsedUrl = new URL(url);
  assert.equal(parsedUrl.origin, "https://www.speedytypeapp.com", `Unexpected sitemap origin: ${url}`);
}

assert.deepEqual(
  new Set(staticEntries.map(({ url }) => new URL(url).pathname)),
  expectedStaticPaths,
  "Static sitemap routes do not match the intended route inventory.",
);

const now = new Date();
for (const { url, lastModified } of entries) {
  if (!lastModified) continue;
  assert.ok(!Number.isNaN(Date.parse(lastModified)), `Invalid lastModified for ${url}: ${lastModified}`);
  assert.ok(new Date(lastModified) <= now, `Future lastModified for ${url}: ${lastModified}`);
}

console.log(`Validated ${entries.length} sitemap entries (${uniqueUrls.size} unique): 13 static, 13 blog; no duplicates or future dates.`);
