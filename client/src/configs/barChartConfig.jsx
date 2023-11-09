// Konfigureringsfil for søylediagrammet
const barChartConfig = (statsData) => {
    const dataBar = {
        labels: statsData.map((data) => data.id),
        datasets: [
            {
                label: "Strømforbruk i kWh",
                data: statsData.map((data) => data.averageTemp),
                backgroundColor: "rgb(255, 99, 132)",
                font: {
                    size: 30,
                    weight: "bold",
                },
            },
            {
                label: "Antall ansatte",
                data: statsData.map((data) => data.totalScans),
                backgroundColor: "rgb(75, 192, 192)",
            },
        ],
    };
    const optionsBar = {
        scales: {
            x: {
                type: "time",
                time: {
                    unit: "day",
                },
            },
            y: {
                ticks: {
                    display: false,
                    font: {
                        size: 14, // Change this value to make the x-axis labels larger or smaller
                    },
                },
            },
        },
        plugins: {
            title: {
                display: true,
                text: "Daglig statistikk - sammenheng mellom ansatte og strømforbruk [kWh]",
                font: {
                    size: 22,
                    weight: "bold",
                },
            },
            datalabels: {
                align: "end",
                anchor: "end",
                font: {
                    size: 22,
                    weight: "bold",
                },
            },
        },
        maintainAspectRatio: false,
        responsive: true,
    };

    return { dataBar, optionsBar };
};

export default barChartConfig;
