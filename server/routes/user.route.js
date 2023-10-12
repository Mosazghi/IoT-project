import express from "express";
import { handleLogin, handleRegister } from "../controllers/authenticate/loginController.js";
import auth from "../middleware/auth.js";
const router = express.Router();

router.post("/login", handleLogin);
router.post("/register", handleRegister);

export default router;
