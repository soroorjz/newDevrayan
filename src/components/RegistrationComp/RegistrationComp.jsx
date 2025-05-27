import React, { useState } from "react";
import { useLocation } from "react-router-dom"; // برای خواندن query parameters
import SelectRegion from "./RegistrationCompSteps/SelectRegion";
import FinalConfirmation from "./RegistrationCompSteps/FinalConfirmation";
import "./RegistrationComp.scss";
import JobLocSelect from "./RegistrationCompSteps/JobLocSelect";
import ConfirmInfo from "./RegistrationCompSteps/ConfirmInfo";
import ExamLocation from "./RegistrationCompSteps/ExamLocation";
import Receipt from "../SignUpFormComp/SignUpStepper/Receipt/Receipt";

const RegistrationComp = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search); 
  const fromExam = queryParams.get("from") === "exam"; // بررسی اینکه آیا از ExamFormResult  اومده
  const examId = queryParams.get("examId"); // دریافت examId در صورت نیاز

  const [currentStep, setCurrentStep] = useState(fromExam ? 2 : 1); // شروع از مرحله 2 اگر از ExamFormResult باشد
  const [showModal, setShowModal] = useState(false);
  const [gender, setGender] = useState(null);
  const persianNumbers = ["۱", "۲", "۳", "۴", "۵"];

  const steps = [
    "انتخاب شغل محل",
    "وضعیت محل آزمون ",
    "وضعیت محل سکونت",
    "تأیید مشخصات",
    "تأیید نهایی و پرداخت",
  ];

  const handleNextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePreviousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleFinalSubmit = () => {
    setShowModal(true);
    setTimeout(() => {
      setShowModal(false);
    }, 3000);
  };

  const renderContent = () => {
    switch (currentStep) {
      case 1:
        return <JobLocSelect onNext={handleNextStep} setGender={setGender} />;
      case 2:
        return (
          <ExamLocation
            onNext={handleNextStep}
            handlePreviousStep={handlePreviousStep}
          />
        );
      case 3:
        return (
          <SelectRegion
            onNext={handleNextStep}
            handlePreviousStep={handlePreviousStep}
          />
        );
      case 4:
        return (
          <ConfirmInfo
            onNext={handleNextStep}
            handlePreviousStep={handlePreviousStep}
          />
        );
      case 5:
        return (
          <FinalConfirmation
            onFinalSubmit={handleFinalSubmit}
            handlePreviousStep={handlePreviousStep}
            gender={gender}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="registration-stepper-container">
      <div className="registration-stepper">
        {steps.map((step, index) => (
          <div
            key={index}
            className={`registration-step ${
              index + 1 <= currentStep ? "active" : ""
            }`}
          >
            <div className="registration-step-number">
              {persianNumbers[index]}
            </div>
            <div className="registration-step-label">{step}</div>
          </div>
        ))}
      </div>
      <div className="registration-step-content">{renderContent()}</div>
      {showModal && (
        <div className="registration-modal-overlay">
          <div className="registration-modal-content">
            <Receipt />
          </div>
        </div>
      )}
    </div>
  );
};

export default RegistrationComp;
