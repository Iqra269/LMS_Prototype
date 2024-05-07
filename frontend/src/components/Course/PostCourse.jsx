import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Context } from "../../main";

const PostCourse = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [location, setLocation] = useState("");
  const [feeFrom, setFeeFrom] = useState("");
  const [feeTo, setFeeTo] = useState("");
  const [fixedFee, setFixedFee] = useState("");
  const [feeType, setFeeType] = useState("default");

  const { isAuthorized, user } = useContext(Context);

  const handleCoursePost = async (e) => {
    e.preventDefault();
    if (feeType === "Fixed Fee") {
      setFeeFrom("");
      setFeeFrom("");
    } else if (feeType === "Ranged Fee") {
      setFixedFee("");
    } else {
      setFeeFrom("");
      setFeeTo("");
      setFixedFee("");
    }
    await axios.post(
        "http://localhost:4000/api/v1/course/post",
        fixedFee.length >= 4
          ? {
              title,
              description,
              category,
              country,
              city,
              location,
              fixedFee,
            }
          : {
              title,
              description,
              category,
              country,
              city,
              location,
              feeFrom,
              feeTo,
            },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        toast.success(res.data.message);
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  };

  const navigateTo = useNavigate();
  if (!isAuthorized || (user && user.role !== "Trainer")) {
    navigateTo("/");
  }

  return (
    <>
      <div className="course_post page">
        <div className="container">
          <h3>POST NEW COURSE</h3>
          <form onSubmit={handleCoursePost}>
            <div className="wrapper">
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Course Title"
              />
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="">Select Category</option>
                <option value="Graphics & Design">Graphics & Design</option>
                <option value="Mobile App Development">
                  Mobile App Development
                </option>
                <option value="Frontend Web Development">
                  Frontend Web Development
                </option>
                <option value="MERN Stack Development">
                  MERN STACK Development
                </option>
                <option value="Account & Finance">Account & Finance</option>
                <option value="Artificial Intelligence">
                  Artificial Intelligence
                </option>
                <option value="Video Animation">Video Animation</option>
                <option value="MEAN Stack Development">
                  MEAN STACK Development
                </option>
                <option value="MEVN Stack Development">
                  MEVN STACK Development
                </option>
                <option value="Data Entry Operator">Data Entry Operator</option>
              </select>
            </div>
            <div className="wrapper">
              <input
                type="text"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                placeholder="Country"
              />
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="City"
              />
            </div>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Location"
            />
            <div className="fee_wrapper">
              <select
                value={feeType}
                onChange={(e) => setFeeType(e.target.value)}
              >
                <option value="default">Select Fee Type</option>
                <option value="Fixed Fee">Fixed Fee</option>
                <option value="Ranged Fee">Ranged Fee</option>
              </select>
              <div>
                {feeType === "default" ? (
                  <p>Please provide Fee Type *</p>
                ) : feeType === "Fixed Fee" ? (
                  <input
                    type="number"
                    placeholder="Enter Fixed Fee"
                    value={fixedFee}
                    onChange={(e) => setFixedFee(e.target.value)}
                  />
                ) : (
                  <div className="ranged_fee">
                    <input
                      type="number"
                      placeholder="Fee From"
                      value={feeFrom}
                      onChange={(e) => setFeeFrom(e.target.value)}
                    />
                    <input
                      type="number"
                      placeholder="Fee To"
                      value={feeTo}
                      onChange={(e) => setFeeTo(e.target.value)}
                    />
                  </div>
                )}
              </div>
            </div>
            <textarea
             rows="10"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Course Description"
            />
            <button type="submit">Create Course</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default PostCourse;
