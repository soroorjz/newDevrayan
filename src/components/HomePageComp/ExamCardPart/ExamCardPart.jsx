import React from "react";
import "./ExamCardPart.scss";
import ExamCard from "./ExamCard";
import { FaAngleLeft } from "react-icons/fa6";
import { Link } from "react-router";
const ExamCardPart = () => {
  return (
    <div className="examCardPart-Container">
      <div className="examCardPart-Title">
        <h1> آزمون‌های استخدامی</h1>
        <Link to="/EmploymentTests">
          <button>
            مشاهده‌ همه
            <FaAngleLeft />
          </button>
        </Link>
        {/* <Link to="/CardListSkeleton">dvsf</Link> */}
      </div>
      <div className="examCards">
        <ExamCard />
      </div>
    </div>
  );
};

export default ExamCardPart;
