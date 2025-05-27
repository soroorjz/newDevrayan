import React from "react";
import { IoMdHome } from "react-icons/io";
import "./ForgotPassword.scss";
import { Link, useNavigate } from "react-router";
import NavbarTop from "../../HomePageComp/NavbarTop/NavbarTop";
const ForgotPassword = () => {
  const navigate = useNavigate(); // تعریف هوک مسیریابی

  const handleSubmit = (event) => {
    event.preventDefault();
    navigate("/ResetPass");
  };

  return (
    <>
      <NavbarTop hideJobSearch={true} hideRepotBtn={true} />
      <div className="forgotpassContainer">
        <div className="forgotPassword-Container">
          <div className="forgotPass">
            <h1>بازیابی رمز عبور</h1>
            <form className="login-form" onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="ایمیل خود را وارد کنید"
                className="form-input"
              />
              <input
                type="text"
                placeholder=" کد ارسالی را وارد کنید   "
                className="form-input"
              />
              <div className="form-options">
                <p className="forgot-password">
                  لینک بازیابی را دریافت نکرده‌اید؟
                </p>
              </div>
              <Link to="/LogIn">
                <button type="submit" className="login-button">
                  بازیابی رمزعبور
                </button>
              </Link>
            </form>
          </div>
          <div className="forgotPass-Desc">
            <h1>رمز عبورتان را فراموش کرده‌اید؟</h1>
            <p>
              جای نگرانی نیست. ایمیلتان را وارد کنی. ما به شما یک لینک برای
              بازیابی رمز عبور می‌فرستیم.
            </p>
          </div>
        </div>
      </div>
      <Link to="/">
        <button className="homeBtn">
          <IoMdHome />
        </button>
      </Link>
    </>
  );
};

export default ForgotPassword;
