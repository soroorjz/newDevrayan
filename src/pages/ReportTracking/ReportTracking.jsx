import React from "react";
import ReportTrackingComp from "../../components/HomePageComp/ReportTrackingComp/ReportTrackingComp";
import NavbarTop from "../../components/HomePageComp/NavbarTop/NavbarTop";
import { IoMdHome } from "react-icons/io";
import { Link } from "react-router";
import "./ReportTracking.scss";
const ReportTracking = () => {
  return (
    <div className="ReportTracking-Container">
      <NavbarTop
        hideJobSearch={true}
        hideRepotBtn={true}
        showReportTrackingBtn={true}
      />
      <div className="reportTracking-Main">
        <ReportTrackingComp />
      </div>

      <Link to="/">
        <button className="homeBtn">
          <IoMdHome />
        </button>
      </Link>
    </div>
  );
};

export default ReportTracking;
