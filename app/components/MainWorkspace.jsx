"use client";

import React, { useState } from "react";

export default function MainWorkspace({
  history,
  isBooting,
  isStreaming,
  inputValue,
  setInputValue,
  handleCommand,
  handleKeyDownInput,
  viewportRef,
  inputRef,
  quickActions,
  renderFormattedText,
  activeTab,
  setActiveTab
}) {
  const [selectedProject, setSelectedProject] = useState(0);

  const projectsData = [
    {
      id: "01",
      name: "NEURONAUTS",
      tagline: "AI Study Companion & Intelligent RAG Search",
      badge: "Top 6 Finalist / 400+ Teams @ ACM WCE Hackathon 2026",
      tech: ["Python", "Groq LLaMA 3.3 70B", "Zilliz Milvus", "Docling", "PyMuPDF", "Streamlit", "Cloudinary"],
      problem: "Slow, manual textbook scanning for conceptual Q&A during exam preparation.",
      architecture: "Docling PDF parser → 2,966 chunk extraction → Sentence-Transformer embeddings → Zilliz Cloud (Milvus) vector search → Groq LLaMA 3.3 70B response generation + PyMuPDF diagram rendering.",
      demoUrl: "https://neuronauts.streamlit.app/",
      repoUrl: "https://github.com/JACKSPARROW10-MAX"
    },
    {
      id: "02",
      name: "SUNBEAM RAG CHATBOT",
      tagline: "Institutional AI Assistant & Knowledge Ingestion",
      badge: "IIT GenAI Program @ Sunbeam Infotech",
      tech: ["LangChain", "ChromaDB", "Groq LLM", "FastAPI", "Streamlit", "Selenium", "GitHub Actions CI/CD"],
      problem: "Need for accurate, hallucination-free institutional Q&A for admissions and courses.",
      architecture: "Selenium web scraper → LangChain document chunking → Sentence-Transformers → ChromaDB vector store → Groq LLM → FastAPI backend → Streamlit UI (95 commits CI/CD).",
      repoUrl: "https://github.com/JACKSPARROW10-MAX/IIT-GENAI-PROJECT-SUNBEAM_CHATBOT"
    },
    {
      id: "03",
      name: "ALZ-AI",
      tagline: "Alzheimer's Care Ecosystem & Patient Monitoring",
      badge: "Presented at DYPSEM Hackoutsav 2025",
      tech: ["React", "FastAPI", "AWS Rekognition", "PostgreSQL", "DeepFace", "Firebase", "PostGIS", "Redis"],
      problem: "Caregiving gaps in fall detection, medication adherence, and caregiver coordination across 3 user roles.",
      architecture: "Unified caregiver + doctor dashboard prototyped with React/Tailwind frontend, FastAPI microservices, AWS Rekognition facial analysis, PostGIS geofencing with Redis live state tracking."
    },
    {
      id: "04",
      name: "SALES ANALYSIS PLATFORM",
      tagline: "Idempotent Data Ingestion Pipeline & Analytics Dashboard",
      badge: "Enterprise ETL & Analytics Project",
      tech: ["Python", "FastAPI", "PostgreSQL", "ETL Pipelines", "Docker", "Power BI", "React"],
      problem: "Automated ingestion, validation, and analytics for CSV & ERP sales data.",
      architecture: "Idempotent ETL pipeline for CSV/ERP data ingestion, staging and curated tables, automated validation, FastAPI endpoints, dark-mode React dashboard with KPI cards and interactive charts."
    }
  ];

  const aiPresetQueries = [
    "Tell me about Prathamesh's background and achievements",
    "How does the NeuroNauts RAG architecture work?",
    "What are Prathamesh's technical skills and AWS certifications?",
    "Summarize Prathamesh's education and LeetCode rating"
  ];

  return (
    <main className="col-span-1 lg:col-span-6 flex flex-col cyber-panel rounded-xl overflow-hidden min-h-0 relative z-20">
      
      {/* Workspace Header & Mode Selector Bar */}
      <div className="px-3 sm:px-4 py-2 bg-black/70 border-b border-[var(--border-color)] flex items-center justify-between shrink-0 flex-wrap gap-2">
        <div className="flex items-center gap-3">
          <span className="text-xs font-extrabold text-[var(--border-color)] tracking-wider">
            PRATHAMESH@PORTFOLIO // MAIN WORKSPACE
          </span>
        </div>

        {/* View Mode Tabs */}
        <div className="flex items-center gap-1 font-mono text-[10px]">
          <button
            onClick={() => setActiveTab("terminal")}
            className={`px-2.5 py-1 rounded transition-all flex items-center gap-1 font-bold ${
              activeTab === "terminal"
                ? "bg-[var(--border-color)] text-black shadow-[0_0_8px_var(--border-color)]"
                : "text-[var(--text-dim)] hover:text-[var(--text-main)] bg-black/40 border border-[var(--border-color)]/20"
            }`}
          >
            <span>&gt;_ TERMINAL</span>
          </button>
          <button
            onClick={() => setActiveTab("projects")}
            className={`px-2.5 py-1 rounded transition-all flex items-center gap-1 font-bold ${
              activeTab === "projects"
                ? "bg-[var(--border-color)] text-black shadow-[0_0_8px_var(--border-color)]"
                : "text-[var(--text-dim)] hover:text-[var(--text-main)] bg-black/40 border border-[var(--border-color)]/20"
            }`}
          >
            <span>01_ PROJECTS</span>
          </button>
          <button
            onClick={() => setActiveTab("ai")}
            className={`px-2.5 py-1 rounded transition-all flex items-center gap-1 font-bold ${
              activeTab === "ai"
                ? "bg-[var(--border-color)] text-black shadow-[0_0_8px_var(--border-color)]"
                : "text-[var(--text-dim)] hover:text-[var(--text-main)] bg-black/40 border border-[var(--border-color)]/20"
            }`}
          >
            <span>🤖 AI_ASSISTANT</span>
          </button>
        </div>
      </div>

      {/* ======================================================================= */}
      {/* MODE 1: INTEGRATED TERMINAL VIEW                                         */}
      {/* ======================================================================= */}
      {activeTab === "terminal" && (
        <div className="flex-1 flex flex-col min-h-0 overflow-hidden">
          
          {/* Terminal Scrollable Console Viewport */}
          <div
            ref={viewportRef}
            className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-2.5 font-mono min-h-0"
          >
            {history.filter(Boolean).map((item, index) => (
              <div key={index} className="leading-relaxed whitespace-pre-wrap break-words">
                
                {/* User Prompt Entry */}
                {item.type === "user" && (
                  <div className="flex items-center gap-1 py-0.5">
                    <span className="text-[var(--prompt-user)] font-bold text-xs">prathamesh</span>
                    <span className="text-[var(--text-dim)] text-xs">@</span>
                    <span className="text-[var(--prompt-host)] font-bold text-xs">portfolio</span>
                    <span className="text-[var(--text-dim)] text-xs">:~$</span>
                    <span className="text-[var(--border-color)] font-bold text-xs ml-1">
                      {item.text.replace("prathamesh@portfolio:~$ ", "")}
                    </span>
                  </div>
                )}

                {/* System Diagnostics */}
                {item.type === "sys" && (
                  <span className="text-[var(--text-dim)] text-xs font-mono block">
                    {item.text}
                  </span>
                )}

                {/* Highlight text */}
                {item.type === "highlight" && (
                  <span className="text-[var(--border-color)] font-extrabold text-xs sm:text-sm block py-0.5">
                    {item.text}
                  </span>
                )}

                {/* Dim Subtitle */}
                {item.type === "dim" && (
                  <span className="text-[var(--text-dim)] text-xs block">
                    {item.text}
                  </span>
                )}

                {/* Output Content Stream */}
                {item.type === "output" && (
                  <div
                    className="text-[var(--text-main)] text-xs sm:text-sm font-mono leading-relaxed pl-3 border-l-2 border-[var(--border-color)] py-1 mt-1"
                    style={{ whiteSpace: "pre-wrap" }}
                  >
                    {renderFormattedText(item.text)}
                    {item.isStreaming && <span className="cursor-block"></span>}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Command Line Input Footer */}
          {!isBooting && (
            <footer className="p-2.5 bg-black/80 border-t border-[var(--border-color)] flex flex-col gap-1.5 shrink-0">
              
              {/* Quick Action Chips */}
              <div className="flex flex-wrap items-center gap-1">
                {quickActions.map((action, i) => (
                  <button
                    key={i}
                    disabled={isStreaming}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleCommand(action.cmd);
                    }}
                    className="px-2 py-0.5 rounded text-[10px] font-mono border border-[var(--border-color)]/30 text-[var(--border-color)] bg-black/60 hover:bg-[var(--border-color)] hover:text-black transition-all cursor-pointer disabled:opacity-50"
                  >
                    {action.label}
                  </button>
                ))}
              </div>

              {/* Terminal Command Input Field */}
              <div className="flex items-center gap-1 pt-0.5">
                <span className="text-[var(--prompt-user)] font-bold text-xs">prathamesh</span>
                <span className="text-[var(--text-dim)] text-xs">@</span>
                <span className="text-[var(--prompt-host)] font-bold text-xs">portfolio</span>
                <span className="text-[var(--text-dim)] text-xs">:~$</span>
                
                <div className="flex-1 flex items-center relative ml-1">
                  <input
                    ref={inputRef}
                    type="text"
                    value={inputValue}
                    disabled={isStreaming}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={handleKeyDownInput}
                    autoFocus
                    className="term-input text-xs"
                    placeholder={
                      isStreaming
                        ? "AI streaming response... (Press key to skip)"
                        : "Type CLI command (whoami, projects, skills, theme...) or ask AI..."
                    }
                  />
                  {!isStreaming && <span className="cursor-block pointer-events-none"></span>}
                </div>
              </div>

            </footer>
          )}
        </div>
      )}

      {/* ======================================================================= */}
      {/* MODE 2: ARCHITECTURAL PROJECT EXPLORER                                  */}
      {/* ======================================================================= */}
      {activeTab === "projects" && (
        <div className="flex-1 flex flex-col p-3 sm:p-4 overflow-y-auto min-h-0 space-y-4 font-mono">
          
          <div className="flex items-center justify-between border-b border-[var(--border-color)]/30 pb-2">
            <div>
              <h2 className="text-xs sm:text-sm font-extrabold text-[var(--border-color)] tracking-wider">
                01 // TECHNICAL PROJECT CASE STUDIES
              </h2>
              <p className="text-[10px] text-[var(--text-dim)]">
                Selected GenAI, RAG Architectures & Data Engineering Projects
              </p>
            </div>
            <button
              onClick={() => {
                setActiveTab("terminal");
                handleCommand("projects");
              }}
              className="text-[10px] px-2 py-1 rounded border border-[var(--border-color)] text-[var(--border-color)] hover:bg-[var(--border-color)] hover:text-black transition-all"
            >
              RUN &gt; projects IN CLI
            </button>
          </div>

          {/* Technical List of Projects */}
          <div className="space-y-3">
            {projectsData.map((project, idx) => (
              <div
                key={project.id}
                onClick={() => setSelectedProject(idx)}
                className={`p-3 rounded-lg border transition-all cursor-pointer ${
                  selectedProject === idx
                    ? "border-[var(--border-color)] bg-[var(--bg-card)] shadow-[0_0_12px_rgba(0,0,0,0.6)]"
                    : "border-[var(--border-color)]/30 bg-black/40 hover:border-[var(--border-color)]/70"
                }`}
              >
                {/* Entry Header */}
                <div className="flex items-center justify-between flex-wrap gap-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-extrabold text-[var(--color-amber)]">
                      {project.id} ─
                    </span>
                    <span className="text-sm font-extrabold text-[var(--text-main)] tracking-wider">
                      {project.name}
                    </span>
                  </div>
                  {project.badge && (
                    <span className="text-[10px] px-2 py-0.5 rounded border border-[var(--color-green)]/40 text-[var(--color-green)] bg-[var(--color-green)]/10 font-bold">
                      {project.badge}
                    </span>
                  )}
                </div>

                <div className="text-xs text-[var(--border-color)] font-semibold mt-1">
                  {project.tagline}
                </div>

                {/* Expanded Details when selected */}
                {selectedProject === idx && (
                  <div className="mt-3 pt-3 border-t border-[var(--border-color)]/20 space-y-2 text-xs">
                    <div>
                      <span className="text-[var(--color-amber)] font-bold">PROBLEM: </span>
                      <span className="text-[var(--text-main)]">{project.problem}</span>
                    </div>

                    <div>
                      <span className="text-[var(--color-amber)] font-bold">ARCHITECTURE: </span>
                      <span className="text-[var(--text-dim)]">{project.architecture}</span>
                    </div>

                    <div className="flex flex-wrap gap-1 pt-1">
                      {project.tech.map((t, i) => (
                        <span
                          key={i}
                          className="text-[10px] px-1.5 py-0.5 rounded border border-[var(--border-color)]/40 text-[var(--text-main)] bg-black/60"
                        >
                          {t}
                        </span>
                      ))}
                    </div>

                    {/* Quick Links */}
                    <div className="flex items-center gap-3 pt-2">
                      {project.demoUrl && (
                        <a
                          href={project.demoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="term-link text-xs flex items-center gap-1"
                        >
                          🔗 Live Demo ↗
                        </a>
                      )}
                      {project.repoUrl && (
                        <a
                          href={project.repoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="term-link text-xs flex items-center gap-1"
                        >
                          📦 GitHub Repo ↗
                        </a>
                      )}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

        </div>
      )}

      {/* ======================================================================= */}
      {/* MODE 3: DEDICATED AI ASSISTANT CHANNEL                                   */}
      {/* ======================================================================= */}
      {activeTab === "ai" && (
        <div className="flex-1 flex flex-col p-3 sm:p-4 overflow-y-auto min-h-0 space-y-3 font-mono">
          
          {/* AI Channel Status Card */}
          <div className="p-3 rounded-lg border border-[var(--border-color)] bg-[var(--bg-card)] space-y-2">
            <div className="flex items-center justify-between border-b border-[var(--border-color)]/30 pb-2">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[var(--color-green)] animate-ping"></span>
                <span className="text-xs font-extrabold text-[var(--border-color)] tracking-wider">
                  AI ASSISTANT // LIVE GROQ EDGE CHANNEL
                </span>
              </div>
              <span className="text-[10px] font-bold text-[var(--color-green)] px-1.5 py-0.5 rounded bg-[var(--color-green)]/10">
                STATUS: ONLINE
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[10px] text-[var(--text-dim)]">
              <div>MODEL: <strong className="text-[var(--text-main)]">LLAMA-3.3-70B</strong></div>
              <div>STREAM: <strong className="text-[var(--color-cyan)]">ACTIVE SSE</strong></div>
              <div>RUNTIME: <strong className="text-[var(--color-amber)]">NEXT.JS EDGE</strong></div>
              <div>FALLBACK: <strong className="text-[var(--color-green)]">LOCAL RAG KB</strong></div>
            </div>
          </div>

          {/* Quick AI Presets */}
          <div>
            <div className="text-[10px] font-bold text-[var(--text-dim)] uppercase mb-1.5">
              RECOMMENDED INQUIRIES:
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
              {aiPresetQueries.map((query, i) => (
                <button
                  key={i}
                  disabled={isStreaming}
                  onClick={() => {
                    setActiveTab("terminal");
                    handleCommand(query);
                  }}
                  className="p-2 text-left rounded border border-[var(--border-color)]/30 bg-black/40 hover:bg-[var(--border-color)] hover:text-black text-xs transition-all cursor-pointer text-[var(--text-main)]"
                >
                  ⚡ "{query}"
                </button>
              ))}
            </div>
          </div>

          {/* Direct Ask AI Input */}
          <div className="p-3 border border-[var(--border-color)]/40 rounded-lg bg-black/60 space-y-2">
            <div className="text-xs font-bold text-[var(--border-color)]">
              ASK AI ASSISTANT ANYTHING (TECHNICAL, PROJECTS, OR GENERAL)
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                value={inputValue}
                disabled={isStreaming}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && inputValue.trim()) {
                    setActiveTab("terminal");
                    handleCommand(inputValue);
                  }
                }}
                placeholder="Ask plain English question or prompt..."
                className="flex-1 bg-black/70 border border-[var(--border-color)]/40 rounded px-3 py-1.5 text-xs text-[var(--text-main)] focus:outline-none focus:border-[var(--border-color)] font-mono"
              />
              <button
                disabled={isStreaming || !inputValue.trim()}
                onClick={() => {
                  if (inputValue.trim()) {
                    setActiveTab("terminal");
                    handleCommand(inputValue);
                  }
                }}
                className="px-4 py-1.5 rounded border border-[var(--border-color)] text-xs font-bold text-[var(--border-color)] bg-black hover:bg-[var(--border-color)] hover:text-black transition-all cursor-pointer disabled:opacity-50"
              >
                SEND &gt;
              </button>
            </div>
          </div>

        </div>
      )}

    </main>
  );
}
