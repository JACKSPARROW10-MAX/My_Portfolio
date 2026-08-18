"use client";

import React from "react";

export default function LocationPanel({ hexStream }) {
  return (
    <div className="cyber-panel p-4 rounded-xl flex flex-col justify-between h-full overflow-hidden relative group">
      <div>
        {/* Panel Header */}
        <div className="flex items-center justify-between text-xs font-bold text-[var(--border-color)] border-b border-[var(--border-color)]/30 pb-2 mb-3">
          <span className="tracking-wider flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-amber)] animate-pulse"></span>
            LOCATION
          </span>
          <span className="text-[10px] text-[var(--color-amber)] font-mono px-1.5 py-0.5 rounded bg-[var(--color-amber)]/10 border border-[var(--color-amber)]/30">
            NODE ACTIVE
          </span>
        </div>

        {/* Geographic Information */}
        <div className="space-y-3 font-mono">
          <div className="p-3 border border-[var(--border-color)]/30 rounded-lg bg-black/60 relative overflow-hidden">
            {/* Background grid accent */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--border-color)_0%,_transparent_70%)] opacity-5 pointer-events-none"></div>

            <div className="text-base font-extrabold text-[var(--text-main)] tracking-widest uppercase">
              YADRAV
            </div>
            <div className="text-xs font-bold text-[var(--border-color)] tracking-wider">
              MAHARASHTRA
            </div>
            <div className="text-xs font-semibold text-[var(--text-dim)] tracking-wider">
              INDIA
            </div>

            <div className="mt-3 pt-2 border-t border-[var(--border-color)]/20 space-y-1.5 text-[11px]">
              <div className="flex justify-between items-center">
                <span className="text-[var(--text-dim)]">LATITUDE:</span>
                <span className="text-[var(--color-cyan)] font-bold">16.6913° N</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[var(--text-dim)]">LONGITUDE:</span>
                <span className="text-[var(--color-cyan)] font-bold">74.2449° E</span>
              </div>
            </div>
          </div>

          {/* Current Node Status Indicator */}
          <div className="p-2.5 rounded-lg border border-[var(--color-green)]/40 bg-[var(--color-green)]/10 flex items-center justify-between text-xs font-bold text-[var(--color-green)]">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--color-green)] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[var(--color-green)]"></span>
              </span>
              <span>● CURRENT NODE</span>
            </div>
            <span className="text-[10px] font-mono opacity-80">ONLINE</span>
          </div>

          {/* Compass / Reticle Technical Diagram */}
          <div className="border border-[var(--border-color)]/30 rounded-lg p-3 bg-black/40 flex flex-col items-center justify-center relative">
            <div className="w-16 h-16 rounded-full border border-dashed border-[var(--border-color)]/40 flex items-center justify-center relative">
              <div className="w-10 h-10 rounded-full border border-[var(--border-color)]/30"></div>
              <div className="absolute w-full h-[1px] bg-[var(--border-color)]/30"></div>
              <div className="absolute h-full w-[1px] bg-[var(--border-color)]/30"></div>
              <span className="absolute top-0 text-[8px] font-mono text-[var(--border-color)]">N</span>
              <span className="absolute bottom-0 text-[8px] font-mono text-[var(--text-dim)]">S</span>
              <span className="absolute left-1 text-[8px] font-mono text-[var(--text-dim)]">W</span>
              <span className="absolute right-1 text-[8px] font-mono text-[var(--text-dim)]">E</span>
            </div>
            <span className="text-[9px] font-mono text-[var(--text-dim)] mt-1.5">
              ICHALKARANJI REGION
            </span>
          </div>
        </div>
      </div>

      {/* Live Memory/Telemetry Hex Stream */}
      <div className="mt-3 pt-3 border-t border-[var(--border-color)]/30 space-y-1.5">
        <div className="text-[10px] font-mono text-[var(--text-dim)] flex justify-between items-center">
          <span>LIVE TELEMETRY:</span>
          <span className="text-[var(--border-color)] font-bold">STREAMING</span>
        </div>

        <div className="font-mono text-[10px] text-[var(--color-green)] space-y-1 bg-black/60 p-2 rounded-md border border-[var(--border-color)]/30">
          {hexStream.map((line, idx) => (
            <div key={idx} className="flex justify-between tracking-tight">
              <span className="text-[var(--text-dim)]">{line.split(" ")[0]}</span>
              <span className="text-[var(--border-color)] font-bold">{line.split(" ").slice(2).join(" ")}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
