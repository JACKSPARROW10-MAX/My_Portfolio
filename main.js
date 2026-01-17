import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

/* ================= MUSIC CONTROL ================= */

const backgroundMusic = document.getElementById('backgroundMusic');
const musicToggle = document.getElementById('musicToggle');
let isMusicPlaying = false;

// Initialize music control
function initializeMusic() {
  // Set initial volume
  backgroundMusic.volume = 0.3;
  
  // Add click handler for music toggle
  musicToggle.addEventListener('click', toggleMusic);
  
  // Start with muted state to allow autoplay
  backgroundMusic.muted = true;
  backgroundMusic.play().then(() => {
    console.log("Music started muted");
    // Unmute after first interaction
    setTimeout(() => {
      backgroundMusic.muted = false;
      isMusicPlaying = true;
      musicToggle.classList.add('playing');
      musicToggle.textContent = '';
      console.log("Music unmuted and playing");
    }, 100);
  }).catch(error => {
    console.log("Music autoplay blocked, user interaction required");
    musicToggle.textContent = '';
  });
}

function toggleMusic() {
  if (isMusicPlaying) {
    backgroundMusic.pause();
    musicToggle.textContent = '';
    musicToggle.textContent = '🔇';
    musicToggle.classList.remove('playing');
  } else {
    backgroundMusic.play();
    musicToggle.textContent = '🎵';
    musicToggle.classList.add('playing');
  }
  isMusicPlaying = !isMusicPlaying;
}

/* ================= SCENE SETUP ================= */

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x1a1a1a);

const camera = new THREE.PerspectiveCamera(
  45, // Wider FOV to see more of the room
  window.innerWidth / window.innerHeight,
  0.1,
  100
);
camera.position.set(0, 1.5, 5); // Lower Y position to center room vertically

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
document.body.appendChild(renderer.domElement);

/* ================= LIGHTING ================= */

scene.add(new THREE.AmbientLight(0xffffff, 1.4));
const directionalLight = new THREE.DirectionalLight(0xffffff, 2);
directionalLight.position.set(5, 10, 5);
scene.add(directionalLight);

/* ================= ORBIT CONTROLS ================= */

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableZoom = false; // Disable zoom
controls.enablePan = false; // Disable panning
controls.enableRotate = false; // Disable rotation completely
controls.enableDamping = false; // Disable damping since no rotation
controls.target.set(0, 0.5, 0); // Look slightly higher to balance the room vertically
controls.autoRotate = false;
controls.autoRotateSpeed = 0.5;

/* ================= STATE MANAGEMENT ================= */

let currentView = null; // Track which section is active
let isAnimating = false; // Prevent clicks during animation

const cameraPositions = {
  default: { position: { x: 0, y: 1.5, z: 5 }, target: { x: 0, y: 0.5, z: 0 } },
  about: { position: { x: 1.3, y: 1.3, z: 1.0 }, target: { x: 0.80, y: 0.90, z: 0.00 } },
  books: { position: { x: -0.3, y: 1.9, z: 1.3 }, target: { x: -0.50, y: 1.65, z: 0.40 } },
  future: { position: { x: 0.9, y: 1.6, z: -0.5 }, target: { x: 0.60, y: 1.20, z: -1.15 } }
};

class ClickPoint {
  constructor(name, position, color, description) {
    this.name = name;
    this.description = description;
    
    // Create visible sphere
    const geometry = new THREE.SphereGeometry(0.15, 32, 32);
    const material = new THREE.MeshStandardMaterial({
      color: color,
      emissive: color,
      emissiveIntensity: 0.5,
      metalness: 0.3,
      roughness: 0.4
    });
    this.mesh = new THREE.Mesh(geometry, material);
    this.mesh.position.copy(position);
    
    // Store reference for raycasting
    this.mesh.userData = {
      clickable: true,
      pointName: name,
      description: description
    };
    
    // Create glow effect
    const glowGeometry = new THREE.SphereGeometry(0.18, 32, 32);
    const glowMaterial = new THREE.MeshBasicMaterial({
      color: color,
      transparent: true,
      opacity: 0.4
    });
    this.glow = new THREE.Mesh(glowGeometry, glowMaterial);
    this.mesh.add(this.glow);
    
    // Animation state
    this.time = Math.random() * Math.PI * 2; // Random start phase
  }
  
