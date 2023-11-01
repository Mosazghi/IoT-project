import ScannedQRCode from "../models/scannedQRModel.js";
import client from "./mqtt/mqttClient.js";

// Listen for new QR code scans
const initRecieveQRCodes = () => {
    client.on("message", async (topic, message) => {
        if (topic === "qr") {
            const payload = JSON.parse(message.toString());
            const codeData = payload.codeData; // Assuming payload contains the QR code data
            const timestamp = payload.timestamp; // Assuming payload contains the QR code data
            
            const newScan = new ScannedQRCode({
                codeData: codeData,
                timestamp: timestamp,
            });

            await newScan.save();
            console.log("New scan saved to database", newScan);
        }
    });
};

export default initRecieveQRCodes;