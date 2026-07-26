import type { APIRoute } from "astro";
import { requireSite, xmlHeaders } from "../modules/seo/http";

export const GET: APIRoute = async ({ site }) => {
  const siteUrl = requireSite(site, "Sitemap");
  const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${new URL("/", siteUrl).toString()}</loc>
  </url>
  <url>
    <loc>${new URL("/rss.xml", siteUrl).toString()}</loc>
  </url>
</urlset>
`;

  return new Response(sitemapXml, {
    headers: xmlHeaders("application/xml")
  });
};
