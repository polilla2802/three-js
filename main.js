import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
// instantiate a loader

//Canvas selector
const myCanvas = document.querySelector("#bg");

//Defining my main scene to make my render
const scene = new THREE.Scene();
//Scene color white
// scene.background = new THREE.Color(0xf0f0f0);
//Creating my main camera
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  1,
  1000
);
//Setting the camera by 5 away from the z axis
camera.position.x = 10;
camera.position.y = 10;
camera.position.z = 10;
//My main render over myCanvas
const renderer = new THREE.WebGLRenderer({
  canvas: myCanvas,
});

//Render size
renderer.setSize(window.innerWidth, window.innerHeight);

//Resize render on window size change
window.addEventListener("resize", function () {
  let width = window.innerWidth;
  let height = window.innerHeight;
  renderer.setSize(width, height);
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
});

let screenWith = 5;
let screenHeight = 3;
let screenDepth = 3;

//CUBE CODE //
//Create a cube from the THREE library
const cubeContainerGeometry = new THREE.BoxGeometry(11, 7, 7);
//Cube container
const cubeContainerMaterial = new THREE.MeshBasicMaterial();
cubeContainerMaterial.transparent = true;
cubeContainerMaterial.opacity = 0.3;
cubeContainerMaterial.color.setRGB(
  0.571926611453039,
  0.6284489644116682,
  0.9028887551547664
);
console.log(cubeContainerMaterial.color);
//Instance of my new cube container by creating a mesh
const cubeContainer = new THREE.Mesh(
  cubeContainerGeometry,
  cubeContainerMaterial
);
scene.add(cubeContainer);
//Create a cube from the THREE library
const cubeGeometry = new THREE.BoxGeometry();
//Select a basic material from the THREE library
const cubeMaterial = new THREE.MeshBasicMaterial();
//For 2d cube
// cubeMaterial.side = THREE.DoubleSide;
//Setting an initial random color for the material
function pickColor(params) {
  cubeMaterial.color.setRGB(
    Math.random(100, 256),
    Math.random(100, 256),
    Math.random(100, 256)
  );
}
pickColor();

//Instance of my new cube by creating a mesh
const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
//Initial position of cube

let initialDirection = Math.random() < 0.5 ? 1 : -1;
let x = Math.random() * screenWith * initialDirection;
initialDirection = Math.random() < 0.5 ? 1 : -1;
let y = Math.random() * screenHeight * initialDirection;
initialDirection = Math.random() < 0.5 ? 1 : -1;
let z = Math.random() * screenHeight * initialDirection;
let xSpeed = 0.1;
let ySpeed = 0.1;
let zSpeed = 0.1;
cube.position.x = x;
cube.position.y = y;
cube.position.z = z;
// console.log("x: " + cube.position.x);
// console.log("y: " + cube.position.y);
// console.log("z: " + cube.position.z);
//Adding my new cube to the scene
scene.add(cube);

//Adding a grid to the scene for looking at the 2d axis
const gridHelper = new THREE.GridHelper(7.6, 20);
gridHelper.geometry.rotateX(Math.PI / 2);
// gridHelper.geometry.rotateY(200);
scene.add(gridHelper);

//Adding controls to the mouse over the scene
const controls = new OrbitControls(camera, renderer.domElement);

const animate = function () {
  requestAnimationFrame(animate);
  cube.rotation.x += 0.02;
  cube.rotation.y += 0.02;
  cube.rotation.z += 0.02;
  cube.position.x += xSpeed * initialDirection;
  cube.position.y += ySpeed * initialDirection;
  cube.position.z += zSpeed * initialDirection;
  if (cube.position.x >= screenWith) {
    xSpeed = -xSpeed;
    cube.position.x = screenWith;
    pickColor();
  } else if (cube.position.x <= -screenWith) {
    xSpeed = -xSpeed;
    cube.position.x = -screenWith;
    pickColor();
  }
  if (cube.position.y >= screenHeight) {
    ySpeed = -ySpeed;
    cube.position.y = screenHeight;
    pickColor();
  } else if (cube.position.y <= -screenHeight) {
    ySpeed = -ySpeed;
    cube.position.y = -screenHeight;
    pickColor();
  }
  if (cube.position.z >= screenDepth) {
    zSpeed = -zSpeed;
    cube.position.z = screenDepth;
    pickColor();
  } else if (cube.position.z <= -screenDepth) {
    zSpeed = -zSpeed;
    cube.position.z = -screenDepth;
    pickColor();
  }
  // console.log("x: " + cube.position.x);
  // console.log("y: " + cube.position.y);

  renderer.render(scene, camera);
};

animate();
