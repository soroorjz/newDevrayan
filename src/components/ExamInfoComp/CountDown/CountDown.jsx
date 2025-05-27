import React, { useState, useEffect } from "react";
import "./CountDown.scss";
import { Link } from "react-router-dom";
import { useAuth } from "../../../AuthContext";

const Countdown = ({ registrationDeadline, startDate }) => {
  const { user } = useAuth();

  const toPersianNumbers = (num) => num.toLocaleString("fa-IR");
  const [timeLeft, setTimeLeft] = useState(null);

  const calculateTimeLeft = () => {
    const difference = new Date(registrationDeadline) - new Date();
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
    if (now >= new Date(startDate) && now <= new Date(registrationDeadline)) {
      setTimeLeft(calculateTimeLeft());
      const timer = setInterval(() => {
        setTimeLeft(calculateTimeLeft());
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [registrationDeadline, startDate]);

  const now = new Date();
  const isBeforeStart = startDate && now < new Date(startDate);
  const isAfterEnd =
    registrationDeadline && now > new Date(registrationDeadline);

  if (!registrationDeadline || !startDate) {
    return <div className="countdown">در انتظار دریافت تاریخ...</div>;
  }

  if (isBeforeStart) {
    return <div className="countdown">ثبت‌نام آغاز نشده است!</div>;
  }

  if (isAfterEnd || !timeLeft) {
    return <div className="countdown">مهلت ثبت‌نام به پایان رسیده است!</div>;
  }

  return (
    <div className="countdown">
      <h2>مهلت ثبت‌نام در آزمون:</h2>
      <div className="countdown-timer">
        <div className="countdown-item">
          <span className="countdown-value">
            {toPersianNumbers(timeLeft.days)}
          </span>
          <span className="countdown-label">روز</span>
        </div>
        <div className="countdown-item">
          <span className="countdown-value">
            {toPersianNumbers(timeLeft.hours)}
          </span>
          <span className="countdown-label">ساعت</span>
        </div>
        <div className="countdown-item">
          <span className="countdown-value">
            {toPersianNumbers(timeLeft.minutes)}
          </span>
          <span className="countdown-label">دقیقه</span>
        </div>
        <div className="countdown-item">
          <span className="countdown-value">
            {toPersianNumbers(timeLeft.seconds)}
          </span>
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
