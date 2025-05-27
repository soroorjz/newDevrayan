import React, { useEffect, useRef, useState } from "react";
import { BsQrCode } from "react-icons/bs";
import { FaBookReader, FaCheckCircle } from "react-icons/fa";
import { RiLockPasswordLine } from "react-icons/ri";
import { IoClose, IoDocuments } from "react-icons/io5";
import { FaUserPen, FaBars } from "react-icons/fa6";
import "./ProfileSideBar.scss";
import { Link } from "react-router";

const ProfileSideBar = ({ selectedComponent, setSelectedComponent }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 900);
  const sidebarRef = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 900) {
        setIsSidebarOpen(false);
        setIsMobile(true);
      } else {
        setIsSidebarOpen(true);
        setIsMobile(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        isSidebarOpen &&
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target)
      ) {
        setIsSidebarOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isSidebarOpen]);

  return (
    <>
      {isMobile && (
        <button
          className="menu-toggle"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          <FaBars />
        </button>
      )}
      <div
        ref={sidebarRef}
        className={`profileSide-Container ${isSidebarOpen ? "open" : "closed"}`}
      >
        <button className="close-btn" onClick={() => setIsSidebarOpen(false)}>
          <IoClose className="sideBar-Close" />
        </button>

        <div className="acountBtns">
          <button
            onClick={() => {
              setSelectedComponent("personal");
              setIsSidebarOpen(false);
            }}
            className={selectedComponent === "personal" ? "active" : ""}
          >
            <FaUserPen />
            مشخصات شخصی
          </button>
          <button
            onClick={() => {
              setSelectedComponent("password");
              setIsSidebarOpen(false);
            }}
            className={selectedComponent === "password" ? "active" : ""}
          >
            <RiLockPasswordLine />
            تغییر رمز عبور
          </button>
          <button
            onClick={() => {
              setSelectedComponent("exams");
              setIsSidebarOpen(false);
            }}
            className={selectedComponent === "exams" ? "active" : ""}
          >
            <FaBookReader />
            آزمون‌های من
          </button>
          <button
            onClick={() => {
              setSelectedComponent("suggested");
              setIsSidebarOpen(false);
            }}
            className={selectedComponent === "suggested" ? "active" : ""}
          >
            <BsQrCode />
            کارت ورود به جلسه
            <span>(آزمون کتبی)</span>
          </button>
          <button
            onClick={() => {
              setSelectedComponent("DocumentReview");
              setIsSidebarOpen(false);
            }}
            className={selectedComponent === "DocumentReview" ? "active" : ""}
          >
            <IoDocuments />
            نتیجه‌ی بررسی مدارک
            <span className="docNotifNum">1</span>
          </button>
          <button
            onClick={() => {
              setSelectedComponent("news");
              setIsSidebarOpen(false);
            }}
            className={selectedComponent === "news" ? "active" : ""}
          >
            <BsQrCode />
            کارت ورود به جلسه
            <span>(ارزیابی تکمیلی)</span>
          </button>
          <button
            onClick={() => {
              setSelectedComponent("selection");
              setIsSidebarOpen(false);
            }}
            className={selectedComponent === "selection" ? "active" : ""}
          >
            <FaCheckCircle />
            گزینش
          </button>
        </div>
      </div>
    </>
  );
};

export default ProfileSideBar;
