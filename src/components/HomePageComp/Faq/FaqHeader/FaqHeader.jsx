import React, { useState } from "react";
import "./FaqHeader.scss";
import { useNavigate } from "react-router-dom";
import Faq from "../Faq";
import SupportHelpCenter from "../SupportHelpCenter/SupportHelpCenter";
import { useAuth } from "../../../../AuthContext";
import Swal from "sweetalert2";
const FaqHeader = () => {
  const { user } = useAuth(); // دریافت اطلاعات کاربر
  const navigate = useNavigate();
  const [isFaqSelected, setIsFaqSelected] = useState(true);
  const handleToggle = () => {
    if (!user) {
      Swal.fire({
        // title: "ورود به حساب کاربری",
        text: "برای استفاده از پشتیبانی آفلاین لطفاً وارد حساب کاربری خود شوید.",
        icon: "warning",
        confirmButtonText: "ورود به حساب کاربری",
        confirmButtonColor: "#3085d6",
        showCancelButton: true,
        cancelButtonText: "لغو",
        customClass: {
          confirmButton: "SupportHelpCenter-confirm-button",
          cancelButton: "SupportHelpCenter-cancel-button",
          popup: "SupportHelpCenter-custom-popup",
        },
        buttonsStyling: false,
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/logIn");
        }
      });
      return;
    }
    setIsFaqSelected(!isFaqSelected);
  };
  return (
    <div className="faqHeaderContainer">
      <div className="toggle-switch-container">
        <div
          className={`toggle-switch ${isFaqSelected ? "left" : "right"}`}
          onClick={handleToggle}
          style={{ cursor: user ? "pointer" : "not-allowed" }} // دکمه غیرفعال شده در صورت عدم ورود
        >
          <span
            id="faqOptionBtn"
            className={`option faq ${!isFaqSelected ? "inactive" : ""}`}
          >
            سوالات متداول
          </span>
          <span
            id="offlineSupportOptionBtn"
            className={`option support ${isFaqSelected ? "inactive" : ""} ${
              !user ? "disabled" : ""
            }`}
          >
            پشتیبانی آفلاین
          </span>
          <div className="toggle-circle"></div>
        </div>

        <div className="content-area">
          {isFaqSelected ? (
            <div className="faq-content">
              <Faq />
            </div>
          ) : (
            user && (
              <div className="offline-support-content">
                <SupportHelpCenter />
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
};
export default FaqHeader;
