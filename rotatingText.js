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
  const textGeometry = new THREE.TextGeometry("Kushify", {
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

  // Animation loop
  const animate = function () {
    requestAnimationFrame(animate);

    // Rotate the text
    textMesh.rotation.x += 0.01;
    textMesh.rotation.y += 0.01;

    renderer.render(scene, camera);
  };

  animate();
});
