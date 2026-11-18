import { getAllArticles } from "./data/articles";

export default function sitemap() {
  const baseUrl = "https://www.speedytypeapp.com";

  // Keep these dates aligned with the latest meaningful source change for each route.
  // Omit lastModified where the repository does not provide a dependable date.
  const staticRoutes = [
    { url: `${baseUrl}`, lastModified: "2026-10-18", changeFrequency: "daily", priority: 1.0 },
    { url: `${baseUrl}/typing-test`, lastModified: "2026-10-18", changeFrequency: "daily", priority: 0.95 },
    { url: `${baseUrl}/typing-practice`, lastModified: "2026-10-18", changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/typing-speed`, lastModified: "2026-10-18", changeFrequency: "weekly", priority: 0.85 },
    { url: `${baseUrl}/typing-accuracy`, lastModified: "2026-09-26", changeFrequency: "weekly", priority: 0.85 },
    { url: `${baseUrl}/lessons`, lastModified: "2026-09-26", changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/games`, lastModified: "2026-09-26", changeFrequency: "weekly", priority: 0.85 },
    { url: `${baseUrl}/blog`, lastModified: "2026-10-18", changeFrequency: "daily", priority: 0.9 },
    { url: `${baseUrl}/about`, lastModified: "2026-10-18", changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/contact`, lastModified: "2026-10-18", changeFrequency: "monthly", priority: 0.75 },
    { url: `${baseUrl}/privacy-policy`, lastModified: "2026-10-18", changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/terms`, lastModified: "2026-10-18", changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/disclaimer`, lastModified: "2026-10-18", changeFrequency: "monthly", priority: 0.7 },
  ];

  // Dynamic blog articles
  const articles = getAllArticles();
  const blogRoutes = articles.map((article) => {
    const route = {
      url: `${baseUrl}/blog/${article.slug}`,
      changeFrequency: "weekly",
      priority: 0.8,
    };
    const modifiedAt = article.updatedAt || article.publishedAt;

    if (modifiedAt && !Number.isNaN(Date.parse(modifiedAt)) && new Date(modifiedAt) <= new Date()) {
      route.lastModified = modifiedAt;
    }

    return route;
  });

  return [...staticRoutes, ...blogRoutes];
}
