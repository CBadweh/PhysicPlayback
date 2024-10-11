
/*
// Create the scene, camera, and renderer
let scene = new THREE.Scene();
let camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
let renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Create the box geometry
let geometry = new THREE.BoxGeometry(1, 1, 1);
let material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
let box = new THREE.Mesh(geometry, material);
scene.add(box);

// Position the camera
camera.position.z = 20;

// Control variables
let params = {
    initialPosition: 0,
    initialVelocity: 1,
    play: function() { playing = true; },
    stop: function() { playing = false; },
    reset: function() {
        // Reset the animation to the initial values
        time = 0;
        simulationTime = 0;
        box.position.x = initialPosition;
        params.playback = 0;
        playing = false;
        resetChart();
    },
    playback: 0
};

let initialPosition = params.initialPosition;
let initialVelocity = params.initialVelocity;
let time = 0;
let playing = false;
let simulationTime = 0;

// Create a dat.GUI interface
let gui = new dat.GUI();
gui.add(params, 'initialPosition', -5, 5).name('Initial Position').onChange(value => {
    initialPosition = value;
    if (!playing) {
        box.position.x = value;
        time = 0;
        simulationTime = 0;
    }
});
gui.add(params, 'initialVelocity', -5, 5).name('Initial Velocity').onChange(value => {
    initialVelocity = value;
});
gui.add(params, 'play').name('Play');
gui.add(params, 'stop').name('Stop');
gui.add(params, 'reset').name('Reset');
gui.add(params, 'playback', 0, 10).name('Playback').listen().onChange(value => {
    if (!playing) {
        box.position.x = initialPosition + initialVelocity * value;
        simulationTime = value;
    }
});

// Chart.js setup
const ctx = document.getElementById('positionChart').getContext('2d');
let positionChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: [], // Time values
        datasets: [{
            label: 'Position',
            data: [], // Position values
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 2,
            fill: false
        }]
    },
    options: {
        scales: {
            x: {
                type: 'linear',
                title: {
                    display: true,
                    text: 'Time (s)'
                }
            },
            y: {
                title: {
                    display: true,
                    text: 'Position (m)'
                }
            }
        }
    }
});

// Function to update the chart with the current time and position
function updateChart(time, position) {
    positionChart.data.labels.push(time.toFixed(2));  // Add time to labels
    positionChart.data.datasets[0].data.push(position.toFixed(2));  // Add position to data
    positionChart.update();  // Update the chart
}

// Function to reset the chart when simulation is reset
function resetChart() {
    positionChart.data.labels = [];  // Clear time labels
    positionChart.data.datasets[0].data = [];  // Clear position data
    positionChart.update();  // Update the chart
}

// Update function
function animate() {
    requestAnimationFrame(animate);

    if (playing) {
        time += 0.01;
        let currentPosition = initialPosition + initialVelocity * time;
        box.position.x = currentPosition;
        params.playback = time;
        updateChart(time, currentPosition);  // Update chart
    }

    renderer.render(scene, camera);
}

animate();
*/

// import {pi} from "./functionHelper.js"
import {pi,pi2} from './functionHelper.js';

// Create the scene, camera, and renderer
let scene = new THREE.Scene();
let camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
let renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Create the box geometry
let geometry = new THREE.BoxGeometry(1, 1, 1);
let material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
let box = new THREE.Mesh(geometry, material);
scene.add(box);


// Position the camera
camera.position.z = 40;

// Control variables
let params = {
    initialPosition: -39,
    initialVelocity: 1,
    play: function() { playing = true; },
    stop: function() { 
        playing = false; 
        console.log(box.position.x, parseFloat(positionData[positionData.length-1]));
        console.log(positionData.length)
    },
    reset: function() {
        // Reset the animation to the initial values
        time = 0;
        simulationTime = 0;
        box.position.x = initialPosition;
        params.playback = 0;
        playing = false;
        positionData = [];
        resetChart();
    },
    playback: 0
};

let initialPosition = params.initialPosition;
let initialVelocity = params.initialVelocity;
let time = 0;
let playing = false;
let simulationTime = 0;

// Create a dat.GUI interface
let gui = new dat.GUI();
gui.add(params, 'initialPosition', -40, 40).name('Initial Position').onChange(value => {
    initialPosition = value;
    if (!playing) {
        box.position.x = value;
        time = 0;
        simulationTime = 0;
    }
});
gui.add(params, 'initialVelocity', -5, 5).name('Initial Velocity').onChange(value => {
    initialVelocity = value;
});
gui.add(params, 'play').name('Play');
gui.add(params, 'stop').name('Stop');
gui.add(params, 'reset').name('Reset');
gui.add(params, 'playback', 0, 100, 1).name('Playback').listen().onChange(value => {
    if (!playing) {
        box.position.x = positionData[value];
        simulationTime = value;
    }
});

// Chart.js setup
let positionData = [];
const ctx = document.getElementById('positionChart').getContext('2d');
let positionChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: [], // Time values
        datasets: [{
            label: 'Position',
            data: positionData, // Position values
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 2,
            fill: false
        }]
    },
    options: {
        scales: {
            x: {
                type: 'linear',
                title: {
                    display: true,
                    text: 'Time (s)'
                }
            },
            y: {
                title: {
                    display: true,
                    text: 'Position (m)'
                }
            }
        }
    }
});

// Function to update the chart with the current time and position
function updateChart(time, position) {
    positionChart.data.labels.push(time.toFixed(2));  // Add time to labels
    positionData.push(position.toFixed(2));  // Add position to data
    positionChart.update();  // Update the chart
}

// Function to reset the chart when simulation is reset
function resetChart() {
    positionChart.data.labels = [];  // Clear time labels
    positionChart.data.datasets[0].data = positionData;  // Clear position data
    positionChart.update();  // Update the chart
}

// Update function
function animate() {
    requestAnimationFrame(animate);

    if (playing) {
        time += 1;
        let currentPosition = initialPosition + initialVelocity * time;
        box.position.x = currentPosition;
        params.playback = time;
        updateChart(time, currentPosition);  // Update chart
    }

    renderer.render(scene, camera);
}

animate();