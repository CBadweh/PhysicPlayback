// Chart.js setup
let positionData = [];
const ctx = document.getElementById('positionChart').getContext('2d');


// Initial position of the vertical line (as a percentage)
let verticalLinePosition = 50;

// Plugin to draw a vertical line and display intersection values
const verticalLinePlugin = {
    id: 'verticalLine',
    afterDraw: (chart) => {
        const ctx = chart.ctx;
        const xValue = Number(verticalLinePosition);
        const xPixel = chart.scales.x.getPixelForValue(xValue);
        console.log('xPixel: %d', xPixel);
        console.log('xValue: %d', xValue);

        // Draw the vertical line
        ctx.save();
        ctx.beginPath();
        ctx.moveTo(xPixel, chart.chartArea.top);
        ctx.lineTo(xPixel, chart.chartArea.bottom);
        ctx.lineWidth = 2;
        ctx.strokeStyle = 'red';
        ctx.stroke();
        ctx.restore();
        
        // Display the value on cursor intersection
        const yValue = positionChart.data.datasets[0].data[xValue*10]; // get the y value
        const yPixel = chart.scales.y.getPixelForValue(yValue);        // get the correct scale for displaying y value
        ctx.fillStyle = 'red';
        ctx.font = '15px Arial';
        ctx.fillText(`(${xValue}, ${yValue})`,xPixel + 5, yPixel -5 ); // Display x and y values on the cursor 

    }
};


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
        responsive: true,
        plugins: {
            verticalLine: {} // Activate the plugin
        },
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
    },
    plugins: [verticalLinePlugin]
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

function slider(val) {
    console.log('val: %d',val);
    verticalLinePosition = val;
    positionChart.update();
}



export {resetChart, updateChart,  positionChart, positionData, slider };