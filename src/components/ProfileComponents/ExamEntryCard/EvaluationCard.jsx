import React, { useState, useRef } from "react";
import ExamEntryCard from "./ExamEntryCard";
import "./ExamEntryCopm.scss";
import ExamCardFile from "../../ExamCardFile/ExamCardFile";

import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import Receipt from "../../SignUpFormComp/SignUpStepper/Receipt/Receipt";

const EvaluationCard = () => {
  const [selectedExam, setSelectedExam] = useState("");
  const [isGeneratingReceipt, setIsGeneratingReceipt] = useState(false); // برای کنترل رندر رسید
  const examCardRef = useRef(null); // برای ExamCardFile
  const receiptRef = useRef(null); // برای Receipt

  const exams = [
    {
      id: 1,
      name: "یازدهمین آزمون مشترک دستگاه های اجرایی",
      status: "card",
    },
    {
      id: 2,
      name: "آزمون استخدامی سازمان اداری و استخدامی کشور",
      status: "not_issued",
    },
    {
      id: 3,
      name: "آزمون استخدامی مشاغل کیفیت‌بخشی وزارت آموزش و پرورش",
      status: "expired",
    },
  ];

  const handleChange = (event) => {
    setSelectedExam(Number(event.target.value));
  };

  // تابع برای هندل کردن پرینت
  const handlePrint = () => {
    window.print();
  };

  // دانلود کارت آزمون
  const handleDownloadExamCard = () => {
    const element = examCardRef.current;
    if (element) {
      html2canvas(element, { scale: 2 })
        .then((canvas) => {
          const imgData = canvas.toDataURL("image/png");
          const pdf = new jsPDF("p", "mm", "a4");
          const width = pdf.internal.pageSize.getWidth();
          const height = (canvas.height * width) / canvas.width;
          pdf.addImage(imgData, "PNG", 0, 0, width, height);
          pdf.save("exam-card.pdf");
        })
        .catch((error) => {
          console.error("Error generating exam card PDF:", error);
        });
    }
  };

  // دانلود رسید ثبت‌نام
  const handleDownloadReceipt = () => {
    setIsGeneratingReceipt(true); // فعال کردن رندر رسید
    setTimeout(() => {
      const element = receiptRef.current;
      if (element) {
        html2canvas(element, { scale: 2 })
          .then((canvas) => {
            const imgData = canvas.toDataURL("image/png");
            const pdf = new jsPDF("p", "mm", "a4");
            const width = pdf.internal.pageSize.getWidth();
            const height = (canvas.height * width) / canvas.width;
            pdf.addImage(imgData, "PNG", 0, 0, width, height);
            pdf.save("receipt.pdf");
            setIsGeneratingReceipt(false); // غیرفعال کردن بعد از تولید
          })
          .catch((error) => {
            console.error("Error generating receipt PDF:", error);
            setIsGeneratingReceipt(false);
          });
      }
    }, 500); // تأخیر 500 میلی‌ثانیه
  };

  return (
    <div className="Entry-list">
      <h2>کارت‌های ورود به ارزیابی تکمیلی</h2>
      <div className="Entry-selection">
        <label htmlFor="exam-select">انتخاب آزمون:</label>
        <select
          id="exam-select"
          value={selectedExam}
          onChange={handleChange}
          className="exam-select"
        >
          <option value="" disabled>
            آزمون مورد نظر را انتخاب کنید
          </option>
          {exams.map((exam) => (
            <option key={exam.id} value={exam.id}>
              {exam.name}
            </option>
          ))}
        </select>
        {selectedExam &&
          exams.find((exam) => exam.id === selectedExam)?.status === "card" && (
            <div className="cardDetailBtn">
              {/* <button
                className="exam-card-button"
                onClick={handleDownloadExamCard}
              >
                دریافت کارت آزمون
              </button>
              <button
                className="exam-card-button"
                onClick={handleDownloadReceipt}
              >
                دریافت رسید ثبت‌نام
              </button> */}
            </div>
          )}
      </div>
      <div className="Exam-result">
        {selectedExam &&
          (exams.find((exam) => exam.id === selectedExam)?.status === "card" ? (
            <>
              <div ref={examCardRef}>
                <ExamEntryCard handlePrint={handlePrint} />
              </div>
              {isGeneratingReceipt && (
                <div
                  ref={receiptRef}
                  style={{ position: "absolute", left: "-9999px" }}
                >
                  <Receipt />
                </div>
              )}
            </>
          ) : exams.find((exam) => exam.id === selectedExam)?.status ===
            "not_issued" ? (
            <p style={{ color: "orange" }}>
              در حال حاضر کارت ورود به ارزیابی تکمیلی آزمون استخدامی سازمان
              اداری و استخدامی کشور صادر نشده است.
            </p>
          ) : (
            <p style={{ color: "red" }}>
              مهلت دریافت کارت ورود به ارزیابی تکمیلی آزمون استخدامی مشاغل
              کیفیت‌بخشی وزارت آموزش و پرورش به پایان رسیده است.
            </p>
          ))}
      </div>
    </div>
  );
};

export default EvaluationCard;
