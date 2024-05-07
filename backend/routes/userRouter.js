import express from "express";
import { getUser, logout, register } from "../controllers/userController.js";
import { login } from "../controllers/userController.js";
import { isAuthorized } from "../middlewares/auth.js"
import { varify } from "../controllers/userController.js";
const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/logout", isAuthorized, logout);
router.get("/getuser", isAuthorized, getUser);
router.get('/varify', varify)

export default router;