  addToScene(scene) {
    scene.add(this.mesh);
  }
  
  update(deltaTime) {
    // Gentle pulsing animation
    this.time += deltaTime;
    const scale = 1 + Math.sin(this.time * 2) * 0.1;
    this.glow.scale.setScalar(scale);
  }
  
  setHovered(isHovered) {
    this.mesh.material.emissiveIntensity = isHovered ? 0.8 : 0.5;
    this.glow.material.opacity = isHovered ? 0.6 : 0.4;
  }
}

// Define click points with precise positions
// ✅ Positions tuned perfectly for your room!
const clickPointDefinitions = [
  {
    name: "about",
    position: new THREE.Vector3(0.80, 0.90, 0.00), // Near bed/chair area
    color: 0x00d4ff,
    description: "About Me - Learn about my background and journey"
  },
  {
    name: "books",
    position: new THREE.Vector3(-0.50, 1.65, 0.40), // On/near desk books
    color: 0xff6b35,
    description: "Portfolio Menu - Projects, Skills & Experience"
  },
  {
    name: "future",
    position: new THREE.Vector3(0.60, 1.20, -1.15), // On/near window
    color: 0x7b68ee,
    description: "Future Plans - Vision and upcoming goals"
  }
];

const clickPoints = [];
let hoveredPoint = null;

function initializeClickPoints() {
  clickPointDefinitions.forEach(def => {
    const point = new ClickPoint(def.name, def.position, def.color, def.description);
    point.addToScene(scene);
    // Hide spheres by default
    point.mesh.visible = false;
    clickPoints.push(point);
  });
  
  console.log("✅ Click points initialized (hidden):", clickPoints.length);
  console.log("   Points are:", clickPoints.map(p => p.name).join(", "));
  console.log("💡 Move your mouse over interactive areas to reveal clickable zones");
  console.log("💡 Press T for tuning mode, M to show mesh helpers");
}

/* ================= RAYCASTING ================= */

const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

function onMouseMove(event) {
  // Convert mouse position to normalized device coordinates
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
  
  // Don't raycast during animation or if no points exist
  if (isAnimating || clickPoints.length === 0) return;
  
  // Update raycaster
  raycaster.setFromCamera(mouse, camera);
  
  // Check for intersections with click points (even if invisible)
  const clickableMeshes = clickPoints.map(p => p.mesh);
  const intersects = raycaster.intersectObjects(clickableMeshes, false);
  
  // Update hover states
  if (intersects.length > 0) {
    const newHoveredPoint = clickPoints.find(p => p.mesh === intersects[0].object);
    
    if (newHoveredPoint !== hoveredPoint) {
      // Clear previous hover
      if (hoveredPoint) {
        hoveredPoint.setHovered(false);
        hoveredPoint.mesh.visible = false;
      }
      
      // Set new hover
      hoveredPoint = newHoveredPoint;
      hoveredPoint.setHovered(true);
      hoveredPoint.mesh.visible = true;
      
      // Update cursor
      document.body.style.cursor = 'pointer';
    }
  } else {
    // No hover
    if (hoveredPoint) {
      hoveredPoint.setHovered(false);
      hoveredPoint.mesh.visible = false;
      hoveredPoint = null;
      document.body.style.cursor = 'default';
    }
  }
}

function onClick(event) {
  // Prevent clicks during animation
  if (isAnimating) return;
  
  // Update mouse position
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
  
  // Check if we clicked on a point
  raycaster.setFromCamera(mouse, camera);
  const clickableMeshes = clickPoints.map(p => p.mesh);
  const intersects = raycaster.intersectObjects(clickableMeshes, false);
  
  if (intersects.length > 0) {
    const clickedPoint = clickPoints.find(p => p.mesh === intersects[0].object);
    if (clickedPoint) {
      console.log(`🎯 Clicked: ${clickedPoint.name}`);
      handleClickPointAction(clickedPoint.name);
    }
  }
}

