import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Context } from "../../main";

const CourseDetails = () => {
  const { id } = useParams();
  const [course, setCourse] = useState({});
  const navigateTo = useNavigate();

  const { isAuthorized, user } = useContext(Context);

  useEffect(() => {
    axios.get(`http://localhost:4000/api/v1/course/${id}`, {
        withCredentials: true,
      })
      .then((res) => {
        setCourse(res.data.course);
      })
      .catch((error) => {
        console.log(error.respons.data.message);
        navigateTo("/notfound");
      });
  }, []);

  if (!isAuthorized) {
    navigateTo("/login");
  }

  return (
    <section className="courseDetail page">
      <div className="container">
        <h3>Course Details</h3>
        <div className="banner">
          <p>
            Title: <span> {course.title}</span>
          </p>
          <p>
            Category: <span>{course.category}</span>
          </p>
          <p>
            Country: <span>{course.country}</span>
          </p>
          <p>
            City: <span>{course.city}</span>
          </p>
          <p>
            Location: <span>{course.location}</span>
          </p>
          <p>
            Description: <span>{course.description}</span>
          </p>
          <p>
            Course Posted On: <span>{course.coursePostedOn}</span>
          </p>
          <p>
            Fee:{" "}
            {course.fixedFee ? (
              <span>{course.fixedFee}</span>
            ) : (
              <span>
                {course.feeFrom} - {course.feeTo}
              </span>
            )}
          </p>
          {user && user.role === "Trainer" ? (
            <></>
          ) : (
            <Link to={`/application/${course._id}`}>Enroll Now</Link>
          )}
        </div>
      </div>
    </section>
  );
};

export default CourseDetails;
