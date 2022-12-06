const loader = new THREE.TextureLoader();
const scene = createScene();
const camera = createCamera();
const renderer = createRenderer();
const grass = createGrassMaterial();
const geometry = createCubeGeometry();
const cube = createCube(geometry, grass);

function createScene() {
  const scene = new THREE.Scene();
  return scene;
}

function createCamera() {
  const fov = 75;
  const camera = new THREE.PerspectiveCamera(fov, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.z = 5;
  return camera;
}

function createRenderer() {
  const renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);
  return renderer;
}

function createGrassMaterial() {
  const grassBottom = new THREE.MeshBasicMaterial({ map: loader.load('texture/grass_bottom.jpg') });
  const grassSide = new THREE.MeshBasicMaterial({ map: loader.load('texture/grass_side.jpg') });
  const grassTop = new THREE.MeshBasicMaterial({ map: loader.load('texture/grass_top.jpg') });

  return [
    grassSide, // right side
    grassSide, // left side
    grassTop, // top side
    grassBottom, // bottom side
    grassSide, // front side
    grassSide, // back side
  ];
}

function createCubeGeometry() {
  const cubeSize = 1;
  const geometry = new THREE.BoxGeometry(cubeSize, cubeSize, cubeSize);
  return geometry;
}

function createCube(geometry, material) {
  const cube = new THREE.Mesh(geometry, material);
  return cube;
}

function rotateCube(cube) {
  cube.rotation.z += 0.01;
  cube.rotation.x += 0.01;
}

function buildScene() {
  scene.add(cube);
}

function updateScene() {
  rotateCube(cube);
}

function animate() {
  requestAnimationFrame(animate);
  updateScene();
  renderer.render(scene, camera);
}

buildScene();
animate();
