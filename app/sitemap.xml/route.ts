import { NextResponse } from "next/server"

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://portfolio-2-git-main-yassines-projects-5dbdc56a.vercel.app"

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="https://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${siteUrl}</loc>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>`

export function GET() {
  return new NextResponse(sitemap, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
    },
  })
}
