import React from 'react'
import "./ExamInfoSkeleton.scss"
const ExamInfoSkeleton = () => {
    return (
        <div className="skeleton-container">
          {/* هدر با دو دکمه */}
          <div className="skeleton-header">
            <div className="skeleton-btn"></div>
            <div className="skeleton-btn"></div>
          </div>
    
          {/* باکس‌های اطلاعاتی */}
          <div className="skeleton-info-boxes">
            <div className="skeleton-info-box"></div>
            <div className="skeleton-info-box"></div>
            <div className="skeleton-info-box"></div>
            <div className="skeleton-info-box"></div>
          </div>
    
          {/* دکمه‌های پایین */}
          <div className="skeleton-actions">
            <div className="skeleton-action-btn"></div>
            <div className="skeleton-action-btn"></div>
            <div className="skeleton-action-btn"></div>
            <div className="skeleton-action-btn"></div>
          </div>
    
          {/* عنوان و متن‌ها */}
          <div className="skeleton-content">
            <div className="skeleton-title"></div>
            <div className="skeleton-text"></div>
            <div className="skeleton-text"></div>
            <div className="skeleton-text"></div>
            <div className="skeleton-text"></div>
            <div className="skeleton-text"></div>
            <div className="skeleton-text"></div>
          </div>
        </div>
      );
    };

export default ExamInfoSkeleton
