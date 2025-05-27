import React from "react";
import "./ExamFormResult.scss";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../../../AuthContext";

const exams = [
  {
    id: 1,
    name: "دوازدهمین آزمون مشترک فراگیر دستگاه‌های اجرایی کشور",
    jobLoc: "بانکدار گروه امور کامپیوتر و فناوری اطلاعات، البرز،کرج،قلم",
    num: "۱۰۲۴",
    date: "۱۴۰۴/۱/۲۵",
  },
  {
    id: 2,
    name: "دوازدهمین آزمون مشترک فراگیر دستگاه‌های اجرایی کشور",
    jobLoc: "بانکدار امور مالی، البرز، کرج، قلم",
    num: "۱۱۹۹",
    date: "۱۴۰۴/۲/۲۰",
  },
  {
    id: 3,
    name: "دوازدهمین آزمون مشترک فراگیر دستگاه‌های اجرایی کشور",
    jobLoc: "بانکدار امور مالی، البرز، کرج، گلشهر",
    num: "۱۲۰۰",
    date: "۱۴۰۴/۴/۱۰",
  },
];

const ExamFormResult = ({ setShowList }) => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleClose = () => {
    setShowList(false); // تغییر state والد برای بستن با انیمیشن
  };

  return (
    <div className="ResultExam-container">
      <div className="ResultExam-header">
        <div className="ResultExam-header-info">
          <span className="ResultExamHeaderInfo-name">نام آزمون:</span>
          <span className="ResultExamHeaderInfo-date">تاریخ آزمون</span>
          <span className="ResultExamHeaderInfo-jobLocCode">کد شغل محل</span>
          <span className="ResultExamHeaderInfo-jobLoc">شغل محل</span>
        </div>
        <button className="ResultExam-close-btn" onClick={handleClose}>
          بستن
        </button>
      </div>
      <div className="ResultExam-list">
        {exams.map((exam) => (
          <div key={exam.id} className="ResultExam-item">
            <span className="ResultExam-name">{exam.name}</span>
            <span className="ResultExam-date">{exam.date}</span>
            <span className="ResultExam-date">{exam.num}</span>
            <span className="ResultExam-jobLoc">{exam.jobLoc}</span>
            <div className="ResultExam-more">
              {user ? (
                <Link to={`/RegistrationPage?from=exam&examId=${exam.id}`}>
                  <button>ثبت نام</button>
                </Link>
              ) : (
                <Link to="/logIn">
                  <button>ورود به حساب کاربری</button>
                </Link>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExamFormResult;
