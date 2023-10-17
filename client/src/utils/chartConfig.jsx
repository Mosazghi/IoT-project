import { parseISO } from "date-fns";
const chartConfig = (sensorData) => {
    const data = {
        labels: sensorData.map((data) => parseISO(data.timestamp, "yyyy-MM-dd HH:mm:ss")),
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
                    text: "Temperatur [°C]",
                },
            },
        },
        maintainAspectRatio: false,
        responsive: true,
    };
    return { data, options };
};
export default chartConfig;
