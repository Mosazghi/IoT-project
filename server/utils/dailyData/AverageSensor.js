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
    return averageTemperature;
};

export default getAverageSensorData;
