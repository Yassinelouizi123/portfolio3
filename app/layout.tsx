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

export const metadata: Metadata = {
  title: "Yassine Louizi | Cybersecurity & Penetration Testing",
  description: "Top 1% TryHackMe hacker. Offensive Security specialist | Penetration Testing | Web Security | CTF Champion",
  generator: 'v0.app',
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
