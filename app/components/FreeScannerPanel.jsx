"use client";

import React, { useRef, useEffect, useState } from "react";

export default function FreeScannerPanel({ scanProgress }) {
  const canvasRef = useRef(null);
  const mousePosRef = useRef({ x: 0.5, y: 0.5 });
  const [signalBars, setSignalBars] = useState("████████░░");
  const [waveVal, setWaveVal] = useState("440.00 Hz");

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animFrameId;
    let scanY = 0;
    let scanDirection = 1;
    let pulseAngle = 0;

    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * (window.devicePixelRatio || 1);
      canvas.height = rect.height * (window.devicePixelRatio || 1);
      ctx.scale(window.devicePixelRatio || 1, window.devicePixelRatio || 1);
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const render = () => {
      const w = canvas.getBoundingClientRect().width;
      const h = canvas.getBoundingClientRect().height;

      ctx.clearRect(0, 0, w, h);

      // Dynamic theme colors
      const styles = getComputedStyle(document.documentElement);
      const borderColor = styles.getPropertyValue("--border-color").trim() || "#22c55e";
      const hostColor = styles.getPropertyValue("--prompt-host").trim() || "#4ade80";

      // 1. Subtle Background Grid
      ctx.strokeStyle = borderColor;
      ctx.globalAlpha = 0.08;
      ctx.lineWidth = 1;
      const gridSize = 18;
      for (let x = 0; x < w; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, h);
        ctx.stroke();
      }
      for (let y = 0; y < h; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
        ctx.stroke();
      }

      // Center Anchor
      const centerX = w / 2;
      const centerY = h / 2;
      const faceW = Math.min(w, h) * 0.38;
      const faceH = Math.min(w, h) * 0.48;

      // 2. Futuristic Face Wireframe
      pulseAngle += 0.04;
      const pulseOpacity = 0.4 + Math.sin(pulseAngle) * 0.15;

      // Outer Face Oval
      ctx.globalAlpha = pulseOpacity;
      ctx.strokeStyle = hostColor;
      ctx.lineWidth = 1.5;
      ctx.setLineDash([4, 3]);
      ctx.beginPath();
      ctx.ellipse(centerX, centerY - 5, faceW, faceH, 0, 0, Math.PI * 2);
      ctx.stroke();
      ctx.setLineDash([]); // Reset dash

      // Inner Face Contour Bounding Box
      ctx.globalAlpha = 0.3;
      ctx.strokeStyle = borderColor;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.strokeRect(centerX - faceW - 10, centerY - faceH - 10, faceW * 2 + 20, faceH * 2 + 20);

      // Corner Ticks on Face Box
      const bx = centerX - faceW - 10;
      const by = centerY - faceH - 10;
      const bw = faceW * 2 + 20;
      const bh = faceH * 2 + 20;
      const tick = 12;

      ctx.globalAlpha = 0.8;
      ctx.strokeStyle = hostColor;
      ctx.lineWidth = 2;

      // Top-Left
      ctx.beginPath(); ctx.moveTo(bx, by + tick); ctx.lineTo(bx, by); ctx.lineTo(bx + tick, by); ctx.stroke();
      // Top-Right
      ctx.beginPath(); ctx.moveTo(bx + bw - tick, by); ctx.lineTo(bx + bw, by); ctx.lineTo(bx + bw, by + tick); ctx.stroke();
      // Bottom-Left
      ctx.beginPath(); ctx.moveTo(bx, by + bh - tick); ctx.lineTo(bx, by + bh); ctx.lineTo(bx + tick, by + bh); ctx.stroke();
      // Bottom-Right
      ctx.beginPath(); ctx.moveTo(bx + bw - tick, by + bh); ctx.lineTo(bx + bw, by + bh); ctx.lineTo(bx + bw, by + bh - tick); ctx.stroke();

      // Eyes Reticles
      const eyeOffsetY = centerY - faceH * 0.25;
      const eyeOffsetX = faceW * 0.42;

      ctx.globalAlpha = 0.7;
      ctx.strokeStyle = hostColor;
      ctx.lineWidth = 1.2;

      // Left Eye
      ctx.beginPath(); ctx.arc(centerX - eyeOffsetX, eyeOffsetY, 9, 0, Math.PI * 2); ctx.stroke();
      ctx.beginPath(); ctx.arc(centerX - eyeOffsetX, eyeOffsetY, 3, 0, Math.PI * 2); ctx.fill();

      // Right Eye
      ctx.beginPath(); ctx.arc(centerX + eyeOffsetX, eyeOffsetY, 9, 0, Math.PI * 2); ctx.stroke();
      ctx.beginPath(); ctx.arc(centerX + eyeOffsetX, eyeOffsetY, 3, 0, Math.PI * 2); ctx.fill();

      // Nose Contour Bridge
      ctx.beginPath();
      ctx.moveTo(centerX, eyeOffsetY + 4);
      ctx.lineTo(centerX - 4, centerY + 8);
      ctx.lineTo(centerX + 4, centerY + 8);
      ctx.stroke();

      // Mouth Curve Arc
      ctx.beginPath();
      ctx.arc(centerX, centerY + faceH * 0.45, 14, 0.2 * Math.PI, 0.8 * Math.PI);
      ctx.stroke();

      // 3. Vertical Laser Scan Line Moving Across Face
      scanY += scanDirection * 2.2;
      if (scanY > h - 15) scanDirection = -1;
      if (scanY < 15) scanDirection = 1;

      ctx.globalAlpha = 0.9;
      ctx.strokeStyle = borderColor;
      ctx.shadowColor = borderColor;
      ctx.shadowBlur = 10;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(10, scanY);
      ctx.lineTo(w - 10, scanY);
      ctx.stroke();
      ctx.shadowBlur = 0; // reset blur

      // 4. Interactive Mouse Reticle Target
      const targetX = mousePosRef.current.x * w;
      const targetY = mousePosRef.current.y * h;

      ctx.globalAlpha = 0.6;
      ctx.strokeStyle = hostColor;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(targetX, targetY, 10, 0, Math.PI * 2);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(targetX - 14, targetY);
      ctx.lineTo(targetX + 14, targetY);
      ctx.moveTo(targetX, targetY - 14);
      ctx.lineTo(targetX, targetY + 14);
      ctx.stroke();

      animFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animFrameId);
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    mousePosRef.current = { x, y };

    const bars = Math.floor(x * 10);
    setSignalBars("█".repeat(Math.max(3, bars)) + "░".repeat(Math.max(0, 10 - bars)));
    setWaveVal(`${(300 + y * 500).toFixed(2)} Hz`);
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      className="arch-panel"
    >
      {/* Header */}
      <div className="flex items-center justify-between text-xs font-bold text-[var(--border-color)] border-b border-[var(--border-color)]/30 pb-2">
        <span className="tracking-wider flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-[var(--border-color)] animate-pulse"></span>
          FREE SCANNERS
        </span>
        <span className="text-[10px] text-[var(--color-green)] font-mono px-1.5 py-0.5 rounded bg-[var(--color-green)]/10 border border-[var(--color-green)]/30">
          FACE SCAN: ACTIVE
        </span>
      </div>

      {/* Futuristic Face Scanner Canvas Display */}
      <div className="relative w-full flex-1 my-2 border border-[var(--border-color)]/30 rounded-lg bg-black/60 overflow-hidden cursor-crosshair">
        <canvas ref={canvasRef} className="w-full h-full block" />
        
        {/* Top-right overlay coordinates */}
        <div className="absolute top-2 right-2 text-[9px] font-mono text-[var(--text-dim)] bg-black/80 px-1.5 py-0.5 rounded border border-[var(--border-color)]/20 pointer-events-none">
          MODE: DEFAULT FACE SCAN
        </div>

        {/* Bottom overlay text */}
        <div className="absolute bottom-2 left-2 text-[9px] font-mono text-[var(--prompt-host)] bg-black/80 px-1.5 py-0.5 rounded border border-[var(--border-color)]/20 pointer-events-none">
          FREQ: {waveVal}
        </div>
      </div>

      {/* Telemetry Status Bar */}
      <div className="text-[10px] font-mono text-[var(--text-dim)] space-y-1 border-t border-[var(--border-color)]/30 pt-2">
        <div className="flex justify-between items-center">
          <span>SIGNAL STRENGTH:</span>
          <span className="text-[var(--color-green)] font-bold tracking-tighter">{signalBars}</span>
        </div>
        <div className="flex justify-between items-center">
          <span>VISITOR SCAN:</span>
          <span className="text-[var(--color-amber)] font-bold">DEFAULT (ACTIVE)</span>
        </div>
        <div className="flex justify-between items-center">
          <span>SYSTEM STATUS:</span>
          <span className="text-[var(--border-color)] font-bold">ONLINE</span>
        </div>
      </div>
    </div>
  );
}
