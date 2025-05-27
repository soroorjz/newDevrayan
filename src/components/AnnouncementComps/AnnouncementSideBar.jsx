import React, { useEffect, useRef, useState } from "react";
import { BsQrCode } from "react-icons/bs";
import { FaBookReader, FaCheckCircle } from "react-icons/fa";
import { RiLockPasswordLine } from "react-icons/ri";
import { IoClose, IoDocuments } from "react-icons/io5";
import { FaUserPen, FaBars } from "react-icons/fa6";
import "./AnnouncementSideBar.scss";
import { Link } from "react-router";

const AnnouncementSideBar = ({ selectedComponent, setSelectedComponent }) => {
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
              setSelectedComponent("job");
              setIsSidebarOpen(false);
            }}
            className={selectedComponent === "job" ? "active" : ""}
          >
            <FaUserPen />
            سنجش تناسب شغل با شخصیت
          </button>
          <button
            onClick={() => {
              setSelectedComponent("General");
              setIsSidebarOpen(false);
            }}
            className={selectedComponent === "General" ? "active" : ""}
          >
            <RiLockPasswordLine />
            سنجش شایستگی‌های عمومی
          </button>
          <button
            onClick={() => {
              setSelectedComponent("Specialized");
              setIsSidebarOpen(false);
            }}
            className={selectedComponent === "Specialized" ? "active" : ""}
          >
            <FaBookReader />
            سنجش شایستگی‌های تخصصی
          </button>
        </div>
      </div>
    </>
  );
};

export default AnnouncementSideBar;
