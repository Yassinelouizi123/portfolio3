import { NextResponse } from "next/server"

const robots = `User-agent: *
Allow: /

Sitemap: /sitemap.xml
Host: https://portfolio-2-git-main-yassines-projects-5dbdc56a.vercel.app
` 

export function GET() {
  return new NextResponse(robots, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
    },
  })
}
