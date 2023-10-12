import express from "express";
import { handleLogin, logout, renderAdminDashboard } from "../controllers/authenticate/loginController.js";
import auth from "../middleware/auth.js";
const router = express.Router();

router.post("/login", handleLogin);

export default router;
