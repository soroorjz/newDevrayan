import React from "react";
import "./ExamCardPart.scss";
import ExamCard from "./ExamCard";
import { FaAngleLeft } from "react-icons/fa6";
import { Link } from "react-router";
import RegistrationModals from "../../RegistrationModals/RegistrationModals";

const ExamCardPart = () => {
  // بررسی وضعیت تأیید از localStorage
  const isRegistrationConfirmed = localStorage.getItem("registrationConfirmed") === "true";

  return (
    <div className="examCardPart-Container">
      {/* لایه بلور و دکمه فقط اگه تأیید نشده باشه نمایش داده می‌شه */}
      {!isRegistrationConfirmed && (
        <div className="blur-overlay">
          <RegistrationModals />
        </div>
      )}

      <div className="examCardPart-Title">
        <h1>
          آزمون‌های روانشناختی
          </h1>
        {/* <Link to="/EmploymentTests">
          <button>
            مشاهده‌ همه
            <FaAngleLeft />
          </button>
        </Link> */}
      </div>
      <div className="examCards">
        <ExamCard />
      </div>
    </div>
  );
};

export default ExamCardPart;