console.log("main.js loaded successfully!");
import * as THREE from "three";
import WebGL from "three/addons/capabilities/WebGL.js";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

console.log("Imports successful!");

//creating a scene
const scene = new THREE.Scene();
scene.background = new THREE.Color("#141414");

//creating renderer
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
controls.enableDamping = true;
controls.dampingFactor = 1;
controls.enableZoom = true;
controls.enablePan = false;
controls.update();

//creating helper grid
const size = 100;
const divisions = 50;
const gridHelper = new THREE.GridHelper(size, divisions);
gridHelper.position.y = -1;
scene.add(gridHelper);

//creating light sources
const light0 = new THREE.PointLight("#ffffff", 700, 100);
light0.position.set(-20, +10, +20);
light0.rotateX = 45;
light0.rotateY = -15;
scene.add(light0);

const light1 = new THREE.PointLight("#ffffff", 100, 100);
light1.position.set(+30, -10, -20);
light1.rotateX = -45;
light1.rotateX = 10;
scene.add(light1);

//loading 3D model and setting its attriutes
console.log("loading 3D model");
const loader = new GLTFLoader();

loader.load(
  "../models/sneaker_shoe.glb",
  function (gltf) {
    const shoes = gltf.scene;
    // console.log(shoes.children.find((x) => x.name == "red"));
    var newMaterial = new THREE.MeshStandardMaterial({ color: 0xff0000 });
    shoes.traverse((element) => {
      if (element.isMesh) {
        console.log(element);

        // if ((element.name == "R_SHOE_R_Shoe_0")) {
        //   element.visible = false;
        // }
      }
    });
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
  requestAnimationFrame(animate);
  animate();
  console.log("WebGL support detected");
} else {
  const warning = WebGL.getWebGLErrorMessage();
  document.getElementById("container").appendChild(warning);
}
