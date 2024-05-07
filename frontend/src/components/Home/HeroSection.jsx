import React from "react";
import { FaBuilding, FaSuitcase, FaUsers, FaUserPlus } from "react-icons/fa";

const HeroSection = () => {
  const details = [
    {
      id: 1,
      title: "1,23,441",
      subTitle: "Feedback",
      icon: <FaSuitcase />,
    },
    {
      id: 2,
      title: "91,220",
      subTitle: "Institutes",
      icon: <FaBuilding />,
    },
    {
      id: 3,
      title: "2,34,200",
      subTitle: "Trainees",
      icon: <FaUsers />,
    },
    {
      id: 4,
      title: "1,00,761",
      subTitle: "Trainers",
      icon: <FaUserPlus />,
    },
  ];
  return (
    <>
      <div className="heroSection">
        <div className="container">
          <div className="title">
            <h1>Find a course that aligns</h1>
            <h1>your interests</h1>
            <p>
            Unleash your potential. Find the perfect online course to ignite your passion and advance your career. Explore our diverse catalog, from coding to creative writing, and find the perfect fit for your unique goals. 
            </p>
          </div>
          <div className="image">
            <img src="/heroS.jpg" alt="hero" />
          </div>
        </div>
        <div className="details">
          {details.map((element) => {
            return (
              <div className="card" key={element.id}>
                <div className="icon">{element.icon}</div>
                <div className="content">
                  <p>{element.title}</p>
                  <p>{element.subTitle}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default HeroSection;