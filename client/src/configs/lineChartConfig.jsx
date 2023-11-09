// Konfigureringsfil for linjediagrammet
const lineChartConfig = (sensorData) => {
    const dataLine = {
        labels: sensorData.map((data) => data?.timestamp),
        datasets: [
            {
                label: "Strømforbruk i kWh ",
                data: sensorData.map((data) => data?.data.temperature),
                fill: false,
                borderColor: "rgb(75, 192, 192)",
                tension: 0.1,
                pointRadius: 10,
            },
        ],
    };

    const optionsLine = {
        scales: {
            x: {
                type: "time",
                time: {
                    unit: "day",
                },
                ticks: {
                    display: true,
                    font: {
                        size: 22,
                    },
                },
            },
            y: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: "kWh",
                    font: { size: 22, weight: "bold" },
                },
                ticks: {
                    display: true,
                    font: {
                        size: 20, // Change this value to make the x-axis labels larger or smaller
                    },
                },
            },
        },
        plugins: {
            datalabels: {
                display: false,
            },
            title: {
                display: true,
                text: "Nåværende strømforbruk [kWh]",
                font: {
                    size: 30,
                    weight: "bold",
                },
            },
            tooltip: {
                caretSize: 18,
                boxWidth: 18,
                titleFont: {
                    size: 18,
                    weight: "bold",
                },
                bodyFont: {
                    size: 18,
                    weight: "bold",
                },
            },
        },
        maintainAspectRatio: false,
        responsive: true,
    };

    return { dataLine, optionsLine };
};

export default lineChartConfig;
