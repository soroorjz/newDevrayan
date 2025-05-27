import React, { useEffect, useState, useRef } from "react";
import "./MyExams.scss";
import MyExamsMobile from "./MyExamsMobile/MyExamsMobile";
import { examData } from "./data";
import ExamsAnnounces from "./ExamsAnnounces/ExamsAnnounces";
import { CSSTransition, TransitionGroup } from "react-transition-group";

const MyExams = () => {
  const [selectedExam, setSelectedExam] = useState("");
  const [isMobile, setIsMobile] = useState(window.innerWidth < 900);
  const announceRef = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 900);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (isMobile) {
    return <MyExamsMobile />;
  }

  const selectedExamData = examData.find(
    (exam) => exam.examName === selectedExam
  );

  return (
    <>
      <div className="exam-list">
        <h2>آزمون‌های ثبت‌نام‌شده</h2>
        <div className="exam-selection">
          <label htmlFor="exam-select">انتخاب آزمون:</label>
          <select
            id="exam-select"
            value={selectedExam}
            onChange={(event) => setSelectedExam(event.target.value)}
            className="exam-select"
          >
            <option value="" disabled>
              آزمون مورد نظر را انتخاب کنید
            </option>
            {examData.map((exam) => (
              <option key={exam.examName} value={exam.examName}>
                {exam.examName}
              </option>
            ))}
          </select>
        </div>
        <div className="exam-table-container">
          <table>
            <thead>
              <tr>
                <th>ردیف</th>
                <th>عنوان</th>
                <th>تاریخ</th>
                <th>وضعیت فعالیت</th>
                <th>نمره</th>
                <th>درصد از کل</th>
                <th>وضعیت داوطلب</th>
              </tr>
            </thead>
            <tbody>
              {selectedExamData?.exams.map((exam, index) => (
                <tr key={exam.id}>
                  <td>{index + 1}</td>
                  <td>{exam.category}</td>
                  <td>{exam.date}</td>
                  <td className={`status ${exam.status}`}>{exam.status}</td>
                  <td>{exam.score}</td>
                  <td>{exam.percentage}</td>
                  <td
                    className={`result ${
                      exam.candidateStatus === "قبول شده"
                        ? "pass"
                        : exam.candidateStatus === "مردود"
                        ? "failed"
                        : "absent"
                    }`}
                  >
                    {exam.candidateStatus}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <TransitionGroup>
        {selectedExam && (
          <CSSTransition
            key={selectedExam}
            timeout={500}
            classNames="fade"
            nodeRef={announceRef}
          >
            <div ref={announceRef}>
              <ExamsAnnounces
                announcements={selectedExamData?.announcements || []}
                examData={selectedExamData} // پاس دادن کل دیتای آزمون
              />
            </div>
          </CSSTransition>
        )}
      </TransitionGroup>
    </>
  );
};

export default MyExams;
