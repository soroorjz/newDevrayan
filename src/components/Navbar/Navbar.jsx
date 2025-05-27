import { useEffect, useMemo, useState } from "react";
import "./Navbar.scss";
import {
  FaTasks,
  FaSearch,
  FaNewspaper,
  FaQuestionCircle,
  FaPhone,
} from "react-icons/fa";
import { IoHome } from "react-icons/io5";

const Navbar = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 900);

  const menuItems = useMemo(
    () => [
      { icon: <IoHome />, text: "خانه", target: "home" },
      { icon: <FaTasks />, text: "آزمون‌ها", target: "ExamCardPart" },
      { icon: <FaSearch />, text: "آزمون‌یاب", target: "ExamForm" },
      { icon: <FaNewspaper />, text: "اخبار", target: "NewsComp" },
      { icon: <FaQuestionCircle />, text: "سوالات متداول", target: "Faq" },
      { icon: <FaPhone />, text: "تماس با ما", target: "footer" },
    ],
    []
  );

  const handleScroll = (targetId, index) => {
    setActiveIndex(index);
    const element = document.getElementById(targetId);
    if (element) {
      const elementRect = element.getBoundingClientRect();
      const elementHeight = elementRect.height;
      const windowHeight = window.innerHeight;
      const offset = (windowHeight - elementHeight) / 2;

      const scrollPosition = elementRect.top + window.scrollY - offset;

      window.scrollTo({
        top: scrollPosition,
        behavior: "smooth",
      });
    } else {
      console.warn(`المان با آیدی ${targetId} پیدا نشد!`);
    }
  };

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 900);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const handleActiveSection = () => {
      let currentIndex = null;
      menuItems.forEach((item, index) => {
        const section = document.getElementById(item.target);
        if (section) {
          const rect = section.getBoundingClientRect();
          if (
            rect.top <= window.innerHeight / 2 &&
            rect.bottom >= window.innerHeight / 2
          ) {
            currentIndex = index;
          }
        }
      });
      setActiveIndex(currentIndex);
    };

    window.addEventListener("scroll", handleActiveSection);
    return () => window.removeEventListener("scroll", handleActiveSection);
  }, [menuItems]);

  return (
    <div className="navbar-container">
      {!isMobile && (
        <div className="sidebarNav">
          {menuItems.map((item, index) => (
            <li
              id={`menuItem-${index}`}
              key={index}
              className={`menu-item ${activeIndex === index ? "active" : ""}`}
              onClick={() => handleScroll(item.target, index)}
            >
              {item.icon}
              <span
                className={`menu-text ${
                  activeIndex === index ? "active-text" : ""
                }`}
              >
                {item.text}
              </span>
            </li>
          ))}
        </div>
      )}

      {isMobile && (
        <div className="bottomNav">
          {menuItems.map((item, index) => (
            <li
              key={index}
              className={`menu-item ${activeIndex === index ? "active" : ""}`}
              onClick={() => handleScroll(item.target, index)}
            >
              {item.icon}
              <span
                className={`menu-text ${
                  activeIndex === index ? "active-text" : ""
                }`}
              >
                {item.text}
              </span>
            </li>
          ))}
        </div>
      )}
    </div>
  );
};

export default Navbar;
