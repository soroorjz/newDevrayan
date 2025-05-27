import React from "react";
import SignUpStepper from "../../components/SignUpFormComp/SignUpStepper/SignUpStepper";
import "./ExamSignUpForm.scss";
import NavbarTop from "../../components/HomePageComp/NavbarTop/NavbarTop";
import { IoMdHome } from "react-icons/io";
import { Link } from "react-router";
import userData from "../userData.json";
const ExamSignUpForm = ({
  title,
  showNavbar = true,
  successMessage,
  redirectAfterSubmit,
  mode = "signup",
}) => {
  // اگه mode برابر "edit" باشه، اطلاعات اولیه رو از JSON می‌گیره
  const initialData = mode === "edit" ? userData : {};

  return (
    <div className="examSignUpForm-Contaner">
      {showNavbar && <NavbarTop hideJobSearch={true} />}
      <h2>{title}</h2>
      <h1>kakbhef.ak,d</h1>
      <SignUpStepper
        successMessage={successMessage}
        redirectAfterSubmit={redirectAfterSubmit}
        mode={mode}
        initialData={initialData} // پاس دادن اطلاعات اولیه
      />
      <button className="homeBtn">
        <Link to="/">
          <IoMdHome />
        </Link>
      </button>
    </div>
  );
};

export default ExamSignUpForm;
