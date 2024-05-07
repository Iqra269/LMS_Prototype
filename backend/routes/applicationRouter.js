import express from "express";
import {
  trainerGetAllApplications,
  traineeDeleteApplication,
  traineeGetAllApplications,
   postApplication,
} from "../controllers/applicationController.js";
//import { isAuthenticated } from "../middlewares/auth.js";
import { isAuthorized } from "../middlewares/auth.js";

const router = express.Router();

//router.post("/post", isAuthorized, postApplication);
router.get("/trainer/getall", isAuthorized, trainerGetAllApplications);
router.get("/trainee/getall", isAuthorized, traineeGetAllApplications);
router.delete("/delete/:id", isAuthorized, traineeDeleteApplication);
router.post("/post", isAuthorized, postApplication);  

export default router;
