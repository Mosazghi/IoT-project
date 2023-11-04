import mongoose from "mongoose";

// Oppretter et skjema for sensorer som er skannet i databasen
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
