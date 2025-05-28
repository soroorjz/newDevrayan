import React from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import "./ProcessDescriptionModal.scss";

const MySwal = withReactContent(Swal);

const ProcessDescriptionModal = () => {
  const showModal = () => {
    MySwal.fire({
      title: "توضیحات فرایند سنجش",
      html: `
        <div class="process-description-content">
          <p>در این بخش، توضیحات مربوط به فرایند سنجش قرار خواهد گرفت.</p>
          <p>محتوای این بخش بعداً تکمیل خواهد شد.</p>
          <ul>
            <li>مرحله اول: ثبت‌نام و احراز هویت</li>
            <li>مرحله دوم: شرکت در آزمون‌های مورد نیاز</li>
            <li>مرحله سوم: بررسی نتایج و اعلام وضعیت</li>
          </ul>
        </div>
      `,
      confirmButtonText: "بستن",
      customClass: {
        popup: "process-description-modal",
        title: "process-description-title",
        htmlContainer: "process-description-html",
        confirmButton: "process-description-confirm-btn",
      },
    });
  };

  return (
    <button onClick={showModal}>توضیحات فرایند سنجش</button>
  );
};

export default ProcessDescriptionModal;