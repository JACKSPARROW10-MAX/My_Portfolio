"use client";

import React, { useRef, useEffect } from "react";

export default function GlobeRevolvingPanel() {
  const canvasRef = useRef(null);
  const rotationRef = useRef({ rotX: 0.3, rotY: 0 });
  const isDraggingRef = useRef(false);
  const previousMouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animFrameId;

    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * (window.devicePixelRatio || 1);
      canvas.height = rect.height * (window.devicePixelRatio || 1);
      ctx.scale(window.devicePixelRatio || 1, window.devicePixelRatio || 1);
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Generate globe 3D latitude & longitude points
    const points = [];
    const latLines = 8;
    const lonLines = 12;
    const numPointsPerLat = 24;

    for (let i = 0; i <= latLines; i++) {
      const lat = (Math.PI * i) / latLines - Math.PI / 2;
      for (let j = 0; j < numPointsPerLat; j++) {
        const lon = (2 * Math.PI * j) / numPointsPerLat;
        const x = Math.cos(lat) * Math.sin(lon);
        const y = Math.sin(lat);
        const z = Math.cos(lat) * Math.cos(lon);
        points.push({ x, y, z, lat, lon });
      }
    }

    // Specific Location Marker for Yadrav / Kolhapur (Lat: ~16.7°, Lon: ~74.2°)
    const targetLat = (16.6913 * Math.PI) / 180;
    const targetLon = (74.2449 * Math.PI) / 180;
    const pin = {
      x: Math.cos(targetLat) * Math.sin(targetLon),
      y: Math.sin(targetLat),
      z: Math.cos(targetLat) * Math.cos(targetLon)
    };

    let pulseTime = 0;

    const render = () => {
      const w = canvas.getBoundingClientRect().width;
      const h = canvas.getBoundingClientRect().height;

      ctx.clearRect(0, 0, w, h);

      const styles = getComputedStyle(document.documentElement);
      const borderColor = styles.getPropertyValue("--border-color").trim() || "#22c55e";
      const cyanColor = styles.getPropertyValue("--color-cyan").trim() || "#22d3ee";
      const pinkColor = styles.getPropertyValue("--color-pink").trim() || "#f43f5e";

      const centerX = w / 2;
      const centerY = h / 2;
      const radius = Math.min(w, h) * 0.38;

      // Auto-rotation when not dragging
      if (!isDraggingRef.current) {
        rotationRef.current.rotY += 0.008;
      }

      const rx = rotationRef.current.rotX;
      const ry = rotationRef.current.rotY;

      // Helper 3D rotation transform
      const project = (px, py, pz) => {
        // Rotate Y
        const x1 = px * Math.cos(ry) + pz * Math.sin(ry);
        const z1 = -px * Math.sin(ry) + pz * Math.cos(ry);
        // Rotate X
        const y2 = py * Math.cos(rx) - z1 * Math.sin(rx);
        const z2 = py * Math.sin(rx) + z1 * Math.cos(rx);

        return {
          x: centerX + x1 * radius,
          y: centerY - y2 * radius,
          z: z2,
          visible: z2 > -0.2
        };
      };

      // Draw Outer Globe Boundary Circle
      ctx.strokeStyle = borderColor;
      ctx.globalAlpha = 0.2;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
      ctx.stroke();

      // Render latitude rings
      ctx.lineWidth = 1;
      for (let i = 1; i < latLines; i++) {
        const lat = (Math.PI * i) / latLines - Math.PI / 2;
        const ringRadius = Math.cos(lat) * radius;
        const ringY = centerY - Math.sin(lat) * radius * Math.cos(rx);

        ctx.globalAlpha = 0.12;
        ctx.beginPath();
        ctx.ellipse(centerX, ringY, ringRadius, ringRadius * Math.abs(Math.sin(rx)), 0, 0, Math.PI * 2);
        ctx.stroke();
      }

      // Render Points Matrix
      ctx.fillStyle = borderColor;
      points.forEach((p) => {
        const proj = project(p.x, p.y, p.z);
        if (proj.visible) {
          const alpha = Math.max(0.1, (proj.z + 1) / 2);
          ctx.globalAlpha = alpha * 0.7;
          ctx.beginPath();
          ctx.arc(proj.x, proj.y, 1.2, 0, Math.PI * 2);
          ctx.fill();
        }
      });

      // Render Location Pin Pulse Dot
      const pinProj = project(pin.x, pin.y, pin.z);
      if (pinProj.visible) {
        pulseTime += 0.05;
        const pulseRadius = 4 + Math.sin(pulseTime) * 3;

        ctx.globalAlpha = 0.9;
        ctx.fillStyle = pinkColor;
        ctx.shadowColor = pinkColor;
        ctx.shadowBlur = 10;
        ctx.beginPath();
        ctx.arc(pinProj.x, pinProj.y, 3, 0, Math.PI * 2);
        ctx.fill();

        ctx.strokeStyle = cyanColor;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.arc(pinProj.x, pinProj.y, pulseRadius, 0, Math.PI * 2);
        ctx.stroke();
        ctx.shadowBlur = 0;
      }

      animFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animFrameId);
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);

  const handleMouseDown = (e) => {
    isDraggingRef.current = true;
    previousMouseRef.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseMove = (e) => {
    if (!isDraggingRef.current) return;
    const deltaX = e.clientX - previousMouseRef.current.x;
    const deltaY = e.clientY - previousMouseRef.current.y;

    rotationRef.current.rotY += deltaX * 0.01;
    rotationRef.current.rotX += deltaY * 0.01;

    // Clamp vertical tilt
    rotationRef.current.rotX = Math.max(-Math.PI / 2.5, Math.min(Math.PI / 2.5, rotationRef.current.rotX));

    previousMouseRef.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseUp = () => {
    isDraggingRef.current = false;
  };

  return (
    <div
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      className="cyber-panel p-3.5 rounded-xl flex flex-col justify-between relative overflow-hidden h-[50%] group transition-all"
    >
      {/* Header */}
      <div className="flex items-center justify-between text-xs font-bold text-[var(--border-color)] border-b border-[var(--border-color)]/30 pb-2">
        <span className="tracking-wider flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-cyan)] animate-ping"></span>
          GLOBE REVOLVING
        </span>
        <span className="text-[10px] text-[var(--color-cyan)] font-mono px-1.5 py-0.5 rounded bg-[var(--color-cyan)]/10 border border-[var(--color-cyan)]/30">
          ORBIT: 360°
        </span>
      </div>

      {/* Interactive 3D Canvas Globe */}
      <div className="relative w-full flex-1 my-2 flex items-center justify-center overflow-hidden cursor-grab active:cursor-grabbing bg-black/40 rounded-lg border border-[var(--border-color)]/20">
        <canvas ref={canvasRef} className="w-full h-full block" />
        
        <div className="absolute bottom-2 left-2 text-[9px] font-mono text-[var(--text-dim)] bg-black/70 px-1.5 py-0.5 rounded border border-[var(--border-color)]/20 pointer-events-none">
          DRAG TO ROTATE
        </div>
      </div>

      {/* Orbit & Lat Grid Status */}
      <div className="text-[10px] font-mono text-[var(--text-dim)] border-t border-[var(--border-color)]/30 pt-2 flex justify-between items-center">
        <span>LATITUDE GRID:</span>
        <span className="text-[var(--border-color)] font-bold">16.6913° N // 74.2449° E</span>
      </div>
    </div>
  );
}
