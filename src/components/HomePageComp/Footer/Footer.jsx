import React from "react";
import "./Footer.scss";
import ContactUs from "../ContactUs/ContactUs";
const Footer = () => {
  return (
    <div className="footerPart-Container">
      <div className="footerTitle">
        <h2> با ما در تماس باشید</h2>
      </div>
      <div className="footerTopPart">
        <ContactUs />

        <div className="newsletter-section">
          <h3>خبرنامه ما</h3>
          <p>
            با عضویت در خبرنامه، جدیدترین اخبار و اطلاعیه‌های آزمون‌های استخدامی
            را مستقیماً در ایمیل خود دریافت کنید.
          </p>
          <input type="email" placeholder="ایمیل" className="input email" />
          <br />
          <button className="submit-btn">عضویت</button>
        </div>
        <div className="footer-TrustSymbolPart">
          <img
            src="/assets/images/71073c20-e974-4987-a111-13735d73bb27-removebg-preview.png"
            alt=""
          />
        </div>
      </div>
      <div className="footerBottom">
        <div className="footer-CoyRightPart">
          <p>
            کلیه حقوق این وب‌سایت متعلق به شرکت تعاونی پژوهشگران رایانگان
            می‌باشد. © ۱۴۰۳
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
