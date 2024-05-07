import { catchAsyncErrors } from "../middlewares/catchAsyncError.js";
import { User } from "../models/userSchema.js";
import ErrorHandler from "../middlewares/error.js";
import { sendToken } from "../utils/jwtToken.js";
import nodemailer from 'nodemailer'
const transporter = nodemailer.createTransport({
  service: 'gmail', // Use `true` for port 465, `false` for all other ports
  auth: {
    user: "lawtalks24@gmail.com",
    pass: "gjfq takh oumd fdvo",
  },
});
export const register = catchAsyncErrors(async (req, res, next) => {
  const { name, email, phone, password, role } = req.body;

  console.log("Received registration request with:", { name, email, phone, role });

  if (!name || !email || !phone || !password || !role) {
    next(new ErrorHandler("Please fill full form!"));
  }

  const isEmail = await User.findOne({ email });

  console.log("Found existing user with email:", isEmail);
  
  if (isEmail) {
    next(new ErrorHandler("Email already registered!"));
  }
  
  const activationLink  = `http://localhost:4000/api/v1/user/varify?email=${email}`;
  const sendEmail = await transporter.sendMail({
   from: '"admin 👻" <lawtalks24@gmail.com>', // sender address
   to: email, // list of receivers
   subject: "Account Activation ", // Subject line
   html: `<b>Please Activate your account by clicking the link below</b><p>${activationLink}`, // html body
 });
  const user = await User.create({
    name,
    email,
    phone,
    password,
    role,
  });

  console.log("User created successfully:", user);
  //sending confirmation email -- 

  sendToken(user, 200, res, "User Registered Successfully");
});

export const varify = catchAsyncErrors(async (req,res,next) => {
  const { email } = req.query;

  if (!email) {
    return next(new ErrorHandler('Email parameter is missing.', 400));
  }
    // Find the user by email
    const user = await User.findOne({ email });

    if (!user) {
      return next(new ErrorHandler('User not found with the provided email.', 404));
    }

    // Update the isActive field to true
    user.isActive = true;
    await user.save();

    console.log('User activated successfully:', user);

    // Redirect or send a response indicating successful activation
    res.status(200).json({
      success: true,
      message: 'Account activated successfully.',
    });
 
})
export const login = catchAsyncErrors(async (req, res, next) => {
  const { email, password, role } = req.body;

  console.log("Received login request with:", { email, password, role });

  if (!email || !password || !role) {
    next(new ErrorHandler("Invalid credentials", 400));
  }

  try {
    const user = await User.findOne({ email }).select("+password");

    console.log("Found user:", user);

    if (!user) {
      next(new ErrorHandler("Invalid Email Or Password.", 400));
    }

    const isPasswordMatched = await user.comparePassword(password);

    console.log("Password comparison result:", isPasswordMatched);

    if (!isPasswordMatched) {
      next(new ErrorHandler("Invalid Email Or Password.", 400));
    }

    if (user.role !== role) {
      next(new ErrorHandler(`User with provided email and ${role} not found!`, 404));
    }

    sendToken(user, 201, res, "User Logged In!");
  } catch (error) {
    console.error("Error during login:", error);
    next(error);
  }
});

export const logout = catchAsyncErrors(async (req, res, next) => {
  console.log("User logged out");

  res
    .status(201)
    .cookie("token", "", {
      httpOnly: true,
      expires: new Date(Date.now()),
    })
    .json({
      success: true,
      message: "Logged Out Successfully.",
    });
});

export const getUser = catchAsyncErrors((req, res, next) => {
  const user = req.user;
  console.log("Retrieved user:", user);

  res.status(200).json({
    success: true,
    user,
  });
});
