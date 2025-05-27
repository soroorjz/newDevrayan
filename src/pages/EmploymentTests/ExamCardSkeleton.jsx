import React from "react";
import "./ExamCardSkeleton.scss";
const ExamCardSkeleton = () => {
  return (
    <div className="card-skeleton">
      {/* عنوان کارت */}
      <div className="card-skeleton-title"></div>

      {/* دکمه بزرگ */}
      <div className="card-skeleton-large-btn"></div>

      {/* دکمه‌های کوچک */}
      <div className="card-skeleton-small-btns">
        <div className="card-skeleton-small-btn"></div>
        <div className="card-skeleton-small-btn"></div>
        <div className="card-skeleton-small-btn"></div>
      </div>
    </div>
  );
};

export default ExamCardSkeleton;
