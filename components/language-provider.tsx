"use client"

import { createContext, useContext, useEffect, useMemo, useState } from "react"

export type Language = "en" | "fr"

type LanguageContextValue = {
  language: Language
  setLanguage: (language: Language) => void
  toggleLanguage: () => void
  t: typeof translations.en
}

const translations = {
  en: {
    nav: {
      links: [
        { label: "About Me", href: "#about" },
        { label: "Philosophy", href: "#philosophy" },
        { label: "Projects", href: "#works" },
        { label: "Technical Arsenal", href: "#skills" },
        { label: "Contact Me", href: "#contact" },
      ],
      availability: "AVAILABLE FOR WORK",
    },
    hero: {
      topLine: "JR.PENETRATION",
      topLineItalic: "TESTER",
      bottomLine: "SECURITY",
      bottomLineItalic: "RESEARCHER",
      button: "Explore",
      scroll: "Scroll",
    },
    aboutMe: {
      sectionLabel: "01 — ABOUT ME",
      title: "Who I Am",
      highlightText: "top 1% globally on TryHackMe",
      paragraphs: [
        "I'm Yassine Louizi, a 5th year engineering student in Cybersecurity & Cloud at ENSAM Casablanca, passionate about offensive security and vulnerability exploitation.",
        "I rank in the top 1% globally on TryHackMe (+220 rooms completed) and have practical experience from a pentest internship at OCP Group, where I discovered a critical P1 bypass.",
        "Currently, I am seeking a PFA internship in offensive security to further apply my skills in real-world scenarios, leveraging my background in CTFs, malware analysis, and cloud infrastructure.",
      ],
      skills: [
        {
          category: "Offensive Security",
          items: ["Burp Suite", "OWASP ZAP", "SQLmap", "ffuf", "Metasploit", "Hydra", "Hashcat", "John", "Privilege Escalation", "Binary Exploitation"],
        },
        {
          category: "Infrastructure & Cloud",
          items: ["Docker", "Proxmox VE", "Terraform", "Ansible", "Linux (Parrot, Debian)"],
        },
        {
          category: "Reconnaissance & Analysis",
          items: ["Amass", "Subfinder", "Nmap", "Gobuster", "Dirsearch", "Google Dorks", "Wireshark", "OWASP Top 10"],
        },
        {
          category: "Development & Malware",
          items: ["Python", "Bash", "C", "SQL", "Static & Dynamic Analysis", "Reverse Engineering"],
        },
      ],
      highlights: {
        recognition: {
          label: "RECOGNITION",
          value: "Top 1%",
          description: "TryHackMe Global Ranking",
        },
        expertise: {
          label: "EXPERTISE",
          value: "6 Certs",
          description: "THM, Cisco, Red Hat & SBT",
        },
        focus: {
          label: "FOCUS",
          value: "Offensive",
          description: "Penetration Testing",
        },
      },
      certificationsTitle: "CERTIFICATIONS",
      certifications: [
        { title: "Junior Penetration Tester", issuer: "TryHackMe (2025)" },
        { title: "Web Application Pentesting", issuer: "TryHackMe (2026)" },
        { title: "Intro to Penetration Testing", issuer: "Security Blue Team (2025)" },
        { title: "Intro to OSINT", issuer: "Security Blue Team" },
        { title: "Cisco Cybersecurity Essentials", issuer: "Cisco Networking Academy" },
        { title: "CCNA: Introduction to Networks", issuer: "Cisco Partner" },
      ],
    },
    about: {
      sectionLabel: "02 — PHILOSOPHY",
      title: "Security Philosophy",
      statements: [
        "Offensive security is about thinking like an attacker.",
        "Vulnerabilities are invitations to improve defenses.",
        "Every bypass teaches us a lesson.",
        "Exploitation is just systematic problem-solving.",
        "Security is everybody's responsibility.",
      ],
    },
    works: {
      sectionLabel: "03 — PROJECTS",
      title: "Security Research & Development",
      projects: [
        { title: "Bastion WAF", tags: ["Docker", "ModSecurity", "Python"], year: "2025" },
        { title: "AegisCTF Platform", tags: ["Proxmox", "Kali", "RAG AI"], year: "2025" },
        { title: "Malware Detection ML", tags: ["Python", "Random Forest", "PE/ELF"], year: "2024" },
        { title: "SOC + ML Pipeline", tags: ["Docker", "Wazuh", "Isolation Forest"], year: "2024" },
        { title: "JWT Inspector", tags: ["Automation", "Security Audit", "Brute-force"], year: "2024" },
        { title: "Recon-Dorker", tags: ["OSINT", "Google Dorks", "Automation"], year: "2024" },
      ],
    },
    tech: {
      sectionLabel: "04 — TECHNICAL ARSENAL",
      techItems: ["BURP SUITE", "OWASP ZAP", "METASPLOIT", "SQLMAP", "PYTHON", "BASH", "DOCKER", "LINUX", "NMAP", "WIRESHARK", "HASHCAT", "FFUF"],
      concepts: ["WEB SECURITY", "PRIVILEGE ESCALATION", "REVERSE ENGINEERING", "MALWARE ANALYSIS", "OSINT", "RECONNAISSANCE", "EXPLOITATION", "FORENSICS", "THREAT HUNTING", "SOC OPERATIONS", "INFRASTRUCTURE", "CLOUD SECURITY"],
    },
    footer: {
      ctaTitle: "Let's",
      ctaItalic: "Connect",
      localTime: "LOCAL TIME",
      emailLabel: "Or email me directly at",
      copyright: "©",
    },
    contact: {
      title: "Let's Talk",
      header: "CONTACT",
      name: "NAME",
      email: "EMAIL",
      message: "MESSAGE",
      placeholderName: "Your name",
      placeholderEmail: "your@email.com",
      placeholderMessage: "Your message here...",
      submit: "SEND MESSAGE",
      submitting: "SENDING...",
      success: "Message sent successfully! I'll get back to you soon.",
      note: "Or email me directly at",
      emailAddress: "louiziyassine003@gmail.com",
    },
  },
  fr: {
    nav: {
      links: [
        { label: "À propos", href: "#about" },
        { label: "Philosophie", href: "#philosophy" },
        { label: "Projets", href: "#works" },
        { label: "Arsenal technique", href: "#skills" },
        { label: "Contact", href: "#contact" },
      ],
      availability: "DISPONIBLE POUR TRAVAIL",
    },
    hero: {
      topLine: "TESTEUR",
      topLineItalic: "PÉNÉTRATION",
      bottomLine: "RECHERCHEUR",
      bottomLineItalic: "EN SÉCURITÉ",
      button: "Explorer",
      scroll: "Défiler",
    },
    aboutMe: {
      sectionLabel: "01 — À PROPOS",
      title: "Qui je suis",
      highlightText: "top 1 % mondial sur TryHackMe",
      paragraphs: [
        "Je suis Yassine Louizi, étudiant en cinquième année en cybersécurité et cloud à l'ENSAM Casablanca, passionné par la sécurité offensive et l'exploitation des vulnérabilités.",
        "Je me classe dans le top 1 % mondial sur TryHackMe (+220 salles complétées) et j'ai une expérience pratique issue d'un stage en pentest chez OCP Group, où j'ai découvert une faille critique de niveau P1.",
        "Actuellement, je cherche un stage PFA en sécurité offensive pour appliquer mes compétences dans des scénarios réels, en m'appuyant sur mon expérience en CTF, analyse de malware et infrastructure cloud.",
      ],
      skills: [
        {
          category: "Sécurité offensive",
          items: ["Burp Suite", "OWASP ZAP", "SQLmap", "ffuf", "Metasploit", "Hydra", "Hashcat", "John", "Escalade de privilèges", "Exploitation binaire"],
        },
        {
          category: "Infrastructure & Cloud",
          items: ["Docker", "Proxmox VE", "Terraform", "Ansible", "Linux (Parrot, Debian)"],
        },
        {
          category: "Reconnaissance & Analyse",
          items: ["Amass", "Subfinder", "Nmap", "Gobuster", "Dirsearch", "Google Dorks", "Wireshark", "OWASP Top 10"],
        },
        {
          category: "Développement & Malware",
          items: ["Python", "Bash", "C", "SQL", "Analyse statique & dynamique", "Ingénierie inverse"],
        },
      ],
      highlights: {
        recognition: {
          label: "RECONNAISSANCE",
          value: "Top 1%",
          description: "Classement mondial TryHackMe",
        },
        expertise: {
          label: "EXPERTISE",
          value: "6 certifs",
          description: "THM, Cisco, Red Hat & SBT",
        },
        focus: {
          label: "FOCALISATION",
          value: "Offensive",
          description: "Tests d'intrusion",
        },
      },
      certificationsTitle: "CERTIFICATIONS",
      certifications: [
        { title: "Junior Penetration Tester", issuer: "TryHackMe (2025)" },
        { title: "Web Application Pentesting", issuer: "TryHackMe (2026)" },
        { title: "Intro to Penetration Testing", issuer: "Security Blue Team (2025)" },
        { title: "Intro to OSINT", issuer: "Security Blue Team" },
        { title: "Cisco Cybersecurity Essentials", issuer: "Cisco Networking Academy" },
        { title: "CCNA: Introduction to Networks", issuer: "Cisco Partner" },
      ],
    },
    about: {
      sectionLabel: "02 — PHILOSOPHIE",
      title: "Philosophie de sécurité",
      statements: [
        "La sécurité offensive consiste à penser comme un attaquant.",
        "Les vulnérabilités sont des invitations à renforcer les défenses.",
        "Chaque contournement nous enseigne une leçon.",
        "L'exploitation est avant tout une résolution systématique de problèmes.",
        "La sécurité est la responsabilité de chacun.",
      ],
    },
    works: {
      sectionLabel: "03 — PROJETS",
      title: "Recherche et développement en sécurité",
      projects: [
        { title: "Bastion WAF", tags: ["Docker", "ModSecurity", "Python"], year: "2025" },
        { title: "Plateforme AegisCTF", tags: ["Proxmox", "Kali", "IA RAG"], year: "2025" },
        { title: "Détection de malware par ML", tags: ["Python", "Random Forest", "PE/ELF"], year: "2024" },
        { title: "Pipeline SOC + ML", tags: ["Docker", "Wazuh", "Isolation Forest"], year: "2024" },
        { title: "JWT Inspector", tags: ["Automatisation", "Audit sécurité", "Brute-force"], year: "2024" },
        { title: "Recon-Dorker", tags: ["OSINT", "Google Dorks", "Automatisation"], year: "2024" },
      ],
    },
    tech: {
      sectionLabel: "04 — ARSENAL TECHNIQUE",
      techItems: ["BURP SUITE", "OWASP ZAP", "METASPLOIT", "SQLMAP", "PYTHON", "BASH", "DOCKER", "LINUX", "NMAP", "WIRESHARK", "HASHCAT", "FFUF"],
      concepts: ["SÉCURITÉ WEB", "ÉLÉVATION DE PRIVILÈGES", "INGÉNIERIE INVERSE", "ANALYSE DE MALWARE", "OSINT", "RECONNAISSANCE", "EXPLOITATION", "CRIMINALISTIQUE", "THREAT HUNTING", "OPÉRATIONS SOC", "INFRASTRUCTURE", "SÉCURITÉ CLOUD"],
    },
    footer: {
      ctaTitle: "Prenons",
      ctaItalic: "contact",
      localTime: "HEURE LOCALE",
      emailLabel: "Ou écrivez-moi directement à",
      copyright: "©",
    },
    contact: {
      title: "Discutons-en",
      header: "CONTACT",
      name: "NOM",
      email: "EMAIL",
      message: "MESSAGE",
      placeholderName: "Votre nom",
      placeholderEmail: "votre@email.com",
      placeholderMessage: "Votre message ici...",
      submit: "ENVOYER LE MESSAGE",
      submitting: "ENVOI...",
      success: "Message envoyé avec succès ! Je vous répondrai bientôt.",
      note: "Ou écrivez-moi directement à",
      emailAddress: "louiziyassine003@gmail.com",
    },
  },
}

const LanguageContext = createContext<LanguageContextValue | undefined>(undefined)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>("en")

  useEffect(() => {
    const stored = window.localStorage.getItem("portfolio-language")
    if (stored === "en" || stored === "fr") {
      setLanguage(stored)
    }
  }, [])

  useEffect(() => {
    window.localStorage.setItem("portfolio-language", language)
    document.documentElement.lang = language === "fr" ? "fr" : "en"
  }, [language])

  const value = useMemo(
    () => ({
      language,
      setLanguage,
      toggleLanguage: () => setLanguage((prev) => (prev === "en" ? "fr" : "en")),
      t: translations[language],
    }),
    [language],
  )

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
