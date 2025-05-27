import React from "react";
import "./GuideCards.scss";

const guideData = [
  {
    id: 1,
    title: "راهنمای ثبت نام در سامانه (PDF)",
    image: "/assets/images/sabtnam-dar-samane.png",
  },
  {
    id: 2,
    title: "راهنمای استفاده از پنل کاربری (PDF)",
    image:
      "/assets/images/emkanat-vizhe-panel-karbari-modiran-amozesh-sazman-ha.png",
  },
  {
    id: 3,
    title: "راهنمای ورود به سامانه  (PDF)",
    image: "/assets/images/vorod-samane.png",
  },
  {
    id: 4,
    title: "راهنمای تحویل و ارسال پروژه ها(pdf)",
    image: "/assets/images/rahnamaye-tahvil-proje.png",
  },
  {
    id: 5,
    title: "راهنمای بازیابی رمز عبور (PDF)",
    image: "/assets/images/bazyabi-ramz-obor.png",
  },
  {
    id: 6,
    title: "راهنمای شرکت در پیش آزمون(pdf)",
    image: "/assets/images/sharkat-dar-azmon.png",
  },
  {
    id: 7,
    title: " راهنمای مشاهده ی محتوا	آموزشی(pdf)",
    image: "/assets/images/vorod-dore.png",
  },
  {
    id: 8,
    title: "راهنمای شرکت در پرسش و پاسخ(pdf)",
    image: "/assets/images/vorod-dore.png",
  },
  {
    id: 9,
    title: " راهنمای شرکت در آزمون نهایی (pdf)",
    image: "/assets/images/sharkat-dar-azmon.png",
  },
  {
    id: 10,
    title: "راهنمای مشاهده وضعیت درخواست (PDF)",
    image: "/assets/images/sharkat-dar-azmon.png",
  },
];

const GuideCards = () => {
  return (
    <div className="guideCards">
      <h2> پشتیبانی تصویری</h2>
      <div className="guide-container">
        {guideData.map((guide) => (
          <div key={guide.id} className="guide-card">
            <img src={guide.image} alt={guide.title} className="guide-image" />
            <button className="guide-button">{guide.title}</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GuideCards;
