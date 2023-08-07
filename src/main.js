// import * as THREE from "../node_modules/three/build/three.module.js";
// import WebGL from "../node_modules/three/examples/jsm/capabilities/WebGL.js";
// import GLTFLoader from "../node_modules/three/examples/jsm/loaders/GLTFLoader.js";

import * as THREE from "three";
import WebGL from "three/addons/capabilities/WebGL.js";
console.log("Importing GLTF loader");
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

console.log("main.js loaded successfully!");
const scene = new THREE.Scene();
scene.background = new THREE.Color(231, 231, 231);
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000,
);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshNormalMaterial();
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

camera.position.z = 5;

function animate() {
  requestAnimationFrame(animate);
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;
  renderer.render(scene, camera);
}
if (WebGL.isWebGLAvailable()) {
  // Initiate function or other initializations here
  animate();
} else {
  const warning = WebGL.getWebGLErrorMessage();
  document.getElementById("container").appendChild(warning);
}
console.log("loading 3D model");
const loader = new GLTFLoader();
// loader.load("../models/shoes_by_amor.glb", function (gltf) {
//   scene.add(gltf.scene);
// });

loader.load(
  "../models/shoes_by_amor.glb",
  function (gltf) {
    const shoes = gltf.scene; // sword 3D object is loaded
    shoes.scale.set(1, 1, 1);
    shoes.position.y = 0;
    scene.add(shoes);
  },
  undefined,
  function (error) {
    console.error(error);
  },
);
console.log("3D model loaded");
