//#region for dynamic
// import React, { useState, useEffect } from "react";
// import "./CountDown.scss";
// import { Link } from "react-router-dom";
// import { useAuth } from "../../../AuthContext";

// const Countdown = ({ registrationDeadline, startDate }) => {
//   const { user } = useAuth();

//   const toPersianNumbers = (num) => num.toLocaleString("fa-IR");
//   const [timeLeft, setTimeLeft] = useState(null);

//   const calculateTimeLeft = () => {
//     const difference = new Date(registrationDeadline) - new Date();
//     if (difference > 0) {
//       return {
//         days: Math.floor(difference / (1000 * 60 * 60 * 24)),
//         hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
//         minutes: Math.floor((difference / 1000 / 60) % 60),
//         seconds: Math.floor((difference / 1000) % 60),
//       };
//     }
//     return null;
//   };

//   useEffect(() => {
//     if (!registrationDeadline || !startDate) return;

//     const now = new Date();
//     if (now >= new Date(startDate) && now <= new Date(registrationDeadline)) {
//       setTimeLeft(calculateTimeLeft());
//       const timer = setInterval(() => {
//         setTimeLeft(calculateTimeLeft());
//       }, 1000);

//       return () => clearInterval(timer);
//     }
//   }, [registrationDeadline, startDate]);

//   const now = new Date();
//   const isBeforeStart = startDate && now < new Date(startDate);
//   const isAfterEnd =
//     registrationDeadline && now > new Date(registrationDeadline);

//   if (!registrationDeadline || !startDate) {
//     return <div className="countdown">در انتظار دریافت تاریخ...</div>;
//   }

//   if (isBeforeStart) {
//     return <div className="countdown">ثبت‌نام آغاز نشده است!</div>;
//   }

//   if (isAfterEnd || !timeLeft) {
//     return <div className="countdown">مهلت ثبت‌نام به پایان رسیده است!</div>;
//   }

//   return (
//     <div className="countdown">
//       <h2>مهلت ثبت‌نام در آزمون:</h2>
//       <div className="countdown-timer">
//         <div className="countdown-item">
//           <span className="countdown-value">
//             {toPersianNumbers(timeLeft.days)}
//           </span>
//           <span className="countdown-label">روز</span>
//         </div>
//         <div className="countdown-item">
//           <span className="countdown-value">
//             {toPersianNumbers(timeLeft.hours)}
//           </span>
//           <span className="countdown-label">ساعت</span>
//         </div>
//         <div className="countdown-item">
//           <span className="countdown-value">
//             {toPersianNumbers(timeLeft.minutes)}
//           </span>
//           <span className="countdown-label">دقیقه</span>
//         </div>
//         <div className="countdown-item">
//           <span className="countdown-value">
//             {toPersianNumbers(timeLeft.seconds)}
//           </span>
//           <span className="countdown-label">ثانیه</span>
//         </div>
//       </div>
//       <Link
//         to={user ? "/RegistrationPage" : "/logIn"}
//         className="examSignUpbtn"
//         id="RegistrationBtn"
//       >
//         ثبت‌نام
//       </Link>
//     </div>
//   );
// };

// export default Countdown;


//#endregionendregion

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../../AuthContext";
import "./CountDown.scss";

// تابع تبدیل تاریخ شمسی به میلادی با دقت بهتر
const parsePersianDate = (persianDate) => {
  if (!persianDate) return null;
  // فرمت: "1404/03/01"
  const [year, month, day] = persianDate.split("/").map(Number);
  
  // تبدیل شمسی به میلادی با تقریب بهتر
  // اختلاف سال شمسی و میلادی حدود 621 تا 622 سال است
  let gregorianYear = year + 621;
  let gregorianMonth = month - 1; // ماه‌های جاوااسکریپت از 0 شروع می‌شن
  let gregorianDay = day;

  // تنظیم برای ماه‌های مختلف (تقویم شمسی و میلادی کمی متفاوتن)
  // این مقادیر تقریبی بر اساس اختلاف واقعی تنظیم شدن
  const monthAdjustments = [
    10, // فروردین → حدود 10 روز اختلاف
    11, // اردیبهشت
    12, // خرداد
    13, // تیر
    14, // مرداد
    15, // شهریور
    16, // مهر
    15, // آبان
    14, // آذر
    13, // دی
    12, // بهمن
    11, // اسفند
  ];

  gregorianDay += monthAdjustments[month - 1] || 0;

  // اصلاح سرریز روزها به ماه بعد
  const date = new Date(gregorianYear, gregorianMonth, gregorianDay);
  
  // لاگ برای دیباگ
  console.log(`Parsing ${persianDate} → ${date.toISOString()}`);
  
  return date;
};

const Countdown = ({ registrationDeadline, startDate }) => {
  const { user } = useAuth();
  const [timeLeft, setTimeLeft] = useState(null);

  const calculateTimeLeft = () => {
    const endDate = parsePersianDate(registrationDeadline);
    const now = new Date();
    const difference = endDate - now;
    console.log(`Calculating time left: endDate=${endDate}, now=${now}, difference=${difference}`);
    if (difference > 0) {
      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }
    return null;
  };

  useEffect(() => {
    if (!registrationDeadline || !startDate) return;

    const now = new Date();
    const start = parsePersianDate(startDate);
    const end = parsePersianDate(registrationDeadline);

    console.log("Countdown useEffect:", {
      now: now.toISOString(),
      start: start?.toISOString(),
      end: end?.toISOString(),
      isActive: start && end && now >= start && now <= end,
    });

    if (!start || !end) return;

    // اگر امروز بین startDate و endDate باشه، شمارش معکوس رو شروع کن
    if (now >= start && now <= end) {
      setTimeLeft(calculateTimeLeft());
      const timer = setInterval(() => {
        setTimeLeft(calculateTimeLeft());
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [registrationDeadline, startDate]);

  const now = new Date();
  const start = parsePersianDate(startDate);
  const end = parsePersianDate(registrationDeadline);

  if (!registrationDeadline || !startDate || !start || !end) {
    return <div className="countdown">در انتظار دریافت تاریخ...</div>;
  }

  if (now < start) {
    console.log("Registration not started:", { now, start });
    return <div className="countdown">ثبت‌نام آغاز نشده است!</div>;
  }

  if (now > end || !timeLeft) {
    console.log("Registration ended:", { now, end, timeLeft });
    return <div className="countdown">مهلت ثبت‌نام به پایان رسیده است!</div>;
  }

  console.log("Showing countdown:", timeLeft);

  return (
    <div className="countdown">
      <h2>مهلت ثبت‌نام در آزمون:</h2>
      <div className="countdown-timer">
        <div className="countdown-item">
          <span className="countdown-value">{timeLeft.days}</span>
          <span className="countdown-label">روز</span>
        </div>
        <div className="countdown-item">
          <span className="countdown-value">{timeLeft.hours}</span>
          <span className="countdown-label">ساعت</span>
        </div>
        <div className="countdown-item">
          <span className="countdown-value">{timeLeft.minutes}</span>
          <span className="countdown-label">دقیقه</span>
        </div>
        <div className="countdown-item">
          <span className="countdown-value">{timeLeft.seconds}</span>
          <span className="countdown-label">ثانیه</span>
        </div>
      </div>
      <Link
        to={user ? "/RegistrationPage" : "/logIn"}
        className="examSignUpbtn"
        id="RegistrationBtn"
      >
        ثبت‌نام
      </Link>
    </div>
  );
};

export default Countdown;