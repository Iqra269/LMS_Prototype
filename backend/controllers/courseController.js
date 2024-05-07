import { catchAsyncErrors } from "../middlewares/catchAsyncError.js";
import ErrorHandler from '../middlewares/error.js';
import {Course} from '../models/courseSchema.js';

export const getAllCourses = catchAsyncErrors(async (req, res, next) => {
    const courses = await Course.find({ expired: false });
    res.status(200).json({
      success: true,
      courses,
    });
  });
  
export const postCourse = catchAsyncErrors(async (req, res, next) => {
    const { role } = req.user;
     if (role === "Trainee") {
       return next(
         new ErrorHandler("Trainees are not allowed to access this resource.", 400)
       );
     }
     const {
       title,
       description,
       category,
       country,
       city,
       location,
       fixedFee,
       feeFrom,
       feeTo,
     } = req.body;
  
    if (!title || !description || !category || !country || !city || !location) {
       return next(new ErrorHandler("Please provide full details.", 400));
     }
  
     if ((!feeFrom || !feeTo) && !fixedFee) {
       return next(
        new ErrorHandler(
           "Please either provide fixed fee or ranged fee.",
           400
        )
       );
     }
  
     if (feeFrom && feeTo && fixedFee) {
       return next(
         new ErrorHandler("Cannot Enter Fixed and Ranged Fee together.", 400)
       );
    }
     const postedBy = req.user._id;
     const course = await Course.create({
       title,
       description,
       category,
       country,
       city,
       location,
       fixedFee,
       feeFrom,
       feeTo,
       postedBy,
     });
     res.status(200).json({
      success: true,
       message: "Course Posted Successfully!",
       course,
     });
   });
  
   export const getMyCourses = catchAsyncErrors(async (req, res, next) => {
     const { role } = req.user;
     if (role === "Trainee") {
       return next(
         new ErrorHandler("Trainees are not allowed to access this resource.", 400)
       );
     }
     const myCourses = await Course.find({ postedBy: req.user._id });
     res.status(200).json({
       success: true,
       myCourses,
     });
  });
  
   export const updateCourse = catchAsyncErrors(async (req, res, next) => {
    const { role } = req.user;
    if (role === "Trainee") {
      return next(
        new ErrorHandler("Trainees are not allowed to access this resource.", 400)
      );
     }
     const { id } = req.params;
     let course = await Course.findById(id);
     if (!course) {
       return next(new ErrorHandler("OOPS! Course not found.", 404));
     }
     course = await Course.findByIdAndUpdate(id, req.body, {
       new: true,
       runValidators: true,
       useFindAndModify: false,
     });
     res.status(200).json({
       success: true,
       message: "Course Updated!",
     });
   });
  
   export const deleteCourse = catchAsyncErrors(async (req, res, next) => {
     const { role } = req.user;
     if (role === "Trainee") {
      return next(
        new ErrorHandler("Trainees are not allowed to access this resource.", 400)
      );
     }
     const { id } = req.params;
     const course = await Course.findById(id);
     if (!course) {
       return next(new ErrorHandler("OOPS! Course not found.", 404));
     }
     await course.deleteOne();
    res.status(200).json({
       success: true,
       message: "Course Deleted!",
     });
  });
  
  export const getSingleCourse = catchAsyncErrors(async (req, res, next) => {
    const { id } = req.params;
    try {
      const course = await Course.findById(id);
      if (!course) {
        return next(new ErrorHandler("Course not found.", 404));
      }
      res.status(200).json({
        success: true,
        course,
      });
    } catch (error) {
      return next(new ErrorHandler(`Invalid ID / CastError`, 404));
    }
  });