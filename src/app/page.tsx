"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { Mail, ExternalLink, ChevronRight, Code2, Database, BrainCircuit, Terminal } from "lucide-react";

// --- Icons ---
const GitHubIcon = ({ size = 24 }: { size?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
);

const LinkedInIcon = ({ size = 24 }: { size?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
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
      className={`fixed top-0 w-full z-50 transition-all duration-500 ${scrolled ? "bg-black/40 backdrop-blur-xl border-b border-white/5 py-4 shadow-lg" : "py-8"}`}
    >
      <div className="max-w-7xl mx-auto px-8 flex justify-between items-center">
        <motion.div 
          whileHover={{ scale: 1.05 }}
          className="text-2xl font-serif font-bold tracking-wider text-gradient"
        >
          PS.
        </motion.div>
        <div className="hidden md:flex gap-8 text-[11px] tracking-[0.25em] font-medium text-white/50">
          {["HOME", "ABOUT", "PROJECTS", "EXPERIENCE", "CONTACT"].map((item) => (
            <motion.a
              key={item}
              href={`#${item.toLowerCase()}`}
              whileHover={{ color: "#fff" }}
              className="hover:text-primary-light transition-colors cursor-pointer"
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
      className="fixed inset-0 pointer-events-none z-0 mix-blend-screen"
      animate={{
        background: `radial-gradient(800px circle at ${mousePos.x}px ${mousePos.y}px, rgba(139, 92, 246, 0.15), transparent 60%)`
      }}
      transition={{ type: "tween", ease: "backOut", duration: 0.5 }}
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
    <div className="relative min-h-screen">
      <MouseGlow />
      <Navbar />

      {/* Progress Bar */}
      <motion.div className="fixed top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-primary to-secondary z-[60] origin-left" style={{ scaleX }} />

      <main className="relative z-10">
        {/* Hero Section */}
        <section id="home" className="relative min-h-screen flex items-center justify-center pt-20 px-8">
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[120px] mix-blend-screen animate-pulse-glow" />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/20 rounded-full blur-[120px] mix-blend-screen animate-pulse-glow" style={{ animationDelay: '2s' }} />
            {/* Additional animated gradient orb for premium feel */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-purple-500/5 rounded-full blur-[150px] mix-blend-screen animate-pulse-glow" style={{ animationDelay: '1s' }} />
          </div>

          <div className="grid lg:grid-cols-2 gap-16 items-center max-w-7xl mx-auto w-full relative z-10">
            <motion.div 
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="flex flex-col gap-6 relative"
            >
              {/* Spotlight behind text */}
              <div className="absolute -inset-x-20 -inset-y-20 bg-primary/5 blur-[100px] rounded-full pointer-events-none -z-10" />

              {/* Micro-label */}
              <div className="text-sm tracking-[0.4em] text-primary-light/80 font-bold uppercase">
                AI • DATA • CLOUD
              </div>

              {/* Role Chips */}
              <div className="flex flex-wrap gap-3">
                {["GenAI Engineer", "Data Analyst", "AWS Cloud", "Open to Work"].map((role, idx) => (
                  <div key={idx} className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full border text-xs font-medium shadow-sm ${
                    role === "Open to Work" 
                      ? "border-green-500/30 bg-green-500/10 text-green-400"
                      : "border-white/10 bg-white/5 text-white/70 hover:bg-white/10 transition-colors"
                  }`}>
                    {role === "Open to Work" && (
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                      </span>
                    )}
                    {role}
                  </div>
                ))}
              </div>
              
              <h1 className="font-serif text-5xl lg:text-7xl leading-[1.15] font-bold relative mt-2">
                <span className="block text-white drop-shadow-sm">Building AI Systems for</span>
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary via-purple-400 to-secondary mt-2 relative">
                  Intelligence, Insight & Scale
                  <span className="absolute inset-0 bg-gradient-to-r from-primary to-secondary blur-[30px] opacity-30 -z-10"></span>
                </span>
              </h1>
              
              <p className="text-white/70 text-lg lg:text-xl max-w-xl font-light leading-relaxed mt-2">
                Blending Generative AI, analytics, and cloud engineering to build intelligent systems that scale from insight to production.
              </p>
              
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 mt-4">
                <motion.a 
                  href="#projects"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-gradient-to-r from-primary to-secondary text-white font-semibold rounded-full flex items-center gap-2 shadow-[0_0_20px_rgba(139,92,246,0.3)] hover:shadow-[0_0_30px_rgba(139,92,246,0.5)] transition-all"
                >
                  View Projects <ChevronRight size={18} />
                </motion.a>
                <motion.a 
                  href="/resume.pdf"
                  target="_blank"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-[#0a0a0a]/50 backdrop-blur-md border border-white/10 text-white font-medium rounded-full flex items-center gap-2 hover:bg-white/10 hover:border-primary/50 hover:shadow-[0_0_20px_rgba(139,92,246,0.2)] transition-all"
                >
                  Download Resume
                </motion.a>
              </div>

              {/* Trust Indicator Row */}
              <div className="pt-6 border-t border-white/10 mt-4">
                <p className="text-xs sm:text-sm font-medium text-white/40 tracking-[0.15em] sm:tracking-[0.2em] uppercase">
                  RAG Systems • Data Pipelines • Analytics Dashboards • Cloud Workflows
                </p>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2, delay: 0.2 }}
              className="relative w-full max-w-[420px] mx-auto lg:ml-auto group animate-float"
            >
              {/* Soft floating ambient glow */}
              <div className="absolute -inset-8 bg-gradient-to-tr from-primary/20 via-purple-500/10 to-secondary/20 blur-[80px] rounded-full group-hover:scale-110 group-hover:opacity-100 opacity-60 transition-all duration-700 -z-10" />
              
              <div className="relative w-full glass p-4 rounded-[2rem] overflow-hidden border border-white/10 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.7)] bg-[#111111]/40 backdrop-blur-2xl">
                {/* Glow border inner */}
                <div className="absolute inset-0 rounded-[2rem] border border-white/5 mix-blend-overlay pointer-events-none" />
                
                <div className="relative aspect-[4/5] w-full rounded-2xl overflow-hidden mb-4 shadow-[inset_0_0_20px_rgba(0,0,0,0.5)]">
                  <Image 
                    src="/assets/portrait.png" 
                    alt="Prathamesh Salokhe" 
                    fill 
                    sizes="(max-width: 768px) 100vw, 400px"
                    className="object-cover opacity-90 transition-transform duration-700 group-hover:scale-105"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/30 to-transparent" />
                  <div className="absolute bottom-5 left-5 right-5">
                    <div className="text-2xl font-serif font-bold text-white tracking-wide">Prathamesh Salokhe</div>
                    <div className="text-sm text-primary-light/90 font-medium mt-1">AI & Data Science Undergrad</div>
                  </div>
                </div>

                {/* Mini Stats Row */}
                <div className="grid grid-cols-3 gap-3 mb-4">
                  {[
                    { label: "Projects", val: "5+" },
                    { label: "Intern", val: "GenAI" },
                    { label: "Certified", val: "AWS" },
                  ].map((stat, i) => (
                    <div key={i} className="flex flex-col items-center justify-center py-2 px-1 bg-white/[0.03] rounded-xl border border-white/5 hover:bg-white/[0.05] transition-colors">
                      <span className="text-white font-bold text-sm tracking-wide">{stat.val}</span>
                      <span className="text-white/40 text-[10px] uppercase tracking-wider mt-1">{stat.label}</span>
                    </div>
                  ))}
                </div>

                {/* Skill Pills */}
                <div className="flex flex-wrap justify-center gap-2">
                  {["RAG", "SQL", "AWS", "Power BI"].map((skill, i) => (
                    <div key={i} className="px-3 py-1.5 bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/20 rounded-lg text-xs font-medium text-white/80 hover:border-primary/40 transition-colors">
                      {skill}
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-32 px-8 relative">
          {/* Subtle ambient gradient lighting in the background */}
          <div className="absolute top-1/2 left-0 w-96 h-96 bg-primary/10 rounded-full blur-[150px] pointer-events-none" />
          <div className="absolute top-1/2 right-0 w-96 h-96 bg-secondary/10 rounded-full blur-[150px] pointer-events-none" />

          <div className="max-w-7xl mx-auto relative z-10">
            <div className="flex items-center gap-6 mb-16">
              <h2 className="text-xs tracking-[0.4em] text-primary-light/80 font-bold uppercase drop-shadow-sm">About Me</h2>
              <div className="h-[1px] bg-gradient-to-r from-primary/40 via-purple-500/20 to-transparent flex-1 shadow-[0_0_10px_rgba(139,92,246,0.3)]" />
            </div>
            
            <div className="grid lg:grid-cols-2 gap-20 items-start">
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                className="space-y-10 relative"
              >
                {/* Soft radial glow behind heading */}
                <div className="absolute -top-10 -left-10 w-64 h-64 bg-primary/5 blur-[80px] rounded-full pointer-events-none -z-10" />

                <h3 className="font-serif text-4xl lg:text-5xl leading-[1.15] font-bold text-white drop-shadow-sm">
                  Engineering Intelligence <br/> 
                  <span className="block mt-2 text-transparent bg-clip-text bg-gradient-to-r from-primary via-purple-400 to-secondary relative">
                    from Data
                    <span className="absolute inset-0 bg-gradient-to-r from-primary to-secondary blur-[20px] opacity-20 -z-10"></span>
                  </span>
                </h3>
                
                <p className="text-white/70 text-lg leading-relaxed font-light max-w-lg tracking-wide">
                  I’m an AI & Data Science undergraduate focused on building intelligent systems through Generative AI, analytics, and scalable backend architecture. I specialize in transforming raw data into production-ready solutions using RAG pipelines, automation workflows, and cloud-native engineering.
                </p>
                
                <div className="pt-4 flex flex-col sm:flex-row gap-6">
                  <div className="relative group flex-1">
                    <div className="absolute -inset-1 bg-gradient-to-r from-primary/30 to-secondary/30 rounded-2xl blur-sm opacity-50 group-hover:opacity-100 transition duration-500"></div>
                    <div className="relative p-6 bg-[#0a0a0a]/80 backdrop-blur-xl border border-white/10 rounded-2xl text-center group-hover:bg-[#111111]/80 transition-colors shadow-lg">
                      <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-400 mb-2 group-hover:scale-105 transition-transform duration-300">10+</div>
                      <div className="text-[10px] tracking-[0.2em] text-white/40 uppercase font-medium">Projects Built</div>
                    </div>
                  </div>
                  <div className="relative group flex-1">
                    <div className="absolute -inset-1 bg-gradient-to-r from-secondary/30 to-primary/30 rounded-2xl blur-sm opacity-50 group-hover:opacity-100 transition duration-500"></div>
                    <div className="relative p-6 bg-[#0a0a0a]/80 backdrop-blur-xl border border-white/10 rounded-2xl text-center group-hover:bg-[#111111]/80 transition-colors shadow-lg">
                      <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-secondary to-purple-400 mb-2 group-hover:scale-105 transition-transform duration-300">2+</div>
                      <div className="text-[10px] tracking-[0.2em] text-white/40 uppercase font-medium">Years Experience</div>
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                className="grid sm:grid-cols-2 gap-6 relative"
              >
                {/* Soft radial glow behind cards */}
                <div className="absolute inset-0 bg-secondary/5 blur-[100px] rounded-full pointer-events-none -z-10" />

                {[
                  { icon: BrainCircuit, title: "Generative AI", desc: "RAG Systems, Prompt Engineering, Fine-Tuning" },
                  { icon: Database, title: "Data Engineering", desc: "ETL Pipelines, Automation, Web Scraping", offset: "sm:translate-y-8" },
                  { icon: Code2, title: "Backend Systems", desc: "Python, FastAPI, REST APIs" },
                  { icon: Terminal, title: "Cloud & Analytics", desc: "AWS, SQL, Power BI, Dashboards", offset: "sm:translate-y-8" }
                ].map((skill, i) => (
                  <div key={i} className={`group relative ${skill.offset || ""}`}>
                    {/* Hover glow shadow */}
                    <div className="absolute -inset-0.5 bg-gradient-to-tr from-primary/20 to-secondary/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition duration-500" />
                    
                    <div className="relative h-full p-6 bg-[#111111]/40 backdrop-blur-xl border border-white/10 rounded-2xl flex flex-col gap-5 shadow-[0_10px_30px_-15px_rgba(0,0,0,0.5)] group-hover:-translate-y-1 transition-all duration-300">
                      {/* Premium icon container */}
                      <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary/20 to-purple-500/10 border border-primary/20 flex items-center justify-center text-primary-light group-hover:from-primary/30 group-hover:to-purple-500/20 group-hover:text-white transition-all duration-300 shadow-[inset_0_0_20px_rgba(139,92,246,0.1)]">
                        <skill.icon size={26} className="drop-shadow-md" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-white tracking-wide mb-1.5">{skill.title}</h4>
                        <p className="text-xs text-white/50 leading-relaxed">{skill.desc}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="py-32 px-8 relative bg-white/[0.01] border-y border-white/5">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center gap-6 mb-20">
              <h2 className="text-sm tracking-[0.5em] text-primary-light font-semibold uppercase">Featured Projects</h2>
              <div className="h-px bg-gradient-to-r from-primary/50 to-transparent flex-1" />
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
              {[
                {
                  title: "TracLyst",
                  year: "2026",
                  desc: "LeetCode Progress Analytics Platform. A Chrome extension with REST APIs and dashboards to visualize problem-solving trends and optimize interview prep.",
                  tags: ["Chrome Ext", "REST API", "Next.js", "Python"],
                  link: "#"
                },
                {
                  title: "Sunbeam Chatbot",
                  year: "2025",
                  desc: "RAG-Based AI Query System. A contextual retrieval bot for courses and internships with a Streamlit-based UI and FastAPI backend, handling complex user queries.",
                  tags: ["RAG", "LLM", "Streamlit", "FastAPI"],
                  link: "#"
                },
                {
                  title: "Alz-AI Dashboard",
                  year: "2025",
                  desc: "Medical diagnostic dashboard using AI to assist doctors in analyzing patient data for Alzheimer's early detection.",
                  tags: ["Machine Learning", "Data Science", "React"],
                  link: "#"
                },
                {
                  title: "Psychology AI",
                  year: "2025",
                  desc: "Mental health and psychology assistance bot deployed locally with FAISS index and BM25 fallback for robust document retrieval.",
                  tags: ["FAISS", "NLP", "Python"],
                  link: "#"
                }
              ].map((project, i) => (
                <motion.div 
                  key={project.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ delay: i * 0.1 }}
                  className="group relative glass-panel p-8 md:p-10 flex flex-col h-full overflow-hidden"
                >
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary/20 to-secondary/20 blur-[50px] rounded-full translate-x-1/2 -translate-y-1/2 group-hover:scale-150 transition-transform duration-700" />
                  
                  <div className="relative z-10 flex flex-col h-full">
                    <div className="flex justify-between items-start mb-6">
                      <span className="text-xs font-mono text-primary-light px-3 py-1 bg-primary/10 rounded-full">{project.year}</span>
                      <a href={project.link} className="p-2 bg-white/5 rounded-full hover:bg-white/20 text-white transition-colors">
                        <ExternalLink size={16} />
                      </a>
                    </div>
                    
                    <h3 className="font-serif text-3xl font-semibold mb-4 text-white group-hover:text-gradient transition-colors duration-300">{project.title}</h3>
                    <p className="text-white/60 text-sm leading-relaxed mb-8 flex-1">{project.desc}</p>
                    
                    <div className="flex flex-wrap gap-2 mt-auto">
                      {project.tags.map(tag => (
                        <span key={tag} className="text-xs px-3 py-1 border border-white/10 rounded-full text-white/50 bg-white/[0.02]">{tag}</span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Experience Section */}
        <section id="experience" className="py-32 px-8 relative">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-6 mb-20">
              <h2 className="text-sm tracking-[0.5em] text-primary-light font-semibold uppercase">Experience</h2>
              <div className="h-px bg-gradient-to-r from-primary/50 to-transparent flex-1" />
            </div>

            <div className="space-y-12 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-white/10 before:to-transparent">
              {[
                {
                  role: "Generative AI Intern",
                  company: "Sunbeam Infotech",
                  period: "Dec 2025 – Jan 2026",
                  desc: "Engineered RAG-based applications supporting 500+ queries. Improved response relevance by 30% through optimized embeddings and contextual chunking strategies. Developed Streamlit and FastAPI interfaces for seamless user interactions."
                },
                {
                  role: "AI–ML Virtual Intern",
                  company: "Google for Developers",
                  period: "Jul 2025 – Sep 2025",
                  desc: "Applied supervised and unsupervised ML algorithms on structured datasets. Focused on feature engineering, model evaluation, and optimizing predictive performance for real-world scenarios."
                }
              ].map((exp, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active"
                >
                  <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-background bg-primary text-white shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-primary/50 z-10">
                    <div className="w-2 h-2 bg-white rounded-full" />
                  </div>
                  
                  <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] glass-panel p-6 md:p-8 relative">
                    <div className="absolute top-6 w-4 h-4 bg-white/[0.01] border-t border-r border-white/[0.03] transform rotate-45 -left-2 md:group-odd:-left-2 md:group-even:-right-2 md:group-even:border-t-0 md:group-even:border-l md:group-even:border-b" />
                    
                    <div className="flex flex-col gap-1 mb-4">
                      <span className="text-primary-light text-xs font-mono">{exp.period}</span>
                      <h3 className="font-serif text-2xl font-semibold text-white">{exp.role}</h3>
                      <span className="text-white/40 text-sm font-medium tracking-wide uppercase">{exp.company}</span>
                    </div>
                    <p className="text-white/60 text-sm leading-relaxed">{exp.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Footer / Contact */}
      <footer id="contact" className="relative py-32 px-8 overflow-hidden">
        <div className="absolute inset-0 bg-primary/5 border-t border-primary/10" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-[300px] bg-gradient-to-t from-primary/20 to-transparent blur-[100px] rounded-full pointer-events-none" />

        <div className="relative max-w-4xl mx-auto flex flex-col items-center gap-10 text-center z-10">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white mb-4"
          >
            <Mail size={28} />
          </motion.div>
          
          <h2 className="font-serif text-5xl lg:text-7xl font-bold">
            Let's build something <br/> <span className="text-gradient italic">extraordinary.</span>
          </h2>
          
          <p className="text-white/60 text-lg max-w-xl font-light">
            I'm currently looking for new opportunities. Whether you have a question or just want to say hi, I'll try my best to get back to you!
          </p>

          <a href="mailto:prathameshsalokhe901@gmail.com" className="mt-4 px-10 py-5 bg-white text-black font-semibold rounded-full hover:bg-neutral-200 transition-colors shadow-[0_0_40px_rgba(255,255,255,0.3)] hover:scale-105 transform duration-300">
            Say Hello
          </a>

          <div className="flex gap-8 mt-12">
            {[
              { icon: GitHubIcon, href: "https://github.com" },
              { icon: LinkedInIcon, href: "https://linkedin.com" }
            ].map((social, i) => (
              <motion.a 
                key={i}
                href={social.href}
                target="_blank"
                whileHover={{ y: -5, scale: 1.1 }}
                className="w-12 h-12 rounded-full glass flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 transition-all shadow-lg"
              >
                <social.icon size={20} />
              </motion.a>
            ))}
          </div>
          
          <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mt-12 mb-8" />
          
          <p className="text-xs tracking-[0.2em] text-white/30 uppercase">
            Designed & Built by Prathamesh Salokhe © 2026
          </p>
        </div>
      </footer>
    </div>
  );
}
