import Sensor from "../models/sensorModel.js";
import client from "./mqtt/mqttClient.js";

// Listen for new QR code scans
const initRecieveSensorData = () => {
    client.on("message", async (topic, message) => {
        if (topic === "sensor") {
            const { temperature, humidity, co2, pressure } = JSON.parse(message.toString()).data;
            const newScan = new Sensor({
                data: { temperature: temperature, humidity: humidity, co2: co2, pressure: pressure },
            });

            await newScan.save();
            console.log("New scan saved to database", newScan);
        }
    });
};

export default initRecieveSensorData;
