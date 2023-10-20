import mongoose from "mongoose";

const scannedQRCodeSchema = new mongoose.Schema({
    codeData: {
        type: String,
    },
    timestamp: {
        type: Date,
        default: () => new Date().toISOString().slice(0, 16),
    },
});

const ScannedQRCode = mongoose.model("ScannedQRCode", scannedQRCodeSchema);

export default ScannedQRCode;
