import React, { useEffect, useState } from "react";
import "./HomePage.scss";
import Navbar from "../Navbar/Navbar";
import Banner from "./Banner/Banner";
import ExamForm from "./ExamForm/ExamForm";
import ExamCardPart from "./ExamCardPart/ExamCardPart";
import NewsComp from "./NewsComp/NewsComp";
import Footer from "./Footer/Footer";
import NavbarTop from "./NavbarTop/NavbarTop";
import FaqHeader from "./Faq/FaqHeader/FaqHeader";
import "intro.js/introjs.css";
import introJs from "intro.js";
import ChatBot from "../ChatBot/ChatBot";
import { RiQuestionFill } from "react-icons/ri";
import gsap from "gsap";

const HomePage = () => {
  const startIntro = () => {
    if (window.innerWidth <= 900) {
      return;
    }

    gsap.globalTimeline.pause();

    const intro = introJs();
    intro.setOptions({
      steps: [
        {
          element: "#jobSearchBtn",
          intro: "در این قسمت می‌توانید مناسب‌ترین آزمون‌ها را پیدا کنید.",
          position: "right",
        },
        { element: "#menuItem-0", intro: "برگشت به خانه", position: "left" },
        {
          element: "#menuItem-1",
          intro: "برای مشاهده آزمون‌ها کلیک کنید",
          position: "left",
        },
        {
          element: "#menuItem-2",
          intro: "برای جستجوی مناسب‌ترین آزمون کلیک کنید",
          position: "left",
        },
        {
          element: "#menuItem-3",
          intro: "برای مشاهده جدیدترین اخبار کلیک کنید",
          position: "left",
        },
        {
          element: "#menuItem-4",
          intro: "برای مشاهده‌ی سوالات متداول کلیک کنید",
          position: "left",
        },
        {
          element: "#menuItem-5",
          intro: "برای تماس با ما کلیک کنید",
          position: "left",
        },
        {
          element: "#chatBotMainBtn",
          intro: "راه پشتیبانی موردنظرتان را از این قسمت انتخاب کنید",
          position: "bottom",
        },
      ],
      nextLabel: "متوجه شدم!",
      prevLabel: "قبلی",
      skipLabel: "✖",
      doneLabel: "متوجه شدم!",
      showProgress: false,
      showBullets: false,
      disableInteraction: true,
      tooltipClass: "homeTooltip-IntroJs",
      highlightClass: "homeHighlight-IntroJs",
      scrollPadding: 100,
    });

    intro.onbeforechange(() => {
      const currentStep = intro._currentStep;
      const stepElement = intro._options.steps[currentStep]?.element;
      if (stepElement) {
        const element = document.querySelector(stepElement);
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "center" });
          return new Promise((resolve) => setTimeout(resolve, 300));
        } else {
          console.warn(`المان ${stepElement} در این مرحله پیدا نشد!`);
        }
      }
    });

    intro.onexit(() => {
      gsap.globalTimeline.resume();
    });

    intro.oncomplete(() => {
      console.log("توتوریال به پایان رسید!");
    });

    intro.start();
  };

  useEffect(() => {
    const hasSeenTutorial = localStorage.getItem("hasSeenTutorial");
    if (!hasSeenTutorial) {
      const checkElementsAndStart = () => {
        const requiredElements = [
          "#jobSearchBtn",
          "#menuItem-0",
          "#menuItem-1",
          "#menuItem-2",
          "#menuItem-3",
          "#menuItem-4",
          "#menuItem-5",
          "#chatBotMainBtn",
        ];

        const allElementsReady = requiredElements.every((selector) => {
          const exists = document.querySelector(selector);
          if (!exists) console.warn(`المان ${selector} هنوز رندر نشده است!`);
          return exists;
        });

        if (allElementsReady) {
          startIntro();
          localStorage.setItem("hasSeenTutorial", "true");
        } else {
          setTimeout(checkElementsAndStart, 100); 
        }
      };

      checkElementsAndStart();
    }
  }, []);

  return (
    <div className="homeContainer">
      <NavbarTop showTutorialBtn={true} startIntro={startIntro} />
      <Navbar />
      <div id="home">
        <Banner />
      </div>
      <div id="ExamCardPart">
        <ExamCardPart />
      </div>
      <div id="ExamForm">
        <ExamForm />
      </div>
      <div id="NewsComp">
        <NewsComp />
      </div>
      <div id="Faq">
        <FaqHeader />
      </div>
      <div id="footer">
        <Footer />
      </div>
      {/* <button className="tutorialBtn" onClick={startIntro}>
        <RiQuestionFill />
      </button> */}
      <ChatBot />
    </div>
  );
};

export default HomePage;
