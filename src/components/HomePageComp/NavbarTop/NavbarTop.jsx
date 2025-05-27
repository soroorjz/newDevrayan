import React, { useEffect, useState } from "react";
import "./NavbarTop.scss";
import { GiHamburgerMenu } from "react-icons/gi";
import { Link, useNavigate } from "react-router-dom";
import { FaUser, FaSignOutAlt } from "react-icons/fa";
import { useAuth } from "../../../AuthContext";
import { FaCircleUser } from "react-icons/fa6";
import ResponsiveNavbarTop from "./ResponsiveNavbarTop";
import { FaQuestion } from "react-icons/fa";

const NavbarTop = ({
  hideJobSearch = false,
  hideRepotBtn = false,
  showReportTrackingBtn = false,
  showTutorialBtn = false,
  startIntro,
}) => {
  const { user, logout } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleSearchFocus = () => {
    const examFormElement = document.getElementById("ExamForm");
    if (examFormElement) {
      examFormElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <>
      <div className={`navBarTopPart ${isScrolled ? "scrolledNav" : ""}`}>
        <div className="logoPart">
          <Link to="/">
            <img src="/assets/images/logo2.png" alt="لوگو" />
          </Link>
        </div>

        <div className="navbarLeftPart">
          {showTutorialBtn && (
            <button className="navTotarialBtn" onClick={startIntro}>
              راهنمای سامانه
              {/* <FaQuestion />   */}
            </button>
          )}
          {!hideJobSearch && (
            <div className="jobSearchBtn" id="jobSearchBtn">
              <button onFocus={handleSearchFocus}>جست و جوی مشاغل</button>
            </div>
          )}

          {!hideRepotBtn && user && (
            <div className="jobSearchBtn" id="reportBtn">
              <Link to="/ReportForm">
                <button>ثبت اعتراض</button>
              </Link>
            </div>
          )}

          {showReportTrackingBtn && (
            <div className="jobSearchBtn">
              <button>
                <Link to="/ReportTracking">پیگیری اعتراض</Link>
              </button>
            </div>
          )}

          {user ? (
            <div className="userProfile">
              <div className="user-info"> 
                <div className="docNotifNum">1</div>
                <img
                  src="/assets/images/shxfdb.jpg"
                  alt=""
                  className="user-avatar"
                />
                <div className="user-details">
                  <span className="user-name">محمد معروفی</span>
                </div>
              </div>

              <div className="topNavDropdown-menu">
                <Link to="/profile" className="goToProfileBtn">
                <span className="docNotifNum">1</span>
                  <FaUser /> حساب کاربری
                </Link>
                <button className="exit" onClick={handleLogout}>
                  <FaSignOutAlt /> خروج
                </button>
              </div>
            </div>
          ) : (
            <div className="logInPart">
              <Link to="/logIn">
                <button>ورود به حساب کاربری</button>
              </Link>
            </div>
          )}
        </div>

        <div className="hamburger" onClick={toggleSidebar}>
          <GiHamburgerMenu />
        </div>
        <div className="responsiveLogo">
          <Link to="/">
            <img src="/assets/images/logo2.png" alt="" />
          </Link>
        </div>
      </div>
      <ResponsiveNavbarTop
        isSidebarOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
        user={user}
        logout={handleLogout}
        showReportTrackingBtn={showReportTrackingBtn}
        hideJobSearch={hideJobSearch}
        handleSearchFocus={handleSearchFocus}
        hideRepotBtn={hideRepotBtn}
      />
    </>
  );
};
export default NavbarTop;
