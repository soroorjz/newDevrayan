import React, { useEffect, useRef, useState } from "react";
import "./ProfileHeader.scss";
import { RiLockPasswordLine } from "react-icons/ri";

import { FaSignOutAlt, FaAngleDown } from "react-icons/fa";
import { MdAccountCircle } from "react-icons/md";
import { Link, useNavigate } from "react-router";
const ProfileHeader = () => {
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null); // تعریف ref برای دراپ‌داون

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
    window.location.reload();
  };

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  // بستن دراپ‌داون هنگام کلیک بیرون از آن
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    if (isDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDropdownOpen]);

  return (
    <div className="ProfileHeader">
      <div className="ProfileHeader-Wrapper">
        <div className="ProfileHeader-rightPart">
          <Link to="/">
            <img src="/assets/images/logo2.png" alt="" />
          </Link>
        </div>

        <div className="leftPart" ref={dropdownRef}>
        
          <button className="user-btn" onClick={toggleDropdown}>
            محمد معروفی
            <FaAngleDown
              className={`dropdown-icon ${isDropdownOpen ? "open" : ""}`}
            />
          </button>
          <div className="profileImg">
            {/* <MdAccountCircle /> */}
            <img src="/assets/images/shxfdb.jpg" alt="" />
          </div>

          {isDropdownOpen && (
            <div className="dropdown-menu">
              <button className="logout-btn" onClick={handleLogout}>
                خروج
                <FaSignOutAlt />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default ProfileHeader;
