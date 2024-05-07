import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../../main";

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const { isAuthorized } = useContext(Context);
  const navigateTo = useNavigate();

  useEffect(() => {
    try {
      axios.get("http://localhost:4000/api/v1/course/getall", { withCredentials: true })
        .then((response) => {
          setCourses(response.data); 
        });
    } catch (error) {
      console.log(error);
    }
  }, []);

  if (!isAuthorized) {
    navigateTo("/login");
  }

  return (
    <section className="courses page">
      <div className="container">
        <h1>ALL AVAILABLE COURSES</h1>
        <div className="banner">
          {courses.courses && (
            courses.courses.map((element) => (
              <div className="card" key={element._id}>
                <p>{element.title}</p>
                <p>{element.category}</p>
                <p>{element.country}</p>
                <Link to={`/course/${element._id}`}>Course Details</Link>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default Courses;
