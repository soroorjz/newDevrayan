import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../AuthContext";
import Swal from "sweetalert2"; // وارد کردن SweetAlert2
import "./ChangePassword.scss";
import NavbarTop from "../../components/HomePageComp/NavbarTop/NavbarTop";
import { IoMdHome } from "react-icons/io";

const ChangePassword = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // شبیه‌سازی تغییر رمز عبور (بدون بررسی)
    console.log("رمز عبور با موفقیت تغییر یافت:", {
      currentPassword,
      newPassword,
    });

    // نمایش SweetAlert برای تأیید موفقیت
    Swal.fire({
      title: "موفقیت!",
      text: "تغییر رمز شما با موفقیت صورت گرفت.",
      icon: "success",
      confirmButtonText: "ورود مجدد",
      confirmButtonColor: "#04364a", // رنگ دکمه مطابق با تم شما
      customClass: {
        confirmButton: "custom-swal-button",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        // خروج کاربر پس از تأیید
        logout();
        navigate("/LogIn"); // هدایت به صفحه ورود
      }
    });
  };

  // اگر کاربر لاگین نکرده باشد، به صفحه ورود هدایت شود
  if (!user) {
    navigate("/LogIn");
    return null;
  }

  return (
    <>
      {/* <NavbarTop hideJobSearch={true} hideRepotBtn={true} /> */}
      <div className="change-password-container">
        <h2>تغییر رمز عبور</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <input
              type="password"
              placeholder="رمز عبور کنونی"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <input
              type="password"
              placeholder="رمز عبور جدید"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <input
              type="password"
              placeholder="تکرار رمز عبور جدید"
              value={confirmNewPassword}
              onChange={(e) => setConfirmNewPassword(e.target.value)}
              required
            />
          </div>
          <Link to="/LogIn" className="submit-button" onClick={handleSubmit}>
            ثبت رمز عبور جدید
          </Link>
        </form>
      </div>
      
    </>
  );
};

export default ChangePassword;
