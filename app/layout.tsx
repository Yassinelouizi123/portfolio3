import type React from "react"
import type { Metadata, Viewport } from "next"
import { Playfair_Display, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { LanguageProvider } from "@/components/language-provider"
import "./globals.css"

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
})

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
})

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL
  ? new URL(process.env.NEXT_PUBLIC_SITE_URL)
  : new URL("https://portfolio-2-git-main-yassines-projects-5dbdc56a.vercel.app")

export const metadata: Metadata = {
  metadataBase: siteUrl,
  title: {
    default: "Yassine Louizi | Cybersecurity & Penetration Testing",
    template: "%s | Yassine Louizi",
  },
  description:
    "Top 1% TryHackMe hacker. Offensive Security specialist in penetration testing, web security, cloud defense, and CTF operations.",
  keywords: [
    "Yassine Louizi",
    "cybersecurity",
    "penetration testing",
    "offensive security",
    "TryHackMe",
    "ENSAM Casablanca",
    "cloud security",
    "bug bounty",
    "ethical hacking",
    "security researcher",
  ],
  authors: [{ name: "Yassine Louizi", url: "https://github.com/Yassinelouizi123" }],
  generator: "Next.js",
  openGraph: {
    title: "Yassine Louizi | Cybersecurity & Penetration Testing",
    description:
      "Offensive security specialist and top 1% TryHackMe hacker. Penetration testing, cloud security, and vulnerability research.",
    url: siteUrl.toString(),
    siteName: "Yassine Louizi",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/cyber-security2.png",
        width: 1200,
        height: 630,
        alt: "Yassine Louizi | Cybersecurity & Penetration Testing",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Yassine Louizi | Cybersecurity & Penetration Testing",
    description:
      "Offensive security specialist and top 1% TryHackMe hacker. Penetration testing, cloud security, and vulnerability research.",
    images: ["/cyber-security2.png"],
    creator: "@Yassinelouizi123",
  },
  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: [
    { rel: "icon", url: "/cyber-security2.png", type: "image/png" },
    { rel: "shortcut icon", url: "/cyber-security2.png" },
    { rel: "apple-touch-icon", url: "/cyber-security2.png" },
  ],
}

export const viewport: Viewport = {
  themeColor: "#1a1a1a",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${geistMono.variable}`}>
      <body className="font-sans antialiased overflow-x-hidden">
        <div className="noise-overlay" />
        <LanguageProvider>{children}</LanguageProvider>
        <Analytics />
      </body>
    </html>
  )
}
