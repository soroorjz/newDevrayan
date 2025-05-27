import React, { useEffect, useRef, useState } from "react";
import "./EmploymentTestsIcons.scss";
import { LuClipboardPenLine, LuClipboardX } from "react-icons/lu";
import { FaHourglassHalf, FaRegAddressCard } from "react-icons/fa";
import { MdOutlineDownloadDone } from "react-icons/md";
import { HiOutlineSpeakerphone } from "react-icons/hi";
import { BiSolidNoEntry } from "react-icons/bi";
import { FiFilter } from "react-icons/fi";
import { RiLoader2Fill } from "react-icons/ri";
import { FaFileSignature } from "react-icons/fa6";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
// ایمپورت Swiper
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

const EmploymentTestsIcons = () => {
  const [selected, setSelected] = useState(null);
  const [isClickScroll, setIsClickScroll] = useState(false);
  const swiperRef = useRef(null); // برای دسترسی به Swiper
  const [isMobile, setIsMobile] = useState(window.innerWidth < 900);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 900);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (!isClickScroll) {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const id = entry.target.id;
              setSelected(id);
              const index = items.findIndex((item) => item.id === id);
              if (swiperRef.current && swiperRef.current.swiper) {
                swiperRef.current.swiper.slideTo(index);
              }
            }
          });
        }
      },
      {
        root: null,
        rootMargin: "0px",
        threshold: 0.5,
      }
    );

    const targets = document.querySelectorAll(
      "[id^=InProgress], [id^=Registering], [id^=EndOfRegistering], [id^=ExamCard], [id^=Held], [id^=UnderReview], [id^=Announcing], [id^=Filter], [id^=Selection], [id^=Expired]"
    );
    targets.forEach((target) => observer.observe(target));

    return () => {
      targets.forEach((target) => observer.unobserve(target));
    };
  }, [isClickScroll]);

  useEffect(() => {
    if (!swiperRef.current || !swiperRef.current.swiper) return;

    const swiper = swiperRef.current.swiper;
    const updateScrollState = () => {
      setCanScrollLeft(swiper.isBeginning !== true);
      setCanScrollRight(swiper.isEnd !== true);
    };

    updateScrollState();
    swiper.on("slideChange", updateScrollState);

    return () => {
      swiper.off("slideChange", updateScrollState);
    };
  }, []);

  const handleSelect = (id) => {
    setSelected(id);
    setIsClickScroll(true);

    const targetElement = document.getElementById(id);
    if (targetElement) {
      const elementRect = targetElement.getBoundingClientRect();
      const elementHeight = elementRect.height;
      const windowHeight = window.innerHeight;
      const offset = (windowHeight - elementHeight) / 2;

      window.scrollTo({
        top: elementRect.top + window.scrollY - offset,
        behavior: "smooth",
      });

      // اسکرول Swiper به اسلاید انتخاب‌شده
      const index = items.findIndex((item) => item.id === id);
      if (swiperRef.current && swiperRef.current.swiper) {
        swiperRef.current.swiper.slideTo(index);
      }

      setTimeout(() => {
        setIsClickScroll(false);
      }, 1000);
    }
  };

  const handleHorizontalScroll = (direction) => {
    if (swiperRef.current && swiperRef.current.swiper) {
      const swiper = swiperRef.current.swiper;
      if (direction === "left") {
        swiper.slidePrev();
      } else if (direction === "right") {
        swiper.slideNext();
      }
    }
  };

  const items = [
    { id: "InProgress", icon: <FaHourglassHalf />, text: "در انتظار" },
    { id: "Registering", icon: <LuClipboardPenLine />, text: "درحال ثبت‌نام" },
    { id: "EndOfRegistering", icon: <LuClipboardX />, text: "پایان ثبت‌نام" },
    {
      id: "ExamCard",
      icon: <FaRegAddressCard />,
      text: "دریافت کارت ورود به جلسه",
    },
    {
      id: "Held",
      icon: <MdOutlineDownloadDone />,
      text: "آزمون کتبی برگزار شده",
    },
    { id: "UnderReview", icon: <RiLoader2Fill />, text: "درحال بررسی" },
    {
      id: "Announcing",
      icon: <HiOutlineSpeakerphone />,
      text: "درحال اعلام نتایج",
    },
    { id: "Filter", icon: <FaFileSignature />, text: "ارزیابی تکمیلی" },
    { id: "Selection", icon: <FiFilter />, text: "درحال گزینش" },
    { id: "Expired", icon: <BiSolidNoEntry />, text: "پایان آزمون" },
  ];

  return (
    <div className="EmploymentTestsIcons-Wrap">
      {/* <button
        className="scroll-button left"
        onClick={() => handleHorizontalScroll("left")}
        disabled={!canScrollLeft}
      >
        <IoIosArrowBack />
      </button> */}
      <Swiper
        ref={swiperRef}
        modules={[Navigation]}
        spaceBetween={3}
        slidesPerView="auto"
        centeredSlides={false}
        navigation={false}
         className="EmploymentTestsIcons-Container"
      >
        {items.map(({ id, icon, text }) => (
          <SwiperSlide key={id} className="EmploymentTestsIcons-slider">
            <button
              className={`icon-button ${selected === id ? "selected" : ""}`}
              onClick={() => handleSelect(id)}
            >
              {icon}
              <span
                className={`icon-text ${
                  isMobile && selected !== id ? "hidden" : ""
                }`}
              >
                {text}
              </span>
            </button>
          </SwiperSlide>
        ))}
      </Swiper>
      {/* <button
        className="scroll-button right"
        onClick={() => handleHorizontalScroll("right")}
        disabled={!canScrollRight}
      >
        <IoIosArrowForward />
      </button> */}
    </div>
  );
};

export default EmploymentTestsIcons;
