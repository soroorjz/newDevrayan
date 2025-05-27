import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import moment from "moment-jalaali";
import introJs from "intro.js";
import "intro.js/introjs.css";
import { IoMdHome } from "react-icons/io";
import ExamInfoComponent from "../../components/ExamInfoComp/ExamInfoComponent";
import NavbarTop from "../../components/HomePageComp/NavbarTop/NavbarTop";
import Countdown from "../../components/ExamInfoComp/CountDown/CountDown";
import ExamInfoCard from "../../components/ExamInfoComp/ExamInfoCard/ExamInfoCard";
import { useAuth } from "../../AuthContext";
import { getExamById } from "../../apiService";
import "./ExamInfo.scss";
import ExamInfoSkeleton from "./ExamInfoSkeleton";

const ExamInfo = () => {
  const { id } = useParams();

  console.log("Exam ID from useParams:", id);

  const {
    data: examData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["examInfo", id],
    queryFn: async () => {
      const data = await getExamById(id);
      console.log("Exam data fetched:", data);
      return data;
    },
    staleTime: 1000 * 60 * 5, // ۵ دقیقه
    retry: 0,
  });

  const toPersianDigits = (num) => {
    return num.toString().replace(/\d/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[d]);
  };

  useEffect(() => {
    console.log("Checking tutorial conditions:", {
      hasExamData: !!examData,
      examDataLength: examData?.length,
      windowWidth: window.innerWidth,
      hasSeenTutorial: localStorage.getItem("hasSeenExamTutorial"),
    });

    if (examData && examData.length > 0 && window.innerWidth > 728) {
      console.log("Starting tutorial with examData:", examData);
      const hasSeenTutorial = localStorage.getItem("hasSeenExamTutorial");
      if (!hasSeenTutorial) {
        setTimeout(() => {
          console.log("Attempting to find #RegistrationBtn");
          const registrationBtn = document.querySelector("#RegistrationBtn");
          if (registrationBtn) {
            console.log("Found #RegistrationBtn, scrolling to it");
            registrationBtn.scrollIntoView({
              behavior: "smooth",
              block: "center",
            });
            const rect = registrationBtn.getBoundingClientRect();
            console.log("RegistrationBtn position:", rect);
            if (rect.top >= 0 && rect.left >= 0) {
              console.log("Starting tutorial");
              startTutorial();
              localStorage.setItem("hasSeenExamTutorial", "true");
            } else {
              console.log("موقعیت #RegistrationBtn قابل محاسبه نیست");
              setTimeout(() => {
                console.log("Retrying tutorial start");
                startTutorial();
                localStorage.setItem("hasSeenExamTutorial", "true");
              }, 1000); // افزایش تأخیر به 1000ms
            }
          } else {
            console.log("المان #RegistrationBtn هنوز رندر نشده است.");
          }
        }, 1000); // افزایش تأخیر اولیه به 1000ms
      } else {
        console.log("Tutorial skipped: hasSeenExamTutorial is true");
      }
    } else {
      console.log("Tutorial conditions not met");
    }
  }, [examData]);

  const startTutorial = () => {
    if (window.innerWidth <= 728) {
      console.log("Tutorial skipped: window width <= 728");
      return;
    }

    console.log("Initializing introJs");
    const intro = introJs();
    const steps = [
      {
        element: "#RegistrationBtn",
        intro: "برای ثبت‌نام در آزمون، این دکمه را فشار دهید.",
        position: "bottom",
      },
      {
        element: "#ExamIntroduction",
        intro: "در این قسمت، توضیحات آزمون را مشاهده خواهید کرد.",
        position: "right",
      },
      {
        element: "#bookletBtn",
        intro: "برای دریافت دفترچه راهنما، این دکمه را کلیک کنید.",
        position: "left",
      },
      {
        element: "#announcementsBtn",
        intro: "اطلاعیه‌های مهم مربوط به آزمون را در این قسمت ببینید.",
        position: "top",
      },
      {
        element: "#InfojobSearchBtn",
        intro: "در این قسمت می‌توانید اطلاعات شغل‌های مرتبط را جستجو کنید.",
        position: "left",
      },
    ];

    console.log("Checking tutorial steps elements");
    const availableSteps = steps.filter((step) => {
      const element = document.querySelector(step.element);
      if (!element) {
        console.log(`Element ${step.element} not found in DOM`);
      }
      return !!element;
    });

    if (availableSteps.length === 0) {
      console.log("No valid steps found for tutorial");
      return;
    }

    console.log("Tutorial steps:", availableSteps);

    intro.setOptions({
      steps: availableSteps,
      nextLabel: "متوجه شدم!",
      prevLabel: "قبلی",
      skipLabel: "",
      doneLabel: "متوجه شدم!",
      showProgress: false,
      showPrevButton: false,
      showBullets: false,
      disableInteraction: true,
      tooltipClass: "examTooltip-IntroJs",
      highlightClass: "examHighlight-IntroJs",
    });

    console.log("Starting introJs tutorial");
    intro.start();
  };

  if (isLoading) {
    console.log("Loading exam data...");
    return <ExamInfoSkeleton />;
  }

  if (error) {
    console.error("Error fetching exam data:", error.message);
    return (
      <div className="error-text">
        <p>خطا: {error.message}</p>
        <button onClick={() => window.location.reload()}>تلاش مجدد</button>
      </div>
    );
  }

  if (!examData || examData.length === 0) {
    console.warn("No exam data found for ID:", id);
    return <p>اطلاعاتی یافت نشد</p>;
  }

  const exam = examData[0];

  if (
    !exam.examName ||
    !exam.examRegisterStartDate ||
    !exam.examRegisterEndDate ||
    !exam.examWithdrawCard ||
    !exam.examDate
  ) {
    console.error("Incomplete exam data:", exam);
    return <p>دیتای آزمون ناقص است</p>;
  }

  const formatPersianDate = (date) => {
    if (!date) return "نامشخص";
    const momentDate = moment(date, "jYYYY/jMM/jDD");
    if (!momentDate.isValid()) return "تاریخ نامعتبر";
    return toPersianDigits(momentDate.format("jYYYY/jMM/jDD"));
  };

  const startDate = moment(exam.examRegisterStartDate, "jYYYY/jMM/jDD");
  const endDate = moment(exam.examRegisterEndDate, "jYYYY/jMM/jDD");
  const cardIssueDate = moment(exam.examWithdrawCard, "jYYYY/jMM/jDD");
  const eventDate = moment(exam.examDate, "jYYYY/jMM/jDD");
  const formattedEndDate = endDate.format("jYYYY-jMM-jDD");

  return (
    <div className="examInfoContainer">
      <NavbarTop
        hideJobSearch={true}
        showTutorialBtn={true}
        startIntro={startTutorial}
        tutorialBtnClass="ExamInfo-tutorialBtn"
      />
      <Countdown registrationDeadline={endDate} startDate={startDate} />
      <ExamInfoCard
        startDate={startDate}
        endDate={endDate}
        cardIssueDate={cardIssueDate}
        eventDate={eventDate}
        toPersianDigits={toPersianDigits}
        examName={exam.examName}
      />
      <ExamInfoComponent
        startDate={startDate}
        endDate={formattedEndDate}
        cardIssueDate={cardIssueDate}
        eventDate={eventDate}
        toPersianDigits={toPersianDigits}
        examName={exam.examName}
      />
      <Link to="/">
        <button className="homeBtn">
          <IoMdHome />
        </button>
      </Link>
    </div>
  );
};

export default ExamInfo;
