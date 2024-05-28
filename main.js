import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js';
import { TextureLoader } from 'three';

// Get a reference to the existing canvas element
const canvas = document.getElementById('sprit-can');

// Scene Setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ alpha: true, canvas: canvas }); // Use the existing canvas
renderer.setSize(window.innerWidth, window.innerHeight);

// Camera and Controls
camera.position.z = -2;
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableZoom = false; // Disable zoom

// Lighting
const ambientLight = new THREE.AmbientLight(0xf2a2b3, 3); // soft white light
scene.add(ambientLight);
const directionalLight = new THREE.DirectionalLight(0xf2aebd, 5);
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
    object.position.set(0, 0.4, 0);

    object.rotation.set(0.1, 0, 0);

    scene.add(object);
});

// Animation Loop
function animate() {
    requestAnimationFrame(animate);
    //scene.rotation.y += 0.009; // Adjust rotation speed as needed
    let object = scene.children[2];
    //object.rotation.y += 0.01;
    //object.rotation.x += 0.4;
    //object.rotation.z += 0.01;
    let axis = new THREE.Vector3(0.15, 1, 0); // Change the values as needed
        let angle = 0.02; // The rotation angle in radians
        object.rotateOnAxis(axis, angle);
    controls.update();
    renderer.render(scene, camera);
}
animate();