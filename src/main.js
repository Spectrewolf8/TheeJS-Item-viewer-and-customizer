console.log("main.js loaded successfully!");
import * as THREE from "three";
import WebGL from "three/addons/capabilities/WebGL.js";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

console.log("Imports successful!");

//creating a scene
const scene = new THREE.Scene();
scene.background = new THREE.Color(231, 231, 231);

//creating rendered
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

//creating main camera and adding orbital controls
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000,
);

camera.position.z = 3;
const controls = new OrbitControls(camera, renderer.domElement);
controls.update();

//creating light sources
const light0 = new THREE.PointLight(0xff0000, 500, 100);
light0.position.set(-20, 0, 20);
light0.rotateX = 45;
scene.add(light0);

const light1 = new THREE.PointLight(0xff0000, 200, 100);
light1.position.set(+30, -10, -20);
light1.rotateX = -45;
scene.add(light1);

//loading 3D model and setting its attriutes
console.log("loading 3D model");
const loader = new GLTFLoader();

loader.load(
  "../models/sneaker_shoe.glb",
  function (gltf) {
    const shoes = gltf.scene; // sword 3D object is loaded
    shoes.scale.set(10, 10, 10);
    shoes.position.y = 0;
    shoes.position.x = 0;
    scene.add(shoes);
  },
  undefined,
  function (error) {
    console.error(error);
  },
);
console.log("3D model loaded");

//setting things to animate in animate()
function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}

//checking browser's WebGL compatibility before animating
if (WebGL.isWebGLAvailable()) {
  animate();
  console.log("WebGL support detected");
} else {
  const warning = WebGL.getWebGLErrorMessage();
  document.getElementById("container").appendChild(warning);
}
