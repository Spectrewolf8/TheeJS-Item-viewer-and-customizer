// console.log("main.js loaded successfully!");
// import * as THREE from "three";
// import WebGL from "three/addons/capabilities/WebGL.js";
// import Stats from "three/addons/libs/stats.module.js";
// import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
// import { OrbitControls } from "three/addons/controls/OrbitControls.js";

// console.log("Imports successful!");
// const intersectedObjects = [];

// //creating a scene
// const scene = new THREE.Scene();
// scene.background = new THREE.Color("#141414");

// //creating renderer
// const renderer = new THREE.WebGLRenderer({ antialias: true });
// renderer.setSize(window.innerWidth, window.innerHeight);
// document.body.appendChild(renderer.domElement);

// //stats
// const stats = new Stats();
// document.body.appendChild(stats.dom);

// //creating main camera and adding orbital controls
// const camera = new THREE.PerspectiveCamera(
//   75,
//   window.innerWidth / window.innerHeight,
//   0.1,
//   100,
// );
// camera.position.set(-2.75, 1.5, 1.5);

// const controls = new OrbitControls(camera, renderer.domElement);
// controls.target.set(0, 0.5, 0);
// controls.enableDamping = true;
// controls.enableZoom = true;
// controls.enablePan = false;
// controls.minDistance = 2.5;
// controls.maxDistance = 4;
// controls.update();

// //creating helper grid
// const size = 100;
// const divisions = 50;
// const gridHelper = new THREE.GridHelper(size, divisions);
// gridHelper.position.y = -1;
// scene.add(gridHelper);

// //creating light sources
// const light0 = new THREE.PointLight("#ffffff", 600, 100);
// light0.position.set(-10, +10, +20);
// light0.lookAt(0, 0, 0);
// light0.rotateX = 45;
// light0.rotateY = -15;
// scene.add(light0);

// const light1 = new THREE.PointLight("#ffffff", 300, 100);
// light1.position.set(+30, -10, +20);
// light1.lookAt(0, 0, 0);
// light1.rotateX = -45;
// light1.rotateY = 10;
// scene.add(light1);

// const light2 = new THREE.PointLight("#ffffff", 300, 100);
// light2.position.set(-30, -10, -20);
// light2.lookAt(0, 0, 0);
// light2.rotateX = 180;
// light2.rotateY = 10;
// scene.add(light2);

// const light3 = new THREE.PointLight("#ffffff", 300, 100);
// light3.position.set(+30, -10, -20);
// light3.lookAt(0, 0, 0);
// light3.rotateX = 180;
// light3.rotateY = 10;
// scene.add(light3);

// //loading 3D model and setting its attriutes
// console.log("loading 3D model");
// const loader = new GLTFLoader();
// let concerned_element;
// loader.load(
//   "../models/sneaker_shoe_mod_3.glb",
//   function (gltf) {
//     const shoes = gltf.scene;
//     concerned_element = shoes;
//     console.log(shoes);
//     // console.log(shoes.children.find((x) => x.name == "red"));
//     var newMaterial = new THREE.MeshStandardMaterial({ color: 0xff0000 });
//     shoes.getObjectByName("L_SHOE_L_Shoe_0014").material.color.set("Cyan");
//     shoes.getObjectByName("sole_front_back___L_").material.color.set("#111111");
//     shoes.getObjectByName("L_SHOE_L_Shoe_0008").material.isMetal = false;
//     shoes.getObjectByName("L_SHOE_L_Shoe_0014").material.isMetal = false;
//     shoes.traverse((element) => {
//       // element.material.color.set("#111111");
//       // if (element.name == "laces__L") {
//       //   // element.material = newMaterial;
//       //   element.material.color.set("#141414");
//       // }
//       console.log(element.name);
//       // if (element.isMaterial) {
//       //   element.material.color.set("#111111");
//       // }
//     });
//     shoes.scale.set(10, 10, 10);
//     shoes.position.y = 0;
//     shoes.position.x = 0;
//     scene.add(shoes);
//   },
//   undefined,
//   function (error) {
//     console.error(error);
//   },
// );
// console.log("3D model loaded");

// //setting mouse event handler
// function onMouseMove(event) {
//   event.preventDefault();

//   mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
//   mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
// }

// //setting up raycaster
// const raycaster = new THREE.Raycaster();
// const mouse = new THREE.Vector2(1, 1);

// //setting things to animate in animate()
// function animate() {
//   requestAnimationFrame(animate);
//   controls.update();
//   stats.update();

//   raycaster.setFromCamera(mouse, camera);
//   const intersection = raycaster.intersectObject(concerned_element);
//   console.log(intersection);
//   renderer.render(scene, camera);
// }

// //checking browser's WebGL compatibility before animating
// if (WebGL.isWebGLAvailable()) {
//   requestAnimationFrame(animate);
//   animate();
//   console.log("WebGL support detected");
// } else {
//   const warning = WebGL.getWebGLErrorMessage();
//   document.getElementById("container").appendChild(warning);
// }

// // setTimeout(() => {
// //   concerned_element
// //     .getObjectByName("L_SHOE_L_Shoe_0014")
// //     .material.color.set("Magenta");
// // }, 5 * 1000);

console.log("main.js loaded successfully!");
import * as THREE from "three";
import WebGL from "three/addons/capabilities/WebGL.js";
import Stats from "three/addons/libs/stats.module.js";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import {
  CSS2DRenderer,
  CSS2DObject,
} from "three/addons/renderers/CSS2DRenderer.js";

console.log("Imports successful!");

const intersectedObjects = [];
let concerned_element;

