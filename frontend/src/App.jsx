import React, { useContext, useEffect } from "react";
import "./App.css";
import { Context } from "./main";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import axios from "axios";
import { Toaster } from "react-hot-toast";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import Navbar from "./components/Layout/Navbar";
import Footer from "./components/Layout/Footer";
import Home from "./components/Home/Home";
import Courses from "./components/Course/Courses";
import CourseDetails from "./components/Course/CourseDetails";
import Application from "./components/Application/Application";
import MyApplications from "./components/Application/MyApplications";
import PostCourse from "./components/Course/PostCourse";
import NotFound from "./components/NotFound/NotFound";
import MyCourses from "./components/Course/MyCourses";
import Activate from "./components/Auth/Activate";
const App = () => {
  const { isAuthorized, setIsAuthorized, setUser } = useContext(Context);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get("http://localhost:4000/api/v1/user/getuser", { withCredentials: true });
        setUser(response.data.user);
        setIsAuthorized(true);
      } catch (error) {
        setIsAuthorized(false);
      }
    };
 fetchUser();
  }, [isAuthorized]);

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/account-activation" element={<Activate />} />
        <Route path="/" element={<Home />} />
        <Route path="/course/getall" element={<Courses />} />
        <Route path="/course/:id" element={<CourseDetails />} />
        <Route path="/course/post" element={<PostCourse />} />
        <Route path="/course/me" element={<MyCourses />} />
        <Route path="/application/:id" element={<Application />} />
        <Route path="/applications/me" element={<MyApplications />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
      <Toaster />
    </Router>
  );
};

export default App;