function handleClickPointAction(pointName) {
  if (isAnimating) return;
  
  // If clicking the same point, return to default view
  if (currentView === pointName) {
    returnToDefaultView();
    return;
  }
  
  isAnimating = true;
  currentView = pointName;
  
  // Hide all click points when zooming to a section
  hideClickPoints();
  
  // Animate camera to target position
  animateCameraTo(pointName, () => {
    isAnimating = false;
    
    // Show corresponding UI after animation
    switch(pointName) {
      case "about":
        showAboutCard();
        break;
      case "books":
        showBooksMenu();
        break;
      case "future":
        showFutureCard();
        break;
    }
  });
}

function hideClickPoints() {
  clickPoints.forEach(point => {
    point.mesh.visible = false;
  });
}

function showClickPoints() {
  // Keep spheres hidden by default - they will show on hover
  clickPoints.forEach(point => {
    point.mesh.visible = false;
  });
}

function animateCameraTo(targetName, onComplete) {
  const target = cameraPositions[targetName];
  const duration = 1.5;
  
  // Disable controls during animation
  controls.enabled = false;
  
  // Animate camera position
  const startPos = camera.position.clone();
  const endPos = new THREE.Vector3(target.position.x, target.position.y, target.position.z);
  
  const startTarget = controls.target.clone();
  const endTarget = new THREE.Vector3(target.target.x, target.target.y, target.target.z);
  
  let progress = 0;
  const startTime = Date.now();
  
  function animate() {
    const elapsed = (Date.now() - startTime) / 1000;
    progress = Math.min(elapsed / duration, 1);
    
    // Easing function (easeInOutCubic)
    const eased = progress < 0.5
      ? 4 * progress * progress * progress
      : 1 - Math.pow(-2 * progress + 2, 3) / 2;
    
    // Interpolate camera position
    camera.position.lerpVectors(startPos, endPos, eased);
    
    // Interpolate camera target
    controls.target.lerpVectors(startTarget, endTarget, eased);
    controls.update();
    
    if (progress < 1) {
      requestAnimationFrame(animate);
    } else {
      controls.enabled = true;
      if (onComplete) onComplete();
    }
  }
  
  animate();
}

function returnToDefaultView() {
  isAnimating = true;
  currentView = null;
  
  // Hide all UI panels
  hideAllPanels();
  
  // Show click points again
  showClickPoints();
  
  // Animate back to default view
  animateCameraTo('default', () => {
    isAnimating = false;
  });
}

/* ================= UI PANELS ================= */

let aboutCard = null;
let futureCard = null;
let booksMenu = null;

