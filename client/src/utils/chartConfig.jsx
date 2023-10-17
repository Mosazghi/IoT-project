import { parseISO } from "date-fns";
const chartConfig = (sensorData) => {
    const data = {
        labels: sensorData.map((data) => parseISO(data.timestamp, "yyyy-MM-dd")),
        datasets: [
            {
                label: "Sensor Data",
                data: sensorData.map((data) => data.value),
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
                    unit: "day", // Adjust as needed (hour, day, etc.)
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
                    text: "Temperatur [°C]",
                },
                ticks: {
                    display: false, // Set display to false to hide the y-axis ticks
                },
            },
        },
        maintainAspectRatio: false,
        responsive: true,
    };
    return { data, options };
};
export default chartConfig;
