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
                max: 20,
                min: -20,
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
    positionData = [];
    positionChart.data.labels = [];  // Clear time labels
    positionChart.data.datasets[0].data = positionData;  // Clear position data
    positionChart.update();  // Update the chart
}



export {resetChart, updateChart,  positionChart,positionData };