function init() {
  //setting up scene
  const scene = new THREE.Scene();
  scene.background = new THREE.Color("#141414");

  //setting up renderer
  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  //setting up CSS2DRenderer for labels
  // const labelRenderer = new CSS2DRenderer();
  // labelRenderer.setSize(window.innerWidth, window.innerHeight);
  // labelRenderer.domElement.style.position = "absolute";
  // labelRenderer.domElement.style.top = "0px";
  // document.body.appendChild(labelRenderer.domElement);

  //setting up stats monitor
  const stats = new Stats();
  document.body.appendChild(stats.dom);

  //setting up camera and camera's orbital controls
  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    100,
  );
  camera.position.set(-2.75, 1.5, 1.5);

  const controls = new OrbitControls(camera, renderer.domElement);
  controls.target.set(0, 0.5, 0);
  controls.enableDamping = true;
  controls.enableZoom = true;
  controls.enablePan = false;
  controls.minDistance = 2.5;
  controls.maxDistance = 4;
  controls.update();

  //setting gridhelper
  // const size = 100;
  // const divisions = 50;
  // const gridHelper = new THREE.GridHelper(size, divisions);
  // gridHelper.position.y = -1;
  // scene.add(gridHelper);

  //setting lights
  const light0 = new THREE.PointLight("#ffffff", 600, 100);
  light0.position.set(-10, +10, +20);
  light0.lookAt(0, 0, 0);
  light0.rotateX = 45;
  light0.rotateY = -15;
  scene.add(light0);

  const light1 = new THREE.PointLight("#ffffff", 300, 100);
  light1.position.set(+30, -10, +20);
  light1.lookAt(0, 0, 0);
  light1.rotateX = -45;
  light1.rotateY = 10;
  scene.add(light1);

  const light2 = new THREE.PointLight("#ffffff", 300, 100);
  light2.position.set(-30, -10, -20);
  light2.lookAt(0, 0, 0);
  light2.rotateX = 180;
  light2.rotateY = 10;
  scene.add(light2);

  const light3 = new THREE.PointLight("#ffffff", 300, 100);
  light3.position.set(+30, -10, -20);
  light3.lookAt(0, 0, 0);
  light3.rotateX = 180;
  light3.rotateY = 10;
  scene.add(light3);

  //loading 3D model
  const loader = new GLTFLoader();
  loader.load(
    "../models/sneaker_shoe_mod_3.glb",
    function (gltf) {
      const shoes = gltf.scene;
      concerned_element = shoes;
      shoes.scale.set(10, 10, 10);
      shoes.position.y = 0;
      shoes.position.x = 0;
      scene.add(shoes);
      console.log(shoes);
    },
    undefined,
    function (error) {
      console.error(error);
    },
  );

  //setting up tooltip
  const tooltipElement = document.getElementById("tooltip");

  //declaring ray caster and mouse
  const raycaster = new THREE.Raycaster();
  const mouse = new THREE.Vector2(1, 1);

  //adding mouse event listener to the html(DOM) for mouse movements
  document.addEventListener("mousemove", onMouseMove);
  function onMouseMove(event) {
    event.preventDefault();
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
  }

  //adding mouse event listener mouse events(clicking, dragging)
  let mouseClicked = false;
  let isDragging = false;
  let startPosition = new THREE.Vector2(0, 0);

  window.addEventListener("mousemove", function (event) {
    if (!isDragging) {
      const deltaX = Math.abs(startPosition.x - event.clientX);
      const deltaY = Math.abs(startPosition.y - event.clientY);
      if (deltaX > 1 || deltaY > 1) {
        isDragging = true;
      }
    }
  });

  window.addEventListener("mousedown", function (event) {
    startPosition.x = event.clientX;
    startPosition.y = event.clientY;
    isDragging = false;
  });

  window.addEventListener("mouseup", function (event) {
    if (!isDragging) {
      mouseClicked = true;
    } else {
      mouseClicked = false;
      isDragging = false;
    }
  });

  function animate() {
    requestAnimationFrame(animate);
    controls.update();
    stats.update();
    renderer.render(scene, camera);
    // console.log(mouse.x, mouse.y);
    if (concerned_element) {
      raycaster.setFromCamera(mouse, camera);
      raycaster.params.Points.threshold = 0.1;
      raycaster.params.Line.threshold = 0.1;

      const intersection = raycaster.intersectObject(concerned_element);

      if (intersection.length > 0) {
        let intersectedObject = intersection[0].object;
        console.log(intersectedObject.name);

        if (mouseClicked && !isDragging) {
          let color = "#" + Math.floor(Math.random() * 16777215).toString(16);
          intersectedObject.material.color.set(color);
          console.log(color + " on " + intersectedObject.name);
          mouseClicked = false;
        }

        const offsetX = 15; // Adjust as needed
        const offsetY = -15; // Adjust as needed

        tooltipElement.textContent = intersectedObject.name;
        tooltipElement.style.display = "block";
        tooltipElement.style.left = `${
          ((mouse.x + 1) * window.innerWidth) / 2 + offsetX
        }px`;
        tooltipElement.style.top = `${
          ((-mouse.y + 1) * window.innerHeight) / 2 + offsetY
        }px`;
      } else {
        tooltipElement.style.display = "none";
      }
    }
    // if (
    //   typeof intersection != undefined &&
    //   typeof intersection[0] != undefined
    // ) {
    //   console.log(intersection[0].object["name"]);
    //   concerned_element
    //     .getObjectByName(intersection[0].object["name"])
    //     .material.color.set("Blue");
    // }
  }

  if (WebGL.isWebGLAvailable()) {
    requestAnimationFrame(animate);
    animate();
    console.log("WebGL support detected");
  } else {
    const warning = WebGL.getWebGLErrorMessage();
    document.getElementById("container").appendChild(warning);
  }
}

init();
