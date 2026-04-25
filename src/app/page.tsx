"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { Mail, ExternalLink, ChevronRight } from "lucide-react";

// --- Icons ---
const GitHubIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
);

const LinkedInIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
);

// --- Components ---

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
      className={`fixed top-0 w-full z-50 transition-all duration-500 ${scrolled ? "bg-black/50 backdrop-blur-md py-4" : "py-8"}`}
    >
      <div className="max-w-7xl mx-auto px-8 flex justify-between items-center">
        <motion.div 
          whileHover={{ scale: 1.05 }}
          className="text-xl font-serif font-semibold tracking-widest text-indigo-400"
        >
          P. SALOKHE
        </motion.div>
        <div className="flex gap-8 text-[10px] tracking-[0.3em] font-medium text-white/50">
          {["HOME", "ABOUT", "PROJECTS", "EXPERIENCE", "CONTACT"].map((item) => (
            <motion.a
              key={item}
              href={`#${item.toLowerCase()}`}
              whileHover={{ color: "#fff", scale: 1.1 }}
              className="hover:text-white transition-colors cursor-pointer"
            >
              {item}
            </motion.a>
          ))}
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
      className="fixed inset-0 pointer-events-none z-0"
      animate={{
        background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, rgba(99, 102, 241, 0.08), transparent 80%)`
      }}
    />
  );
};

export default function Home() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div className="relative min-h-screen selection:bg-indigo-500/30 selection:text-indigo-200">
      <MouseGlow />
      <Navbar />

      {/* Progress Bar */}
      <motion.div className="fixed bottom-0 left-0 right-0 h-1 bg-indigo-500 z-50 origin-left" style={{ scaleX }} />

      <main>
        {/* Hero Section */}
        <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden px-8">
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 0.05, scale: 1 }}
            transition={{ duration: 2 }}
            className="absolute font-serif text-[25vw] font-bold text-white whitespace-nowrap pointer-events-none select-none"
          >
            SALOKHE
          </motion.div>

          <div className="relative z-10 grid lg:grid-cols-2 gap-12 items-center max-w-7xl mx-auto w-full">
            <motion.div 
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="flex flex-col gap-6"
            >
              <h1 className="font-serif text-7xl lg:text-9xl leading-[0.8] font-light">
                <span className="block">GEN-AI</span>
                <span className="block italic pl-16 text-indigo-400">SPECIALIST</span>
              </h1>
              <p className="text-white/60 text-lg lg:text-xl max-w-md font-light leading-relaxed tracking-wide">
                Architecting intelligent systems through RAG, LLMs, and automated data pipelines.
              </p>
              <motion.div 
                whileHover={{ x: 10 }}
                className="flex items-center gap-4 text-indigo-400 tracking-[0.2em] text-xs font-semibold mt-4 cursor-pointer"
              >
                EXPLORE MY WORK <ChevronRight size={16} />
              </motion.div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.5, delay: 0.2 }}
              className="relative aspect-[3/4] w-full max-w-[450px] mx-auto group"
            >
              <div className="absolute inset-0 bg-indigo-500/20 blur-[100px] rounded-full group-hover:bg-indigo-500/30 transition-all duration-1000" />
              <div className="relative w-full h-full glow-mask overflow-hidden rounded-sm">
                <Image 
                  src="/assets/portrait.png" 
                  alt="Prathamesh Salokhe" 
                  fill 
                  sizes="(max-width: 768px) 100vw, 450px"
                  className="object-cover grayscale-[0.2] contrast-[1.1] transition-transform duration-1000 group-hover:scale-110"
                  priority
                />
              </div>
            </motion.div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-32 px-8 bg-white/[0.01]">
          <div className="max-w-7xl mx-auto grid lg:grid-cols-5 gap-16">
            <div className="lg:col-span-3">
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                className="text-[10px] tracking-[0.5em] text-indigo-400 mb-12"
              >
                ABOUT ME
              </motion.h2>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="font-serif text-3xl lg:text-5xl leading-tight font-light"
              >
                I am an AI & Data Science undergraduate specializing in Generative AI and machine learning. I focus on building <span className="text-indigo-400">RAG systems</span> and automated data pipelines that turn raw data into intelligent insights.
              </motion.p>
            </div>
            <div className="lg:col-span-2 flex flex-col gap-12">
              <div className="space-y-4">
                <h3 className="text-[10px] tracking-[0.3em] text-white/40">TECH STACK</h3>
                <div className="grid grid-cols-2 gap-4">
                  {["Python", "Java", "SQL", "RAG Systems", "LLM Ops", "Selenium"].map((skill) => (
                    <div key={skill} className="flex items-center gap-3 text-sm text-white/70">
                      <div className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                      {skill}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="py-32 px-8">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-[10px] tracking-[0.5em] text-indigo-400 mb-16">FEATURED PROJECTS</h2>
            <div className="space-y-4">
              {[
                {
                  title: "TracLyst",
                  year: "2026",
                  desc: "LeetCode Progress Analytics Platform. A Chrome extension with REST APIs and dashboards to visualize problem-solving trends.",
                  tags: ["CHROME EXT", "REST API", "NEXT.JS"]
                },
                {
                  title: "Sunbeam Chatbot",
                  year: "2025",
                  desc: "RAG-Based AI Query System. A contextual retrieval bot for courses and internships with a Streamlit-based UI.",
                  tags: ["RAG", "LLM", "STREAMLIT"]
                }
              ].map((project, i) => (
                <motion.div 
                  key={project.title}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="group flex flex-col lg:flex-row justify-between items-start lg:items-center p-8 lg:p-12 bg-white/[0.02] border border-white/5 hover:border-indigo-500/50 transition-all duration-500 rounded-sm"
                >
                  <div className="flex flex-col gap-4">
                    <span className="text-xs text-indigo-400 font-medium">{project.year}</span>
                    <h3 className="font-serif text-4xl group-hover:translate-x-2 transition-transform duration-500">{project.title}</h3>
                    <p className="text-white/50 text-sm max-w-md">{project.desc}</p>
                  </div>
                  <div className="flex gap-3 mt-6 lg:mt-0">
                    {project.tags.map(tag => (
                      <span key={tag} className="text-[9px] tracking-widest border border-white/20 px-3 py-1 text-white/40">{tag}</span>
                    ))}
                    <motion.div whileHover={{ scale: 1.1 }} className="p-2 border border-white/20 text-white/40 hover:text-white hover:border-white transition-all cursor-pointer">
                      <ExternalLink size={14} />
                    </motion.div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Experience Section */}
        <section id="experience" className="py-32 px-8 bg-white/[0.01]">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-[10px] tracking-[0.5em] text-indigo-400 mb-16">EXPERIENCE</h2>
            <div className="grid lg:grid-cols-2 gap-8">
              {[
                {
                  role: "Generative AI Intern",
                  company: "Sunbeam Infotech",
                  period: "Dec 2025 – Jan 2026",
                  desc: "Engineered RAG-based applications supporting 500+ queries. Improved response relevance by 30% through optimized embeddings."
                },
                {
                  role: "AI–ML Virtual Intern",
                  company: "Google for Developers",
                  period: "Jul 2025 – Sep 2025",
                  desc: "Applied supervised and unsupervised ML algorithms on structured datasets. Focused on feature engineering and model evaluation."
                }
              ].map((exp, i) => (
                <motion.div 
                  key={exp.role}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.2 }}
                  className="p-8 border-l-2 border-indigo-500/30 bg-indigo-500/[0.02] hover:bg-indigo-500/[0.04] transition-colors duration-500"
                >
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="font-serif text-2xl">{exp.role}</h3>
                    <span className="text-[10px] text-white/30 tracking-widest uppercase">{exp.period}</span>
                  </div>
                  <div className="text-indigo-400 text-xs tracking-widest font-bold mb-4">{exp.company.toUpperCase()}</div>
                  <p className="text-white/50 text-sm leading-relaxed">{exp.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Footer / Contact */}
      <footer id="contact" className="py-32 px-8 border-t border-white/5">
        <div className="max-w-7xl mx-auto flex flex-col items-center gap-12 text-center">
          <motion.h2 
            whileInView={{ scale: [0.95, 1], opacity: [0, 1] }}
            className="font-serif text-5xl lg:text-7xl font-light"
          >
            LET'S BUILD <span className="italic text-indigo-400">TOGETHER</span>
          </motion.h2>
          <div className="flex gap-12">
            {[
              { icon: GitHubIcon, href: "https://github.com" },
              { icon: LinkedInIcon, href: "https://linkedin.com" },
              { icon: Mail, href: "mailto:prathameshsalokhe901@gmail.com" }
            ].map((social, i) => (
              <motion.a 
                key={i}
                href={social.href}
                target="_blank"
                whileHover={{ y: -5, color: "#6366f1" }}
                className="text-white/40 transition-all"
              >
                <social.icon size={24} />
              </motion.a>
            ))}
          </div>
          <p className="text-[10px] tracking-[0.5em] text-white/20 mt-16">© 2026 PRATHAMESH SALOKHE</p>
        </div>
      </footer>
    </div>
  );
}
