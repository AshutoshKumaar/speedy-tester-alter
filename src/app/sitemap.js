import { getAllArticles } from "./data/articles";

const LAST_UPDATED = "2026-11-25";

export default function sitemap() {
  const baseUrl = "https://www.speedytypeapp.com";

  // Keep these dates aligned with the latest meaningful source change for each route.
  // Omit lastModified where the repository does not provide a dependable date.
  const staticRoutes = [
    { url: `${baseUrl}`, lastModified: LAST_UPDATED, changeFrequency: "daily", priority: 1.0 },
    { url: `${baseUrl}/typing-test`, lastModified: LAST_UPDATED, changeFrequency: "daily", priority: 0.95 },
    { url: `${baseUrl}/typing-practice`, lastModified: LAST_UPDATED, changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/typing-speed`, lastModified: LAST_UPDATED, changeFrequency: "weekly", priority: 0.85 },
    { url: `${baseUrl}/typing-accuracy`, lastModified: LAST_UPDATED, changeFrequency: "weekly", priority: 0.85 },
    { url: `${baseUrl}/lessons`, lastModified: LAST_UPDATED, changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/games`, lastModified: LAST_UPDATED, changeFrequency: "weekly", priority: 0.85 },
    { url: `${baseUrl}/blog`, lastModified: LAST_UPDATED, changeFrequency: "daily", priority: 0.9 },
    { url: `${baseUrl}/about`, lastModified: LAST_UPDATED, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/contact`, lastModified: LAST_UPDATED, changeFrequency: "monthly", priority: 0.75 },
    { url: `${baseUrl}/privacy-policy`, lastModified: LAST_UPDATED, changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/terms`, lastModified: LAST_UPDATED, changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/disclaimer`, lastModified: LAST_UPDATED, changeFrequency: "monthly", priority: 0.7 },
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
