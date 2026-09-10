import * as THREE from "https://unpkg.com/three@0.179.1/build/three.module.js";
import { OrbitControls } from "https://unpkg.com/three@0.179.1/examples/jsm/controls/OrbitControls.js";

const container = document.getElementById("scene-container") || document.body;
const pressedKeys = new Set();
const cameraKeys = new Set(["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", "w", "a", "s", "d", "p", "o"]);

window.addEventListener("keydown", (event) => {
    if (cameraKeys.has(event.key)) {
        pressedKeys.add(event.key);
        event.preventDefault();

        if (event.key === "ArrowUp" || event.key === "ArrowDown") {
            zoomCamera(event.key === "ArrowUp" ? -1 : 1);
        }

        if (event.key === "p" || event.key === "o") {
            setActiveCamera(event.key === "p" ? camera : OCamera);
        }
    }
});

window.addEventListener("keyup", (event) => {
    pressedKeys.delete(event.key);
});

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x87ceeb);

const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 100);
camera.position.set(0, 5, 15);

const OCamera = new THREE.OrthographicCamera(-10, 10, 10, -10, 0.1, 100);
OCamera.position.set(0, 5, 15);
OCamera.lookAt(0, 0, 0);

let activeCamera = camera;
const cameraStatus = document.getElementById("camera-status");

function setActiveCamera(nextCamera) {
    activeCamera = nextCamera;
    controls.object = activeCamera;
    cameraStatus.textContent = activeCamera === camera ? "Perspective" : "Orthographic";
    renderer.render(scene, activeCamera);
}

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setSize(Math.min(window.innerWidth * 0.9, 900), 600);
renderer.domElement.style.display = "block";
renderer.domElement.style.marginTop = "1rem";
container.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.target.set(0, 1, 0);

const zoomStep = 1;
const minZoomDistance = 4;
const maxZoomDistance = 40;

function zoomCamera(direction) {
    const cameraOffset = activeCamera.position.clone().sub(controls.target);
    const zoomDistance = THREE.MathUtils.clamp(
        cameraOffset.length() + direction * zoomStep,
        minZoomDistance,
        maxZoomDistance
    );

    activeCamera.position.copy(controls.target).add(cameraOffset.normalize().multiplyScalar(zoomDistance));
    controls.update();
    renderer.render(scene, activeCamera);
}

const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(5, 10, 5);
scene.add(directionalLight);

const ground = new THREE.Mesh(
    new THREE.PlaneGeometry(40, 40),
    new THREE.MeshStandardMaterial({ color: 0x44aa44 })
);
ground.rotation.x = -Math.PI / 2;
scene.add(ground);

const cubes = [];
const cubeColors = [0xff6b6b, 0xffc857, 0x4ecdc4, 0x5dade2, 0xa78bfa];

const positions = [
[-6, 1, 3],
[-3, 1, 2],
[0, 1, 4],
[3, 1, 2],
[6, 1, 4.5]
];

positions.forEach(([x, y, z], index) => {
    const cube = new THREE.Mesh(
        new THREE.BoxGeometry(3, 5, 3),
        new THREE.MeshStandardMaterial({ color: cubeColors[index] })
    );
    cube.position.set(x, y, z);
    scene.add(cube);
    cubes.push(cube);
});

const cones = [];
const coneColors = [0xff6b6b, 0xffc857, 0x4ecdc4, 0x5dade2, 0xa78bfa];

const conePositions = [
[-6, 4.6, 3],
[-3, 4.6, 2],
[0, 4.6, 4],
[3, 4.6, 2],
[6, 4.6, 4.5]
];

conePositions.forEach(([x, y, z], index) => {
    const cone = new THREE.Mesh(
        new THREE.ConeGeometry(2, 2.5, 20),
        new THREE.MeshStandardMaterial({ color: coneColors[index] })
    );
    cone.position.set(x, y, z);
    scene.add(cone);
    cones.push(cone);
});

//const sphere = new THREE.Mesh(
    //new THREE.SphereGeometry(1.5, 32, 32),
    //new THREE.MeshStandardMaterial({ color: 0xff4444 })
//);
//sphere.position.set(0, 1, -6);
//scene.add(sphere);

function resizeRenderer() {
    const width = Math.min(window.innerWidth * 0.9, 900);
    const height = 600;
    renderer.setSize(width, height);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    OCamera.left = -width / height * 10;
    OCamera.right = width / height * 10;
    OCamera.updateProjectionMatrix();
}

window.addEventListener("resize", resizeRenderer);
resizeRenderer();
renderer.render(scene, camera);

