import React from "react";
import "./AnnouncementMain.scss";

import { IoMdHome } from "react-icons/io";
import { Link } from "react-router";
import JobPart from "./JobPart/JobPart";
import GeneralPart from "./GeneralPart/GeneralPart";
import SpecializedPart from "./SpecializedPart/SpecializedPart";

const AnnouncementMain = ({ selectedComponent }) => {
  let content;
  switch (selectedComponent) {
    case "job":
      content = <JobPart/> ;
      break;
    case "General":
      content = <GeneralPart/>;
      break;
    case "Specialized":
      content = <SpecializedPart/>;
      break;
    default:
      content =<JobPart/>
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
