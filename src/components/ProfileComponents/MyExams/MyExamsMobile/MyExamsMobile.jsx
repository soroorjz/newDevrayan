import React, { useState } from "react";
import { examData } from "../data";
import "./MyExamsMobile.scss";
import ExamsAnnounces from "../ExamsAnnounces/ExamsAnnounces";

const MyExamsMobile = () => {
  const [selectedExam, setSelectedExam] = useState(""); // آزمون انتخاب‌شده
  const [openExamIds, setOpenExamIds] = useState([]); // برای باز و بسته کردن جزئیات

  const toggleDropdown = (id) => {
    setOpenExamIds((prevOpenExamIds) =>
      prevOpenExamIds.includes(id)
        ? prevOpenExamIds.filter((examId) => examId !== id)
        : [...prevOpenExamIds, id]
    );
  };
  const selectedExamData = examData.find(
    (exam) => exam.examName === selectedExam
  );

  return (
    <>
      <div className="exam-list-mobile">
        <h2>آزمون‌های ثبت‌نام‌شده</h2>

        <div className="exam-selection">
          <label>انتخاب آزمون:</label>
          <select
            id="examSelect"
            className="exam-select"
            value={selectedExam}
            onChange={(e) => setSelectedExam(e.target.value)}
          >
            <option value="">آزمون مورد نظر را انتخاب کنید</option>
            {examData.map((exam) => (
              <option key={exam.examName} value={exam.examName}>
                {exam.examName}
              </option>
            ))}
          </select>
        </div>

        {/* نمایش اطلاعات آزمون انتخاب‌شده */}
        {selectedExam && (
          <div className="mobile-exam-list">
            {examData
              .filter((exam) => exam.examName === selectedExam)
              .map((exam) => (
                <div key={exam.examName} className="exam-item">
                  {exam.exams.map((subExam) => (
                    <div key={subExam.id}>
                      <div
                        className="exam-header"
                        onClick={() => toggleDropdown(subExam.id)}
                      >
                        <span>{subExam.category}</span>
                        <span>{subExam.date}</span>
                        <span className="dropdown-icon">
                          {openExamIds.includes(subExam.id) ? "▲" : "▼"}
                        </span>
                      </div>
                      <div
                        className={`exam-details ${
                          openExamIds.includes(subExam.id) ? "open" : ""
                        }`}
                      >
                        <p>
                          <strong>وضعیت فعالیت:</strong> {subExam.status}
                        </p>
                        <p>
                          <strong>نمره:</strong> {subExam.score}
                        </p>
                        <p>
                          <strong>درصد از کل:</strong> {subExam.percentage}
                        </p>
                        <p>
                          <strong>وضعیت داوطلب:</strong>{" "}
                          {subExam.candidateStatus}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ))}
          </div>
        )}
      </div>

      <ExamsAnnounces
        announcements={selectedExamData?.announcements || []}
        examData={selectedExamData} // پاس دادن کل دیتای آزمون
      />
    </>
  );
};

export default MyExamsMobile;
