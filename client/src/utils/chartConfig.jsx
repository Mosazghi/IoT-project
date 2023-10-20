const chartConfig = (sensorData) => {
    const data = {
        labels: sensorData.map((data) => data?.timestamp),
        datasets: [
            {
                label: "Sensor Data",
                data: sensorData.map((data) => data.data.temperature),
                fill: false,
                borderColor: "rgb(75, 192, 192)",
                tension: 0.1,
            },
        ],
    };
    const options = {
        scales: {
            x: {
                type: "time",
                time: {
                    unit: "minute", // Adjust as needed (hour, day, etc.)
                },
                title: {
                    display: true,
                    text: "Tid [t]",
                },
            },
            y: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: "KWh",
                },
                ticks: {
                    display: true, // Set display to false to hide the y-axis ticks
                },
            },
        },
        maintainAspectRatio: false,
        responsive: true,
    };
    return { data, options };
};
export default chartConfig;
