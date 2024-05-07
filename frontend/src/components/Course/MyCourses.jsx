import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaCheck } from "react-icons/fa6";
import { RxCross2 } from "react-icons/rx";
import { Context } from "../../main";
import { useNavigate } from "react-router-dom";

const MyCourses = () => {
  const [myCourses, setMyCourses] = useState([]);
  const [editingMode, setEditingMode] = useState(null);
  const { isAuthorized, user } = useContext(Context);

  const navigateTo = useNavigate();
  //Fetching all courses
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:4000/api/v1/course/getmycourses",
          { withCredentials: true }
        );
        setMyCourses(data.myCourses);
      } catch (error) {
        toast.error(error.response.data.message);
        setMyCourses([]);
      }
    };
    fetchCourses();
  }, []);
  if (!isAuthorized || (user && user.role !== "Trainer")) {
    navigateTo("/");
  }

  //Function For Enabling Editing Mode
  const handleEnableEdit = (courseId) => {
    //Enable only that course whose ID has been send.
    setEditingMode(courseId);
  };

  //Function For Disabling Editing Mode
  const handleDisableEdit = () => {
    setEditingMode(null);
  };

  //Function For Updating The Course
  const handleUpdateCourse = async (courseId) => {
    const updatedCourse = myCourses.find((course) => course._id === courseId);
    await axios
      .put(`http://localhost:4000/api/v1/course/update/${courseId}`, updatedCourse, {
        withCredentials: true,
      })
      .then((res) => {
        toast.success(res.data.message);
        setEditingMode(null);
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };

  //Function For Deleting Course
  const handleDeleteCourse = async (courseId) => {
    await axios
      .delete(`http://localhost:4000/api/v1/course/delete/${courseId}`, {
        withCredentials: true,
      })
      .then((res) => {
        toast.success(res.data.message);
        setMyCourses((prevCourses) => prevCourses.filter((course) => course._id !== courseId));
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };

  const handleInputChange = (courseId, field, value) => {
    // Update the course object in the courses state with the new value
    setMyCourses((prevCourses) =>
      prevCourses.map((course) =>
        course._id === courseId ? { ...course, [field]: value } : course
      )
    );
  };

  return (
    <>
      <div className="myCourses page">
        <div className="container">
          <h1>Your Posted Courses</h1>
          {myCourses.length > 0 ? (
            <>
              <div className="banner">
                {myCourses.map((element) => (
                  <div className="card" key={element._id}>
                    <div className="content">
                      <div className="short_fields">
                        <div>
                          <span>Title:</span>
                          <input
                            type="text"
                            disabled={
                              editingMode !== element._id ? true : false
                            }
                            value={element.title}
                            onChange={(e) =>
                              handleInputChange(
                                element._id,
                                "title",
                                e.target.value
                              )
                            }
                          />
                        </div>
                        <div>
                          {" "}
                          <span>Country:</span>
                          <input
                            type="text"
                            disabled={
                              editingMode !== element._id ? true : false
                            }
                            value={element.country}
                            onChange={(e) =>
                              handleInputChange(
                                element._id,
                                "country",
                                e.target.value
                              )
                            }
                          />
                        </div>
                        <div>
                          <span>City:</span>
                          <input
                            type="text"
                            disabled={
                              editingMode !== element._id ? true : false
                            }
                            value={element.city}
                            onChange={(e) =>
                              handleInputChange(
                                element._id,
                                "city",
                                e.target.value
                              )
                            }
                          />
                        </div>
                        <div>
                          <span>Category:</span>
                          <select
                            value={element.category}
                            onChange={(e) =>
                              handleInputChange(
                                element._id,
                                "category",
                                e.target.value
                              )
                            }
                            disabled={
                              editingMode !== element._id ? true : false
                            }
                          >
                            <option value="Graphics & Design">
                              Graphics & Design
                            </option>
                            <option value="Mobile App Development">
                              Mobile App Development
                            </option>
                            <option value="Frontend Web Development">
                              Frontend Web Development
                            </option>
                            <option value="MERN Stack Development">
                              MERN STACK Development
                            </option>
                            <option value="Account & Finance">
                              Account & Finance
                            </option>
                            <option value="Artificial Intelligence">
                              Artificial Intelligence
                            </option>
                            <option value="Video Animation">
                              Video Animation
                            </option>
                            <option value="MEAN Stack Development">
                              MEAN STACK Development
                            </option>
                            <option value="MEVN Stack Development">
                              MEVN STACK Development
                            </option>
                            <option value="Data Entry Operator">
                              Data Entry Operator
                            </option>
                          </select>
                        </div>
                        <div>
                          <span>
                            Fee:{" "}
                            {element.fixedFee ? (
                              <input
                                type="number"
                                disabled={
                                  editingMode !== element._id ? true : false
                                }
                                value={element.fixedFee}
                                onChange={(e) =>
                                  handleInputChange(
                                    element._id,
                                    "fixedFee",
                                    e.target.value
                                  )
                                }
                              />
                            ) : (
                              <div>
                                <input
                                  type="number"
                                  disabled={
                                    editingMode !== element._id ? true : false
                                  }
                                  value={element.feeFrom}
                                  onChange={(e) =>
                                    handleInputChange(
                                      element._id,
                                      "feeFrom",
                                      e.target.value
                                    )
                                  }
                                />
                                <input
                                  type="number"
                                  disabled={
                                    editingMode !== element._id ? true : false
                                  }
                                  value={element.feeTo}
                                  onChange={(e) =>
                                    handleInputChange(
                                      element._id,
                                      "feeTo",
                                      e.target.value
                                    )
                                  }
                                />
                              </div>
                            )}
                          </span>
                        </div>
                        <div>
                          {" "}
                          <span>Expired:</span>
                          <select
                            value={element.expired}
                            onChange={(e) =>
                              handleInputChange(
                                element._id,
                                "expired",
                                e.target.value
                              )
                            }
                            disabled={
                              editingMode !== element._id ? true : false
                            }
                          >
                            <option value={true}>TRUE</option>
                            <option value={false}>FALSE</option>
                          </select>
                        </div>
                      </div>
                      <div className="long_field">
                        <div>
                          <span>Description:</span>{" "}
                          <textarea
                            rows={5}
                            value={element.description}
                            disabled={
                              editingMode !== element._id ? true : false
                            }
                            onChange={(e) =>
                              handleInputChange(
                                element._id,
                                "description",
                                e.target.value
                              )
                            }
                          />
                        </div>
                        <div>
                          <span>Location: </span>
                          <textarea
                            value={element.location}
                            rows={5}
                            disabled={
                              editingMode !== element._id ? true : false
                            }
                            onChange={(e) =>
                              handleInputChange(
                                element._id,
                                "location",
                                e.target.value
                              )
                            }
                          />
                        </div>
                      </div>
                    </div>
                    {/* Out Of Content Class */}
                    <div className="button_wrapper">
                      <div className="edit_btn_wrapper">
                        {editingMode === element._id ? (
                          <>
                            <button
                              onClick={() => handleUpdateCourse(element._id)}
                              className="check_btn"
                            >
                              <FaCheck />
                            </button>
                            <button
                              onClick={() => handleDisableEdit()}
                              className="cross_btn"
                            >
                              <RxCross2 />
                            </button>
                          </>
                        ) : (
                          <button
                            onClick={() => handleEnableEdit(element._id)}
                            className="edit_btn"
                          >
                            Edit
                          </button>
                        )}
                      </div>
                      <button
                        onClick={() => handleDeleteCourse(element._id)}
                        className="delete_btn"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <p>
              You've not posted any course or may be you deleted all of your courses!
            </p>
          )}
        </div>
      </div>
    </>
  );
};

export default MyCourses;
