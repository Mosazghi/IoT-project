import express from "express";
import { handleLogin, handleRegister } from "../controllers/loginController.js";
const router = express.Router();

// En route ("/user") for å håndtere logging in og registrere brukere
router.post("/login", handleLogin);
router.post("/register", handleRegister);

export default router;
