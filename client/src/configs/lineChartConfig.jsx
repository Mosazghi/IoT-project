// Konfigureringsfil for linjediagrammet
const lineChartConfig = (sensorData) => {
    const dataLine = {
        labels: sensorData.map((data) => data?.timestamp),
        datasets: [
            {
                label: "Sensor Data",
                data: sensorData.map((data) => data?.data.temperature),
                fill: false,
                borderColor: "rgb(75, 192, 192)",
                tension: 0.1,
            },
        ],
    };

    const optionsLine = {
        scales: {
            x: {
                type: "time",
                time: {
                    unit: "minute",
                },
            },
            y: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: "Forbruk i kWh",
                },
                ticks: {
                    display: true,
                },
            },
        },
        plugins: {
            title: {
                display: true,
                text: "Nåværende strømforbruk",
            },
        },
        maintainAspectRatio: false,
        responsive: true,
    };

    return { dataLine, optionsLine };
};

export default lineChartConfig;
