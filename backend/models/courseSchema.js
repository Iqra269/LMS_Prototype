import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
    title:{
            type: String,
            required: [true, "Please provide a title."],
            minLength: [3, "Title must contain at least 3 Characters!"],
            maxLength: [30, "Title cannot exceed 30 Characters!"],
          },
          description: {
            type: String,
            required: [true, "Please provide decription."],
            minLength: [30, "Description must contain at least 30 Characters!"],
            maxLength: [500, "Description cannot exceed 500 Characters!"],
          },
          category: {
            type: String,
            required: [true, "Please provide a category."],
          },
          country: {
            type: String,
            required: [true, "Please provide your country name."],
          },
          city: {
            type: String,
            required: [true, "Please provide your city name."],
          },
          location: {
            type: String,
            required: [true, "Please provide location."],
            minLength: [20, "Location must contian at least 20 characters!"],
          },
          fixedFee: {
            type: Number,
            minLength: [4, "Fee must contain at least 4 digits"],
            maxLength: [5, "Fee cannot exceed 5 digits"],
          },
          feeFrom: {
            type: Number,
            minLength: [4, "Fee must contain at least 4 digits"],
            maxLength: [5, "Fee cannot exceed 5 digits"],
          },
          feeTo: {
            type: Number,
            minLength: [4, "Fee must contain at least 4 digits"],
            maxLength: [5, "Fee cannot exceed 5 digits"],
          },
          expired: {
            type: Boolean,
            default: false,
          },
          coursePostedOn: {
            type: Date,
            default: Date.now,
          },
          postedBy: {
            type: mongoose.Schema.ObjectId,
            ref: "User",
            required: true,
          },
        });
        
        export const Course = mongoose.model("Course", courseSchema);
