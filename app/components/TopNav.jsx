"use client";

import React from "react";
import { CONFIG } from "../config";

export default function TopNav({ currentTheme, onCommand, activeTab, setActiveTab, isStreaming }) {
  const navItems = [
    { label: "HOME", cmd: "clear", tab: "terminal" },
    { label: "ABOUT", cmd: "whoami", tab: "terminal" },
    { label: "PROJECTS", cmd: "projects", tab: "projects" },
    { label: "EXPERIENCE", cmd: "resume", tab: "terminal" },
    { label: "SKILLS", cmd: "skills", tab: "terminal" },
    { label: "AI ASSISTANT", cmd: "", tab: "ai" },
    { label: "CONTACT", cmd: "contact", tab: "terminal" }
  ];

  return (
    <header className="cyber-panel w-full px-3 sm:px-5 py-2.5 rounded-xl flex items-center justify-between mb-2.5 shrink-0 h-[56px] relative z-30">
      {/* Left branding handle */}
      <div className="flex items-center gap-3">
        <div className="relative flex items-center justify-center w-3 h-3">
          <span className="absolute w-full h-full rounded-full bg-[var(--border-color)] animate-ping opacity-75"></span>
          <span className="w-2 h-2 rounded-full bg-[var(--border-color)] shadow-[0_0_8px_var(--border-color)]"></span>
        </div>
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <span className="text-xs sm:text-sm font-extrabold text-[var(--border-color)] tracking-wider uppercase">
              {CONFIG.handle}@{CONFIG.host}
            </span>
            <span className="text-[10px] px-1.5 py-0.2 rounded border border-[var(--border-color)]/40 text-[var(--border-color)] bg-black/40 font-mono hidden sm:inline-block">
              v2.4_GRID
            </span>
          </div>
        </div>
      </div>

      {/* Center Navigation Links */}
      <nav className="hidden lg:flex items-center gap-1 sm:gap-2 text-xs font-bold tracking-widest">
        {navItems.map((item, idx) => {
          const isActive = activeTab === item.tab && (item.tab !== "terminal" || item.label === "HOME");
          return (
            <button
              key={idx}
              disabled={isStreaming}
              onClick={(e) => {
                e.stopPropagation();
                if (item.tab) setActiveTab(item.tab);
                if (item.cmd) onCommand(item.cmd);
              }}
              className={`px-2.5 py-1.5 rounded transition-all cursor-pointer font-mono text-[11px] uppercase flex items-center gap-1.5 ${
                isActive
                  ? "bg-[var(--border-color)] text-black font-extrabold shadow-[0_0_12px_var(--border-color)]"
                  : "text-[var(--text-main)] hover:text-[var(--border-color)] hover:bg-[var(--border-color)]/10"
              }`}
            >
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Right Action Controls */}
      <div className="flex items-center gap-2">
        <a
          href={CONFIG.externalPortfolioUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="px-3 py-1.5 rounded border border-[var(--border-color)] text-xs font-mono font-bold text-[var(--border-color)] bg-black/60 hover:bg-[var(--border-color)] hover:text-[var(--bg-main)] transition-all shadow-[0_0_10px_rgba(0,0,0,0.5)] flex items-center gap-1 group"
        >
          <span>{CONFIG.externalPortfolioText}</span>
        </a>
      </div>
    </header>
  );
}
