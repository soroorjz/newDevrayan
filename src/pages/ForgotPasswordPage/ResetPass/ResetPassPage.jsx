import React from "react";
import ResetPass from "../../../components/LogInComp/ResetPass/ResetPass";
import NavbarTop from "../../../components/HomePageComp/NavbarTop/NavbarTop";
import { Link } from "react-router";
import { IoMdHome } from "react-icons/io";


const ResetPassPage = () => {
  return (
    <div>
      <NavbarTop />
      <ResetPass />
      <button className="homeBtn">
        <Link to="/">
          <IoMdHome />
        </Link>
      </button>
    </div>
  );
};

export default ResetPassPage;
