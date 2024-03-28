import React, { useContext } from 'react';
import DataContext from '../../context/dataContext';
import AreaChart from '../../components/areaChart';

const DiskChart = () => {
  const { metrics } = useContext(DataContext);

  // Disk METRICS FILTERED
  const diskMetrics = metrics.filter(metric => metric.name === 'Disk IOPS');

  // Filter out specific graph lines
  const filteredGraphLines = diskMetrics.flatMap(metric => {
    return metric.graphLines.filter(line => {
      return line.name === 'Read' || line.name === 'Write'
    });
  });

  // Filter out specific graph lines
  const read = filteredGraphLines.filter(line => line.name === 'Read');
  const write = filteredGraphLines.filter(line => line.name === 'Write');

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
  };

  const data = {
    labels: read.length > 0 ? read[0].values.map(value => new Date(value.timestamp).toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: false })) : [],
    datasets: [
      {
        fill: true,
        label: "Read",
        data: read.length > 0 ? read[0].values.map(value => value.value) : [],
        borderColor: "rgba(53, 162, 235, 1)",
        backgroundColor: "rgba(219, 234, 254, 0.5)",
        pointRadius: 2,
        pointHoverRadius: 8,
      },
      {
        fill: true,
        label: "Write",
        data: write.length > 0 ? write[0].values.map(value => value.value) : [],
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
        pointRadius: 2,
        pointHoverRadius: 8,
      },
    ],
  };
  return (
    <div className='border-2 rounded-2xl cpu-chart mt-5 px-4 py-4'>
      <h1 className='text-lg'>Disk IOPS</h1>
      <AreaChart options={options} data={data} />
    </div>
  )
}

export default DiskChart