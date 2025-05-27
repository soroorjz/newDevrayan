import React from "react";
import "./NotificationList.scss";
import { GoDotFill } from "react-icons/go";

const NotificationList = ({ notifications, endDate, examName }) => {
  const currentDate = "1403-12-19";

  const isExamDatePassed = (examDate) => {
    return examDate < currentDate;
  };

  const updatedNotifications = notifications.map((notification) => ({
    ...notification,
    title: notification.title.replace(/آزمون/g, examName),
  }));

  const examPassed = isExamDatePassed(endDate);
  const newNotification = {
    date: currentDate,
    timeAgo: "به تازگی",
    title: examPassed
      ? `نتایج ${examName} کتبی اعلام شد.`
      : `ثبت‌نام  ${examName} آغاز شد.`,
    isImportant: true,
  };

  const finalNotifications = [newNotification, ...updatedNotifications];

  return (
    <div className="notification-list-container">
      {finalNotifications.map((notification, index) => (
        <div key={index} className="notification-list-item">
          <div className="notification-list-item__icon">
            <span className="notification-list-item__count">
              <GoDotFill />
            </span>
          </div>
          <div className="notification-list-item__content">
            {notification.downloadLink ? (
              <a
                href={notification.downloadLink}
                className="notification-list-item__text"
                download // این ویژگی باعث دانلود مستقیم می‌شه
                target="_blank" // اختیاری: برای باز شدن در تب جدید در صورت نیاز
                rel="noopener noreferrer"
              >
                {notification.title}{" "}
                <small className="notification-list-item__download-label">
                  (دریافت)
                </small>
              </a>
            ) : (
              <span className="notification-list-item__text">
                {notification.title}
              </span>
            )}
            <span className="notification-list-item__time">
              {notification.timeAgo}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default NotificationList;
