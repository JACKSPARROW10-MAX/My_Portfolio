"use client";

import { useState, useEffect, useRef } from "react";
import { CONFIG } from "./config";
import FreeScannerPanel from "./components/FreeScannerPanel";

export default function TerminalPortfolio() {
  const [theme, setTheme] = useState("green"); // green, amber, cyan
  const [history, setHistory] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [commandHistory, setCommandHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [isBooting, setIsBooting] = useState(true);
  const [isStreaming, setIsStreaming] = useState(false);
  
  // Interactive Hover States & Telemetry
  const [scanProgress, setScanProgress] = useState(88);
  const [hexStream, setHexStream] = useState([]);

  const viewportRef = useRef(null);
  const inputRef = useRef(null);
  const abortControllerRef = useRef(null);
  const skipStreamingRef = useRef(false);

  // Auto-scroll inside terminal viewport ONLY (keeps side & top grid panels fixed)
  const scrollToBottom = () => {
    if (viewportRef.current) {
      viewportRef.current.scrollTop = viewportRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [history, isBooting, isStreaming]);

  // Focus input on click inside terminal console
  const handleTerminalClick = () => {
    if (isStreaming) {
      skipStreamingRef.current = true;
    } else if (!isBooting) {
      inputRef.current?.focus();
    }
  };

  // Keyboard shortcut listener to skip boot or speed up streaming
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (isBooting) {
        setIsBooting(false);
      } else if (isStreaming && (e.key === "Enter" || e.key === " " || e.key === "Escape")) {
        skipStreamingRef.current = true;
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isBooting, isStreaming]);

  // Live Telemetry Generator (Hex Stream & Scanner Progress)
  useEffect(() => {
    const generateTelemetry = () => {
      const hexChars = "0123456789ABCDEF";
      const lines = [];
      for (let i = 0; i < 4; i++) {
        let addr = "0x" + Array.from({ length: 4 }, () => hexChars[Math.floor(Math.random() * 16)]).join("");
        let bytes = Array.from({ length: 4 }, () => hexChars[Math.floor(Math.random() * 16)] + hexChars[Math.floor(Math.random() * 16)]).join(" ");
        lines.push(`${addr} : ${bytes}`);
      }
      setHexStream(lines);
      setScanProgress(Math.floor(82 + Math.random() * 16));
    };

    generateTelemetry();
    const interval = setInterval(generateTelemetry, 1200);
    return () => clearInterval(interval);
  }, []);

  // Initial Boot Sequence
  useEffect(() => {
    const bootSequence = [
      { text: `[SYS_INIT] KERNEL v4.19.0-prathamesh x86_64 initialized`, type: "sys" },
      { text: `[SYS_INIT] KNOWLEDGE_BASE.MD loaded (2,966 doc chunks indexed)`, type: "sys" },
      { text: `[SYS_INIT] GROQ LLaMA-3.3-70B AI Agent connected`, type: "sys" },
      { text: ``, type: "sys" },
      { text: `🚀 Welcome to Prathamesh Salokhe's Interactive Digital Workspace!`, type: "highlight" },
      { text: `AI & Data Science | Entry-Level AI/ML & Data Engineering`, type: "dim" },
      { text: `💡 Non-tech visitors: Use top navigation links or buttons below to explore, or ask any plain English question!`, type: "dim" },
      { text: ``, type: "sys" }
    ];

    let timerId;
    let index = 0;

    const runBoot = () => {
      if (index < bootSequence.length) {
        const item = bootSequence[index];
        if (item) {
          setHistory((prev) => [...prev, item]);
        }
        index++;
        timerId = setTimeout(runBoot, CONFIG.bootSpeedMs);
      } else {
        setIsBooting(false);
      }
    };

    timerId = setTimeout(runBoot, 100);

    return () => clearTimeout(timerId);
  }, []);

  // Typewriter Teletype animation engine for static outputs
  const animateTeletypeOutput = async (fullText) => {
    setIsStreaming(true);
    skipStreamingRef.current = false;

    setHistory((prev) => [...prev, { text: "", type: "output", isStreaming: true }]);

    const chunkSize = 4;
    let current = "";

    for (let i = 0; i < fullText.length; i += chunkSize) {
      if (skipStreamingRef.current) {
        current = fullText;
        setHistory((prev) => {
          const updated = [...prev];
          const lastIdx = updated.length - 1;
          if (lastIdx >= 0) {
            updated[lastIdx] = { text: current, type: "output", isStreaming: false };
          }
          return updated;
        });
        break;
      }

      current += fullText.slice(i, i + chunkSize);
      setHistory((prev) => {
        const updated = [...prev];
        const lastIdx = updated.length - 1;
        if (lastIdx >= 0) {
          updated[lastIdx] = { text: current, type: "output", isStreaming: true };
        }
        return updated;
      });

      await new Promise((resolve) => setTimeout(resolve, 8));
    }

    setHistory((prev) => {
      const updated = [...prev];
      const lastIdx = updated.length - 1;
      if (lastIdx >= 0) {
        updated[lastIdx] = { text: fullText, type: "output", isStreaming: false };
      }
      return updated;
    });

    setIsStreaming(false);
  };

  // Built-in Terminal Command Processor
  const handleCommand = async (rawInput) => {
    const trimmed = rawInput.trim();
    if (!trimmed) return;

    setHistory((prev) => [...prev, { text: `prathamesh@portfolio:~$ ${trimmed}`, type: "user" }]);
    setCommandHistory((prev) => [...prev, trimmed]);
    setHistoryIndex(-1);
    setInputValue("");

    const args = trimmed.split(" ");
    const cmd = args[0].toLowerCase();

    // 1. HELP
    if (cmd === "help") {
      await animateTeletypeOutput(`❓ AVAILABLE TERMINAL COMMANDS & SHORTCUTS
==================================================

• whoami   - Explains Prathamesh's background, education, and target roles item-by-item
• projects - Displays technical case studies (NeuroNauts, ALZ-AI, Sunbeam Chatbot, Sales Platform)
• skills   - Displays technical stack (GenAI, SQL, AWS, Python, Web) item-by-item
• resume   - Displays academic record, CGPA (8.96), HSC/SSC marks & certifications
• contact  - Provides email, phone, GitHub, LinkedIn & LeetCode links
• theme    - Switches color themes (theme green | theme amber | theme cyan)
• clear    - Clears the console screen

💡 TIP: Use the top navigation bar or quick buttons below, or ask ANY plain English question!`);
      return;
    }

    // 2. WHOAMI / ABOUT
    if (cmd === "whoami" || cmd === "about") {
      await animateTeletypeOutput(`👤 CANDIDATE PROFILE & SUMMARY
==================================================

• Full Name: Prathamesh Ranjit Salokhe
• Target Roles: Entry-Level AI/ML Engineer & Data Engineer
• Location: Yadrav / Kolhapur, Maharashtra, India

🎓 EDUCATION:
• B.Tech in Artificial Intelligence & Data Science
  DKTE Society's Textile & Engineering Institute, Ichalkaranji (NAAC A+)
• Academic Scores: Main CGPA: 8.96 / 10 | Honours CGPA (Big Data): 8.18 / 10

💼 EXECUTIVE SUMMARY:
• Hands-on developer specializing in Generative AI, RAG Systems, and Data Engineering.
• Built & shipped production RAG pipelines (LangChain, ChromaDB, Zilliz Milvus, Groq LLaMA 3.3 70B) with automated CI/CD pipelines (95 commits).
• Engineered executive Power BI & Streamlit KPI dashboards and validated ETL data pipelines using Python & Docker.
• Certifications & Stats: AWS Academy Data Engineering Certified | LeetCode Rating 1500+ | 1st Place Hack AI Blitz | Top 6 ACM WCE.`);
      return;
    }

    // 3. PROJECTS
    if (cmd === "projects") {
      await animateTeletypeOutput(`🚀 FEATURED PROJECT CASE STUDIES
==================================================

01 ─ NEURONAUTS (AI Study Companion)
   • Hackathon Result: Top 6 Finalist / 400+ Teams @ ACM WCE Hackathon 2026
   • Core Architecture: Docling PDF parser → 2,966 chunks → Zilliz Cloud (Milvus) vector search → Groq LLaMA 3.3 70B response generation + PyMuPDF diagram rendering.
   • Tech Stack: Python, Groq LLaMA 3.3 70B, Zilliz Milvus, Streamlit, Cloudinary
   • Live Demo: https://neuronauts.streamlit.app/

02 ─ SUNBEAM RAG CHATBOT (Institutional AI Assistant)
   • Program: IIT GenAI Program @ Sunbeam Infotech
   • Core Architecture: Selenium web scraper → LangChain document chunking → Sentence-Transformers → ChromaDB vector store → Groq LLM → FastAPI microservices.
   • Tech Stack: LangChain, ChromaDB, Groq LLM, FastAPI, Streamlit, GitHub Actions CI/CD (95 commits)
   • Repository: https://github.com/JACKSPARROW10-MAX/IIT-GENAI-PROJECT-SUNBEAM_CHATBOT

03 ─ ALZ-AI (Alzheimer's Care Ecosystem)
   • Event: DYPSEM Hackoutsav 2025
   • Core Architecture: Caregiver + Doctor dashboard with AWS Rekognition facial analysis, PostGIS geofencing, DeepFace, and Redis live state tracking.
   • Tech Stack: React, FastAPI, AWS Rekognition, PostgreSQL, PostGIS, Redis

04 ─ SALES ANALYSIS PLATFORM & ETL PIPELINE
   • Core Architecture: Idempotent ETL data ingestion pipeline for CSV and ERP data, staging/curated tables, automated validation, FastAPI backend & dark-mode React dashboard.
   • Tech Stack: Python, FastAPI, PostgreSQL, Docker, Power BI, React`);
      return;
    }

    // 4. SKILLS
    if (cmd === "skills") {
      await animateTeletypeOutput(`🛠 TECHNICAL SKILLS & STACK MATRIX
==================================================

🤖 GENERATIVE AI & LLMs:
   • RAG Architectures, LangChain, ChromaDB, Zilliz Cloud (Milvus)
   • Groq LLM (LLaMA 3.3 70B), Sentence-Transformers, Prompt Engineering

📊 DATA & ANALYTICS:
   • SQL, Product Analytics, KPI Tracking, Power BI, Streamlit
   • Data Warehousing, Idempotent ETL Pipelines, Docker

💻 SOFTWARE & WEB ENGINEERING:
   • Python, Java, JavaScript, HTML/CSS, C, C++
   • REST APIs (FastAPI), React, Node.js, Selenium, Tailwind CSS

☁️ CLOUD & DATABASES:
   • AWS (S3, Redshift, Glue, Athena, EC2, EMR, Rekognition)
   • Azure Cognitive Services, Firebase (NoSQL), Supabase, PostgreSQL, PostGIS, Redis

📜 CERTIFICATIONS & RATINGS:
   • AWS Academy Data Engineering Certified (40 hrs)
   • LeetCode Rating: 1500+ (Data Structures & Algorithms)`);
      return;
    }

    // 5. RESUME / EXPERIENCE
    if (cmd === "resume" || cmd === "experience") {
      await animateTeletypeOutput(`📄 RESUME & EXPERIENCE SUMMARY
==================================================

🎓 ACADEMIC DEGREES:
• B.Tech in Artificial Intelligence & Data Science (2023 - Present)
  DKTE Society's Textile & Engineering Institute, Ichalkaranji (NAAC A+)
  Main CGPA: 8.96 / 10 | Honours in Big Data Analysis (Hons. CGPA: 8.18 / 10)

💼 WORK EXPERIENCE:
• Generative AI & Data Intern @ Sunbeam Infotech, Pune (Dec 2025 - Jan 2026)
  Designed end-to-end RAG architecture, shipped via GitHub Actions (95 commits), built executive KPI dashboards in Power BI.
• Technical Lead @ DSSA DKTE (2024 - 2025)
  Led workshops & hackathon teams across ML, cloud, and GenAI.

🏆 HONORS & CERTIFICATIONS:
• 1st Place Winner, Hack AI Blitz 2025 (~200 teams)
• Top 6 Finalist, ACM WCE Hackathon 2026 (400+ teams)
• AWS Academy Data Engineering Certified (40-hr course)
• LeetCode Rating: 1500+

🔗 LINK TO RESUME / REPOSITORY:
https://github.com/JACKSPARROW10-MAX`);
      return;
    }

    // 6. CONTACT
    if (cmd === "contact") {
      await animateTeletypeOutput(`📬 CONTACT & SOCIAL PROFILES
==================================================

• Email: prathameshsalokhe901@gmail.com
• Phone: +91 7768960392
• Location: Yadrav / Kolhapur, Maharashtra, India

🌐 ONLINE PROFILES:
• GitHub: https://github.com/JACKSPARROW10-MAX
• LinkedIn: https://www.linkedin.com/in/prathamesh-salokhe-292791293
• LeetCode: https://leetcode.com/u/Prathamesh_10_2005/
• AWS Credly: https://www.credly.com/badges/58ece8cb-95a2-4ac4-98fd-8195cf426926/public_url`);
      return;
    }

    // 7. CLEAR / CLS
    if (cmd === "clear" || cmd === "cls") {
      setHistory([]);
      return;
    }

    // 8. THEME SWITCHING (green | amber | cyan)
    if (cmd === "theme") {
      const selectedTheme = args[1]?.toLowerCase();
      if (selectedTheme && CONFIG.themes[selectedTheme]) {
        setTheme(selectedTheme);
        await animateTeletypeOutput(`🎨 Theme switched to ${CONFIG.themes[selectedTheme].name}.`);
      } else {
        const nextTheme = theme === "green" ? "amber" : theme === "amber" ? "cyan" : "green";
        setTheme(nextTheme);
        await animateTeletypeOutput(`🎨 Theme switched to ${CONFIG.themes[nextTheme].name}.`);
      }
      return;
    }

    // 9. GENERAL LLM STREAMING RESPONSE
    await streamAiResponse(trimmed);
  };

  // Live Stream AI Response from Edge API /api/chat
  const streamAiResponse = async (userQuery) => {
    setIsStreaming(true);
    skipStreamingRef.current = false;

    setHistory((prev) => [...prev, { text: "", type: "output", isStreaming: true }]);

    try {
      const chatMessages = history
        .filter((h) => h.type === "user" || (h.type === "output" && !h.text.startsWith("AVAILABLE") && !h.text.startsWith("FEATURED")))
        .slice(-6)
        .map((h) => ({
          role: h.type === "user" ? "user" : "assistant",
          content: h.text.replace("prathamesh@portfolio:~$ ", "")
        }));

      chatMessages.push({ role: "user", content: userQuery });

      abortControllerRef.current = new AbortController();

      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: chatMessages }),
        signal: abortControllerRef.current.signal
      });

      if (!response.ok) {
        throw new Error(`API Error: ${response.status}`);
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let fullResponseText = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        fullResponseText += chunk;

        setHistory((prev) => {
          const updated = [...prev];
          const lastIdx = updated.length - 1;
          if (lastIdx >= 0) {
            updated[lastIdx] = { text: fullResponseText, type: "output", isStreaming: true };
          }
          return updated;
        });

        // Small tick for visible streaming animation
        await new Promise((resolve) => setTimeout(resolve, 15));
      }

      setHistory((prev) => {
        const updated = [...prev];
        const lastIdx = updated.length - 1;
        if (lastIdx >= 0) {
          updated[lastIdx] = { text: fullResponseText, type: "output", isStreaming: false };
        }
        return updated;
      });

    } catch (err) {
      if (err.name !== "AbortError") {
        setHistory((prev) => [
          ...prev,
          { text: `[SYSTEM ERROR: Unable to communicate with AI endpoint: ${err.message}]`, type: "sys" }
        ]);
      }
    } finally {
      setIsStreaming(false);
    }
  };

  // Up / Down arrow key navigation for CLI command history
  const handleKeyDownInput = (e) => {
    if (e.key === "Enter") {
      handleCommand(inputValue);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (commandHistory.length > 0) {
        const nextIndex = historyIndex + 1;
        if (nextIndex < commandHistory.length) {
          setHistoryIndex(nextIndex);
          setInputValue(commandHistory[commandHistory.length - 1 - nextIndex]);
        }
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex > 0) {
        const nextIndex = historyIndex - 1;
        setHistoryIndex(nextIndex);
        setInputValue(commandHistory[commandHistory.length - 1 - nextIndex]);
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setInputValue("");
      }
    }
  };

  // Top Nav Items
  const navItems = [
    { label: "HOME", cmd: "clear" },
    { label: "ABOUT", cmd: "whoami" },
    { label: "PROJECTS", cmd: "projects" },
    { label: "EXPERIENCE", cmd: "resume" },
    { label: "SKILLS", cmd: "skills" },
    { label: "CONTACT", cmd: "contact" }
  ];

  // Quick Action Chips
  const quickActions = [
    { label: "👤 whoami", cmd: "whoami" },
    { label: "🚀 projects", cmd: "projects" },
    { label: "🛠 skills", cmd: "skills" },
    { label: "📄 resume", cmd: "resume" },
    { label: "📬 contact", cmd: "contact" },
    { label: "🎨 green", cmd: "theme green" },
    { label: "🎨 amber", cmd: "theme amber" },
    { label: "🎨 cyan", cmd: "theme cyan" },
    { label: "🧹 clear", cmd: "clear" }
  ];

  return (
    <div data-theme={theme} onClick={handleTerminalClick} className="arch-layout-root crt-overlay screen-flicker">
      
      {/* ========================================================================= */}
      {/* 1. TOP NAVIGATION BAR (TERMINAL / NAVIGATION)                             */}
      {/* ========================================================================= */}
      <header className="arch-header">
        {/* Left handle */}
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <span style={{ width: "8px", height: "8px", borderRadius: "50%", backgroundColor: "var(--border-color)" }}></span>
          <span style={{ fontSize: "13px", fontWeight: "bold", color: "var(--border-color)", letterSpacing: "1px" }}>
            prathamesh@portfolio
          </span>
          <span style={{ fontSize: "10px", color: "var(--text-dim)", marginLeft: "6px" }}>
            [SYS_NODE: 07]
          </span>
        </div>

        {/* Center Navigation Links */}
        <nav style={{ display: "flex", alignItems: "center", gap: "16px", fontSize: "11px", fontWeight: "bold", letterSpacing: "1px" }}>
          {navItems.map((item, idx) => (
            <button
              key={idx}
              disabled={isStreaming}
              onClick={(e) => {
                e.stopPropagation();
                handleCommand(item.cmd);
              }}
              style={{
                background: "none",
                border: "none",
                color: "var(--text-main)",
                cursor: "pointer",
                padding: "4px 6px",
                fontFamily: "inherit"
              }}
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Right External Portfolio Link */}
        <div>
          <a
            href={CONFIG.externalPortfolioUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              padding: "4px 10px",
              borderRadius: "6px",
              border: "1px solid var(--border-color)",
              fontSize: "11px",
              fontWeight: "bold",
              color: "var(--border-color)",
              backgroundColor: "var(--bg-main)",
              textDecoration: "none"
            }}
          >
            {CONFIG.externalPortfolioText}
          </a>
        </div>
      </header>

      {/* ========================================================================= */}
      {/* ARCHITECTURAL GRID: LEFT PANELS + MAIN WORKSPACE + RIGHT LOCATION PANEL   */}
      {/* ========================================================================= */}
      <div className="arch-grid">
        
        {/* ----------------------------------------------------------------------- */}
        {/* LEFT COLUMN: FREE SCANNERS & GLOBE REVOLVING (~24% width)                */}
        {/* ----------------------------------------------------------------------- */}
        <aside className="arch-left-col">
          
          {/* PANEL 1: FREE SCANNERS */}
          <FreeScannerPanel scanProgress={scanProgress} />

          {/* PANEL 2: GLOBE REVOLVING */}
          <div className="arch-panel">
            <div style={{ display: "flex", justify: "space-between", fontSize: "11px", fontWeight: "bold", color: "var(--border-color)", borderBottom: "1px solid rgba(255,255,255,0.1)", paddingBottom: "6px" }}>
              <span>GLOBE REVOLVING</span>
              <span style={{ fontSize: "10px", color: "var(--color-cyan)" }}>
                ORBIT: 360°
              </span>
            </div>

            {/* Rotating 3D Globe Wireframe */}
            <div style={{ position: "relative", flex: 1, margin: "8px 0", display: "flex", alignItems: "center", justifyCenter: "center", overflow: "hidden" }}>
              <svg viewBox="0 0 100 100" className="globe-spin" style={{ width: "85px", height: "85px", color: "var(--border-color)", opacity: 0.9, stroke: "currentColor", fill: "none", strokeWidth: 1.2, margin: "auto" }}>
                <circle cx="50" cy="50" r="44" />
                <ellipse cx="50" cy="50" rx="44" ry="18" />
                <ellipse cx="50" cy="50" rx="44" ry="34" />
                <ellipse cx="50" cy="50" rx="18" ry="44" />
                <ellipse cx="50" cy="50" rx="34" ry="44" />
                <line x1="6" y1="50" x2="94" y2="50" />
                <line x1="50" y1="6" x2="50" y2="94" />
                <circle cx="68" cy="38" r="3" style={{ fill: "var(--color-pink)", stroke: "none" }} />
              </svg>
            </div>

            <div style={{ fontSize: "10px", color: "var(--text-dim)", borderTop: "1px solid rgba(255,255,255,0.1)", paddingTop: "6px", display: "flex", justify: "space-between" }}>
              <span>LATITUDE GRID:</span>
              <span style={{ color: "var(--border-color)", fontWeight: "bold" }}>16.6913° N</span>
            </div>
          </div>

        </aside>

        {/* ----------------------------------------------------------------------- */}
        {/* CENTER COLUMN: MAIN WORKSPACE (~54% width)                               */}
        {/* ----------------------------------------------------------------------- */}
        <main className="arch-center-col">
          
          {/* Central Workspace Header */}
          <div style={{ padding: "8px 14px", backgroundColor: "rgba(0,0,0,0.6)", borderBottom: "1px solid var(--border-color)", display: "flex", alignItems: "center", justify: "space-between" }}>
            <div style={{ fontSize: "12px", fontWeight: "bold", color: "var(--border-color)", letterSpacing: "1px" }}>
              PRATHAMESH@PORTFOLIO // MAIN WORKSPACE
            </div>
            <div style={{ fontSize: "10px", color: "var(--text-dim)" }}>
              SYSTEM STATUS: <strong style={{ color: "var(--color-green)" }}>ONLINE</strong> | MODEL: <strong>LLAMA-3.3-70B</strong>
            </div>
          </div>

          {/* Terminal Console Viewport */}
          <div ref={viewportRef} style={{ flex: 1, overflowY: "auto", padding: "14px", display: "flex", flexDirection: "column", gap: "10px" }}>
            {history.filter(Boolean).map((item, index) => (
              <div key={index} style={{ lineHeight: "1.6", whiteSpace: "pre-wrap", wordBreak: "break-word" }}>
                
                {/* User Input Prompt */}
                {item.type === "user" && (
                  <div style={{ display: "flex", alignItems: "center", gap: "4px", padding: "2px 0" }}>
                    <span style={{ color: "var(--prompt-user)", fontWeight: "bold", fontSize: "12px" }}>prathamesh</span>
                    <span style={{ color: "var(--text-dim)", fontSize: "12px" }}>@</span>
                    <span style={{ color: "var(--prompt-host)", fontWeight: "bold", fontSize: "12px" }}>portfolio</span>
                    <span style={{ color: "var(--text-dim)", fontSize: "12px" }}>:~$</span>
                    <span style={{ color: "var(--border-color)", fontWeight: "bold", fontSize: "12px", marginLeft: "4px" }}>
                      {item.text.replace("prathamesh@portfolio:~$ ", "")}
                    </span>
                  </div>
                )}

                {/* System Messages */}
                {item.type === "sys" && (
                  <span style={{ color: "var(--text-dim)", fontSize: "11px", display: "block" }}>
                    {item.text}
                  </span>
                )}

                {/* Highlight */}
                {item.type === "highlight" && (
                  <span style={{ color: "var(--border-color)", fontWeight: "800", fontSize: "13px", display: "block", padding: "2px 0" }}>
                    {item.text}
                  </span>
                )}

                {/* Dim Subtitle */}
                {item.type === "dim" && (
                  <span style={{ color: "var(--text-dim)", fontSize: "12px", display: "block" }}>
                    {item.text}
                  </span>
                )}

                {/* Output Content Stream */}
                {item.type === "output" && (
                  <div style={{ color: "var(--text-main)", fontSize: "12px", borderLeft: "2px solid var(--border-color)", paddingLeft: "10px", marginTop: "4px" }}>
                    {renderFormattedText(item.text)}
                    {item.isStreaming && <span className="cursor-block"></span>}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Command Prompt Input & Action Chips */}
          {!isBooting && (
            <footer style={{ padding: "10px 14px", backgroundColor: "rgba(0,0,0,0.7)", borderTop: "1px solid var(--border-color)", display: "flex", flexDirection: "column", gap: "8px" }}>
              
              {/* Quick Navigation Chips */}
              <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "6px" }}>
                {quickActions.map((action, i) => (
                  <button
                    key={i}
                    disabled={isStreaming}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleCommand(action.cmd);
                    }}
                    style={{
                      padding: "3px 8px",
                      borderRadius: "4px",
                      fontSize: "10px",
                      border: "1px solid rgba(255,255,255,0.2)",
                      color: "var(--border-color)",
                      backgroundColor: "rgba(0,0,0,0.6)",
                      cursor: "pointer",
                      fontFamily: "inherit"
                    }}
                  >
                    {action.label}
                  </button>
                ))}
              </div>

              {/* Input Line */}
              <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                <span style={{ color: "var(--prompt-user)", fontWeight: "bold", fontSize: "12px" }}>prathamesh</span>
                <span style={{ color: "var(--text-dim)", fontSize: "12px" }}>@</span>
                <span style={{ color: "var(--prompt-host)", fontWeight: "bold", fontSize: "12px" }}>portfolio</span>
                <span style={{ color: "var(--text-dim)", fontSize: "12px" }}>:~$</span>
                
                <div style={{ flex: 1, display: "flex", alignItems: "center", position: "relative", marginLeft: "4px" }}>
                  <input
                    ref={inputRef}
                    type="text"
                    value={inputValue}
                    disabled={isStreaming}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={handleKeyDownInput}
                    autoFocus
                    className="term-input"
                    style={{ fontSize: "12px" }}
                    placeholder={
                      isStreaming
                        ? "AI streaming... (Press key to skip)"
                        : "Type CLI command or ask plain English question..."
                    }
                  />
                  {!isStreaming && <span className="cursor-block" style={{ pointerEvents: "none" }}></span>}
                </div>
              </div>

            </footer>
          )}
        </main>

        {/* ----------------------------------------------------------------------- */}
        {/* RIGHT COLUMN: LOCATION PANEL (~20% width)                               */}
        {/* ----------------------------------------------------------------------- */}
        <aside className="arch-right-col">
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: "11px", fontWeight: "bold", color: "var(--border-color)", borderBottom: "1px solid rgba(255,255,255,0.1)", paddingBottom: "8px", marginBottom: "12px" }}>
            <span>LOCATION</span>
            <span style={{ fontSize: "10px", color: "var(--color-amber)" }}>NODE ACTIVE</span>
          </div>

          {/* Geographic Data Entry */}
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            <div>
              <div style={{ fontSize: "14px", fontWeight: "bold", letterSpacing: "1px", color: "var(--text-main)" }}>
                YADRAV
              </div>
              <div style={{ fontSize: "12px", fontWeight: "bold", color: "var(--border-color)" }}>
                MAHARASHTRA
              </div>
              <div style={{ fontSize: "11px", color: "var(--text-dim)" }}>
                INDIA
              </div>
            </div>

            <div style={{ padding: "8px", border: "1px solid rgba(255,255,255,0.15)", borderRadius: "6px", backgroundColor: "rgba(0,0,0,0.5)", fontSize: "11px", display: "flex", flexDirection: "column", gap: "4px" }}>
              <div style={{ display: "flex", justify: "space-between" }}>
                <span style={{ color: "var(--text-dim)" }}>LAT:</span>
                <span style={{ color: "var(--color-cyan)", fontWeight: "bold" }}>16.6913° N</span>
              </div>
              <div style={{ display: "flex", justify: "space-between" }}>
                <span style={{ color: "var(--text-dim)" }}>LON:</span>
                <span style={{ color: "var(--color-cyan)", fontWeight: "bold" }}>74.2449° E</span>
              </div>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "11px", color: "var(--color-green)", fontWeight: "bold" }}>
              <span className="radar-pulse-anim" style={{ width: "8px", height: "8px", borderRadius: "50%", backgroundColor: "var(--color-green)" }}></span>
              <span>● CURRENT NODE</span>
            </div>
          </div>

          {/* Radar Coordinates Map Grid & Live Hex Stream */}
          <div style={{ marginTop: "auto", paddingTop: "10px", borderTop: "1px solid rgba(255,255,255,0.1)", display: "flex", flexDirection: "column", gap: "6px" }}>
            <div style={{ fontSize: "10px", color: "var(--text-dim)", display: "flex", justify: "space-between" }}>
              <span>LIVE TELEMETRY:</span>
              <span style={{ color: "var(--border-color)" }}>STREAMING</span>
            </div>

            <div style={{ fontSize: "10px", color: "var(--color-green)", backgroundColor: "rgba(0,0,0,0.5)", padding: "6px", borderRadius: "4px", border: "1px solid rgba(255,255,255,0.1)", display: "flex", flexDirection: "column", gap: "2px" }}>
              {hexStream.map((line, idx) => (
                <div key={idx} style={{ display: "flex", justify: "space-between" }}>
                  <span>{line.split(" ")[0]}</span>
                  <span>{line.split(" ").slice(2).join(" ")}</span>
                </div>
              ))}
            </div>
          </div>

        </aside>

      </div>
    </div>
  );
}

