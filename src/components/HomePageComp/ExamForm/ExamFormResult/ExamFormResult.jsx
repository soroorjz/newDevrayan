import React from "react";
import "./ExamFormResult.scss";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../../../AuthContext";
import exams from "../../../../exams.json"; // مسیر فایل JSON رو درست کن


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
          <span className="ResultExamHeaderInfo-keyDomain">عنوان آزمون </span>
          <span className="ResultExamHeaderInfo-keyDomain">حوزه کلیدی</span>
          <span className="ResultExamHeaderInfo-organization">دستگاه</span>
          <span className="ResultExamHeaderInfo-keyJob">شغل کلیدی</span>
        </div>
        <button className="ResultExam-close-btn" onClick={handleClose}>
          بستن
        </button>
      </div>
      <div className="ResultExam-list">
        {exams.map((exam) => (
          <div key={exam.examId} className="ResultExam-item">
            <span className="ResultExam-keyDomain">{exam.examName}</span>
            <span className="ResultExam-keyDomain">{exam.keyDomain}</span>
            <span className="ResultExam-organization">{exam.organization}</span>
            <span className="ResultExam-keyJob">{exam.keyJob}</span>
            <div className="ResultExam-more">
              {user ? (
                 <a
                    href="https://sanjesh.rayanegan.com/login/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <button className="btn2">ورود</button>
                  </a>
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