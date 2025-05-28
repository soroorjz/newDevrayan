import React from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useAuth } from "../../AuthContext";
import "./RegistrationModals.scss";

const MySwal = withReactContent(Swal);

const RegistrationModals = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const showModals = async () => {
    // بررسی ورود کاربر
    if (!user) {
      await MySwal.fire({
        title: "نیاز به ورود",
        text: "جهت ثبت نام در فرایند شناسایی پانصد مدیر جوان لازم است وارد حساب کاربری خود شوید.",
        showCancelButton: true,
        confirmButtonText: "ورود به حساب کاربری",
        cancelButtonText: "لغو",
        showDenyButton: true,
        denyButtonText: "ایجاد حساب کاربری",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/logIn");
        } else if (result.isDenied) {
          navigate("/signUpForm");
        }
      });
      return;
    }

    // مودال اول: شرایط و قوانین
    const termsResult = await MySwal.fire({
      title: "شرایط و قوانین",
      html: `
        <div class="terms-modal-content">
          <p>لطفاً شرایط و قوانین زیر را به دقت مطالعه کنید:</p>
          <ul>
            <li>شما باید در زمان مقرر در آزمون شرکت کنید.</li>
            <li>هرگونه تقلب منجر به رد صلاحیت شما خواهد شد.</li>
            <li>اطلاعات شما نزد ما محفوظ خواهد ماند.</li>
          </ul>
          <div class="checkbox-container">
            <input type="checkbox" id="terms-checkbox" />
            <label for="terms-checkbox">با شرایط و قوانین موافق هستم</label>
          </div>
        </div>
      `,
      showCancelButton: true,
      confirmButtonText: "تأیید",
      cancelButtonText: "انصراف",
      preConfirm: () => {
        const checkbox = document.getElementById("terms-checkbox");
        if (!checkbox.checked) {
          MySwal.showValidationMessage("لطفاً با شرایط و قوانین موافق باشید.");
          return false;
        }
        return true;
      },
    });

    if (!termsResult.isConfirmed) return;

    // مودال دوم: بررسی دوربین
    const cameraResult = await MySwal.fire({
      title: "دستگاه شما",
      text: "آیا دستگاه شما مجهز به دوربین است؟",
      showCancelButton: true,
      confirmButtonText: "بله",
      cancelButtonText: "خیر",
    });

    if (!cameraResult.isConfirmed) return;

    // مودال سوم: بررسی میکروفون
    const micResult = await MySwal.fire({
      title: "دستگاه شما",
      text: "آیا دستگاه شما مجهز به میکروفون است؟",
      showCancelButton: true,
      confirmButtonText: "بله",
      cancelButtonText: "خیر",
    });

    if (!micResult.isConfirmed) return;

    // ذخیره وضعیت تأیید در localStorage
    localStorage.setItem("registrationConfirmed", "true");

    // هدایت به کامپوننت PaymentGateway
    navigate("/payment");
  };

  return (
    <div className="registration-modals-container">
      <button className="blur-overlay-button" onClick={showModals}>
        ثبت‌نام در آزمون تست‌های روانشناختی
      </button>
    </div>
  );
};

export default RegistrationModals;