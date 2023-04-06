// Set up the scene, camera, and renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Load the font and create the text geometry
const fontLoader = new THREE.FontLoader();

fontLoader.load("https://unpkg.com/three@0.128.0/examples/fonts/helvetiker_regular.typeface.json", function (
  font
) {
  const textGeometry = new THREE.TextGeometry("yourethemannowdog", {
    font: font,
    size: 1,
    height: 0.1,
    curveSegments: 12,
    bevelEnabled: true,
    bevelThickness: 0.01,
    bevelSize: 0.02,
    bevelOffset: 0,
    bevelSegments: 5,
  });

  // Create the text material
  const textMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 });

  // Create the text mesh and add it to the scene
  const textMesh = new THREE.Mesh(textGeometry, textMaterial);
  scene.add(textMesh);

  // Set the camera position
  camera.position.z = 5;

  // Add touch event listeners
  let dragging = false;
  let lastTouchX = 0;
  let lastTouchY = 0;

  document.addEventListener("touchstart", (e) => {
    e.preventDefault();
    dragging = true;
    lastTouchX = e.touches[0].clientX;
    lastTouchY = e.touches[0].clientY;
  });

  document.addEventListener("touchmove", (e) => {
    if (dragging) {
      const deltaX = e.touches[0].clientX - lastTouchX;
      const deltaY = e.touches[0].clientY - lastTouchY;
      lastTouchX = e.touches[0].clientX;
      lastTouchY = e.touches[0].clientY;

      textMesh.rotation.x += deltaY * 0.01;
      textMesh.rotation.y += deltaX * 0.01;
    }
  });

  document.addEventListener("touchend", () => {
    dragging = false;
  });

  // Animation loop
  const animate = function () {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
  };

  animate();
});