function createUIElements() {
  console.log("🎨 Creating UI elements...");
  
  // Create About Card
  aboutCard = document.createElement('div');
  aboutCard.id = 'about-card';
  aboutCard.className = 'info-card';
  aboutCard.innerHTML = `
    <button class="close-btn" onclick="window.returnToDefaultView()">×</button>
    <h2>👋 About Me</h2>
    <div class="card-content">
      <p>Hi, I'm <strong>Prathamesh Salokhe</strong>, a technology enthusiast with a strong interest in building intelligent, structured, and interactive digital systems.</p>
      
      <p>I'm currently pursuing <strong>Artificial Intelligence and Data Science</strong>, where I focus on understanding how data, algorithms, and software engineering principles come together to solve complex problems. My technical foundation includes <strong>Java development, Python programming, data analysis, and Generative AI concepts</strong>, with a strong emphasis on clarity, scalability, and clean logic.</p>
      
      <p>I have completed a <strong>Hands-on Training and Internship in Generative AI</strong> at <strong>SunBeam Infotech Pvt. Ltd., Pune</strong>, where I earned a <strong>Grade "A"</strong>. During this experience, I gained practical exposure to <strong>Large Language Models (LLMs), API-based integrations, prompt optimization, and Retrieval-Augmented Generation (RAG)</strong>, helping me understand how modern AI systems are designed and connected to real applications.</p>
      
      <p>I value <strong>continuous learning, problem-solving, and disciplined thinking</strong>. I enjoy understanding systems deeply rather than memorizing solutions, and I strive to grow by consistently improving my technical and analytical skills.</p>
      
      <div style="margin-top: 30px; padding: 20px; background: rgba(139, 69, 19, 0.1); border-radius: 10px; border-left: 4px solid #8b4513;">
        <p style="margin: 0; font-style: italic; color: #8b4513;">This interactive room reflects my mindset:</p>
        <p style="margin: 10px 0;">🪑 <strong>The chair represents focus and thoughtful work</strong></p>
        <p style="margin: 10px 0;">📚 <strong>The books symbolize knowledge and learning</strong></p>
        <p style="margin: 10px 0;">🪟 <strong>The window reflects vision, curiosity, and future goals</strong></p>
        <p style="margin: 10px 0 0 0; font-style: italic; color: #8b4513;">I'm motivated by growth, curiosity, and the desire to build meaningful technology.</p>
      </div>
    </div>
  `;
  document.body.appendChild(aboutCard);
  console.log("✅ About card created");
  
  // Create Future Card
  futureCard = document.createElement('div');
  futureCard.id = 'future-card';
  futureCard.className = 'info-card';
  futureCard.innerHTML = `
    <button class="close-btn" onclick="window.returnToDefaultView()">×</button>
    <h2>Future Plans</h2>
    <div class="card-content">
      <p>🚀 <strong>Short Term:</strong> Master advanced Three.js techniques and shader programming</p>
      <p>🌟 <strong>Mid Term:</strong> Build a portfolio of innovative WebGL experiences</p>
      <p>🎯 <strong>Long Term:</strong> Lead creative technology projects that inspire and engage</p>
    </div>
  `;
  document.body.appendChild(futureCard);
  console.log("✅ Future card created");
  
  // Create Books Menu (Book-style UI)
  booksMenu = document.createElement('div');
  booksMenu.id = 'books-menu';
  booksMenu.className = 'book-container';
  booksMenu.innerHTML = `
    <button class="close-btn" onclick="window.returnToDefaultView()">×</button>
    <div class="book-spine"></div>
    <div class="book-pages">
      <div class="book-page left-page">
        <h2>📚 Portfolio</h2>
        <p class="book-intro">Select a chapter to explore my journey</p>
        <div class="page-decoration">✦</div>
      </div>
      <div class="book-page right-page">
        <div class="table-of-contents">
          <div class="chapter-link" onclick="window.openBook('projects')">
            <span class="chapter-number">01</span>
            <h3>Projects</h3>
            <p>Recent work and creations</p>
            <span class="page-arrow">→</span>
          </div>
          <div class="chapter-link" onclick="window.openBook('skills')">
            <span class="chapter-number">02</span>
            <h3>Skills</h3>
            <p>Technical expertise</p>
            <span class="page-arrow">→</span>
          </div>
          <div class="chapter-link" onclick="window.openBook('experience')">
            <span class="chapter-number">03</span>
            <h3>Experience</h3>
            <p>Professional journey</p>
            <span class="page-arrow">→</span>
          </div>
          <div class="chapter-link" onclick="window.openBook('journey')">
            <span class="chapter-number">04</span>
            <h3>Journey</h3>
            <p>My story so far</p>
            <span class="page-arrow">→</span>
          </div>
        </div>
      </div>
    </div>
  `;
  document.body.appendChild(booksMenu);
  console.log("✅ Books menu created");
  console.log("📖 Books menu element check:", {
    exists: !!booksMenu,
    id: booksMenu.id,
    className: booksMenu.className,
    inDOM: document.body.contains(booksMenu)
  });
  
  // Test button for debugging (press B to toggle book menu)
  window.testBookMenu = function() {
    console.log("🧪 Test: Toggling book menu");
    if (booksMenu.classList.contains('visible')) {
      booksMenu.classList.remove('visible');
      console.log("Hidden");
    } else {
      booksMenu.style.display = 'block';
      booksMenu.classList.add('visible');
      console.log("Shown");
    }
  };
  
  console.log("💡 Debug: Press 'B' key to manually test book menu");
}

