import type { APIRoute } from "astro";
import { siteConfig } from "../config";
import { requireSite, xmlHeaders } from "../modules/seo/http";

export const GET: APIRoute = async ({ site }) => {
  const siteUrl = requireSite(site, "RSS");
  const rssXml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${siteConfig.name}</title>
    <link>${new URL("/", siteUrl).toString()}</link>
    <description>${siteConfig.description}</description>
    <language>en</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${new URL("/rss.xml", siteUrl).toString()}" rel="self" type="application/rss+xml" />
  </channel>
</rss>
`;

  return new Response(rssXml, {
    headers: xmlHeaders("application/xml")
  });
};
