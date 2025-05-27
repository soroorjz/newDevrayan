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
          <h1>سامانه‌ی جامع اطلاع‌رسانی و ثبت‌نام آزمون‌های استخدامی</h1>

          <p>
            <FaCheck />
            دسترسی یکپارچه به آزمون‌های استخدامی در بستری جامع
          </p>
          <p>
            <FaCheck />
            نمایش هوشمند فرصت‌های شغلی متناسب با مشخصات هر متقاضی
          </p>
          <p>
            <FaCheck />
            ثبت‌نام آسان و سریع با اطلاعات به‌روز و دقیق
            
          </p>
        </div>
      </div>
    </div>
  );
};

export default Banner;
