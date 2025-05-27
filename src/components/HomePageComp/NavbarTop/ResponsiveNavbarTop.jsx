import React, { useEffect, useRef } from "react";
import { FaUser, FaSignOutAlt } from "react-icons/fa";
import { FaCircleUser } from "react-icons/fa6";
import { Link } from "react-router-dom";

const ResponsiveNavbarTop = ({
  isSidebarOpen,
  toggleSidebar,
  user,
  logout,
  hideJobSearch,
  handleSearchFocus,
  hideRepotBtn,
  showReportTrackingBtn,
}) => {
  const sidebarRef = useRef(null);

  // بستن سایدبار با کلیک بیرون
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        isSidebarOpen &&
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target)
      ) {
        toggleSidebar();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isSidebarOpen, toggleSidebar]);

  const handleJobSearchClick = () => {
    handleSearchFocus();
    toggleSidebar();
  };

  return (
    <>
      <div
        className={`sidebar-overlay ${isSidebarOpen ? "open" : ""}`}
        onClick={toggleSidebar}
      />
      <div
        ref={sidebarRef}
        className={`sidebar ${isSidebarOpen ? "open" : ""}`}
      >
        <button className="close-sidebar" onClick={toggleSidebar}>
          ×
        </button>
        <div className="sidebar-content">
          {user ? (
            <div className="responsive-userProfile">
              <div className="responsive-user-info">
                {/* <FaCircleUser className="responsive-user-avatar" /> */}
                <img
                  src="/assets/images/shxfdb.jpg"
                  alt=""
                  className="responsive-user-avatar"
                />
                <div className="responsive-user-details">
                  <span className="responsive-user-name">محمد معروفی</span>
                </div>
              </div>

              <div className="responsive-dropdown-menu">
                <Link to="/profile">
                  <FaUser /> حساب کاربری
                </Link>
                <button className="responsive-exit" onClick={logout}>
                  <FaSignOutAlt /> خروج
                </button>
              </div>
            </div>
          ) : (
            <Link to="/logIn">
              <button className="sidebar-login-button">
                ورود به حساب کاربری
              </button>
            </Link>
          )}

          {!hideJobSearch && (
            <button className="jobSearchBtn" onClick={handleJobSearchClick}>
              جست و جوی مشاغل
            </button>
          )}

          {!hideRepotBtn && user && (
            <div className="sideBar-JobSearchBtn">
              <Link to="/ReportForm">
                <button>ثبت اعتراض</button>
              </Link>
            </div>
          )}
          {showReportTrackingBtn && (
            <div className="sideBar-JobSearchBtn">
              <button>
                <Link to="/ReportTracking">پیگیری اعتراض</Link>
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ResponsiveNavbarTop;
