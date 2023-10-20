import Sensor from "../../models/sensorModel.js";

const getAverageSensorData = async () => {
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Set time to midnight
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  const averageTemperature = await Sensor.aggregate([
    {
      $match: {
        timestamp: { $gte: today, $lt: tomorrow }
      }
    },
    {
      $group: {
        _id: null,
        averageTemperature: { $avg: '$data.temperature' }
      }
    }
  ]);

  return averageTemperature[0]?.averageTemperature || null;
};

export default getAverageSensorData;
