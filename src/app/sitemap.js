// app/sitemap.js
export default function sitemap() {
  const baseUrl = "https://miraz-shop-client.vercel.app";

  return [
    { url: baseUrl, lastModified: new Date() },
    { url: `${baseUrl}/kids-learning`, lastModified: new Date() },
    { url: `${baseUrl}/mens-watches`, lastModified: new Date() },
    { url: `${baseUrl}/beauty-health`, lastModified: new Date() },
  ];
}