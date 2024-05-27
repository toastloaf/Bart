// import * as THREE from "three"; // This imports everything needed from the three.js library.
//
// import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'; // This imports the model loader used to import the head model.
//
// const loader = new GLTFLoader();
//
// window.addEventListener("resize", onWindowResize, false);
//
// /* This function makes sure the canvas and renderer properly fits the browser window when the user changes it's size. */
// function onWindowResize() {
//     camera.aspect = window.innerWidth / window.innerHeight;
//     camera.updateProjectionMatrix();
//     renderer.setSize(window.innerWidth, window.innerHeight);
// }
//
// const scene = new THREE.Scene(); // The actual scene to render.
//
// const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
//
// /* This creates a renderer which essentially just manages everything that needs to get rendered. */
// const renderer = new THREE.WebGLRenderer({
//     canvas: document.getElementById("backgroundCanvas"), // This gets the canvas with an id of "backgroundCanvas" from the home html page and sets it as the active rendering canvas for the renderer.
//     antialias: true,
// });
//
// renderer.setPixelRatio(window.devicePixelRatio);
// renderer.setSize(window.innerWidth, window.innerHeight);
// camera.position.setZ(30);
//
// const ambientLight = new THREE.AmbientLight(0xaaaaff, 0.4);
// scene.add(ambientLight);
//
// const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
// scene.add(directionalLight);
//
// let mortenHead; // This creates a variable for the head model soon to be loaded.
//
// /* This loads the head model from the specified path. */
// loader.load("../models/morten.glb", (gltf) => {
//     mortenHead = gltf.scene;
//
//     mortenHead.scale.set(60, 60, 60); // Scales the model to better fit the page.
//
//     scene.add(mortenHead);
// });
//
// const initialColor = new THREE.Color(0x010409); //
// const targetColor1 = new THREE.Color(0x0d1117); // These are the colors faded between in order when scrolling through the page.
// const targetColor2 = new THREE.Color(0x010409); //
//
// scene.background = initialColor;
//
// /* This function gets executed whenever the user scrolls the page. */
// function moveCamera() {
//     const t = document.body.getBoundingClientRect().top;
//
//     mortenHead.position.z = (t * -0.0035);
//
//     camera.fov = 75 + t * -0.011;
//     camera.updateProjectionMatrix();
//
//     const progress = Math.min((t * 5) * -0.00015, 10);
//
//     const color = new THREE.Color();
//     color.lerpColors(initialColor, targetColor1, Math.min(progress, 1)); // This fades the initial and target colors according to the amount scrolled on the page.
//
//     if (progress > 2.9) {
//         color.lerpColors(targetColor1, targetColor2, Math.min((progress - 2.9) * 4, 1));
//     }
//
//     scene.background = color;
//     renderer.setClearColor(color, 1);
// }
//
// document.body.onscroll = moveCamera;
//
// /* This function gets executed every frame and renders the scene onto the canvas. */
// function animate() {
//     requestAnimationFrame(animate);
//
//     renderer.render(scene, camera);
// }
//
// animate();

import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';
import { TextureLoader } from 'three';

// Scene Setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Camera and Controls
camera.position.z = -2;
const controls = new OrbitControls(camera, renderer.domElement);

// Lighting
const ambientLight = new THREE.AmbientLight(0x404040); // soft white light
scene.add(ambientLight);
const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
scene.add(directionalLight);

// Loaders
const fbxLoader = new FBXLoader();
const textureLoader = new TextureLoader();

// Load the FBX Model and Texture
fbxLoader.load('assets/sprit2.fbx', (object) => {
    object.traverse((child) => {
        if (child.isMesh) {
            textureLoader.load('assets/sprit_texture.png', (texture) => {
                child.material.map = texture;
                child.material.needsUpdate = true;
            });
        }
    });

    object.scale.set(0.005, 0.005, 0.005);

    scene.add(object);
});

// Animation Loop
function animate() {
    requestAnimationFrame(animate);
    scene.rotation.y += 0.005; // Adjust rotation speed as needed
    controls.update();
    renderer.render(scene, camera);
}
animate();