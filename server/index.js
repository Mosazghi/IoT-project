import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import connectDB from "./config/db.config.js";
import errorHandler from "./middleware/errorHandler.js";
import userRouter from "./routes/user.route.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = 5000;
const app = express();

dotenv.config();
connectDB(process.env.DATABASE_URL);
app.use(cors());

//LOGGER
app.use((req, res, next) => {
    console.log(`HTTP Method - ${req.method}, URL - ${req.url}`);
    next();
});

app.use(express.json());

app.use(express.urlencoded({ extended: false }));
app.use(errorHandler);
app.use("/user", userRouter);

app.get("/api", (req, res) => {
    res.json({ message: "IOT PROSJEKT" });
});

app.get("/test", (req, res) => {
    res.json({ message: "TESTSSSS" });
});

app.post("/qr", (req, res) => {
    console.log("QR CODE!!", req.body);
    res.json({ message: "LETS GOO" });
});

// Sett opp statisk mappe (bilder, etc.)
app.use(express.static(path.join(__dirname, "..", "client/dist")));

// For alle andre requests: send index.html som vil laste opp React applikasjonen
// app.get("*", (req, res) => {
//     res.sendFile(path.join(__dirname, "..", "client/dist/index.html"));
// });

app.listen(PORT, () => {
    console.log(`Server started on port  http://localhost:${PORT}`);
});

export default app;
