import React from "react";
import ForgotPassword from "../../components/LogInComp/ForgotPassword/ForgotPassword";
import NavbarTop from "../../components/HomePageComp/NavbarTop/NavbarTop";
import { Link } from "react-router";
import { IoMdHome } from "react-icons/io";

const ForgotPasswordPage = () => {
  return (
    <div>
      <NavbarTop hideJobSearch={true}/>
      <ForgotPassword />
      <button className="homeBtn">
        <Link to="/">
          <IoMdHome />
        </Link>
      </button>
    </div>
  );
};

export default ForgotPasswordPage;
