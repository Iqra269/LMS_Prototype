import express from "express";
import {deleteCourse, getAllCourses, getMyCourses, getSingleCourse, postCourse, updateCourse} from '../controllers/courseController.js';
import { isAuthorized } from "../middlewares/auth.js";

const router = express.Router();

router.get("/getall", getAllCourses);
router.post("/post", isAuthorized, postCourse);
router.get("/getmycourses", isAuthorized, getMyCourses);
router.put("/update/:id", isAuthorized, updateCourse);
router.delete("/delete/:id", isAuthorized, deleteCourse);
router.get("/:id", isAuthorized, getSingleCourse)

export default router;
