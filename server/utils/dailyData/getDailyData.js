import client from "../mqtt/mqttClient.js";
import getAverageSensorData from "./AverageSensor.js";
import getTotalScannedQR from "./TotalScannedQR.js";

/**
 * Sender statistikk data til klienten - gjennomsnitt av sensor-data og totalt antall scanninger
 */
const getDailyData = async () => {
    try {
        const averageTemperature = await getAverageSensorData();
        const totalScans = await getTotalScannedQR();

        const mergedResults = averageTemperature.map((temp) => {
            const scans = totalScans.find((scan) => scan.id === temp.id);
            return {
                id: temp.id,
                averageEnergy: temp.averageEnergy,
                totalScans: scans ? scans.totalScans : 0,
            };
        });

        // Sorter resultatene etter dato
        mergedResults.sort((a, b) => (a.id > b.id ? 1 : -1));

        client.publish("statistikk", JSON.stringify(mergedResults));
    } catch (error) {
        console.error("Error med å publisere data:", error);
    }
};

export default getDailyData;
