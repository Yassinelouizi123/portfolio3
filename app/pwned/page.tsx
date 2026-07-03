"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Skull, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

interface TerminalLine {
  type: "output" | "input" | "error" | "success"
  content: string
  timestamp?: string
}

export default function PwnedPage() {
  const [currentLine, setCurrentLine] = useState(0)
  const [displayedText, setDisplayedText] = useState<string[]>([])
  const [showTerminal, setShowTerminal] = useState(false)
  const [terminalLines, setTerminalLines] = useState<TerminalLine[]>([])
  const [currentInput, setCurrentInput] = useState("")
  const [commandHistory, setCommandHistory] = useState<string[]>([])
  const [historyIndex, setHistoryIndex] = useState(-1)
  const [matrixRain, setMatrixRain] = useState<Array<{ id: number; left: number; delay: number }>>([])
  const inputRef = useRef<HTMLInputElement>(null)
  const terminalRef = useRef<HTMLDivElement>(null)
  const fileCandidates = [".env", "skills/", "projects/", "about.txt", "contact.txt", "cv.pdf"]

  // Function to scroll terminal to bottom
  const scrollToBottom = () => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight
    }
  }

  // Update scroll position when terminal lines change
  useEffect(() => {
    scrollToBottom()
  }, [terminalLines, displayedText])

  const hackingSequence = [
    "INITIALIZING HACK SEQUENCE...",
    "Scanning network topology...",
    "Found target: portfolio-visitor.local",
    "Attempting SQL injection... FAILED",
    "Trying buffer overflow... FAILED",
    "Attempting social engineering... FAILED",
    "Running custom exploit... FAILED",
    "Trying password: 'password123'... FAILED",
    "Trying password: 'admin'... FAILED",
    "Trying password: 'qwerty'... FAILED",
    "Accessing mainframe... FAILED",
    "Bypassing firewall... FAILED",
    "Cracking encryption... FAILED",
    "",
    "WAIT... WHAT?!",
    "",
    "ERROR: TARGET TOO SECURE!",
    "ERROR: VISITOR HAS GOOD CYBERSECURITY KNOWLEDGE!",
    "ERROR: CANNOT PENETRATE DEFENSES!",
    "",
    "ABORT MISSION! ABORT MISSION!",
    "",
    "Just kidding! 😄",
    "",
    "You've been PRANKED, not PWNED!",
    "Welcome to Yassine's Interactive Terminal!",
    "",
    "Type 'help' to see available commands.",
    "Type 'home' to return to the main portfolio.",
  ]

  const skills = {
    programming: ["Python", "C", "Java", "JavaScript", "PHP", "TypeScript", "Bash"],
    database: ["SQL", "Oracle SQL", "SQLite"],
    markup: ["HTML", "CSS"],
    frameworks: ["React", "Next.js"],
    virtualization: ["Proxmox VE", "VirtualBox", "VM Management"],
    cybersecurity: ["Ethical Hacking", "Network Security", "Cryptography", "Penetration Testing"],
  }

  const commands = {
    help: () => [
      "Available commands:",
      "  help          - Show this help message",
      "  home          - Return to main portfolio",
      "  ls            - List available sections",
      "  ls -l         - Detailed listing with permissions",
      "  ls -la        - Detailed listing with hidden files",
      "  skills        - Display technical skills",
      "  whoami        - Display user information",
      "  download-cv   - Download CV/Resume",
      "  echo <text>   - Print text to the terminal",
      "  uptime        - Show system uptime",
      "  clear         - Clear terminal",
      "  neofetch      - Display system information",
      "  cat <file>    - Display file contents (try: about, contact)",
      "  pwd           - Print working directory",
      "  date          - Display current date and time",
      "  uname         - Print system information",
      "  id            - Print user identity",
      "  exit          - Return to main portfolio",
      "  rickroll      - Surprise",
    ],

    home: () => {
      window.location.href = "/"
      return ["Redirecting to main portfolio..."]
    },

    exit: () => {
      window.location.href = "/"
      return ["Goodbye! Redirecting to main portfolio..."]
    },

    ls: (args?: string[]) => {
      const argList = args || []
      const argSet = new Set(argList)
      const hasL = argSet.has("-l") || argSet.has("-la") || argSet.has("-al")
      const hasA = argSet.has("-a") || argSet.has("-la") || argSet.has("-al")

      const longListing = [
        "total 8",
        "drwxr-xr-x  2 yassine yassine 4096 Dec 28 2024 skills/",
        "drwxr-xr-x  2 yassine yassine 4096 Dec 28 2024 projects/",
        "-rw-r--r--  1 yassine yassine 1024 Dec 28 2024 about.txt",
        "-rw-r--r--  1 yassine yassine  512 Dec 28 2024 contact.txt",
        "-rw-r--r--  1 yassine yassine 2048 Dec 28 2024 cv.pdf",
      ]

      const longWithHidden = [
        "total 12",
        "drwxr-xr-x  3 yassine yassine 4096 Dec 28 2024 .",
        "drwxr-xr-x  4 yassine yassine 4096 Dec 28 2024 ..",
        "-rw-r--r--  1 yassine yassine  256 Sep 10 2025 .env",
        ...longListing,
      ]

      if (hasL && hasA) return longWithHidden
      if (hasL) return longListing
      if (hasA) return [".env", "skills/", "projects/", "about.txt", "contact.txt", "cv.pdf"]

      // default: show only names (files & folders)
      return ["skills/", "projects/", "about.txt", "contact.txt", "cv.pdf"]
    },

    skills: () => {
      const result = ["=== TECHNICAL SKILLS ===", ""]
      Object.entries(skills).forEach(([category, skillList]) => {
        result.push(`${category.toUpperCase()}:`)
        skillList.forEach((skill) => result.push(`  • ${skill}`))
        result.push("")
      })
      return result
    },

    whoami: () => [
      "yassine",
      "",
      "Full Name:  Louizi Yassine",
      "Role: Cybersecurity & Cloud Computing Student",
      "School: ENSAM Casablanca",
      "Specialization: Information Security & Ethical Hacking",
      "Location: Casablanca, Morocco",
    ],

    "download-cv": () => {
      // Create a hidden link element for direct download
      const downloadLink = document.createElement("a")
      downloadLink.href = "/Louizi-Yassine.pdf"
      downloadLink.download = "Louizi-Yassine.pdf" // Forces download
      document.body.appendChild(downloadLink)
      downloadLink.click()
      document.body.removeChild(downloadLink)

      // Open in new tab as well
      window.open("/Louizi-Yassine.pdf", "_blank")

      return [
        "Initiating CV download...",
        "File: Louizi-Yassine.pdf",
        "Status: ✅ Download started",
        "Status: ✅ Opening in new tab",
        "",
        "Check your downloads folder!",
      ]
    },

    clear: () => {
      setTerminalLines([])
      return []
    },

    neofetch: () => [
      "                   -`                    yassine@portfolio-terminal",
      "                  .o+`                   -------------------------",
      "                 `ooo/                   OS: Yassine's Portfolio OS",
      "                `+oooo:                  Host: Cybersecurity Terminal",
      "               `+oooooo:                 Kernel: Security-5.15.0",
      "               -+oooooo+:                Uptime: Always learning",
      "             `/:-:++oooo+:               Shell: bash 5.1.16",
      "            `/++++/+++++++:              Terminal: Interactive Web Terminal",
      "           `/++++++++++++++:             CPU: Brain (Cybersecurity focused)",
      "          `/+++ooooooooo+++/             Memory: Unlimited curiosity",
      "         ./ooosssso++osssssso+`          ",
      "        .oossssso-````/ossssss+`         Skills: Python, C, Java, JS, Bash, SQL",
      "       -osssssso.      :ssssssso.        Projects: Network Routing, Automata GUI",
      "      :osssssss/        osssso+++.       Formation: ENSAM Casablanca (2022–2027)",
      "     /ossssssss/        +ssssooo/-       Year: 3/5 - Cybersécurité & Cloud",
      "   `/ossssso+/:-        -:/+osssso+-     Certifs: Cisco, RedHat, Fortinet (en cours)",
      "  `+sso+:-`                 `.-/+oso:    Location: Casablanca, Morocco",
      " `++:.                           `-/+/   Contact: louiziyassine003@gmail.com",
      " .`                                 `/   LinkedIn: yassine-louizi-b57507363",
    ],

    pwd: () => ["/home/yassine/portfolio"],

    echo: (args: string[]) => {
      return [args.join(" ")]
    },

    uptime: () => {
      const now = Date.now()
      const uptimeMs = now - performance?.timeOrigin
      const seconds = Math.floor(uptimeMs / 1000)
      const minutes = Math.floor(seconds / 60)
      const hours = Math.floor(minutes / 60)
      return [`up ${hours} hours, ${minutes % 60} minutes, ${seconds % 60} seconds`]
    },

    rickroll: () => {
      const url = "https://www.youtube.com/watch?v=xvFZjo5PgG0&list=RDxvFZjo5PgG0&start_radio=1"
      // open in new tab
      if (typeof window !== "undefined") {
        window.open(url, "_blank")
      }
      return ["Opening... Enjoy!"]
    },

    uname: (args?: string[]) => {
      const base = "WebTermOS"
      const node = "yassine-portfolio"
      const release = "1.0.0"
      const machine = "x86_64"
      if (args && args.includes("-a")) {
        return [`${base} ${node} ${release} ${machine}`]
      }
      return [base]
    },

    id: () => {
      return ["uid=1000(yassine) gid=1000(yassine) groups=1000(yassine)"]
    },

    date: () => [new Date().toString()],

    cat: (args: string[]) => {
      const file = args[0]
      switch (file) {
        case "about":
        case "about.txt":
          return [
            "=== ABOUT  LOUIZI YASSINE ===",
            "",
            "I am a fifth-year engineering student specializing in Cybersecurity",
            "and Cloud Computing at ENSAM Casablanca. Passionate about information",
            "security, ethical hacking, and designing secure systems.",
            "",
            "I love tackling technical and strategic challenges, ranging from",
            "cryptography to secure programming. Quick learner and curious",
            "problem solver, motivated to progress through practical experiences.",
          ]
        case "contact":
        case "contact.txt":
          return [
            "=== CONTACT INFORMATION ===",
            "",
            "Email: louiziyassine003@gmail.com",
            "Phone: +212 644 265 462",
            "Location: Casablanca, Morocco",
            "LinkedIn: linkedin.com/in/yassine-louizi-b57507363",
            "GitHub: Available on request",
          ]
        default:
          return [`cat: ${file}: No such file or directory`]
      }
    },
  }

  // Matrix rain effect
  useEffect(() => {
    const drops: Array<{ id: number; left: number; delay: number }> = []
    for (let i = 0; i < 30; i++) {
      drops.push({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 10000,
      })
    }
    setMatrixRain(drops)
  }, [])

  // Initial hacking sequence
  useEffect(() => {
    if (currentLine < hackingSequence.length) {
      const timer = setTimeout(
        () => {
          setDisplayedText((prev) => [...prev, hackingSequence[currentLine]])
          setCurrentLine((prev) => prev + 1)
        },
        currentLine < 10 ? 800 : currentLine < 20 ? 400 : 1000,
      )
      return () => clearTimeout(timer)
    } else {
      setTimeout(() => {
        setShowTerminal(true)
        setTerminalLines([{ type: "success", content: 'Terminal ready. Type "help" for available commands.' }])
      }, 2000)
    }
  }, [currentLine])

  // Focus input when terminal is shown
  useEffect(() => {
    if (showTerminal && inputRef.current) {
      inputRef.current.focus()
    }
  }, [showTerminal])

  const executeCommand = (input: string) => {
    const trimmedInput = input.trim()
    if (!trimmedInput) return

    // Add command to history
    setCommandHistory((prev) => [trimmedInput, ...prev])
    setHistoryIndex(-1)

    // Add the command to terminal history
    setTerminalLines((prev) => [...prev, { type: "input", content: `$ ${trimmedInput}` }])

    // Split input into tokens while preserving quoted strings
    // Examples:
    //   echo hello world           -> ["echo","hello","world"]
    //   echo "hello world"         -> ["echo","hello world"]
    const tokens = trimmedInput.match(/(?:[^\s"']+|"[^"]*"|'[^']*')+/g) || []
    const cleaned = tokens.map((t) => {
      if ((t.startsWith('"') && t.endsWith('"')) || (t.startsWith("'") && t.endsWith("'"))) {
        return t.slice(1, -1)
      }
      return t
    })

    const [command, ...args] = cleaned

    if (command && commands[command as keyof typeof commands]) {
      const output = commands[command as keyof typeof commands](args)
      if (output.length > 0) {
        setTerminalLines((prev) => [...prev, ...output.map((line) => ({ type: "output" as const, content: line }))])
      }
    } else {
      setTerminalLines((prev) => [
        ...prev,
        { type: "error", content: `Command not found: ${command}. Type 'help' for available commands.` },
      ])
    }

    setCurrentInput("")
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault()
      executeCommand(currentInput)
    } else if (e.key === "Tab") {
      // Tab completion
      e.preventDefault()
      const trimmed = currentInput.trim()
      if (!trimmed) return
      const tokens = trimmed.split(/\s+/)
      const last = tokens[tokens.length - 1]
      // if first token (command) is being completed
      if (tokens.length === 1) {
        const candidates = Object.keys(commands).filter((c) => c.startsWith(last))
        if (candidates.length === 1) {
          setCurrentInput(candidates[0] + " ")
        } else if (candidates.length > 1) {
          setTerminalLines((prev) => [...prev, ...candidates.map((c) => ({ type: "output" as const, content: c }))])
        }
        return
      }

      // completing file names for commands like ls, cat
      const candidates = fileCandidates.filter((f) => f.startsWith(last))
      if (candidates.length === 1) {
        tokens[tokens.length - 1] = candidates[0]
        setCurrentInput(tokens.join(" ") + (candidates[0].endsWith("/") ? "" : " "))
      } else if (candidates.length > 1) {
        setTerminalLines((prev) => [...prev, ...candidates.map((c) => ({ type: "output" as const, content: c }))])
      }
    } else if (e.key === "ArrowUp") {
      e.preventDefault()
      navigateHistory("up")
    } else if (e.key === "ArrowDown") {
      e.preventDefault()
      navigateHistory("down")
    }
  }

  // Handle mobile input submit
  const handleMobileSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    executeCommand(currentInput)
  }

  // Update mobile keyboard behavior
  const handleInputFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    // Scroll to input when focused on mobile
    if (window.innerWidth < 640) {
      setTimeout(() => {
        e.target.scrollIntoView({ behavior: "smooth", block: "center" })
      }, 100)
    }
  }

  // Prevent default scroll behavior on arrow keys
  useEffect(() => {
    const preventArrowScroll = (e: KeyboardEvent) => {
      if (["ArrowUp", "ArrowDown"].includes(e.key)) {
        e.preventDefault()
      }
    }

    window.addEventListener("keydown", preventArrowScroll)
    return () => window.removeEventListener("keydown", preventArrowScroll)
  }, [])

  const navigateHistory = (direction: "up" | "down") => {
    if (direction === "up") {
      if (historyIndex < commandHistory.length - 1) {
        setHistoryIndex((prev) => prev + 1)
        setCurrentInput(commandHistory[historyIndex + 1] || "")
      }
    } else if (direction === "down") {
      if (historyIndex > 0) {
        setHistoryIndex((prev) => prev - 1)
        setCurrentInput(commandHistory[historyIndex - 1] || "")
      } else if (historyIndex === 0) {
        setCurrentInput("")
      }
    }
  }

  return (
    <div className="min-h-screen bg-[#050505] text-emerald-400 font-mono relative overflow-hidden">
      <div className="noise-overlay" />

      <div className="relative z-10 container mx-auto px-2 sm:px-4 py-2 sm:py-4">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-center justify-between mb-4 sm:mb-8 space-y-4 sm:space-y-0">
          <div className="flex items-center space-x-4">
            <div className="w-6 h-6 sm:w-8 sm:h-8 bg-white/5 rounded border border-white/10 flex items-center justify-center">
              <Skull className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-400" />
            </div>
            <h1 className="text-lg sm:text-2xl font-light tracking-widest text-foreground/90">KIRKINATOR PROTOCOL 2.1</h1>
          </div>

          <Link href="/">
            <Button className="w-full sm:w-auto bg-transparent border border-white/10 text-muted-foreground hover:text-foreground hover:border-white/30 transition-all">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Portfolio
            </Button>
          </Link>
        </div>

        {/* Terminal window */}
        <div className="bg-[#050505] border border-white/10 rounded-md p-4 sm:p-6 shadow-2xl h-[75vh] sm:h-[80vh] flex flex-col">
          {/* Terminal header */}
          <div className="flex items-center space-x-2 mb-2 sm:mb-4 pb-2 border-b border-white/10 flex-shrink-0">
            <div className="w-2 h-2 sm:w-3 sm:h-3 bg-emerald-500 rounded-full"></div>
            <div className="w-2 h-2 sm:w-3 sm:h-3 bg-yellow-500 rounded-full"></div>
            <div className="w-2 h-2 sm:w-3 sm:h-3 bg-emerald-500 rounded-full"></div>
            <span className="ml-2 sm:ml-4 text-sm sm:text-base text-emerald-400/70">yassine@portfolio-terminal:~$</span>
          </div>

          {/* Terminal content */}
          <div
            ref={terminalRef}
            className="space-y-1 sm:space-y-2 flex-1 overflow-y-auto terminal-scrollbar text-sm sm:text-base"
          >
            {/* Initial hacking sequence */}
            {!showTerminal &&
              displayedText.map((line, index) => (
                <div key={index} className="flex items-start space-x-2">
                  <span className="text-emerald-400/50">{">"}</span>
                  <span
                    className={`${line.includes("ERROR")
                        ? "text-emerald-400"
                        : line.includes("FAILED")
                          ? "text-emerald-400"
                          : line.includes("Just kidding")
                            ? "text-yellow-400"
                            : line.includes("PRANKED")
                              ? "text-blue-400"
                              : line.includes("Welcome")
                                ? "text-emerald-300"
                                : "text-emerald-400"
                      }`}
                  >
                    {line}
                  </span>
                </div>
              ))}

            {!showTerminal && currentLine < hackingSequence.length && (
              <div className="flex items-center space-x-2">
                <span className="text-emerald-400/50">{">"}</span>
                <span className="text-emerald-400 animate-pulse">_</span>
              </div>
            )}

            {/* Interactive terminal */}
            {showTerminal && (
              <>
                {terminalLines.map((line, index) => (
                  <div key={index} className="flex items-start space-x-2">
                    {line.type === "input" && <span className="text-emerald-400/70">$</span>}
                    <pre
                      className={`${line.type === "error"
                          ? "text-emerald-400"
                          : line.type === "success"
                            ? "text-emerald-300"
                            : line.type === "input"
                              ? "text-white"
                              : "text-emerald-400"
                        } font-mono whitespace-pre text-sm sm:text-base break-words`}
                    >
                      {line.content}
                    </pre>
                  </div>
                ))}

                {/* Input line */}
                <div className="flex items-center space-x-2 sticky bottom-0 bg-[#050505]/80 py-1 sm:py-2">
                  <span className="text-emerald-400/70">$</span>
                  <input
                    ref={inputRef}
                    type="text"
                    value={currentInput}
                    onChange={(e) => setCurrentInput(e.target.value)}
                    onKeyDown={handleKeyPress}
                    className="bg-transparent border-none outline-none text-white flex-1 font-mono text-sm sm:text-base w-full"
                    placeholder="Type a command..."
                    autoComplete="off"
                    inputMode="text"
                  />
                  <span className="text-emerald-400 animate-pulse">_</span>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Tmux Status Bar */}
        {showTerminal && (
          <div className="mt-4 flex justify-between items-center bg-[#0a0a0a] border border-white/10 text-emerald-500/70 text-xs px-4 py-2 rounded-sm font-mono shadow-md">
            <div className="flex space-x-4">
              <span className="text-emerald-400 font-bold">[0] bash</span>
              <span className="hover:text-emerald-400 cursor-pointer transition-colors">1:help</span>
              <span className="hover:text-emerald-400 cursor-pointer transition-colors">2:skills</span>
              <span className="hover:text-emerald-400 cursor-pointer transition-colors">3:whoami</span>
            </div>
            <div className="flex space-x-4">
              <span className="text-muted-foreground hidden sm:inline">"portfolio-terminal"</span>
              <span className="text-emerald-400 font-bold border-l border-white/10 pl-4">{new Date().toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' })}</span>
            </div>
          </div>
        )}
      </div>
      <style jsx global>{`
        .terminal-scrollbar::-webkit-scrollbar {
          width: 8px;
          @media (min-width: 640px) {
            width: 12px;
          }
        }
        
        .terminal-scrollbar::-webkit-scrollbar-track {
          background: rgba(0, 0, 0, 0.3);
          border-radius: 6px;
          border: 1px solid rgba(34, 197, 94, 0.2);
        }
        
        .terminal-scrollbar::-webkit-scrollbar-thumb {
          background: linear-gradient(180deg, rgba(34, 197, 94, 0.6) 0%, rgba(34, 197, 94, 0.3) 100%);
          border-radius: 6px;
          border: 1px solid rgba(34, 197, 94, 0.4);
        }
        
        .terminal-scrollbar::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(180deg, rgba(34, 197, 94, 0.8) 0%, rgba(34, 197, 94, 0.5) 100%);
        }
        
        .terminal-scrollbar::-webkit-scrollbar-corner {
          background: rgba(0, 0, 0, 0.3);
        }
        
        /* Firefox scrollbar styling */
        .terminal-scrollbar {
          scrollbar-width: thin;
          scrollbar-color: rgba(34, 197, 94, 0.6) rgba(0, 0, 0, 0.3);
        }
      `}</style>
    </div>
  )
}
