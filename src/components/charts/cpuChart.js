import React, { useContext } from 'react';
import DataContext from '../../context/dataContext';
import Chart from '../../components/chart';

const CpuChart = () => {
  const { metrics } = useContext(DataContext);

  // CPU METRICS FILTERED
  const cpuMetrics = metrics.filter(metric => metric.name === 'CPU Usage');

  // Filter out specific graph lines
  const filteredGraphLines = cpuMetrics.flatMap(metric => {
    return metric.graphLines.filter(line => {
      return line.name === 'Used' || line.name === 'Requested' || line.name === 'Limits';
    });
  });

  // Filter out specific graph lines
  const usedCpu = filteredGraphLines.filter(line => line.name === 'Used');
  const requestedCpu = filteredGraphLines.filter(line => line.name === 'Requested');
  const limitsCpu = filteredGraphLines.filter(line => line.name === 'Limits');

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",
        align: "start",
        labels: {
          color: "black",
          font: {
            weight: "bold",
            size: 13,
          },
          boxWidth: 15,
        },
      },
    },
    scales: {
      x: {
        position: "bottom",
        ticks: {
          font: {
            size: 11,
          },
          maxRotation: 0,
          minRotation: 0,
        },
      },
      y: {
        position: "right",
        ticks: {
          color: "black",
          font: {
            size: 13,
          },
          stepSize: 60,
          beginAtZero: true,
          values: [0, 50, 100, 150, 200],
        },
      },
    },
    onClick: function (_, element) {
      if (element.length > 0) {
        console.log(element[0]); 
      }
    },
  };

  const data = {
    labels: usedCpu.length > 0 ? usedCpu[0].values.map(value => new Date(value.timestamp).toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: false })) : [],
    datasets: [
      {
        label: "Used",
        data: usedCpu.length > 0 ? usedCpu[0].values.map(value => value.value) : [],
        borderColor: "rgba(220, 38, 38, 1)",
        backgroundColor: "rgba(220, 38, 38, 1)",
        pointRadius: 2,
        onclick: function (e) {
          console.log(e);
        },
        pointHoverRadius: 8,
        min: 0,
      },
      {
        label: "Requested",
        data: requestedCpu.length > 0 ? requestedCpu[0].values.map(value => value.value) : [],
        borderColor: "rgba(37, 99, 235, 1)",
        backgroundColor: "rgba(37, 99, 235, 1)",
        pointRadius: 2,
        pointHoverRadius: 8,
        min: 0,
      },
      {
        label: "Limits",
        data: limitsCpu.length > 0 ? limitsCpu[0].values.map(value => value.value) : [],
        borderColor: "rgba(5, 150, 105, 1)",
        backgroundColor: "rgba(5, 150, 105, 1)",
        pointRadius: 2,
        pointHoverRadius: 8,
        min: 0,
      },
    ],
  };
  return (
    <div className='border-2 rounded-2xl cpu-chart mt-5 px-4 py-4'>
      <h1 className='text-lg'>CPU Usage</h1>
      <Chart options={options} data={data} />
    </div>
  )
}

export default CpuChart