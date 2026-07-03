import { Navbar } from "@/components/navbar"
import { Hero } from "@/components/hero"
import { AboutMe } from "@/components/about-me"
import { About } from "@/components/about"
import { Works } from "@/components/works"
import { TechMarquee } from "@/components/tech-marquee"
import { Footer } from "@/components/footer"
import { CustomCursor } from "@/components/custom-cursor"
import { SmoothScroll } from "@/components/smooth-scroll"
import { SectionBlend } from "@/components/section-blend"
import { HackerCharacter } from "@/components/hacker-character"

export default function Home() {
  return (
    <SmoothScroll>
      <CustomCursor />
      <HackerCharacter />
      <Navbar />
      <main>
        <Hero />
        <SectionBlend />
        <AboutMe />
        <About />
        <Works />
        <TechMarquee />
        <Footer />
      </main>
    </SmoothScroll>
  )
}
