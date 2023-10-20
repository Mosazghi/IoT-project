import mongoose from "mongoose";

const sensorSchema = new mongoose.Schema({
    data: {
        temperature: Number,
        humidity: Number,
        co2: Number,
        pressure: Number,
    },
    timestamp: {
        type: Date,
        default: () => new Date().toISOString().slice(0, 16),
    },
});

const Sensor = mongoose.model("Sensor", sensorSchema);

export default Sensor;
