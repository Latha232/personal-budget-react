import React, { useEffect } from 'react';
import Chart from 'chart.js/auto';

function ChartComponent({ data, type }) {
  useEffect(() => {
    if (!data || !Array.isArray(data)) {
      return; // You can render some fallback content here if needed
    }

    const ctx = document.getElementById(`my${type.charAt(0).toUpperCase() + type.slice(1)}`); // Dynamically generate the canvas ID

    // Destroy previous chart if it exists
    Chart.getChart(ctx)?.destroy();

    if (type === 'pie') {
      new Chart(ctx, {
        type: 'pie',
        data: {
          labels: data.map(item => item.title),
          datasets: [{
            data: data.map(item => item.budget),
            backgroundColor: ['#ffcd56', '#ff6384', '#36a2eb', '#fd6b19'],
          }],
        },
      });
    }
    // Add other chart types here if needed

  }, [data, type]);

  return (
    <canvas id={`my${type.charAt(0).toUpperCase() + type.slice(1)}`} width="400" height="400"></canvas>
  );
}

export default ChartComponent;
