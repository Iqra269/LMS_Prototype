import { catchAsyncErrors } from "../middlewares/catchAsyncError.js";
import ErrorHandler from "../middlewares/error.js";
import { Application } from "../models/applicationSchema.js";
import { Course } from "../models/courseSchema.js";
import cloudinary from "cloudinary";
import { isAuthorized } from "../middlewares/auth.js";

 export const postApplication = catchAsyncErrors(async (req, res, next) => {
   const { role } = req.user;
   if (role === "Trainer") {
     return next(new ErrorHandler("Trainer not allowed to access this resource.", 400));
   }

//    Handle file upload logic
   if (!req.files || Object.keys(req.files).length === 0) {
     return next(new ErrorHandler("bForm File Required!", 400));
   }

   const { bform } = req.files;
   const allowedFormats = ["image/png", "image/jpeg", "image/webp", "image/jpg"];
   if (!allowedFormats.includes(bform.mimetype)) {
    return next(
             new ErrorHandler("Invalid file type. Please upload a PNG, JPEG. JPG or WEBP file.", 400)
     );
  }

   const cloudinaryResponse = await cloudinary.uploader.upload(
    bform.tempFilePath
    );

   if (!cloudinaryResponse || cloudinaryResponse.error) {
     console.error(
       "Cloudinary Error:",
       cloudinaryResponse.error || "Unknown Cloudinary error"
     );
     return next(new ErrorHandler("Failed to upload bForm to Cloudinary", 500));
   }
//   Extract courseId and other fields from the request body
  const {name, email, intro, phone, address, courseId} = req.body;
  const traineeID={
    user: req.user._id,
    role: "Trainee"
  }; 
  if (!courseId) {
     return next(new ErrorHandler("Course not found!", 404));
   }

// Find course details after successful file upload
  const courseDetails = await Course.findById(courseId);
   if (!courseDetails) {
     return next(new ErrorHandler("Course not found!", 404));
  }

  const trainerID = {
    user: courseDetails.postedBy,
    role: "Trainer",
   };

//   Validate required fields
   if (
     !name ||
     !email ||
     !intro ||
     !phone ||
     !address ||
     !traineeID ||
     !trainerID ||
     !bform
   ) 
   {
    return next(new ErrorHandler("Please fill all fields.", 400));
  }

//  Create application
  const application = await Application.create({
      name, 
      email, 
      intro, 
      phone,
      address,
      traineeID,
      trainerID,
      bform:{
        public_id: cloudinaryResponse.public_id,
        url: cloudinaryResponse.secure_url,
      }
  });

  res.status(200).json({
     success: true,
    message: "Application Submitted!", 
        application,
   });
 });

export const trainerGetAllApplications = catchAsyncErrors(async (req, res, next) => {
  const { role } = req.user;
  if (role === "Trainee") {
    return next(
      new ErrorHandler("Trainee not allowed to access this resource.", 400)
    );
  }
  const { _id } = req.user;
  const applications = await Application.find({ "trainerID.user": _id });
  res.status(200).json({
    success: true,
    applications,
  });
});

 export const traineeGetAllApplications = catchAsyncErrors(async (req, res, next) => {
   const { role } = req.user;
   if (role === "Trainer") {
    return next(
       new ErrorHandler("Trainer not allowed to access this resource.", 400)
     );
   }
   const { _id } = req.user;
   const applications = await Application.find({ "traineeID.user": _id });
   res.status(200).json({
     success: true,
     applications,
   });
 });

 export const traineeDeleteApplication = catchAsyncErrors(async (req, res, next) => {
   const { role } = req.user;
   if (role === "Trainer") {
    return next(
             new ErrorHandler("Trainer not allowed to access this resource.", 400)
     );
   }
  const { id } = req.params;
   const application = await Application.findById(id);
  if (!application) {
     return next(new ErrorHandler("Application not found!", 404));
   }
   await application.deleteOne();
   res.status(200).json({
     success: true,
     message: "Application Deleted!",
   });
 });
