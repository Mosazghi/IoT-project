import client from "../mqtt/mqttClient.js";
import getAverageSensorData from "./AverageSensor.js";
import getTotalScannedQR from "./TotalScannedQR.js";

const getDailyData = async () => {
    try {
        const averageTemperature = await getAverageSensorData();
        const totalScans = await getTotalScannedQR();
        console.log("totalScans:", totalScans);
        const mergedResults = averageTemperature.map((temp) => {
            console.log("temp:", temp);
            const scans = totalScans.find((scan) => scan.id === temp.id);
            return {
                id: temp.id,
                averageEnergy: temp.averageEnergy,
                totalScans: scans ? scans.totalScans : 0,
            };
        });
        mergedResults.sort((a, b) => (a.id > b.id ? 1 : -1));

        const statsData = [
            { id: "2023-11-07", averageEnergy: 0.182, totalScans: 4 },
            { id: "2023-11-08", averageEnergy: 0.197, totalScans: 2 },
            { id: "2023-11-09", averageEnergy: 0.176, totalScans: 3 },
        ];
        client.publish("stats", JSON.stringify([...mergedResults, ...statsData]));
        console.log("Published metrics:", mergedResults);
    } catch (error) {
        console.error("Error publishing metrics:", error);
    }
};

export default getDailyData;
