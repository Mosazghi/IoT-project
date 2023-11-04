import Sensor from "../models/sensorModel.js";
import client from "./mqtt/mqttClient.js";

// "Lytte" på nye sensor-data fra MQTT og lagre dem i databasen
const initRecieveSensorData = () => {
    client.on("message", async (topic, message) => {
        if (topic === "sensor") {
            const { data, timestamp } = JSON.parse(message.toString());
            const newScan = new Sensor({
                data: {
                    temperature: data.temperature,
                    humidity: data.humidity,
                    co2: data.co2,
                    pressure: data.pressure,
                },
                timestamp: timestamp,
            });

            await newScan.save();
            console.log("New scan saved to database", newScan);
        }
    });
};

export default initRecieveSensorData;