// Formatted text parser for headings, URLs, and case study entries
function renderFormattedText(text) {
  if (!text) return null;

  const lines = text.split("\n");

  return lines.map((line, lineIdx) => {
    // Section Headers
    if (line.includes("===") || line.startsWith("👤") || line.startsWith("🚀") || line.startsWith("🛠") || line.startsWith("📄") || line.startsWith("📬") || line.startsWith("❓")) {
      return (
        <span key={lineIdx} style={{ color: "var(--border-color)", fontWeight: "bold", display: "block", margin: "2px 0" }}>
          {line}
        </span>
      );
    }

    // Project Case Study Headlines (01 ─, 02 ─, etc.)
    if (line.match(/^0[1-9] ─/)) {
      return (
        <span key={lineIdx} style={{ color: "var(--prompt-host)", fontWeight: "bold", display: "block", marginTop: "8px", marginBottom: "2px" }}>
          {line}
        </span>
      );
    }

    // Category Headings
    if (line.startsWith("🎓") || line.startsWith("💼") || line.startsWith("🤖") || line.startsWith("📊") || line.startsWith("💻") || line.startsWith("☁️") || line.startsWith("📜") || line.startsWith("🏆") || line.startsWith("🌐") || line.startsWith("🔗")) {
      return (
        <span key={lineIdx} style={{ color: "var(--color-amber)", fontWeight: "bold", display: "block", marginTop: "6px", marginBottom: "2px" }}>
          {line}
        </span>
      );
    }

    // Parse URLs inside text lines
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    const parts = line.split(urlRegex);

    return (
      <span key={lineIdx} style={{ display: "block" }}>
        {parts.map((part, i) => {
          if (part.match(urlRegex)) {
            return (
              <a
                key={i}
                href={part}
                target="_blank"
                rel="noopener noreferrer"
                className="term-link"
              >
                {part}
              </a>
            );
          }

          // Highlight key labels
          if (part.includes("• Tech Stack:") || part.includes("• Core Architecture:") || part.includes("• Live Demo:") || part.includes("• Hackathon Result:") || part.includes("• Repository:")) {
            const subParts = part.split(/(• [A-Za-z\s]+:)/g);
            return subParts.map((sub, j) => {
              if (sub.startsWith("• ")) {
                return <span key={j} style={{ color: "var(--color-amber)", fontWeight: "600" }}>{sub}</span>;
              }
              return sub;
            });
          }

          return part;
        })}
      </span>
    );
  });
}
