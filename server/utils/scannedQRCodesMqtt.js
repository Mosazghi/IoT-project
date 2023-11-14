import ScannedQRCode from "../models/scannedQRModel.js";
import client from "./mqtt/mqttClient.js";

// "Lytte" på nye QR-code-data fra MQTT og lagre dem i databasen
const initRecieveQRCodes = () => {
    client.on("message", async (topic, message) => {
        if (topic === "qr") {
            const payload = JSON.parse(message.toString());
            const codeData = payload.codeData;
            const timestamp = payload.timestamp;

            const newScan = new ScannedQRCode({
                codeData: codeData,
                timestamp: timestamp,
            });

            await newScan.save();
        }
    });
};

export default initRecieveQRCodes;
