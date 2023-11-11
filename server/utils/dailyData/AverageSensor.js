import Sensor from "../../models/sensorModel.js";

const getAverageSensorData = async () => {
    const averageTemperature = await Sensor.aggregate([
        {
            $group: {
                _id: { $dateToString: { format: "%Y-%m-%d", date: "$timestamp" } },
                averageEnergy: { $avg: "$data.temperature" },
            },
        },
        {
            $project: {
                _id: 0,
                id: "$_id",
                averageEnergy: 1,
            },
        },
    ]);

    // Runder av strømforbruk til 2 desimaler
    averageTemperature.forEach((temp) => {
        temp.averageEnergy = Number(temp.averageEnergy * 0.002).toFixed(3);
    });

    return averageTemperature;
};

export default getAverageSensorData;
