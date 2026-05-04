"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, useScroll, useSpring } from "framer-motion";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 w-full z-50 transition-all duration-500 ${scrolled ? "bg-black/40 backdrop-blur-xl border-b border-white/5 py-4 shadow-lg" : "py-8"}`}
    >
      <div className="max-w-7xl mx-auto px-8 flex justify-between items-center">
        <motion.a 
          href="/"
          whileHover={{ scale: 1.05 }}
          className="text-2xl font-serif font-bold tracking-wider text-gradient block"
        >
          PS.
        </motion.a>
        <div className="hidden md:flex gap-8 text-[11px] tracking-[0.25em] font-medium text-white/50">
          {["HOME", "ABOUT", "PROJECTS", "EXPERIENCE", "CONTACT"].map((item) => (
            <motion.a
              key={item}
              href={item === "HOME" ? "/" : `/#${item.toLowerCase()}`}
              whileHover={{ color: "#fff" }}
              className="hover:text-primary-light transition-colors cursor-pointer"
            >
              {item}
            </motion.a>
          ))}
          <motion.a
            href="/gallery"
            whileHover={{ color: "#fff" }}
            className="text-primary-light transition-colors cursor-pointer border-b border-primary-light/30 pb-1"
          >
            GALLERY
          </motion.a>
        </div>
      </div>
    </motion.nav>
  );
};

const MouseGlow = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <motion.div 
      className="fixed inset-0 pointer-events-none z-0 mix-blend-screen"
      animate={{
        background: `radial-gradient(800px circle at ${mousePos.x}px ${mousePos.y}px, rgba(139, 92, 246, 0.15), transparent 60%)`
      }}
      transition={{ type: "tween", ease: "backOut", duration: 0.5 }}
    />
  );
};

export default function GalleryPage() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div className="relative min-h-screen pb-32">
      <MouseGlow />
      <Navbar />

      {/* Progress Bar */}
      <motion.div className="fixed top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-primary to-secondary z-[60] origin-left" style={{ scaleX }} />

      <main className="relative z-10 pt-40 px-8">
        {/* Gallery / Achievements Section */}
        <section id="gallery" className="relative bg-transparent">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[150px] pointer-events-none -z-10" />
          
          <div className="max-w-7xl mx-auto relative z-10">
            <div className="flex items-center gap-6 mb-16">
              <h1 className="text-xs tracking-[0.4em] text-primary-light/80 font-bold uppercase drop-shadow-sm">Achievements & Certifications</h1>
              <div className="h-[1px] bg-gradient-to-r from-primary/40 via-purple-500/20 to-transparent flex-1 shadow-[0_0_10px_rgba(139,92,246,0.3)]" />
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                { 
                  title: "AWS Cloud Practitioner", 
                  category: "Certification", 
                  image: "/assets/certificate_aws.png",
                  desc: "Demonstrated overall understanding of the AWS Cloud platform, covering security, architecture, and core services."
                },
                { 
                  title: "Machine Learning Specialization", 
                  category: "Certification", 
                  image: "/assets/certificate_ml.png",
                  desc: "Mastered fundamental AI concepts including supervised learning, unsupervised learning, and neural network architectures."
                },
                { 
                  title: "AI Hackathon Winner", 
                  category: "Achievement", 
                  image: "/assets/certificate_hackathon.png",
                  desc: "Awarded 1st place for developing an innovative RAG-based diagnostic tool within a 48-hour competitive timeframe."
                }
              ].map((item, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ delay: i * 0.15 }}
                  className="group relative glass-panel p-4 flex flex-col gap-4 overflow-hidden rounded-2xl hover:-translate-y-2 transition-all duration-500 shadow-[0_10px_30px_-15px_rgba(0,0,0,0.4)] hover:shadow-[0_20px_40px_-15px_rgba(139,92,246,0.3)]"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  <div className="relative aspect-[4/3] w-full rounded-xl overflow-hidden shadow-inner">
                    <Image 
                      src={item.image} 
                      alt={item.title} 
                      fill 
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
                  </div>
                  
                  <div className="relative z-10 px-2 pb-2">
                    <span className="text-[10px] tracking-widest text-primary-light uppercase font-semibold mb-1 block">{item.category}</span>
                    <h3 className="font-serif text-xl font-bold text-white mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-primary-light transition-colors">{item.title}</h3>
                    <p className="text-sm text-white/60 leading-relaxed line-clamp-3">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
