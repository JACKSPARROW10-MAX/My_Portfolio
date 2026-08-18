/**
 * Terminal Portfolio Configuration
 * Easily update settings, external links, color themes, and model parameters.
 */

export const CONFIG = {
  // Candidate Metadata
  name: "Prathamesh Salokhe",
  handle: "prathamesh",
  host: "portfolio",
  role: "AI & Data Science | Entry-Level AI/ML & Data Engineering",
  
  // Top-Right External Link Button
  externalPortfolioUrl: "https://github.com/JACKSPARROW10-MAX",
  externalPortfolioText: "[view portfolio →]",

  // Groq API Model Configuration
  groqModel: "llama-3.3-70b-versatile",
  maxTokens: 1024,
  temperature: 0.7,

  // UI Teletype & Boot Sequence Speed (in milliseconds)
  bootSpeedMs: 200,
  teletypeSpeedMs: 8,

  // Color Themes (Green, Amber, Cyan)
  themes: {
    green: {
      name: "Matrix Phosphor Green",
      bg: "#020b06",
      cardBg: "#05160d",
      border: "#22c55e",
      promptUser: "#22c55e",
      promptHost: "#4ade80",
      primaryText: "#f0fdf4",
      accentPink: "#f43f5e",
      accentCyan: "#22d3ee",
      accentGreen: "#10b981",
      accentAmber: "#eab308",
      accentBlue: "#3b82f6",
      accentPurple: "#a855f7",
      glow: "0 0 15px rgba(34, 197, 94, 0.3)"
    },
    amber: {
      name: "Retro Amber Phosphor",
      bg: "#0c0802",
      cardBg: "#1a1205",
      border: "#f59e0b",
      promptUser: "#f59e0b",
      promptHost: "#fbbf24",
      primaryText: "#fffbeb",
      accentPink: "#f43f5e",
      accentCyan: "#38bdf8",
      accentGreen: "#34d399",
      accentAmber: "#f59e0b",
      accentBlue: "#60a5fa",
      accentPurple: "#c084fc",
      glow: "0 0 15px rgba(245, 158, 11, 0.3)"
    },
    cyan: {
      name: "Cyber Cyan Synthwave",
      bg: "#040b14",
      cardBg: "#0b1524",
      border: "#06b6d4",
      promptUser: "#22d3ee",
      promptHost: "#38bdf8",
      primaryText: "#ecfeff",
      accentPink: "#ec4899",
      accentCyan: "#22d3ee",
      accentGreen: "#10b981",
      accentAmber: "#f59e0b",
      accentBlue: "#3b82f6",
      accentPurple: "#a855f7",
      glow: "0 0 15px rgba(6, 182, 212, 0.3)"
    },
    // Backwards compatibility fallbacks
    cyberpunk: {
      name: "Cyber Cyan Synthwave",
      bg: "#040b14",
      cardBg: "#0b1524",
      border: "#06b6d4",
      promptUser: "#22d3ee",
      promptHost: "#38bdf8",
      primaryText: "#ecfeff",
      accentPink: "#ec4899",
      accentCyan: "#22d3ee",
      accentGreen: "#10b981",
      accentAmber: "#f59e0b",
      accentBlue: "#3b82f6",
      accentPurple: "#a855f7",
      glow: "0 0 15px rgba(6, 182, 212, 0.3)"
    },
    tokyonight: {
      name: "Tokyo Night",
      bg: "#0a0e14",
      cardBg: "#121824",
      border: "#38bdf8",
      promptUser: "#38bdf8",
      promptHost: "#818cf8",
      primaryText: "#e2e8f0",
      accentPink: "#f43f5e",
      accentCyan: "#38bdf8",
      accentGreen: "#4ade80",
      accentAmber: "#fde047",
      accentBlue: "#60a5fa",
      accentPurple: "#c084fc",
      glow: "0 0 15px rgba(56, 189, 248, 0.3)"
    },
    matrix: {
      name: "Matrix Phosphor Green",
      bg: "#020b06",
      cardBg: "#05160d",
      border: "#22c55e",
      promptUser: "#22c55e",
      promptHost: "#4ade80",
      primaryText: "#f0fdf4",
      accentPink: "#f43f5e",
      accentCyan: "#22d3ee",
      accentGreen: "#10b981",
      accentAmber: "#eab308",
      accentBlue: "#3b82f6",
      accentPurple: "#a855f7",
      glow: "0 0 15px rgba(34, 197, 94, 0.3)"
    }
  }
};
