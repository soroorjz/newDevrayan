import React, { useState } from "react";
import "./ResetPass.scss";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

const ResetPass = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsModalOpen(true);
  };

  const handleRedirect = () => {
    window.location.href = "/login";
  };

  return (
    <div className="forgotPassword-Container">
      <div className="forgotPass">
        <h1>بازیابی رمز عبور</h1>

        <form className="login-form" onSubmit={handleSubmit}>
          <input
            type="password"
            placeholder=" رمز عبور جدید را وارد کنید  "
            className="form-input"
          />
          <input
            type="password"
            placeholder=" رمز عبور جدید را تکرار کنید  "
            className="form-input"
          />

          <button type="submit" className="login-button">
            تغییر رمز عبور
          </button>
        </form>
      </div>

      <div className="forgotPass-Desc">
        <h1>رمز عبور جدید تعیین کنید</h1>

        <p>
          لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپلورم ایپسوم
          متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ
        </p>
      </div>

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <DotLottieReact
              src="https://lottie.host/3da47c4d-a899-4dec-bfae-34efe08b5eb9/UWdGNH5zHf.lottie"
              loop
              autoplay
            />

            <h2>رمز عبور با موفقیت تغییر یافت!</h2>
            <p>اکنون می‌توانید وارد حساب کاربری خود شوید.</p>
            <button className="redirect-button" onClick={handleRedirect}>
              بازگشت به صفحه ورود
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResetPass;
