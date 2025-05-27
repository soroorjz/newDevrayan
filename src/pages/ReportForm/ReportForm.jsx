import { Link } from "react-router";
import NavbarTop from "../../components/HomePageComp/NavbarTop/NavbarTop";
import ReportFormComp from "../../components/ReportFormComp/ReportFormComp";
import "./ReportForm.scss";
import { IoMdHome } from "react-icons/io";

const ReportForm = () => {
  return (
    <>
      <NavbarTop
        hideJobSearch={true}
        hideRepotBtn={true}
        showReportTrackingBtn={true}
      />
      <ReportFormComp />
      <Link to="/">
        <button className="homeBtn">
          <IoMdHome />
        </button>
      </Link>
    </>
  );
};

export default ReportForm;
