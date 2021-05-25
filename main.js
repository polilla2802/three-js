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
  45,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
//Setting the camera by 5 away from the z axis
camera.position.z = 5;
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

//CUBE CODE //
let cubeSize = 1;
//Create a cube from the THREE library
const cubeGeometry = new THREE.BoxGeometry(cubeSize, cubeSize, cubeSize);
//Select a basic material from the THREE library
const cubeMaterial = new THREE.MeshBasicMaterial();
//Setting an initial random color for the material
cubeMaterial.color.setRGB(
  Math.random(100, 256),
  Math.random(100, 256),
  Math.random(100, 256)
);
//Instance of my new cube by creating a mesh
const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
//Initial position of cube
// cube.position.x = 0;
// cube.position.y = 0;
let xSpeed = 3;
let ySpeed = 3;
cube.position.set(0 /*px*/, 0, -screenDepth + 20);
cube.scale.set(100, 100, 100);
//Adding my new cube to the scene
scene.add(cube);

const visibleHeightAtZDepth = (depth, camera) => {
  // vertical fov in radians
  const vFOV = (camera.fov * Math.PI) / 180;

  // Math.abs to ensure the result is always positive
  return 2 * Math.tan(vFOV / 2) * Math.abs(depth);
};

var screenDepth;
screenDepth = findScreenDepth(camera, renderer);

cube.position.set(0 /*px*/, 0, -screenDepth + 20);

function findScreenDepth(camera, renderer) {
  const { near, far } = camera;
  const { height: physicalViewHeight } = renderer.getDrawingBufferSize();
  console.log(window.innerHeight, physicalViewHeight);
  const threshold = 0.00000000000001;

  return _findScreenDepth(near, far);

  function _findScreenDepth(near, far) {
    const midpoint = (far - near) / 2 + near;
    const midpointHeight = visibleHeightAtZDepth(-midpoint, camera);

    if (Math.abs(physicalViewHeight / midpointHeight - 1) <= threshold)
      return midpoint;

    if (physicalViewHeight < midpointHeight)
      return _findScreenDepth(near, midpoint);
    else if (physicalViewHeight > midpointHeight)
      return _findScreenDepth(midpoint, far);
    else if (midpointHeight == physicalViewHeight)
      // almost never happens
      return midpoint;
  }
}
// //Adding a grid to the scene for looking at the 2d axis
// const gridHelper = new THREE.GridHelper(7, 20);
// gridHelper.geometry.rotateX(Math.PI / 2);
// // gridHelper.geometry.rotateY(200);
// scene.add(gridHelper);

// //Adding controls to the mouse over the scene
// const controls = new OrbitControls(camera, renderer.domElement);

const animate = function () {
  requestAnimationFrame(animate);
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;
  cube.rotation.z += 0.01;
  cube.position.x += xSpeed;
  cube.position.y += ySpeed;
  if (
    cube.position.x - 50 <= -window.innerWidth / 2 + 50 ||
    cube.position.x + 50 >= window.innerWidth / 2 - 50
  ) {
    cubeMaterial.color.setRGB(
      Math.random(100, 256),
      Math.random(100, 256),
      Math.random(100, 256)
    );
    xSpeed = -xSpeed;
  } else if (
    cube.position.y - 50 <= -window.innerHeight / 2 + 30 ||
    cube.position.y + 50 >= window.innerHeight / 2 - 30
  ) {
    cubeMaterial.color.setRGB(
      Math.random(100, 256),
      Math.random(100, 256),
      Math.random(100, 256)
    );
    ySpeed = -ySpeed;
  }
  // cube.position.x += xSpeed;
  // cube.position.y += ySpeed;

  // if (cube.position.x >= 4) {
  //   xSpeed = -xSpeed;
  // }

  renderer.render(scene, camera);
};

animate();
