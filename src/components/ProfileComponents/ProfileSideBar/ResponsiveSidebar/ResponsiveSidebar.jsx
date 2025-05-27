import { useState, useEffect } from "react";
import {  FaBookReader } from "react-icons/fa";
import { BsQrCode } from "react-icons/bs";
import "./ResponsiveSidebar.scss";
const ResponsiveSidebar = ({ selectedComponent, setSelectedComponent }) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 900);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 900);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className={`sidebar-container ${isMobile ? "mobile" : "desktop"}`}>
      <div className="account-buttons">
        <button
          onClick={() => setSelectedComponent("personal")}
          className={selectedComponent === "personal" ? "active" : ""}
        >
           مشخصات شخصی
        </button>
        <button
          onClick={() => setSelectedComponent("exams")}
          className={selectedComponent === "exams" ? "active" : ""}
        >
          <FaBookReader /> آزمون‌های من
        </button>
        <button
          onClick={() => setSelectedComponent("suggested")}
          className={selectedComponent === "suggested" ? "active" : ""}
        >
          <BsQrCode /> کارت ورود به جلسه <span>(آزمون کتبی)</span>
        </button>
        <button
          onClick={() => setSelectedComponent("news")}
          className={selectedComponent === "news" ? "active" : ""}
        >
          <BsQrCode /> کارت ورود به جلسه <span>(ارزیابی تکمیلی)</span>
        </button>
      </div>
    </div>
  );
};

export default ResponsiveSidebar;
