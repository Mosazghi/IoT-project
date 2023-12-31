import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import connectDB from "./config/db.config.js";
import errorHandler from "./middleware/errorHandler.js";
import userRouter from "./routes/user.route.js";
import getDailyData from "./utils/dailyData/getDailyData.js";
import getMqttDetails from "./utils/mqtt/mqttConnDetails.js";
import initRecieveQRCodes from "./utils/scannedQRCodesMqtt.js";
import initRecieveSensorData from "./utils/sensorData.js";

const PORT = 5000;
const app = express();

dotenv.config();
connectDB(process.env.DATABASE_URL);

// Initierer henting av data fra MQTT (og lagrer det i databasen)
initRecieveQRCodes();
initRecieveSensorData();

// Sender daglig data til clienten (pr 1 minutt)
setInterval(getDailyData, 1000 * 2);

// Request-logger
app.use((req, res, next) => {
    console.log(`HTTP Method - ${req.method}, URL - ${req.url}`);
    next();
});

// CORS - for å kunne sende requests fra clienten
app.use(cors());

// Nødvendig for å kunne parse JSON data
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(errorHandler);

// Ruter
app.use("/user", userRouter);
app.get("/mqttConnDetails", getMqttDetails);

app.listen(PORT, () => {
    console.log(`Server startet på port:  http://localhost:${PORT}`);
});

export default app;
