import React, { useContext } from 'react';
import DataContext from '../../context/dataContext';
import Chart from '../../components/chart';

const NetworkChart = () => {
    const { metrics } = useContext(DataContext);

    // NETWORK METRICS FILTERED
    const networkMetrics = metrics.filter(metric => metric.name === 'Network Usage');

    // Filter out specific graph lines
    const filteredGraphLines = networkMetrics.flatMap(metric => {
        return metric.graphLines.filter(line => {
            return line.name === 'Used' || line.name === 'Requested' || line.name === 'Limits';
        });
    });

    // Filter out specific graph lines
    const usedNetwork = filteredGraphLines.filter(line => line.name === 'Used');
    const requestedNetwork = filteredGraphLines.filter(line => line.name === 'Requested');
    const limitsNetwork = filteredGraphLines.filter(line => line.name === 'Limits');

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
        labels: usedNetwork.length > 0 ? usedNetwork[0].values.map(value => new Date(value.timestamp).toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: false })) : [],
        datasets: [
            {
                label: "Used",
                data: usedNetwork.length > 0 ? usedNetwork[0].values.map(value => value.value) : [],
                borderColor: "rgba(220, 38, 38, 1)",
                backgroundColor: "rgba(220, 38, 38, 1)",
                pointRadius: 2,
                pointHoverRadius: 8,
                min: 0,
            },
            {
                label: "Requested",
                data: requestedNetwork.length > 0 ? requestedNetwork[0].values.map(value => value.value) : [],
                borderColor: "rgba(37, 99, 235, 1)",
                backgroundColor: "rgba(37, 99, 235, 1)",
                pointRadius: 2,
                pointHoverRadius: 8,
                min: 0,
            },
            {
                label: "Limits",
                data: limitsNetwork.length > 0 ? limitsNetwork[0].values.map(value => value.value) : [],
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
            <h1 className='text-lg'>Network Usage</h1>
            <Chart options={options} data={data} />
        </div>
    )
}

export default NetworkChart