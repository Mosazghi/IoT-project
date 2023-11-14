// Konfigureringsfil for søylediagrammet
const barChartConfig = (statsData) => {
    statsData = [
        { id: "2023-11-07", averageEnergy: 0.182, totalScans: 4 },
        { id: "2023-11-08", averageEnergy: 0.197, totalScans: 2 },
        { id: "2023-11-09", averageEnergy: 0.176, totalScans: 3 },
    ];
    const dataBar = {
        labels: statsData.map((data) => data.id),
        datasets: [
            {
                label: "Strømforbruk i kWh",
                data: statsData.map((data) => data.averageEnergy),
                backgroundColor: "rgb(255, 99, 132)",
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
                title: {
                    display: true,
                    text: "Dato",
                    font: { size: 22, weight: "bold" },
                },
                ticks: {
                    display: true,
                    font: {
                        size: 22,
                    },
                },
            },
            y: {
                ticks: {
                    display: false,
                    font: {
                        size: 23, // Change this value to make the x-axis labels larger or smaller
                    },
                },
            },
        },

        plugins: {
            legend: {
                labels: {
                    font: {
                        size: 22, // Increase font size as needed
                        family: "Helvetica", // Use your desired font family
                        weight: "bold",
                    },
                },
            },
            title: {
                display: true,
                text: "Daglig statistikk - sammenheng mellom ansatte og strømforbruk [kWh]",
                font: {
                    size: 27,
                    weight: "bold",
                },
            },
            datalabels: {
                align: "end",
                anchor: "end",
                font: {
                    size: 21,
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

    return { dataBar, optionsBar };
};

export default barChartConfig;
