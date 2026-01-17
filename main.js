import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

/* ================= SCENE ================= */

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x1a1a1a);

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  2000
);
camera.position.set(0, 1.6, 5);

/* ================= RENDERER ================= */

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
document.body.appendChild(renderer.domElement);

/* ================= LIGHTING ================= */

scene.add(new THREE.AmbientLight(0xffffff, 1.5));

const dirLight = new THREE.DirectionalLight(0xffffff, 2);
dirLight.position.set(5, 10, 5);
scene.add(dirLight);

/* ================= CONTROLS ================= */

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableZoom = false;
controls.enablePan = false;
controls.enableDamping = true;
controls.minPolarAngle = Math.PI / 3;
controls.maxPolarAngle = Math.PI / 2;

/* ================= GLOBALS ================= */

let room;
const clickPoints = [];
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

/* ================= LOAD MODEL ================= */

const loader = new GLTFLoader();
loader.load(
  "./assets/room.glb",
  (gltf) => {
    room = gltf.scene;
    scene.add(room);

    console.log("===== OBJECT NAMES IN MODEL =====");
    room.traverse((obj) => console.log(obj.name));

    // 1️⃣ Chair → About Me (world-space point)
    addWorldClickPoint(
      "Chair_Point",
      new THREE.Vector3(-0.25, 0.9, 0.35)
    );

    // 2️⃣ Books → Book Menu (grouped books)
    createBooksClickPoint();

    // 3️⃣ Window → Future Planning (real mesh name)
    createMeshClickPoint(
      "Cube.008_window_0",
      "Window_Point",
      0.8
    );
  },
  undefined,
  (err) => console.error("GLB load error:", err)
);

/* ================= CLICK POINT HELPERS ================= */

// World-space click point (for Chair)
function addWorldClickPoint(name, position) {
  const point = createClickSphere(name);
  point.position.copy(position);
  scene.add(point);
  clickPoints.push(point);
}

// Mesh-based click point (for Window)
function createMeshClickPoint(meshName, pointName, heightOffset) {
  const mesh = findObjectByName(room, meshName);
  if (!mesh) {
    console.warn("❌ Mesh not found:", meshName);
    return;
  }

  const pos = new THREE.Vector3();
  mesh.getWorldPosition(pos);
  pos.y += heightOffset;

  addWorldClickPoint(pointName, pos);
}

// Grouped Books click point
function createBooksClickPoint() {
  const books = [];

  room.traverse((obj) => {
    if (obj.name.startsWith("Book")) books.push(obj);
  });

  if (books.length === 0) {
    console.warn("❌ No books found");
    return;
  }

  const avg = new THREE.Vector3();
  books.forEach((b) => {
    const p = new THREE.Vector3();
    b.getWorldPosition(p);
    avg.add(p);
  });

  avg.divideScalar(books.length);
  avg.y += 0.6;

  addWorldClickPoint("Books_Point", avg);
}

// Visible click sphere
function createClickSphere(name) {
  const geo = new THREE.SphereGeometry(0.35, 32, 32);
  const mat = new THREE.MeshBasicMaterial({ color: 0xff0000 });
  const sphere = new THREE.Mesh(geo, mat);
  sphere.name = name;
  return sphere;
}

// Find mesh by exact name
function findObjectByName(root, name) {
  let found = null;
  root.traverse((obj) => {
    if (obj.name === name) found = obj;
  });
  return found;
}

/* ================= RAYCAST ================= */

window.addEventListener("click", (event) => {
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

  raycaster.setFromCamera(mouse, camera);
  const hits = raycaster.intersectObjects(clickPoints, true);
  if (hits.length === 0) return;

  handleAction(hits[0].object.name);
});

/* ================= ACTIONS ================= */

const info = document.createElement("div");
info.id = "info";
document.body.appendChild(info);

function handleAction(name) {
  if (name === "Chair_Point") {
    info.innerText =
      "👤 About Me\n\nI am a developer passionate about interactive 3D and creative web experiences.";
  }

  if (name === "Books_Point") {
    info.innerText =
      "📘 My Work\n\n• Projects\n• Skills\n• Experience\n• Journey";
  }

  if (name === "Window_Point") {
    info.innerText =
      "🚀 Future Plans\n\nAdvanced 3D web, AI projects, immersive portfolios.";
  }

  info.style.display = "block";
}

/* ================= RESIZE ================= */

window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

/* ================= LOOP ================= */

function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}

animate();
