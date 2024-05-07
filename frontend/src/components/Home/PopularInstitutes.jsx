import React from "react";
import { FaUniversity } from "react-icons/fa";
import { SiCoursera } from "react-icons/si";

const PopularInstitutes = () => {
  const institutes = [
    {
      id: 1,
      title: "Harvard University",
      location: "Cambridge, Massachusetts, USA",
      coursesOffered: 100,
      icon: <FaUniversity />,
    },
    {
      id: 2,
      title: "NUCES",
      location: "Online",
      coursesOffered: 5000,
      icon: <SiCoursera />,
    },
    {
      id: 3,
      title: "University of London",
      location: "Online",
      coursesOffered: 700,
      icon: <FaUniversity />,
    }
  ];
  return (
    <div className="institutes">
      <div className="container">
        <h3>POPULAR INSTITUTES</h3>
        <div className="banner">
          {institutes.map((element) => {
            return (
              <div className="card" key={element.id}>
                <div className="content">
                  <div className="icon">{element.icon}</div>
                  <div className="text">
                    <p>{element.title}</p>
                    <p>{element.location}</p>
                  </div>
                </div>
                <button>Courses Offered: {element.coursesOffered}</button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default PopularInstitutes;

