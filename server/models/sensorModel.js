import mongoose from "mongoose";

const sensorSchema = new mongoose.Schema({
    name: String,
    description: String,
    location: String,
    type: String,
    value: Number,
    timestamp: Date,
});

const Sensor = mongoose.model("Sensor", sensorSchema);

export default Sensor;