function showAboutCard() {
  hideAllPanels();
  if (aboutCard) {
    aboutCard.classList.add('visible');
    console.log("👋 About card opened");
  }
}

function showFutureCard() {
  hideAllPanels();
  if (futureCard) {
    futureCard.classList.add('visible');
    console.log("🚀 Future card opened");
  }
}

function showBooksMenu() {
  hideAllPanels();
  if (booksMenu) {
    // Force display
    booksMenu.style.display = 'block';
    // Trigger reflow
    booksMenu.offsetHeight;
    // Add visible class
    booksMenu.classList.add('visible');
    console.log("📚 Books menu opened");
    console.log("Books menu element:", booksMenu);
    console.log("Has visible class:", booksMenu.classList.contains('visible'));
  } else {
    console.error("❌ Books menu element not found");
  }
}

function hideAllPanels() {
  if (aboutCard) aboutCard.classList.remove('visible');
  if (futureCard) futureCard.classList.remove('visible');
  if (booksMenu) booksMenu.classList.remove('visible');
  
  // Also hide detail panel if it exists
  const detailPanel = document.getElementById('detail-panel');
  if (detailPanel) detailPanel.classList.remove('visible');
}

// Expose functions globally for onclick handlers
window.returnToDefaultView = returnToDefaultView;
window.openBook = function(section) {
  console.log(`📖 Opening ${section} section...`);
  
  // Hide books menu
  booksMenu.classList.remove('visible');
  
  // Create detailed view with page turning animation
  let detailPanel = document.getElementById('detail-panel');
  if (!detailPanel) {
    detailPanel = document.createElement('div');
    detailPanel.id = 'detail-panel';
    detailPanel.className = 'detail-panel';
    document.body.appendChild(detailPanel);
  }
  
  // Start with page turning animation
  detailPanel.innerHTML = `
    <div class="page-turn-animation">
      <div class="turning-page left-turn">
        <div class="page-content-front">
          <h2>📚 Turning Page...</h2>
          <div class="page-decoration">✦</div>
        </div>
        <div class="page-content-back">
          <h2>📖 ${section.charAt(0).toUpperCase() + section.slice(1)}</h2>
          <div class="loading-content">Loading content...</div>
        </div>
      </div>
      <div class="static-page right-page">
        <div class="chapter-preview">
          <h3>Chapter Preview</h3>
          <p>Opening ${section}...</p>
        </div>
      </div>
    </div>
    <button class="close-btn" onclick="window.closeDetailPanel()">×</button>
    <button class="back-btn" onclick="window.backToBooksMenu()">← Back</button>
  `;
  
  detailPanel.classList.add('visible');
  
  // Simulate page turn and then load content
  setTimeout(() => {
    const content = getBookContent(section);
    detailPanel.innerHTML = `
      <div class="book-detail-layout">
        <div class="detail-page left-detail-page">
          <div class="page-header">
            <h2>📖 ${section.charAt(0).toUpperCase() + section.slice(1)}</h2>
            <div class="page-number">Chapter ${getChapterNumber(section)}</div>
          </div>
          <div class="page-content">
            ${content}
          </div>
        </div>
        <div class="detail-page right-detail-page">
          <div class="page-decoration">
            <div class="vintage-ornament">✦</div>
            <div class="page-quote">"${getChapterQuote(section)}"</div>
            <div class="vintage-ornament">✦</div>
          </div>
        </div>
      </div>
      <button class="close-btn" onclick="window.closeDetailPanel()">×</button>
      <button class="back-btn" onclick="window.backToBooksMenu()">← Back</button>
    `;
    detailPanel.classList.add('visible');
  }, 1500); // Page turn animation duration
};

