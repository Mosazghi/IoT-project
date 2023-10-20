import client from "../mqtt/mqttClient.js";
import getAverageSensorData from "./AverageSensor.js";
import getTotalScannedQR from "./TotalScannedQR.js";

const getDailyData = async () => {
    const averageTemperature = await getAverageSensorData();
    const totalScans = await getTotalScannedQR();

    const metrics = {
        averageTemperature,
        totalScans,
    };

    client.publish("stats", JSON.stringify(metrics));
    console.log("Daily data sent to MQTT broker", metrics);
};

export default getDailyData;
