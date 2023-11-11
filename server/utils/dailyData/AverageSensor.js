import Sensor from "../../models/sensorModel.js";

const getAverageSensorData = async () => {
    const averageTemperature = await Sensor.aggregate([
        {
            $group: {
                _id: { $dateToString: { format: "%Y-%m-%d", date: "$timestamp" } },
                averageTemp: { $avg: "$data.temperature" },
            },
        },
        {
            $project: {
                _id: 0,
                id: "$_id",
                averageTemp: 1,
            },
        },
    ]);
    
    // Runder av strømforbruk til 2 desimaler
    averageTemperature.forEach((temp) => {
        temp.averageTemp = Math.round(temp.averageTemp * 100) / 100;
    });
    
    return averageTemperature;
};

export default getAverageSensorData;