function getChapterNumber(section) {
  const chapters = {
    'projects': '01',
    'skills': '02', 
    'experience': '03',
    'journey': '04'
  };
  return chapters[section] || '00';
}

function getChapterQuote(section) {
  const quotes = {
    'projects': 'Innovation distinguishes between a leader and a follower',
    'skills': 'The expert in anything was once a beginner',
    'experience': 'Experience is the teacher of all things',
    'journey': 'The journey of a thousand miles begins with a single step'
  };
  return quotes[section] || 'Knowledge is power';
}

window.closeDetailPanel = function() {
  const detailPanel = document.getElementById('detail-panel');
  if (detailPanel) {
    detailPanel.classList.remove('visible');
  }
  returnToDefaultView();
};

window.backToBooksMenu = function() {
  const detailPanel = document.getElementById('detail-panel');
  if (detailPanel) {
    detailPanel.classList.remove('visible');
  }
  showBooksMenu();
};

function getBookContent(section) {
  const contents = {
    projects: `
      <h2>💼 My Projects</h2>
      <div class="card-content">
        <div class="project-item">
          <h3>3D Portfolio Website</h3>
          <p>Interactive Three.js experience with custom animations</p>
          <span class="tag">Three.js</span> <span class="tag">WebGL</span>
        </div>
        <div class="project-item">
          <h3>E-Commerce Platform</h3>
          <p>Full-stack solution with real-time inventory management</p>
          <span class="tag">React</span> <span class="tag">Node.js</span>
        </div>
        <div class="project-item">
          <h3>Data Visualization Dashboard</h3>
          <p>Interactive charts and analytics for business insights</p>
          <span class="tag">D3.js</span> <span class="tag">TypeScript</span>
        </div>
      </div>
    `,
    skills: `
      <h2>⚡ Technical Skills</h2>
      <div class="card-content">
        <div class="skill-category">
          <h3>Frontend</h3>
          <p>React, Vue.js, Three.js, WebGL, HTML5/CSS3</p>
        </div>
        <div class="skill-category">
          <h3>Backend</h3>
          <p>Node.js, Python, Express, MongoDB, PostgreSQL</p>
        </div>
        <div class="skill-category">
          <h3>Tools & Others</h3>
          <p>Git, Docker, Blender, Figma, GSAP</p>
        </div>
      </div>
    `,
    experience: `
      <h2>🎓 Professional Experience</h2>
      <div class="card-content">
        <div class="experience-item">
          <h3>Senior Frontend Developer</h3>
          <p class="company">Tech Company • 2022 - Present</p>
          <p>Leading development of interactive web experiences</p>
        </div>
        <div class="experience-item">
          <h3>Full Stack Developer</h3>
          <p class="company">Startup Inc • 2020 - 2022</p>
          <p>Built scalable applications from concept to deployment</p>
        </div>
        <div class="experience-item">
          <h3>Junior Developer</h3>
          <p class="company">Digital Agency • 2018 - 2020</p>
          <p>Developed client websites and web applications</p>
        </div>
      </div>
    `,
    journey: `
      <h2>🗺️ My Journey</h2>
      <div class="card-content">
        <p>🎯 Started coding in 2018, fell in love with creating interactive experiences</p>
        <p>💻 Self-taught developer who believes in continuous learning</p>
        <p>🌟 Discovered Three.js and realized the power of 3D on the web</p>
        <p>🚀 Now combining creativity with code to build unique digital experiences</p>
        <p>📚 Always exploring: WebGL, shaders, generative art, and more</p>
      </div>
    `
  };
  
  return contents[section] || '<p>Content coming soon...</p>';
}

/* ================= LOAD ROOM MODEL ================= */

const loader = new GLTFLoader();

let roomModel = null;

