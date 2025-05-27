import React from "react";
import PersonalDetails from "./PersonalDetails/PersonalDetails";
import "./ProfileMain.scss";
import MyExams from "./MyExams/MyExams";
import ExamEntryCopm from "./ExamEntryCard/ExamEntryCopm";
import EvaluationCard from "./ExamEntryCard/EvaluationCard";
import ChangePassword from "../../pages/ChangePassword/ChangePassword";
import DocumentReviewResult from "./ProfileSideBar/DocumentReviewResult/DocumentReviewResult";
import CompletedForm from "../../pages/CompletedForm/CompletedForm";
import { IoMdHome } from "react-icons/io";
import { Link } from "react-router";
import Selection from "./ProfileSideBar/Selection/Selection";

const ProfileMain = ({ selectedComponent }) => {
  let content;
  switch (selectedComponent) {
    case "personal":
      content = (
        <div className="profilePersonalDetails">
          <CompletedForm />
        </div>
      );
      break;
    case "DocumentReview":
      content = (
        <div className="profilePersonalDetails">
          <DocumentReviewResult />
        </div>
      );
      break;
    case "password":
      content = (
        <div className="passwordChangingPart">
          <ChangePassword />
        </div>
      );
      break;
    case "exams":
      content = <MyExams />;
      break;
    case "suggested":
      content = <ExamEntryCopm />;
      break;
    case "news":
      content = <EvaluationCard />;
      break;
    case "selection":
      content = <Selection />;
      break;
    default:
      content = <CompletedForm />;
  }

  return (
    <div className="ProfileMain-Container">
      {content}

      <Link to="/">
        <button className="homeBtn">
          <IoMdHome />
        </button>
      </Link>
    </div>
  );
};

export default ProfileMain;