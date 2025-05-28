import React from "react";
import "./ExamCardPart.scss";
import ExamCard from "./ExamCard";
import { FaAngleLeft } from "react-icons/fa6";
import { Link } from "react-router";
import RegistrationModals from "../../RegistrationModals/RegistrationModals";

const ExamCardPart = () => {
  return (
    <div className="examCardPart-Container">
      {/* لایه بلور و دکمه */}
      <div className="blur-overlay">
        <RegistrationModals />
      </div>

      <div className="examCardPart-Title">
        <h1>آزمون‌های استخدامی</h1>
        <Link to="/EmploymentTests">
          <button>
            مشاهده‌ همه
            <FaAngleLeft />
          </button>
        </Link>
      </div>
      <div className="examCards">
        <ExamCard />
      </div>
    </div>
  );
};

export default ExamCardPart;