loader.load(
  "./assets/room.glb",
  (gltf) => {
    roomModel = gltf.scene;
    scene.add(roomModel);
    console.log("✅ Room model loaded");
    
    // Initialize music after room loads
    initializeMusic();
    
    // Analyze room structure
    analyzeRoomModel(roomModel);
    
    // Initialize click points after room loads
    initializeClickPoints();
    createUIElements();
  },
  (progress) => {
    const percent = (progress.loaded / progress.total) * 100;
    console.log(`Loading: ${percent.toFixed(0)}%`);
  },
  (error) => {
    console.error("❌ Error loading room:", error);
  }
);

/* ================= ROOM ANALYSIS HELPER ================= */

function analyzeRoomModel(model) {
  console.log("🏠 ===== ROOM ANALYSIS =====");
  
  // Get bounding box
  const box = new THREE.Box3().setFromObject(model);
  const center = box.getCenter(new THREE.Vector3());
  const size = box.getSize(new THREE.Vector3());
  
  console.log("📦 Room Bounds:");
  console.log(`   Center: (${center.x.toFixed(2)}, ${center.y.toFixed(2)}, ${center.z.toFixed(2)})`);
  console.log(`   Size: ${size.x.toFixed(2)} × ${size.y.toFixed(2)} × ${size.z.toFixed(2)}`);
  console.log(`   Min: (${box.min.x.toFixed(2)}, ${box.min.y.toFixed(2)}, ${box.min.z.toFixed(2)})`);
  console.log(`   Max: (${box.max.x.toFixed(2)}, ${box.max.y.toFixed(2)}, ${box.max.z.toFixed(2)})`);
  
  // List all meshes with their positions and names
  console.log("\n📋 All Objects in Room:");
  const meshes = [];
  model.traverse((child) => {
    if (child.isMesh) {
      const worldPos = new THREE.Vector3();
      child.getWorldPosition(worldPos);
      meshes.push({
        name: child.name || 'unnamed',
        position: worldPos,
        object: child
      });
    }
  });
  
  // Show first 15 objects
  meshes.slice(0, 15).forEach((mesh, i) => {
    console.log(`   ${i + 1}. "${mesh.name}" at (${mesh.position.x.toFixed(2)}, ${mesh.position.y.toFixed(2)}, ${mesh.position.z.toFixed(2)})`);
  });
  
  if (meshes.length > 15) {
    console.log(`   ... and ${meshes.length - 15} more objects`);
  }
  
  console.log("\n💡 POSITIONING GUIDE:");
  console.log("   • Press T to enable tuning mode");
  console.log("   • Press 1/2/3 to select a point");
  console.log("   • Arrow keys: Move horizontally");
  console.log("   • PageUp/PageDown: Move vertically");
  console.log("   • Hold Shift: Move faster");
  console.log("   • Press M: Show mesh helper (visualize all objects)");
  console.log("=============================\n");
}

/* ================= TUNING MODE (OPTIONAL) ================= */

let tuningMode = false;
let selectedPoint = null;
let meshHelperVisible = false;
const meshHelpers = [];

function enableTuningMode() {
  tuningMode = true;
  console.log("🔧 TUNING MODE ENABLED");
  console.log("Press 1, 2, or 3 to select a point");
  console.log("Arrow keys: move X/Z");
  console.log("PageUp/Down: move Y");
  console.log("Press M: Toggle mesh helper");
  console.log("Press T again to disable");
}

function toggleMeshHelper() {
  meshHelperVisible = !meshHelperVisible;
  
  if (meshHelperVisible && meshHelpers.length === 0) {
    // Create helpers for all meshes in the room
    if (roomModel) {
      roomModel.traverse((child) => {
        if (child.isMesh) {
          const helper = new THREE.BoxHelper(child, 0x00ff00);
          scene.add(helper);
          meshHelpers.push(helper);
        }
      });
      console.log(`✅ Showing ${meshHelpers.length} mesh helpers (green wireframes)`);
    }
  } else {
    // Toggle visibility
    meshHelpers.forEach(helper => {
      helper.visible = meshHelperVisible;
    });
    console.log(meshHelperVisible ? "✅ Mesh helpers visible" : "❌ Mesh helpers hidden");
  }
}

