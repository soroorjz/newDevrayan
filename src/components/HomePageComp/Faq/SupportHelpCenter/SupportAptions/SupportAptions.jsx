import React, { useState } from "react";
import "./SupportAptions.scss";
import OnlineChat from "./OnlineChat/OnlineChat";
import PhoneSupport from "./PhoneSupport/PhoneSupport";
import GuideCards from "./GuideCards/GuideCards";
import ExpressiveSupport from "./ExpressiveSupport/ExpressiveSupport";
const SupportAptions = ({ onSelectOption, resetState }) => {
  const [selectedOption, setSelectedOption] = useState("");

  const handleOptionClick = (option) => {
    setSelectedOption(option);
  };

  const handleReturnToHelpCenter = () => {
    setSelectedOption("");
    onSelectOption(null);
    resetState();
  };

  const supportOptions = [
    { title: "درخواست تماس", image: "/assets/images/phone-support.png" },
    { title: "پشتیبانی گویا", image: "/assets/images/online-support.png" },
    { title: "چت آنلاین", image: "/assets/images/Online-chat.png" },
    { title: "پشتیبانی پیامکی", image: "/assets/images/sms-support.png" },
    { title: "راهنمای تصویری", image: "/assets/images/guide.png" },
  ];
  const handleBack = () => {
    setSelectedOption("");
  };
  const supportComponents = {
    "درخواست تماس": (
      <PhoneSupport
        title="جهت دریافت پشتیبانی تماس، شماره همراه خود را وارد نمایید."
        defaultMethod="تماس تلفنی"
      />
    ),
    "پشتیبانی گویا": <ExpressiveSupport />,
    "چت آنلاین": <OnlineChat />,
    "پشتیبانی پیامکی": (
      <PhoneSupport
        title="جهت دریافت پشتیبانی پیامکی، شماره همراه خود را وارد نمایید."
        defaultMethod="پیامکی"
      />
    ),
    "راهنمای تصویری": <GuideCards />,
  };
  if (selectedOption) {
    return (
      <div className="support-detail">
        {supportComponents[selectedOption]}
        <button className="back-button" onClick={handleBack}>
          بازگشت
        </button>
      </div>
    );
  }
  return (
    <div className="support-form">
      <h2 className="supportForm-Title">
        {" "}
        روش پشتیبانی موردنظرتان را انتخاب کنید.{" "}
      </h2>
      <div className="support-buttons">
        {supportOptions.map((option) => (
          <button
            key={option.title}
            className={`support-button ${
              selectedOption === option.title ? "active" : ""
            }`}
            onClick={() => handleOptionClick(option.title)}
          >
            <img
              src={option.image}
              alt={option.title}
              className="button-icon"
            />
          </button>
        ))}
      </div>
      <button
        className="SupportAptions-back-button"
        onClick={handleReturnToHelpCenter}
      >
        بازگشت
      </button>
    </div>
  );
};
export default SupportAptions;
