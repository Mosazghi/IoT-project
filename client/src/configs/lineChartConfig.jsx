// Konfigureringsfil for linjediagrammet
const lineChartConfig = (sensorData) => {
    sensorData =   [
     {
         timestamp: "2023-11-07T08:00:00",
         data: {
             temperature: 0.067,
             humidity: 29.75,
             co2: 400.0,
             pressure: 26.75,
         },
     },
     {
         timestamp: "2023-11-07T09:00:00",
         data: {
             temperature: 0.083,
             humidity: 29.75,
             co2: 400.0,
             pressure: 26.75,
         },
     },
     {
         timestamp: "2023-11-07T10:00:00",
         data: {
             temperature: 0.075,
             humidity: 29.75,
             co2: 400.0,
             pressure: 26.75,
         },
     },
     // -------------------
     {
         timestamp: "2023-11-08T12:00:00",
         data: {
             temperature: 0.03,
             humidity: 29.75,
             co2: 400.0,
             pressure: 26.75,
         },
     },
     {
         timestamp: "2023-11-08T13:00:00",
         data: {
             temperature: 0.088,
             humidity: 29.75,
             co2: 400.0,
             pressure: 26.75,
         },
     },
     {
         timestamp: "2023-11-08T14:00:00",
         data: {
             temperature: 0.054,
             humidity: 29.75,
             co2: 400.0,
             pressure: 26.75,
         },
     },
     // -------------------
     {
         timestamp: "2023-11-09T10:00:00",
         data: {
             temperature: 0.02,
             humidity: 29.75,
             co2: 400.0,
             pressure: 26.75,
         },
     },
     {
         timestamp: "2023-11-09T11:00:00",
         data: {
             temperature: 0.09,
             humidity: 29.75,
             co2: 400.0,
             pressure: 26.75,
         },
     },
     {
         timestamp: "2023-11-09T12:00:00",
         data: {
             temperature: 0.049,
             humidity: 29.75,
             co2: 400.0,
             pressure: 26.75,
         },
     },
 ];

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
                title: {
                    display: true,
                    text: "Tid",
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
            legend: {
                labels: {
                    font: {
                        size: 20, // Increase font size as needed
                        family: "Helvetica", // Use your desired font family
                        weight: "bold",
                    },
                },
            },
            datalabels: {
                display: false,
            },
            title: {
                display: true,
                text: "Sanntidsmåling av strømforbruk [kWh]",
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