window.addEventListener("keydown", (e) => {
  // Toggle tuning mode
  if (e.key === 't' || e.key === 'T') {
    tuningMode = !tuningMode;
    if (tuningMode) {
      enableTuningMode();
    } else {
      console.log("🔧 Tuning mode disabled");
      selectedPoint = null;
    }
    return;
  }
  
  // Toggle mesh helper
  if (e.key === 'm' || e.key === 'M') {
    toggleMeshHelper();
    return;
  }
  
  // Toggle auto-rotate
  if (e.key === 'a' || e.key === 'A') {
    controls.autoRotate = !controls.autoRotate;
    console.log(controls.autoRotate ? "🔄 Auto-rotate enabled" : "⏸️ Auto-rotate disabled");
    return;
  }
  
  // Test book menu (B key)
  if (e.key === 'b' || e.key === 'B') {
    if (window.testBookMenu) {
      window.testBookMenu();
    }
    return;
  }
  
  if (!tuningMode) return;
  
  // Select points
  if (e.key === '1' && clickPoints[0]) {
    selectedPoint = clickPoints[0];
    console.log(`✅ Selected: ${selectedPoint.name} (CYAN sphere)`);
    logPointPosition();
  }
  if (e.key === '2' && clickPoints[1]) {
    selectedPoint = clickPoints[1];
    console.log(`✅ Selected: ${selectedPoint.name} (ORANGE sphere)`);
    logPointPosition();
  }
  if (e.key === '3' && clickPoints[2]) {
    selectedPoint = clickPoints[2];
    console.log(`✅ Selected: ${selectedPoint.name} (PURPLE sphere)`);
    logPointPosition();
  }
  
  if (!selectedPoint) return;
  
  const step = e.shiftKey ? 0.1 : 0.05;
  
  // Move selected point
  switch(e.key) {
    case 'ArrowUp':
      selectedPoint.mesh.position.z -= step;
      logPointPosition();
      break;
    case 'ArrowDown':
      selectedPoint.mesh.position.z += step;
      logPointPosition();
      break;
    case 'ArrowLeft':
      selectedPoint.mesh.position.x -= step;
      logPointPosition();
      break;
    case 'ArrowRight':
      selectedPoint.mesh.position.x += step;
      logPointPosition();
      break;
    case 'PageUp':
      selectedPoint.mesh.position.y += step;
      logPointPosition();
      break;
    case 'PageDown':
      selectedPoint.mesh.position.y -= step;
      logPointPosition();
      break;
  }
});

function logPointPosition() {
  if (!selectedPoint) return;
  const p = selectedPoint.mesh.position;
  console.log(`📍 ${selectedPoint.name}: new THREE.Vector3(${p.x.toFixed(2)}, ${p.y.toFixed(2)}, ${p.z.toFixed(2)})`);
}

/* ================= EVENT LISTENERS ================= */

window.addEventListener('mousemove', onMouseMove);
window.addEventListener('click', onClick);

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

/* ================= ANIMATION LOOP ================= */

const clock = new THREE.Clock();
let roomRotated = false;

function animate() {
  requestAnimationFrame(animate);
  
  const deltaTime = clock.getDelta();
  
  // Rotate room 45 degrees on first load
  if (!roomRotated && roomModel) {
    const rotationSpeed = 0.3; // radians per second
    const targetRotation = -Math.PI / 4; // -45 degrees (left rotation)
    
    if (roomModel.rotation.y > targetRotation) {
      roomModel.rotation.y -= rotationSpeed * deltaTime;
      if (roomModel.rotation.y <= targetRotation) {
        roomModel.rotation.y = targetRotation;
        roomRotated = true;
        console.log("🔄 Room rotation completed - -45 degrees (left)");
      }
    }
  }
  
  // Update click point animations
  clickPoints.forEach(point => point.update(deltaTime));
  
  // Update controls (only needed for damping, but we disabled rotation)
  if (controls.enableDamping) {
    controls.update();
  }
  
  // Render scene
  renderer.render(scene, camera);
}

animate();