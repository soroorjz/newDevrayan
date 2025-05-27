import React, { useState } from "react";
import "./LogInMain.scss";
import { Link, useNavigate } from "react-router-dom";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import LootieAnime from "../../Lootie/loginanim.lottie"; // انیمیشن اصلی
import { useAuth } from "../../AuthContext";

const LogInMain = () => {
  const { login } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [animationType, setAnimationType] = useState("default"); // نوع انیمیشن: پیش‌فرض، موفق یا خطا
  const [animationKey, setAnimationKey] = useState(0);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    const correctUsername = "0015838791";
    const correctPassword = "0015838791";

    if (username === correctUsername && password === correctPassword) {
      setAnimationType("success");
      setAnimationKey((prevKey) => prevKey + 1);

      setTimeout(() => {
        login(username);
        navigate("/");
      }, 3000);
    } else {
      setAnimationType("error");
      setAnimationKey((prevKey) => prevKey + 1);

      setTimeout(() => {
        setAnimationType("default");
      }, 2000); // بازگشت به انیمیشن پیش‌فرض بعد از ۲ ثانیه
    }
  };

  return (
    <div className="login-container">
      <div className="login-left">
        <h1>ورود به حساب کاربری</h1>
        <form className="login-form" onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="نام کاربری"
            className="form-input"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            disabled={animationType === "success"}
          />
          <input
            type="password"
            placeholder="رمز عبور"
            className="form-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={animationType === "success"}
          />
          <div className="form-options">
            <Link className="forgot-password" to="/ForgotPassword">
              رمز عبورتان را فراموش کرده‌اید؟
            </Link>
          </div>

          <button
            type="submit"
            className="login-button"
            disabled={animationType === "success"}
          >
            {animationType === "success" ? "در حال ورود..." : "ورود"}
          </button>
        </form>
        {/* <div className="login-divider">یا</div> */}

        <div className="register-link">
          <p>
            حساب کاربری ندارید؟
            <Link to="/signUpForm"> ساخت حساب کاربری </Link>
          </p>
        </div>
      </div>
      <div className="login-right">
        <div>
          <DotLottieReact
            key={animationKey}
            id="loginAnim"
            src={
              animationType === "success"
                ? LootieAnime // انیمیشن موفق
                : animationType === "error"
                ? "https://lottie.host/89138cb4-e80f-4771-ab37-f8749d088e25/Uky1oW3Iz3.lottie" // انیمیشن خطا
                : LootieAnime // انیمیشن پیش‌فرض (لوتی اصلی)
            }
            autoplay={animationType !== "default"} // انیمیشن فقط در صورت موفقیت یا خطا پخش می‌شود
            loop={animationType !== "default"} // انیمیشن فقط یکبار پخش شود
          />
        </div>
        <h1>خوش آمدید!</h1>
        <h3>برای ورود به حساب کاربری خود، اطلاعات را وارد کنید.</h3>
        <p>
          با ورود به حساب کاربری، اطلاعات شخصی خود را به‌روز کنید، سوابق
          آزمون‌های خود را مشاهده کنید و وضعیت ثبت‌نام را بررسی کنید. همچنین به
          کارت ورود، اطلاعات ثبت‌نامی و اعلان‌های مهم دسترسی داشته باشید و مراحل
          ثبت‌نام خود را مدیریت کنید.
        </p>
      </div>
    </div>
  );
};

export default LogInMain;
