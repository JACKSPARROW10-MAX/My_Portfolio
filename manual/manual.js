/**
 * Manual Portfolio View Engine
 * Renders traditional, recruiter-friendly sections: Home, About, Education, Skills, Projects, Achievements, Contact.
 */

export class ManualPortfolioEngine {
  constructor(options = {}) {
    this.container = options.container;
    this.onBackToLanding = options.onBackToLanding;
  }

  render() {
    if (!this.container) return;

    this.container.innerHTML = `
      <div id="manual-viewport" class="min-h-screen bg-[#06070a] text-neutral-100 font-sans selection:bg-indigo-500/30 selection:text-indigo-300">
        
        <!-- Navigation Header -->
        <header class="fixed top-0 left-0 right-0 z-50 glass border-b border-white/10 backdrop-blur-xl">
          <div class="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
            <div class="flex items-center gap-3 cursor-pointer" id="manual-brand">
              <div class="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-pink-600 to-rose-500 flex items-center justify-center font-bold text-lg text-white shadow-lg">
                PS
              </div>
              <div>
                <div class="font-bold tracking-tight text-white leading-none">PRATHAMESH SALOKHE</div>
                <div class="text-[11px] text-indigo-400 font-medium tracking-wider uppercase">AI & Data Science</div>
              </div>
            </div>

            <!-- Desktop Nav Links -->
            <nav class="hidden md:flex items-center gap-6 text-sm font-medium text-neutral-300">
              <a href="#about" class="hover:text-white transition-colors">About</a>
              <a href="#education" class="hover:text-white transition-colors">Education</a>
              <a href="#skills" class="hover:text-white transition-colors">Skills</a>
              <a href="#projects" class="hover:text-white transition-colors">Projects</a>
              <a href="#achievements" class="hover:text-white transition-colors">Achievements</a>
              <a href="#contact" class="hover:text-white transition-colors">Contact</a>
            </nav>

            <div class="flex items-center gap-3">
              <button id="manual-exit-to-landing" class="px-4 py-2 rounded-xl glass hover:bg-white/10 text-xs font-semibold tracking-wider text-neutral-300 transition-all flex items-center gap-2">
                <span>🎧</span>
                <span>Switch Experience</span>
              </button>
            </div>
          </div>
        </header>

        <!-- Main Content Wrapper -->
        <main class="pt-28 pb-20 px-6 max-w-7xl mx-auto space-y-24">
          
          <!-- Hero Section -->
          <section id="home" class="flex flex-col items-start justify-center min-h-[70vh] space-y-6 pt-10">
            <div class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass border border-indigo-500/30 text-indigo-300 text-xs font-medium tracking-wide">
              <span class="w-2 h-2 rounded-full bg-indigo-400 animate-pulse"></span>
              B.Tech Artificial Intelligence & Data Science
            </div>

            <h1 class="text-5xl md:text-7xl font-extrabold tracking-tight text-white leading-tight">
              Designing Intelligent Systems.<br />
              <span class="bg-gradient-to-r from-indigo-400 via-pink-400 to-rose-400 bg-clip-text text-transparent">
                Crafting Scalable Code.
              </span>
            </h1>

            <p class="text-lg md:text-xl text-neutral-400 max-w-2xl leading-relaxed">
              Hello! I'm <strong class="text-white">Prathamesh Salokhe</strong>, a passionate technologist exploring Artificial Intelligence, Data Science, and modern Web Engineering.
            </p>

            <div class="flex flex-wrap items-center gap-4 pt-4">
              <a href="#projects" class="px-8 py-4 rounded-2xl bg-gradient-to-r from-indigo-600 to-pink-600 hover:opacity-90 font-semibold text-white shadow-xl shadow-indigo-500/20 transition-all">
                View Featured Projects
              </a>
              <a href="#contact" class="px-8 py-4 rounded-2xl glass hover:bg-white/10 font-semibold text-neutral-200 transition-all">
                Get In Touch
              </a>
            </div>

            <!-- Key Quick Stats -->
            <div class="grid grid-cols-2 md:grid-cols-4 gap-6 w-full pt-12">
              <div class="glass p-6 rounded-2xl border border-white/5">
                <div class="text-3xl font-extrabold text-indigo-400">8.87</div>
                <div class="text-xs text-neutral-400 uppercase tracking-wider mt-1">First Year CGPA</div>
              </div>
              <div class="glass p-6 rounded-2xl border border-white/5">
                <div class="text-3xl font-extrabold text-pink-400">1st</div>
                <div class="text-xs text-neutral-400 uppercase tracking-wider mt-1">IDEA LAB Winner</div>
              </div>
              <div class="glass p-6 rounded-2xl border border-white/5">
                <div class="text-3xl font-extrabold text-rose-400">AI & DS</div>
                <div class="text-xs text-neutral-400 uppercase tracking-wider mt-1">Core Specialization</div>
              </div>
              <div class="glass p-6 rounded-2xl border border-white/5">
                <div class="text-3xl font-extrabold text-teal-400">5+</div>
                <div class="text-xs text-neutral-400 uppercase tracking-wider mt-1">Technologies Mastered</div>
              </div>
            </div>
          </section>

          <!-- About Section -->
          <section id="about" class="space-y-8">
            <div class="space-y-2">
              <h2 class="text-xs font-bold uppercase tracking-widest text-indigo-400">About Me</h2>
              <h3 class="text-3xl font-bold text-white">Curious Explorer & Problem Solver</h3>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div class="glass p-8 rounded-3xl border border-white/10 space-y-4 text-neutral-300 leading-relaxed">
                <p>
                  I am a computer science student specializing in Artificial Intelligence and Data Science. My journey began with curiosity—experimenting with C, C++, HTML, and CAD tools.
                </p>
                <p>
                  I thrive on solving real-world challenges through intelligent software solutions, data-driven insights, and creative engineering.
                </p>
              </div>
              <div class="glass p-8 rounded-3xl border border-white/10 space-y-4">
                <h4 class="font-bold text-white text-lg">Quick Details</h4>
                <ul class="space-y-3 text-sm text-neutral-300">
                  <li class="flex justify-between border-b border-white/5 pb-2">
                    <span class="text-neutral-500">Field:</span>
                    <span class="font-medium text-white">AI & Data Science</span>
                  </li>
                  <li class="flex justify-between border-b border-white/5 pb-2">
                    <span class="text-neutral-500">Degree:</span>
                    <span class="font-medium text-white">B.Tech Engineering</span>
                  </li>
                  <li class="flex justify-between border-b border-white/5 pb-2">
                    <span class="text-neutral-500">Languages:</span>
                    <span class="font-medium text-white">C, C++, JavaScript, Python</span>
                  </li>
                  <li class="flex justify-between pb-2">
                    <span class="text-neutral-500">First Year Rank:</span>
                    <span class="font-medium text-indigo-400">8.87 CGPA</span>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          <!-- Education Section -->
          <section id="education" class="space-y-8">
            <div class="space-y-2">
              <h2 class="text-xs font-bold uppercase tracking-widest text-indigo-400">Education</h2>
              <h3 class="text-3xl font-bold text-white">Academic Qualifications</h3>
            </div>
            <div class="glass p-8 rounded-3xl border border-white/10 space-y-4">
              <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h4 class="text-xl font-bold text-white">Bachelor of Technology — AI & Data Science</h4>
                  <p class="text-sm text-neutral-400">Department of Artificial Intelligence & Data Science</p>
                </div>
                <div class="px-6 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-sm font-bold">
                  8.87 CGPA (First Year)
                </div>
              </div>
              <p class="text-sm text-neutral-300">
                Foundational coursework in C programming, Object-Oriented C++, Engineering Graphics & AutoCAD, Mathematics, and Practical IDEA LAB Engineering.
              </p>
            </div>
          </section>

          <!-- Skills Section -->
          <section id="skills" class="space-y-8">
            <div class="space-y-2">
              <h2 class="text-xs font-bold uppercase tracking-widest text-indigo-400">Technical Skills</h2>
              <h3 class="text-3xl font-bold text-white">Technologies & Tools</h3>
            </div>
            <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div class="glass p-6 rounded-2xl border border-white/5 space-y-2">
                <div class="text-indigo-400 text-2xl font-bold">C & C++</div>
                <p class="text-xs text-neutral-400">Data structures, logic & algorithms</p>
              </div>
              <div class="glass p-6 rounded-2xl border border-white/5 space-y-2">
                <div class="text-pink-400 text-2xl font-bold">HTML & CSS</div>
                <p class="text-xs text-neutral-400">Semantic UI & responsive styling</p>
              </div>
              <div class="glass p-6 rounded-2xl border border-white/5 space-y-2">
                <div class="text-rose-400 text-2xl font-bold">AutoCAD</div>
                <p class="text-xs text-neutral-400">2D/3D engineering design</p>
              </div>
              <div class="glass p-6 rounded-2xl border border-white/5 space-y-2">
                <div class="text-amber-400 text-2xl font-bold">AI & DS</div>
                <p class="text-xs text-neutral-400">Data analysis & ML foundations</p>
              </div>
            </div>
          </section>

          <!-- Projects Section -->
          <section id="projects" class="space-y-8">
            <div class="space-y-2">
              <h2 class="text-xs font-bold uppercase tracking-widest text-indigo-400">Featured Projects</h2>
              <h3 class="text-3xl font-bold text-white">Engineering Innovations</h3>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
              
              <!-- Project 1 -->
              <div class="glass p-8 rounded-3xl border border-white/10 space-y-4 hover:border-indigo-500/40 transition-all">
                <div class="flex items-center justify-between">
                  <span class="px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-mono">IDEA LAB 1ST PLACE</span>
                  <span class="text-xs text-neutral-500">Hardware & AI</span>
                </div>
                <h4 class="text-2xl font-bold text-white">AI Matrix Light for Vehicles</h4>
                <p class="text-sm text-neutral-300 leading-relaxed">
                  An intelligent lighting system designed for vehicles to automatically adjust headlight beam matrices, improving nighttime visibility and mitigating oncoming glare to reduce accidents.
                </p>
                <div class="flex flex-wrap gap-2 pt-2">
                  <span class="px-3 py-1 rounded-lg bg-white/5 text-xs text-neutral-300">Intelligent Sensors</span>
                  <span class="px-3 py-1 rounded-lg bg-white/5 text-xs text-neutral-300">Vehicle Safety</span>
                  <span class="px-3 py-1 rounded-lg bg-white/5 text-xs text-neutral-300">IDEA LAB</span>
                </div>
              </div>

              <!-- Project 2 -->
              <div class="glass p-8 rounded-3xl border border-white/10 space-y-4 hover:border-pink-500/40 transition-all">
                <div class="flex items-center justify-between">
                  <span class="px-3 py-1 rounded-full bg-pink-500/20 text-pink-300 text-xs font-mono">CREATIVE WEB</span>
                  <span class="text-xs text-neutral-500">JavaScript / GSAP</span>
                </div>
                <h4 class="text-2xl font-bold text-white">Cinematic Autobiography Story Engine</h4>
                <p class="text-sm text-neutral-300 leading-relaxed">
                  An interactive timestamp-synchronized story engine built to communicate academic journey, milestones, and achievements in a cinematic format with atmospheric audio and visual effects.
                </p>
                <div class="flex flex-wrap gap-2 pt-2">
                  <span class="px-3 py-1 rounded-lg bg-white/5 text-xs text-neutral-300">GSAP</span>
                  <span class="px-3 py-1 rounded-lg bg-white/5 text-xs text-neutral-300">Audio Synchronization</span>
                  <span class="px-3 py-1 rounded-lg bg-white/5 text-xs text-neutral-300">Canvas FX</span>
                </div>
              </div>

            </div>
          </section>

          <!-- Achievements Section -->
          <section id="achievements" class="space-y-8">
            <div class="space-y-2">
              <h2 class="text-xs font-bold uppercase tracking-widest text-indigo-400">Achievements</h2>
              <h3 class="text-3xl font-bold text-white">Honors & Milestones</h3>
            </div>
            <div class="space-y-4">
              <div class="glass p-6 rounded-2xl border border-white/10 flex items-center gap-6">
                <div class="text-4xl">🏆</div>
                <div>
                  <h4 class="font-bold text-white text-lg">1st Place Winner — IDEA LAB Project Competition</h4>
                  <p class="text-xs text-neutral-400">Awarded for engineering the AI Matrix Light for Vehicles prototype.</p>
                </div>
              </div>
              <div class="glass p-6 rounded-2xl border border-white/10 flex items-center gap-6">
                <div class="text-4xl">⭐</div>
                <div>
                  <h4 class="font-bold text-white text-lg">8.87 CGPA Academic Excellence</h4>
                  <p class="text-xs text-neutral-400">First Year B.Tech academic result achieved in AI & Data Science.</p>
                </div>
              </div>
            </div>
          </section>

          <!-- Contact Section -->
          <section id="contact" class="space-y-8 pb-12">
            <div class="space-y-2">
              <h2 class="text-xs font-bold uppercase tracking-widest text-indigo-400">Contact</h2>
              <h3 class="text-3xl font-bold text-white">Get In Touch</h3>
            </div>
            <div class="glass p-8 rounded-3xl border border-white/10 max-w-xl mx-auto space-y-6 text-center">
              <p class="text-neutral-300 text-sm">
                Interested in collaborating, recruiting, or learning more about my projects? Send a message!
              </p>
              <div class="flex flex-col gap-4">
                <a href="mailto:prathamesh.salokhe@example.com" class="py-4 rounded-xl bg-gradient-to-r from-indigo-600 to-pink-600 font-semibold text-white shadow-xl hover:opacity-90 transition-all">
                  Send Email
                </a>
              </div>
            </div>
          </section>

        </main>

        <!-- Footer -->
        <footer class="border-t border-white/10 py-8 text-center text-xs text-neutral-500">
          © ${new Date().getFullYear()} Prathamesh Salokhe. Built with precision & passion.
        </footer>

      </div>
    `;

    document.getElementById("manual-exit-to-landing")?.addEventListener("click", () => {
      if (this.onBackToLanding) this.onBackToLanding();
    });
  }
}
