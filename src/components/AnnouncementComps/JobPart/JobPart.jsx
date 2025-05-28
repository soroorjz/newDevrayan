import React from "react";
import { FaCheckCircle } from "react-icons/fa";
import examData from "../../../exams.json"; 
import "./JobPart.scss"

const JobPart = () => {
   return (
    <div className="exam-status-table-container">
      <table className="exam-status-table">
        <thead>
          <tr>
            <th className="exam-title-column">عنوان آزمون</th>
            <th className="exam-status-column">وضعیت شما در آزمون</th>
            <th className="exam-action-column"></th>
          </tr>
        </thead>
        <tbody>
          {examData.map((exam) => (
            <tr key={exam.examId} className="exam-row">
              <td className="exam-title">{exam.examName}</td>
              <td className="exam-status">{exam.candidateStatus}</td>
              <td className="exam-action">
                {exam.candidateStatus === "تکمیل شده" ? (
                  <FaCheckCircle className="exam-completed-icon" />
                ) : (
                  <a
                    href="https://sanjesh.rayanegan.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="exam-action-button"
                  >
                    {exam.candidateStatus === "ناقص" ? "تکمیل آزمون" : "شروع آزمون"}
                  </a>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};


export default JobPart
