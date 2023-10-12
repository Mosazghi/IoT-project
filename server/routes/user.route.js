import express from "express";
import { handleLogin, handleRegister } from "../controllers/loginController.js";
const router = express.Router();

// Lager en route ("/user") for å håndtere logge inn og registrere brukere
router.post("/login", handleLogin);
router.post("/register", handleRegister);

export default router;
