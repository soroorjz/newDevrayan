import React from "react";
import "./Banner.scss";
import { FaCheck } from "react-icons/fa";
const Banner = () => {
  return (
    <div className="bannerPart">
      <div className="banner_ImagePart">
        <img src="/assets/images/Examing2.jpg" alt="" />
      </div>
      <div className="banner-SloganPart">
        <div className="sloganTitle">
          <h1>سامانه‌ی جامع آموزش، تربیت و توسعه  
            <p>
               پانصد مدیر جوان 
            </p>
          </h1>

          <p>
            <FaCheck />
           فرآیند سنجش هوشمند: آزمون‌های استانداردشده بر اساس معیارهای شایستگی عمومی و اختصاصی.
          </p>
          <p>
            <FaCheck />
            هماهنگی کامل با برنامه تربیت پانصد مدیر: تطابق دقیق با فرآیندهای مصوب شورای عالی اداری.
          </p>
          <p>
            <FaCheck />
            پیشنهاد شغل متناسب با پروفایل کاربر: نمایش فرصت‌های مدیریتی بر اساس مهارت‌ها و سوابق افراد.
            
          </p>
        </div>
      </div>
    </div>
  );
};

export default Banner;
