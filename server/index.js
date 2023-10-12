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

// NØDVENDIG FOR Å HENTE UT DATA FRA POST REQUESTS
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(errorHandler);

app.use("/user", userRouter);

// Sett opp statisk mappe (bilder, etc.)
app.use(express.static(path.join(__dirname, "..", "client/dist")));

app.listen(PORT, () => {
    console.log(`Server started on port  http://localhost:${PORT}`);
});

export default app;
