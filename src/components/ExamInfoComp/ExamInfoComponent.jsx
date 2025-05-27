import { useState } from "react";
import "./ExamInfoComponent.scss";
import { examSections } from "./examInfoData";
import ExamForm from "../HomePageComp/ExamForm/ExamForm";
import { Link } from "react-router-dom";
import { useAuth } from "../../AuthContext";
import NotificationList from "../../pages/NotificationList/NotificationList";

const notifications = [
  {
    date: "1402-11-17",
    timeAgo: "5 ماه پیش",
    title: "اصلاحیه دفترچه راهنمای آزمون منتشر شد.",
    isImportant: true,
    downloadLink: "/assets/pdfs/medu_notifications_1.pdf",
  },
  {
    date: "1402-11-17",
    timeAgo: "5 ماه پیش",
    title: "دفترچه راهنمای آزمون منتشر شد.",
    isImportant: false,
    downloadLink: "/assets/pdfs/medu_notifications_1.pdf",
  },
  {
    date: "1403-06-19",
    timeAgo: "6 ماه پیش",
    title: "ظرفیت درخواستی آزمون اعلام شد.",
    isImportant: false,
    downloadLink: null,
  },
];

const ExamInfoComponent = ({
  startDate,
  endDate,
  cardIssueDate,
  eventDate,
  toPersianDigits,
  examName,
}) => {
  const [activeSection, setActiveSection] = useState("introduction");
  const { user } = useAuth();

  return (
    <div className="exam-info-sj">
      <nav className="exam-info-nav-sj">
        <button
          onClick={() => setActiveSection("introduction")}
          className={
            activeSection === "introduction" ? "exam-InfoTab-Active" : ""
          }
          id="ExamIntroduction"
        >
          معرفی آزمون
        </button>
        <button
          onClick={() => setActiveSection("booklet")}
          className={activeSection === "booklet" ? "exam-InfoTab-Active" : ""}
          id="bookletBtn"
        >
          دفترچه
        </button>
        <button
          onClick={() => setActiveSection("announcements")}
          className={
            activeSection === "announcements" ? "exam-InfoTab-Active" : ""
          }
          id="announcementsBtn"
        >
          اطلاعیه‌ها
        </button>
        <button
          onClick={() => setActiveSection("jobs")}
          className={activeSection === "jobs" ? "exam-InfoTab-Active" : ""}
          id="InfojobSearchBtn"
        >
          جست و جوی مشاغل
        </button>
      </nav>

      {activeSection === "introduction" && (
        <section id="introduction" className="exam-section-sj">
          <h2>معرفی آزمون</h2>
          {examSections.map((item, index) => (
            <div key={index} className="introduction-item">
              <p className="date">{item.date}</p>
              <h3 className="title">{item.title}</h3>
              <p className="description">{item.description}</p>
            </div>
          ))}
        </section>
      )}

      {activeSection === "booklet" && (
        <section id="booklet" className="exam-section-sj">
          <h2>دفترچه</h2>
          <p>اطلاعات مربوط به دفترچه آزمون در این بخش قرار می‌گیرد.</p>
        </section>
      )}

      {activeSection === "announcements" && (
        <section id="announcements" className="exam-section-sj">
          <h2>اطلاعیه‌ها</h2>
          <NotificationList
            examName={examName}
            endDate={endDate}
            notifications={notifications}
          />
        </section>
      )}

      {activeSection === "jobs" && (
        <section id="jobs" className="exam-section-sj">
          <h2>جست و جوی مشاغل</h2>
          <ExamForm />
        </section>
      )}
    </div>
  );
};

export default ExamInfoComponent;
