import { getAllArticles } from "./data/articles";

export default function sitemap() {
  const baseUrl = "https://speedytype.com";
  const now = new Date().toISOString();

  // Core static pages
  const staticRoutes = [
    { url: `${baseUrl}`, lastModified: now, changeFrequency: "daily", priority: 1.0 },
    { url: `${baseUrl}/typing-test`, lastModified: now, changeFrequency: "daily", priority: 0.95 },
    { url: `${baseUrl}/typing-practice`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/typing-speed`, lastModified: now, changeFrequency: "weekly", priority: 0.85 },
    { url: `${baseUrl}/typing-accuracy`, lastModified: now, changeFrequency: "weekly", priority: 0.85 },
    { url: `${baseUrl}/lessons`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/games`, lastModified: now, changeFrequency: "weekly", priority: 0.85 },
    { url: `${baseUrl}/themes`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/scores`, lastModified: now, changeFrequency: "monthly", priority: 0.75 },
    { url: `${baseUrl}/settings`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/blog`, lastModified: now, changeFrequency: "daily", priority: 0.9 },
    { url: `${baseUrl}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/contact`, lastModified: now, changeFrequency: "monthly", priority: 0.75 },
    { url: `${baseUrl}/privacy-policy`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/terms`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/disclaimer`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
  ];

  // Dynamic blog articles
  const articles = getAllArticles();
  const blogRoutes = articles.map((article) => ({
    url: `${baseUrl}/blog/${article.slug}`,
    lastModified: new Date(article.updatedAt || article.publishedAt).toISOString(),
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  return [...staticRoutes, ...blogRoutes];
}
