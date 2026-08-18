/**
 * Manual Portfolio View Engine - Lavender Neumorphic Clay Theme
 * Custom UI designed matching the reference purple folder-card layout
 * Populated with Prathamesh Ranjit Salokhe's exact Resume Data.
 */

export class ManualPortfolioEngine {
  constructor(options = {}) {
    this.container = options.container;
    this.onBackToLanding = options.onBackToLanding;
  }

  render() {
    if (!this.container) return;

    this.container.innerHTML = `
      <div id="manual-viewport" class="theme-lavender-bg min-h-screen font-sans selection:bg-purple-300 selection:text-purple-900 pb-20 relative overflow-x-hidden">
        
        <!-- Sticky Top Search & Utility Header Bar -->
        <header class="sticky top-0 z-50 bg-[#5b52a3]/90 backdrop-blur-md border-b border-[#a49cf2]/30 py-3 px-4 sm:px-8">
          <div class="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
            
            <!-- Search Bar Pill (Matching Top Left Search in Reference Image) -->
            <div class="clay-search-bar flex items-center px-4 py-2.5 w-full md:w-[420px] gap-3">
              <svg class="w-5 h-5 text-[#c4bdff] shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
              <input type="text" id="resume-search-input" placeholder="Search resume: SQL, RAG, AWS, NeuroNauts..." class="bg-transparent border-none outline-none w-full text-xs font-semibold" />
            </div>

            <!-- Top Right Action Pills (Matching LOGIN / BUAT AKUN) -->
            <div class="flex items-center gap-3">
              <a href="mailto:prathameshsalokhe901@gmail.com" class="clay-pill-btn px-5 py-2 text-xs uppercase tracking-wider text-center">
                LOGIN / CONTACT
              </a>
              <a href="https://github.com/JACKSPARROW10-MAX" target="_blank" rel="noopener" class="clay-pill-btn px-5 py-2 text-xs uppercase tracking-wider text-center">
                GITHUB PROFILE
              </a>
              <button id="manual-exit-to-landing" class="clay-pill-btn-purple px-4 py-2 text-xs flex items-center gap-1.5">
                <span>🎧</span>
                <span>AUTO STORY</span>
              </button>
            </div>

          </div>
        </header>

        <!-- Main Content Area -->
        <main class="max-w-5xl mx-auto px-4 sm:px-6 pt-8 space-y-12 relative z-10">
          
          <!-- TOP PANEL 1: HERO & ABOUT (Matching Top Main Card in Reference) -->
          <section id="hero-card" class="clay-panel p-6 sm:p-10 relative overflow-hidden">
            
            <!-- Background Decorative Stars & Planets -->
            <div class="absolute top-4 right-8 opacity-20 pointer-events-none text-4xl">🪐</div>
            <div class="absolute bottom-6 left-6 opacity-20 pointer-events-none text-3xl">✨</div>

            <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
              
              <!-- Left Header Column -->
              <div class="lg:col-span-6 flex flex-col justify-between space-y-6">
                
                <div class="space-y-2">
                  <div class="text-[11px] font-extrabold uppercase tracking-widest text-[#d8d3ff]">
                    CHALLENGE UI &bull; RESUME PORTFOLIO
                  </div>
                  <h1 class="text-4xl sm:text-5xl font-black tracking-tight text-white uppercase leading-none drop-shadow-md">
                    PRATHAMESH<br />
                    <span class="text-[#e2ddff] text-3xl sm:text-4xl">RANJIT SALOKHE</span>
                  </h1>
                  <div class="text-xs font-bold text-[#c8c1ff] tracking-wider uppercase pt-1">
                    DKTE SOCIETY'S TEXTILE & ENGINEERING INSTITUTE
                  </div>
                </div>

                <!-- Action Button Pills -->
                <div class="flex flex-wrap items-center gap-3 pt-2">
                  <a href="mailto:prathameshsalokhe901@gmail.com" class="clay-pill-btn px-6 py-2.5 text-xs tracking-wider">
                    EMAIL ME
                  </a>
                  <a href="tel:+917768960392" class="clay-pill-btn px-6 py-2.5 text-xs tracking-wider">
                    +91 7768960392
                  </a>
                </div>

              </div>

              <!-- Right Light Purple Inset Card (Matching "GALAKSI ADALAH..." Card) -->
              <div class="lg:col-span-6 clay-inner-card p-6 sm:p-8 flex flex-col justify-between space-y-4">
                
                <div class="space-y-3">
                  <div class="text-xs font-black uppercase tracking-wider text-[#433980] border-b border-[#c8c1ff] pb-2 flex items-center justify-between">
                    <span>GALAKSI / ABOUT ME ...</span>
                    <span class="text-[10px] bg-[#736abf] text-white px-2 py-0.5 rounded-full font-mono">APM & GENAI</span>
                  </div>
                  <h2 class="text-xl font-extrabold text-[#272052]">
                    Aspiring Associate Product Manager & GenAI Specialist
                  </h2>
                  <p class="text-xs sm:text-sm text-[#3b3270] leading-relaxed font-medium">
                    AI & Data Science undergraduate transitioning into product management. Hands-on experience taking GenAI products from problem definition through requirements, prototyping, and delivery (LangChain, ChromaDB, Zilliz Cloud, Groq LLM) with automated CI/CD.
                  </p>
                </div>

                <div class="grid grid-cols-2 gap-2 pt-2 border-t border-[#d5cefc]">
                  <div class="text-[11px] text-[#4d448a] font-bold">
                    📍 Kolhapur, Maharashtra
                  </div>
                  <div class="text-[11px] text-[#4d448a] font-bold text-right">
                    LeetCode: <a href="https://leetcode.com/u/Prathamesh_10_2005/" target="_blank" class="underline">1500+</a>
                  </div>
                </div>

              </div>

            </div>

          </section>


          <!-- FLOATING NAVIGATION DOCK (Matching 4-Icon Dock in Reference Image) -->
          <div class="flex justify-center">
            <div class="clay-nav-dock px-6 py-3 flex items-center gap-4 sm:gap-6">
              
              <a href="#summary-card" title="Summary" class="clay-nav-icon w-12 h-12 flex items-center justify-center text-xl cursor-pointer">
                🏠
              </a>
              <a href="#case-studies-card" title="Case Studies" class="clay-nav-icon w-12 h-12 flex items-center justify-center text-xl cursor-pointer">
                📑
              </a>
              <a href="#experience-card" title="Experience" class="clay-nav-icon w-12 h-12 flex items-center justify-center text-xl cursor-pointer">
                💼
              </a>
              <a href="#skills-card" title="Skills" class="clay-nav-icon w-12 h-12 flex items-center justify-center text-xl cursor-pointer">
                🛠
              </a>
              <a href="#education-card" title="Education & Awards" class="clay-nav-icon w-12 h-12 flex items-center justify-center text-xl cursor-pointer">
                🎓
              </a>

            </div>
          </div>


          <!-- PANEL 2: EXECUTIVE SUMMARY & METRICS (Matching Middle Card in Reference) -->
          <section id="summary-card" class="clay-panel p-6 sm:p-10 relative overflow-hidden space-y-6">
            
            <!-- Top Folder Notch Badge Tag -->
            <div class="inline-block folder-tab-badge px-6 py-2 text-xs font-black tracking-wider uppercase text-white shadow-sm">
              PENJELASAN SINGKAT TENTANG PRATHAMESH
            </div>

            <!-- Astronaut Illustration Floating Badge -->
            <div class="absolute top-4 right-6 hidden md:block text-5xl pointer-events-none animate-bounce duration-1000">
              👨‍🚀
            </div>

            <div class="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
              
              <!-- Left Description Card -->
              <div class="md:col-span-7 clay-inner-card p-6 space-y-4">
                <p class="text-xs sm:text-sm text-[#2c2459] leading-relaxed font-medium">
                  Designed and shipped end-to-end RAG-based product experiences with CI/CD pipelines, and built executive Power BI & Streamlit dashboards for KPI tracking. Top 6 / 400+ teams ACM WCE Hackathon 2026; 1st Place / ~200 teams Hack AI Blitz 2025. AWS Academy Data Engineering certified.
                </p>
                <div class="flex items-center gap-3">
                  <a href="#case-studies-card" class="clay-pill-btn-purple px-5 py-2 text-xs flex items-center gap-2">
                    <span>➔</span> <span>Explore Case Studies</span>
                  </a>
                  <a href="#education-card" class="clay-pill-btn px-5 py-2 text-xs flex items-center gap-2">
                    <span>➔</span> <span>View Credentials</span>
                  </a>
                </div>
              </div>

              <!-- Right Stat Pills Grid (Matching Right Pill in Reference Image) -->
              <div class="md:col-span-5 grid grid-cols-2 gap-3">
                
                <div class="clay-inner-card p-4 text-center space-y-1">
                  <div class="text-2xl font-black text-[#382d73]">8.96</div>
                  <div class="text-[10px] font-extrabold uppercase text-[#5a4fa0]">B.Tech CGPA</div>
                </div>

                <div class="clay-inner-card p-4 text-center space-y-1">
                  <div class="text-2xl font-black text-[#382d73]">Top 6</div>
                  <div class="text-[10px] font-extrabold uppercase text-[#5a4fa0]">ACM WCE (400+ Teams)</div>
                </div>

                <div class="clay-inner-card p-4 text-center space-y-1">
                  <div class="text-2xl font-black text-[#382d73]">1st Place</div>
                  <div class="text-[10px] font-extrabold uppercase text-[#5a4fa0]">Hack AI Blitz 2025</div>
                </div>

                <div class="clay-inner-card p-4 text-center space-y-1">
                  <div class="text-2xl font-black text-[#382d73]">AWS Data</div>
                  <div class="text-[10px] font-extrabold uppercase text-[#5a4fa0]">Engineering Cert</div>
                </div>

              </div>

            </div>

          </section>


          <!-- SCROLL DOWN NOTCH INDICATOR ("GULIR ↓") -->
          <div class="flex flex-col items-center justify-center space-y-2 py-2">
            <a href="#case-studies-card" class="clay-scroll-notch px-6 py-3 text-center flex flex-col items-center justify-center gap-1 cursor-pointer group">
              <span class="text-[11px] font-black tracking-widest uppercase text-white group-hover:scale-110 transition-transform">GULIR / SCROLL</span>
              <span class="text-white text-base font-bold animate-bounce">↓</span>
            </a>
          </div>


          <!-- PANEL 3: PRODUCT CASE STUDIES (Matching Bottom Gallery in Reference Image) -->
          <section id="case-studies-card" class="clay-panel p-6 sm:p-10 space-y-8">
            
            <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#a49cf2]/30 pb-4">
              <div>
                <div class="text-xs font-black uppercase tracking-widest text-[#d8d3ff]">GENAI & PRODUCT INNOVATIONS</div>
                <h3 class="text-2xl sm:text-3xl font-black text-white uppercase">Product Case Studies</h3>
              </div>
              <span class="clay-badge px-4 py-1.5 text-xs font-bold font-mono">3 FEATURED PROJECTS</span>
            </div>

            <!-- Case Study Grid (Matching Bottom Image Grid with Arrows) -->
            <div class="grid grid-cols-1 md:grid-cols-12 gap-6">
              
              <!-- Case Study 1: NeuroNauts -->
              <div class="md:col-span-6 clay-inner-card p-6 flex flex-col justify-between space-y-4 hover:scale-[1.01] transition-transform">
                <div class="space-y-3">
                  <div class="flex items-center justify-between">
                    <span class="text-[10px] font-extrabold uppercase bg-[#6259ac] text-white px-3 py-1 rounded-full">TOP 6 / 400+ TEAMS</span>
                    <a href="https://neuronauts.streamlit.app/" target="_blank" rel="noopener" title="Live Demo" class="w-9 h-9 rounded-xl bg-[#6259ac] text-white flex items-center justify-center font-bold text-sm hover:scale-110 transition-transform">
                      ➔
                    </a>
                  </div>
                  <h4 class="text-xl font-extrabold text-[#231b4e]">NeuroNauts &mdash; AI Study Companion</h4>
                  <p class="text-xs text-[#3c336e] leading-relaxed font-medium">
                    <strong class="text-[#1a133d]">Pain Point & Solution:</strong> Identified student textbook search friction. Scoped Q&A engine with 2,966 parsed chunks, Sentence-Transformers, Zilliz Cloud (Milvus) vector search, Groq LLaMA 3.3 70B, and PyMuPDF diagram retrieval.
                  </p>
                </div>
                
                <div class="flex flex-wrap gap-1.5 pt-3 border-t border-[#d0c9f8]">
                  <span class="clay-badge-dark px-2.5 py-0.5 text-[10px]">Zilliz (Milvus)</span>
                  <span class="clay-badge-dark px-2.5 py-0.5 text-[10px]">Groq LLaMA 3.3</span>
                  <span class="clay-badge-dark px-2.5 py-0.5 text-[10px]">Docling PDF</span>
                  <span class="clay-badge-dark px-2.5 py-0.5 text-[10px]">Streamlit</span>
                </div>
              </div>

              <!-- Case Study 2: ALZ-AI -->
              <div class="md:col-span-6 clay-inner-card p-6 flex flex-col justify-between space-y-4 hover:scale-[1.01] transition-transform">
                <div class="space-y-3">
                  <div class="flex items-center justify-between">
                    <span class="text-[10px] font-extrabold uppercase bg-[#6259ac] text-white px-3 py-1 rounded-full">DYPSEM HACKOUTSAV</span>
                    <a href="#contact" title="Project Specs" class="w-9 h-9 rounded-xl bg-[#6259ac] text-white flex items-center justify-center font-bold text-sm hover:scale-110 transition-transform">
                      ➔
                    </a>
                  </div>
                  <h4 class="text-xl font-extrabold text-[#231b4e]">ALZ-AI &mdash; Alzheimer's Care Ecosystem</h4>
                  <p class="text-xs text-[#3c336e] leading-relaxed font-medium">
                    <strong class="text-[#1a133d]">User Role Requirements:</strong> Identified caregiving gaps affecting 8.8M patients. Defined requirements across 3 roles: Patient, Caregiver, Doctor. Prototyped React dashboard, AWS Rekognition, PostGIS geofencing, and Redis live state.
                  </p>
                </div>

                <div class="flex flex-wrap gap-1.5 pt-3 border-t border-[#d0c9f8]">
                  <span class="clay-badge-dark px-2.5 py-0.5 text-[10px]">AWS Rekognition</span>
                  <span class="clay-badge-dark px-2.5 py-0.5 text-[10px]">React & FastAPI</span>
                  <span class="clay-badge-dark px-2.5 py-0.5 text-[10px]">PostGIS Geofence</span>
                  <span class="clay-badge-dark px-2.5 py-0.5 text-[10px]">Redis</span>
                </div>
              </div>

              <!-- Case Study 3: Sunbeam RAG Chatbot -->
              <div class="md:col-span-12 clay-inner-card p-6 sm:p-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div class="space-y-2 max-w-2xl">
                  <div class="flex items-center gap-2">
                    <span class="text-[10px] font-extrabold uppercase bg-[#473e88] text-white px-3 py-0.5 rounded-full">IIT GENAI PROGRAM</span>
                    <span class="text-xs font-bold text-[#4d448a]">Sunbeam Infotech</span>
                  </div>
                  <h4 class="text-2xl font-extrabold text-[#231b4e]">Sunbeam RAG Chatbot &mdash; Institutional AI Assistant</h4>
                  <p class="text-xs text-[#3c336e] leading-relaxed font-medium">
                    Defined Q&A requirements & user flow (query &rarr; retrieval &rarr; grounded response &rarr; fallback). Engineered end-to-end pipeline: Selenium scraper &rarr; LangChain &rarr; Sentence-Transformers &rarr; ChromaDB &rarr; Groq LLM &rarr; FastAPI &rarr; GitHub Actions CI/CD (95 commits).
                  </p>
                </div>

                <div class="flex items-center gap-3 shrink-0">
                  <a href="https://github.com/JACKSPARROW10-MAX/IIT-GENAI-PROJECT-SUNBEAM_CHATBOT" target="_blank" rel="noopener" class="clay-pill-btn-purple px-6 py-3 text-xs flex items-center gap-2">
                    <span>View GitHub Repo</span>
                    <span>➔</span>
                  </a>
                </div>
              </div>

            </div>

          </section>


          <!-- PANEL 4: WORK EXPERIENCE & LEADERSHIP -->
          <section id="experience-card" class="clay-panel p-6 sm:p-10 space-y-6">
            
            <div class="text-xs font-black uppercase tracking-widest text-[#d8d3ff]">PROFESSIONAL TIMELINE</div>
            <h3 class="text-2xl sm:text-3xl font-black text-white uppercase">Experience & Leadership</h3>

            <div class="space-y-6">
              
              <!-- Intern Role -->
              <div class="clay-inner-card p-6 space-y-4">
                <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#d0c9f8] pb-3">
                  <div>
                    <h4 class="text-lg font-extrabold text-[#231b4e]">Generative AI & Data Intern</h4>
                    <p class="text-xs font-bold text-[#4d448a]">Sunbeam Infotech Pvt. Ltd., Pune &bull; IIT GenAI Program</p>
                  </div>
                  <span class="text-xs font-extrabold bg-[#6259ac] text-white px-3 py-1 rounded-full self-start sm:self-auto">
                    Dec 2025 &mdash; Jan 2026
                  </span>
                </div>
                <ul class="space-y-2 text-xs sm:text-sm text-[#382e6c] font-medium leading-relaxed">
                  <li>&bull; Defined requirements & designed end-to-end architecture for Sunbeam RAG Chatbot (LangChain, ChromaDB, Groq LLM, FastAPI, Streamlit) shipped via CI/CD (95 commits).</li>
                  <li>&bull; Built Power BI and Streamlit dashboards for KPI tracking; automated and validated ETL data pipelines using Python and Docker; used Firebase (NoSQL).</li>
                </ul>
              </div>

              <!-- Tech Lead Role -->
              <div class="clay-inner-card p-6 space-y-4">
                <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#d0c9f8] pb-3">
                  <div>
                    <h4 class="text-lg font-extrabold text-[#231b4e]">Technical Lead</h4>
                    <p class="text-xs font-bold text-[#4d448a]">Data Science Student Association (DSSA), DKTE</p>
                  </div>
                  <span class="text-xs font-extrabold bg-[#6259ac] text-white px-3 py-1 rounded-full self-start sm:self-auto">
                    2024 &mdash; 2025
                  </span>
                </div>
                <ul class="space-y-2 text-xs sm:text-sm text-[#382e6c] font-medium leading-relaxed">
                  <li>&bull; Led technical workshops & cross-functional project mentoring on Machine Learning, cloud tools, and GenAI.</li>
                  <li>&bull; Coordinated hackathon participation across the department, driving AI-tool adoption among 50+ peers.</li>
                </ul>
              </div>

            </div>

          </section>


          <!-- PANEL 5: SKILLS MATRIX -->
          <section id="skills-card" class="clay-panel p-6 sm:p-10 space-y-6">
            
            <div class="text-xs font-black uppercase tracking-widest text-[#d8d3ff]">TECHNICAL & PRODUCT MATRIX</div>
            <h3 class="text-2xl sm:text-3xl font-black text-white uppercase">Skills & Tooling</h3>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              <div class="clay-inner-card p-6 space-y-3">
                <h4 class="text-sm font-extrabold uppercase tracking-wider text-[#433980]">🚀 Product Management</h4>
                <div class="flex flex-wrap gap-2">
                  <span class="clay-badge-dark px-3 py-1 text-xs">Product Discovery</span>
                  <span class="clay-badge-dark px-3 py-1 text-xs">Requirements Definition</span>
                  <span class="clay-badge-dark px-3 py-1 text-xs">User Flow Mapping</span>
                  <span class="clay-badge-dark px-3 py-1 text-xs">MVP Scoping</span>
                  <span class="clay-badge-dark px-3 py-1 text-xs">Prioritization</span>
                  <span class="clay-badge-dark px-3 py-1 text-xs">Product Metrics</span>
                </div>
              </div>

              <div class="clay-inner-card p-6 space-y-3">
                <h4 class="text-sm font-extrabold uppercase tracking-wider text-[#433980]">📊 Analytics & SQL</h4>
                <div class="flex flex-wrap gap-2">
                  <span class="clay-badge-dark px-3 py-1 text-xs">SQL Querying</span>
                  <span class="clay-badge-dark px-3 py-1 text-xs">Product Analytics</span>
                  <span class="clay-badge-dark px-3 py-1 text-xs">KPI Tracking</span>
                  <span class="clay-badge-dark px-3 py-1 text-xs">Power BI</span>
                  <span class="clay-badge-dark px-3 py-1 text-xs">Streamlit</span>
                  <span class="clay-badge-dark px-3 py-1 text-xs">ETL Validation</span>
                </div>
              </div>

              <div class="clay-inner-card p-6 space-y-3">
                <h4 class="text-sm font-extrabold uppercase tracking-wider text-[#433980]">🤖 AI / GenAI & Prototyping</h4>
                <div class="flex flex-wrap gap-2">
                  <span class="clay-badge-dark px-3 py-1 text-xs">Generative AI</span>
                  <span class="clay-badge-dark px-3 py-1 text-xs">LLMs & Groq</span>
                  <span class="clay-badge-dark px-3 py-1 text-xs">Prompt Engineering</span>
                  <span class="clay-badge-dark px-3 py-1 text-xs">RAG Architectures</span>
                  <span class="clay-badge-dark px-3 py-1 text-xs">Vector DBs (Chroma, Milvus)</span>
                </div>
              </div>

              <div class="clay-inner-card p-6 space-y-3">
                <h4 class="text-sm font-extrabold uppercase tracking-wider text-[#433980]">☁️ Cloud & Infrastructure</h4>
                <div class="flex flex-wrap gap-2">
                  <span class="clay-badge-dark px-3 py-1 text-xs">AWS S3 / Redshift / Glue</span>
                  <span class="clay-badge-dark px-3 py-1 text-xs">AWS Athena / EC2 / EMR</span>
                  <span class="clay-badge-dark px-3 py-1 text-xs">Azure Cognitive Services</span>
                  <span class="clay-badge-dark px-3 py-1 text-xs">Firebase & Supabase</span>
                </div>
              </div>

            </div>

          </section>


          <!-- PANEL 6: EDUCATION & ACHIEVEMENTS -->
          <section id="education-card" class="clay-panel p-6 sm:p-10 space-y-6">
            
            <div class="text-xs font-black uppercase tracking-widest text-[#d8d3ff]">CREDENTIALS & HONORS</div>
            <h3 class="text-2xl sm:text-3xl font-black text-white uppercase">Education & Awards</h3>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              <!-- Education -->
              <div class="clay-inner-card p-6 space-y-4">
                <h4 class="text-lg font-extrabold text-[#231b4e]">Academic Qualifications</h4>
                <div class="space-y-3 text-xs text-[#382e6c]">
                  <div>
                    <div class="font-extrabold text-sm text-[#231b4e]">B.Tech, AI & Data Science (Honours: Big Data)</div>
                    <div class="text-[#4d448a] font-semibold">DKTE Society's Textile & Engineering Institute (NAAC A+)</div>
                    <div class="font-extrabold text-indigo-700 mt-1">CGPA: 8.96 / 10 | Hons CGPA: 8.18 / 10</div>
                  </div>
                  <div class="border-t border-[#d0c9f8] pt-2 flex justify-between">
                    <span>Class XII (HSC) — 2023</span>
                    <span class="font-bold text-[#231b4e]">69.70%</span>
                  </div>
                  <div class="border-t border-[#d0c9f8] pt-2 flex justify-between">
                    <span>Class X (SSC) — 2021</span>
                    <span class="font-bold text-[#231b4e]">95.40%</span>
                  </div>
                </div>
              </div>

              <!-- Honors -->
              <div class="clay-inner-card p-6 space-y-3">
                <h4 class="text-lg font-extrabold text-[#231b4e]">Achievements & Certifications</h4>
                <ul class="space-y-2 text-xs text-[#382e6c] font-medium">
                  <li class="flex items-start gap-2">
                    <span>🏆</span>
                    <span><strong class="text-[#231b4e]">1st Place, Hack AI Blitz 2025:</strong> Built "Tour Genie" Azure chatbot; beat ~200 teams.</span>
                  </li>
                  <li class="flex items-start gap-2">
                    <span>🏅</span>
                    <span><strong class="text-[#231b4e]">Top 6 Finalist, ACM WCE Hackathon 2026:</strong> NeuroNauts AI Companion (400+ teams).</span>
                  </li>
                  <li class="flex items-start gap-2">
                    <span>📜</span>
                    <span><strong class="text-[#231b4e]">AWS Academy Data Engineering:</strong> 40 hrs | Apr 2026 <a href="https://www.credly.com/badges/58ece8cb-95a2-4ac4-98fd-8195cf426926/public_url" target="_blank" class="underline text-indigo-700 font-bold">[Credly]</a></span>
                  </li>
                  <li class="flex items-start gap-2">
                    <span>💻</span>
                    <span><strong class="text-[#231b4e]">LeetCode Rating 1500+:</strong> <a href="https://leetcode.com/u/Prathamesh_10_2005/" target="_blank" class="underline text-indigo-700 font-bold">[Profile]</a></span>
                  </li>
                </ul>
              </div>

            </div>

          </section>

        </main>

        <!-- Footer Styled Exactly like Reference Image ("CREATED BY MUHAMMAD FAJRI") -->
        <footer class="mt-16 text-center text-xs font-black uppercase tracking-[0.25em] text-[#d0c9f8]">
          CREATED BY PRATHAMESH RANJIT SALOKHE
        </footer>

      </div>
    `;

    // Exit to Landing Button Handler
    document.getElementById("manual-exit-to-landing")?.addEventListener("click", () => {
      if (this.onBackToLanding) this.onBackToLanding();
    });

    // Real-Time Resume Search Handler
    const searchInput = document.getElementById("resume-search-input");
    searchInput?.addEventListener("input", (e) => {
      const query = e.target.value.toLowerCase().trim();
      const textNodes = document.querySelectorAll("#manual-viewport section");
      
      textNodes.forEach((section) => {
        if (!query) {
          section.style.opacity = "1";
          section.style.filter = "none";
        } else {
          const match = section.textContent.toLowerCase().includes(query);
          if (match) {
            section.style.opacity = "1";
            section.style.filter = "none";
          } else {
            section.style.opacity = "0.35";
            section.style.filter = "grayscale(50%)";
          }
        }
      });
    });
  }
}
