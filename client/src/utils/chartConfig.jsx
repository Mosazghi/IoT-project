import { parseISO } from "date-fns";
const chartConfig = (sensorData) => {
    console.log(sensorData[0]?.timestamp);
    const data = {
        labels: sensorData.map((data) => data?.timestamp),
        datasets: [
            {
                label: "Sensor Data",
                data: sensorData.map((data) => data?.values.Temperature / 500),
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
                    unit: "second", // Adjust as needed (hour, day, etc.)
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
