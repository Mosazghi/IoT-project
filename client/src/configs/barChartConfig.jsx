// Konfigureringsfil for søylediagrammet
const barChartConfig = (statsData) => {
    const dataBar = {
        labels: statsData.map((data) => data.id),
        datasets: [
            {
                label: "kWh",
                data: statsData.map((data) => data.averageTemp),
                backgroundColor: "rgb(255, 99, 132)",
            },
            {
                label: "Antall scanninger",
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
                },
            },
        },
        plugins: {
            title: {
                display: true,
                text: "Daglig statistikk",
            },
            datalabels: {
                align: "end",
                anchor: "end",
                font: {
                    size: 14,
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
