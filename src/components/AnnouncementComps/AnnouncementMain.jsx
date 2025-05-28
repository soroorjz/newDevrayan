import React from "react";
import "./AnnouncementMain.scss";

import { IoMdHome } from "react-icons/io";
import { Link } from "react-router";
import JobPart from "./JobPart/JobPart";

const AnnouncementMain = ({ selectedComponent }) => {
  let content;
  switch (selectedComponent) {
    case "job":
      content = <JobPart/> ;
      break;
    case "General":
      content = <p>2</p>;
      break;
    case "Specialized":
      content = <p>3</p>;
      break;
    default:
      content = <p>1</p> ; // پیش‌فرض به JobAssessment تغییر کرد
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

export default AnnouncementMain;
