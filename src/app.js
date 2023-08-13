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
  /*children: Array(10) [ {…}, {…}, {…}, … ]
​​
0: Object { isObject3D: true, uuid: "7857146e-7f0b-4bb5-b550-9a86c115ea10", name: "shoes_R", … }
​​
1: Object { isObject3D: true, uuid: "c35cf5af-1b06-4b3e-b021-88a96c09c67a", name: "sole_front_back___R_", … }
​​
2: Object { isObject3D: true, uuid: "7b1e684f-7cbd-4824-87cb-f61000379c30", name: "laces_R", … }
​​
3: Object { isObject3D: true, uuid: "bb2b2b58-7dc2-42c9-b1a6-e654a8dcce4b", name: "sole__body___R__", … }
​​
4: Object { isObject3D: true, uuid: "a18f6ba6-8496-4a92-9609-1b3992b041e3", name: "laces__L", … }
​​
5: Object { isObject3D: true, uuid: "77d57788-d36d-4ccb-a85d-ecfeb908914a", name: "shoes_L", … }
​​
6: Object { isObject3D: true, uuid: "56702607-08e8-49ac-8b9e-67130855ab6c", name: "sole__body___L", … }
​​
7: Object { isObject3D: true, uuid: "8e1571ba-c71d-49c7-ab46-bad45cd762f2", name: "sole_front_back___L_", … }
​​
8: Object { isObject3D: true, uuid: "863678f5-fa05-4018-a08e-d38d8cb94a74", name: "shoes_tag__R", … }
​​
9: Object { isObject3D: true, uuid: "7f495863-2bac-48bd-896c-db1c1462be87", name: "shoes_tag__L", … } */

  const colorPicker = document.getElementById("colorPicker");
  // = "#" + Math.floor(Math.random() * 16777215).toString(16)
  let color = "#ffa1a1";
  colorPicker.addEventListener("input", () => {
    const selectedColor = colorPicker.value;
    color = selectedColor;
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
        // console.log(intersectedObject.name);

        //handling tooltip behavior
        const offsetX = 15; // Adjust as needed
        const offsetY = -15; // Adjust as needed

        tooltipElement.style.display = "block";
        tooltipElement.style.left = `${
          ((mouse.x + 1) * window.innerWidth) / 2 + offsetX
        }px`;
        tooltipElement.style.top = `${
          ((-mouse.y + 1) * window.innerHeight) / 2 + offsetY
        }px`;

        if (
          intersectedObject.name == "L_SHOE_L_Shoe_0014_1" ||
          intersectedObject.name == "L_SHOE_L_Shoe_0008_1"
        ) {
          tooltipElement.textContent = "Sole Tag";
        } else if (
          intersectedObject.name == "L_SHOE_L_Shoe_0014" ||
          intersectedObject.name == "L_SHOE_L_Shoe_0008"
        ) {
          tooltipElement.textContent = "Shoe Body";
        } else if (
          intersectedObject.name == "sole_front_back___L_" ||
          intersectedObject.name == "sole_front_back___R_"
        ) {
          tooltipElement.textContent = "Sole Tip and Back";
        } else if (
          intersectedObject.name == "shoes_tag__R" ||
          intersectedObject.name == "shoes_tag__L"
        ) {
          tooltipElement.textContent = "Shoe Tag";
        } else if (
          intersectedObject.name == "laces__L" ||
          intersectedObject.name == "laces_R"
        ) {
          tooltipElement.textContent = "Laces";
        } else if (
          intersectedObject.name == "sole__body___R__" ||
          intersectedObject.name == "sole__body___L"
        ) {
          tooltipElement.textContent = "Sole Body";
        }

        //handling actions on click
        if (mouseClicked && !isDragging) {
          intersectedObject.material.color.set(color);
          console.log(color + " on " + intersectedObject.name);
          mouseClicked = false;

          if (tooltipElement.textContent == "Sole Tag") {
            concerned_element
              .getObjectByName("L_SHOE_L_Shoe_0014_1")
              .material.color.set(color);
            concerned_element
              .getObjectByName("L_SHOE_L_Shoe_0008_1")
              .material.color.set(color);
          } else if (tooltipElement.textContent == "Shoe Body") {
            concerned_element
              .getObjectByName("L_SHOE_L_Shoe_0014")
              .material.color.set(color);
            concerned_element
              .getObjectByName("L_SHOE_L_Shoe_0008")
              .material.color.set(color);
          } else if (tooltipElement.textContent == "Sole Tip and Back") {
            concerned_element
              .getObjectByName("sole_front_back___R_")
              .material.color.set(color);
            concerned_element
              .getObjectByName("sole_front_back___L_")
              .material.color.set(color);
          } else if (tooltipElement.textContent == "Shoe Tag") {
            concerned_element
              .getObjectByName("shoes_tag__R")
              .material.color.set(color);
            concerned_element
              .getObjectByName("shoes_tag__L")
              .material.color.set(color);
          } else if (tooltipElement.textContent == "Laces") {
            concerned_element
              .getObjectByName("laces__L")
              .material.color.set(color);
            concerned_element
              .getObjectByName("laces_R")
              .material.color.set(color);
          } else if (tooltipElement.textContent == "Sole Body") {
            concerned_element
              .getObjectByName("sole__body___R__")
              .material.color.set(color);
            concerned_element
              .getObjectByName("sole__body___L")
              .material.color.set(color);
          }
        }
      } else {
        tooltipElement.style.display = "none";
      }
    }
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
