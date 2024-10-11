// Basic setup for scene, camera, and renderer
let scene = new THREE.Scene();
let camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
let renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Add a simple object (cube) to animate
let geometry = new THREE.BoxGeometry();
let material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
let cube = new THREE.Mesh(geometry, material);
scene.add(cube);

camera.position.z = 5;

// Variables for animation
let animationDuration = 5000; // in milliseconds
let startTime = Date.now();
let isAnimating = true;

// Slider control
let slider = document.getElementById('slider');

// Function to update cube animation based on time or slider
function animate() {
  let currentTime = Date.now();
  let elapsedTime = currentTime - startTime;
  
  // If the slider is manually adjusted, pause animation
  if (!isAnimating) {
    elapsedTime = (slider.value / 100) * animationDuration;
  }

  // Calculate progress (from 0 to 1) based on elapsed time or slider position
  let progress = elapsedTime / animationDuration;

  // Reset if the animation exceeds duration
  if (progress >= 1) {
    startTime = Date.now();
    progress = 0;
  }

  // Apply progress to cube's rotation
  cube.rotation.x = progress * Math.PI * 2;
//   cube.rotation.y = progress * Math.PI * 2;

  renderer.render(scene, camera);
  
  // Continue the animation loop if not paused
  if (isAnimating) {
    requestAnimationFrame(animate);
  }
}

// Listen to slider changes
slider.addEventListener('input', () => {
  isAnimating = false; // Pause the animation when the slider is adjusted
  let sliderProgress = slider.value / 100;
  cube.rotation.x = sliderProgress * Math.PI * 2;
//   cube.rotation.y = sliderProgress * Math.PI * 2;
  renderer.render(scene, camera); // Render the new position
});

// Start the animation loop
animate();
