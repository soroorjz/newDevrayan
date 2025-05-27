import React, { useRef, useState } from "react";
import "./ExamsAnnounces.scss";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import Receipt from "../../../SignUpFormComp/SignUpStepper/Receipt/Receipt";
import ExamCardFile from "../../../ExamCardFile/ExamCardFile";
import ExamEntryCard from "../../ExamEntryCard/ExamEntryCard";

const ExamsAnnounces = ({ announcements, examData }) => {
  const contentRef = useRef(null);
  const [renderContent, setRenderContent] = useState(null);

  const handleDownloadPDF = (announce) => {
    const linkText = announce.link?.text || "";
    let ComponentToRender = null;
    let fileName = "document.pdf";

    if (linkText.includes("رسید ثبت‌نام")) {
      ComponentToRender = Receipt;
      fileName = "receipt.pdf";
    } else if (linkText === "دریافت کارت ورود به جلسه") {
      // دانلود مستقیم فایل PDF برای "دریافت کارت ورود به جلسه"
      const pdfUrl = "/assets/pdfs/ExamEntryCard.pdf"; // مسیر فایل PDF رو درست کن
      const link = document.createElement("a");
      link.href = pdfUrl;
      link.download = "ExamEntryCard.pdf";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      return; // خارج شدن از تابع
    } else if (linkText.includes("دریافت کارت ورود به جلسه ارزیابی تکمیلی")) {
      ComponentToRender = ExamEntryCard;
      fileName = "evaluation-card.pdf";
    } else {
      ComponentToRender = () => (
        <div style={{ padding: "20px", direction: "rtl", fontFamily: "Arial" }}>
          <h3>اعلان: {announce.text}</h3>
          <p>تاریخ: {announce.date}</p>
          {announce.link && <p>لینک: {announce.link.text}</p>}
        </div>
      );
      fileName = `${announce.link?.text || "announcement"}.pdf`;
    }

    let RenderedComponent;
    if (ComponentToRender === ExamCardFile) {
      const candidateData = {
        logo: "/assets/images/logo.png",
        candidateNumber: "1802142",
        nationalCode: "1234567890",
        quota: "آزاد",
        lastName: "نام خانوادگی",
        sacrifice: "ندارد",
        firstName: "نام",
        fatherName: "نام پدر",
        Marriage: "مجرد",
        gender: "مرد",
        EducationalLevel: "کارشناسی",
        birthDate: "1370/01/01",
        fieldOfStudy: "مهندسی کامپیوتر",
        graduationYear: "1394",
        religion: "اسلام",
        gpa: "17.5",
        secretory: "خیر",
        details: examData?.examName || "دستگاه اجرایی نمونه",
        nativQuota: "بومی",
        examLocation: "تهران",
        examAddress: "خیابان نمونه",
        examDateTime: announce.date || "1403/04/08 ساعت 8:30",
        notes: ["همراه داشتن کارت الزامی است", "ورود بدون کارت ممنوع"],
        footerNote: ["توضیح 1", "توضیح 2"],
      };
      RenderedComponent = <ComponentToRender candidateData={candidateData} />;
    } else if (ComponentToRender === ExamEntryCard) {
      RenderedComponent = (
        <ComponentToRender handlePrint={() => window.print()} />
      );
    } else {
      RenderedComponent = <ComponentToRender />;
    }

    setRenderContent(RenderedComponent);

    setTimeout(() => {
      const element = contentRef.current;
      if (element) {
        console.log("Rendering:", ComponentToRender.name);
        html2canvas(element, { scale: 2, useCORS: true, logging: true })
          .then((canvas) => {
            const imgData = canvas.toDataURL("image/png");
            const pdf = new jsPDF("p", "mm", "a4");
            const width = pdf.internal.pageSize.getWidth();
            const height = (canvas.height * width) / canvas.width;
            pdf.addImage(imgData, "PNG", 0, 0, width, height);
            pdf.save(fileName);
            setRenderContent(null);
          })
          .catch((error) => {
            console.error("Error generating PDF:", error);
            setRenderContent(null);
          });
      } else {
        console.error("Element not found");
      }
    }, 2000);
  };

  return (
    <div className="exams-announces">
      <h2 className="title">اعلانات</h2>
      <ul className="announce-list">
        {announcements && announcements.length > 0 ? (
          announcements.map((announce, index) => (
            <li key={index} className="announce-item">
              <span className="announce-date">{announce.date}:</span>
              <p className="announce-text">
                {announce.text}
                {announce.link && (
                  <span
                    onClick={() => handleDownloadPDF(announce)}
                    className="highlight"
                    style={{ cursor: "pointer", color: "#007bff" }}
                  >
                    ({announce.link.text})
                  </span>
                )}
              </p>
            </li>
          ))
        ) : (
          <li className="announce-item">
            <p className="announce-text">اعلانی برای این آزمون وجود ندارد.</p>
          </li>
        )}
      </ul>
      <div
        ref={contentRef}
        style={{ position: "absolute", left: "-9999px", width: "210mm" }}
      >
        {renderContent}
      </div>
    </div>
  );
};

export default ExamsAnnounces;