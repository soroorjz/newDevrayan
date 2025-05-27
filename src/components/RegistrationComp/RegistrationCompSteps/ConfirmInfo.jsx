import React, { useState } from "react";
import { FaUser, FaGraduationCap, FaHome, FaBriefcase } from "react-icons/fa";
import "./ConfirmInfo.scss";
import { Link } from "react-router";

const sections = [
  {
    id: 1,
    title: "اطلاعات فردی",
    icon: <FaUser />,
    fields: {
      نام: "محمد",
      "نام خانوادگی": "معروفی",
      "نام پدر": "احمد",
      "کد ملی": "0015837891",
      "شماره شناسنامه": "1802142",
      "تاریخ تولد": "1375/05/12",
      دین: "اسلام (شیعه)",
      "استان محل تولد": "البرز",
      "شهرستان محل تولد": "کرج",
      "وضعیت تاهل": "متاهل",
      "تعداد فرزندان": "0",
      جنسیت: "مرد",
    },
  },
  {
    id: 2,
    title: "اطلاعات تحصیلی",
    icon: <FaGraduationCap />,
    fields: {
      "مقطع تحصیلی": "دکتری",
      "رشته تحصیلی": "آموزش ابتدایی",
      "نوع دانشگاه": "سراسری",
      "نام دانشگاه": "دانشگاه تهران",
      "تاریخ فارغ‌التحصیلی": "1400/06/30",
      معدل: "16.10",
    },
  },
  {
    id: 3,
    title: "اطلاعات محل سکونت",
    icon: <FaHome />,
    fields: {
      "تلفن همراه": "09355986776",
      "کد پستی": "3155945771",
      استان: "تهران",
      شهر: "تهران",
      آدرس: " البرز، کرج، عظیمیه، میدان اسبی",
    },
  },
  {
    id: 4,
    title: "سوابق",
    icon: <FaBriefcase />,
    fields: {
      سهمیه: "آزاد",
      "وضعیت نظام وظیفه": "پایان خدمت",
      "میزان خدمت (ماه)": "24",
      "تاریخ پایان خدمت": "1402/01/01",
    },
  },
];

const ConfirmInfo = ({ onNext, handlePreviousStep }) => {
  const [isChecked, setIsChecked] = useState(false);

  return (
    <div className="timeline-container">
      {sections.map((section, index) => (
        <div
          key={section.id}
          className={`timeline-item ${
            index === sections.length - 1 ? "last-item" : ""
          }`}
        >
          <div className="timelineTitlePart">
            <div className="icon-container">{section.icon}</div>
            <h3 className="section-title">{section.title}</h3>
          </div>
          <div className="ConfirmInfoForm-container">
            <div className="section-form">
              {Object.entries(section.fields).map(([label, value], i) => (
                <div key={i} className="form-group">
                  <span className="form-label">{label}:</span>
                  <span className="form-value">{value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
      <div className="edit-profile-link">
        <p>
          چنانچه در اطلاعات فوق مغایرتی وجود دارد، با رفتن به{" "}
          <Link to="/profile">حساب کاربری</Link> خود آن را اصلاح کنید.
        </p>
      </div>
      <label className="infoConfirmed">
        <input
          type="checkbox"
          checked={isChecked}
          onChange={(e) => setIsChecked(e.target.checked)}
        />
        مشخصات فوق مورد تأیید است.
      </label>
      <div className="ConfirmInfoBtns">
        <button onClick={handlePreviousStep}>صفحه قبل</button>
        <button
          className={`submit-button ${!isChecked ? "disabled-button" : ""}`}
          disabled={!isChecked}
          onClick={onNext}
        >
          صفحه بعد
        </button>
      </div>
    </div>
  );
};

export default ConfirmInfo;
