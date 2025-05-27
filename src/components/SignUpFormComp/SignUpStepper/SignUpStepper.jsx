import React, { useState, useEffect } from "react";
import "./SignUpStepper.scss";
import SignUpForm from "../SignUpForm";
import EducationForm from "./EducationForm/EducationForm";
import ContactForm from "./ContactForm/ContactForm";
import BackgroundForm from "./BackgroundForm/BackgroundForm";
import FileInput from "../FileInput";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";
import axios from "axios";

const SignUpStepper = ({
  initialData,
  successMessage,
  redirectAfterSubmit = true,
}) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [allFormData, setAllFormData] = useState({});
  const [gender, setGender] = useState(null);
  const persianNumbers = ["۱", "۲", "۳", "۴", "۵"];
  const navigate = useNavigate();
  const steps = [
    "اطلاعات فردی",
    "اطلاعات تحصیلی",
    "اطلاعات محل سکونت",
    "بارگذاری تصاویر",
    "سوابق",
  ];

  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem("signupData")) || {};
    setAllFormData(savedData);
  }, []);

  const updateFormData = (stepData, stepKey) => {
    const updatedData = { ...allFormData, [stepKey]: stepData };
    setAllFormData(updatedData);
    localStorage.setItem("signupData", JSON.stringify(updatedData));
  };

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

  const handleFinalSubmit = async () => {
    try {
      const token = localStorage.getItem("RayanToken");
      if (!token) {
        throw new Error("توکن نگرفت");
      }

      const apiData = {
        preRegisterFirstName: allFormData.step1?.firstName || "",
        preRegisterLastName: allFormData.step1?.lastName || "",
        preRegisterNationalCode: allFormData.step1?.nationalCode || "",
      };
      console.log("Data being sent to API:", apiData);

      const response = await axios.post(
        "https://smp.devrayan.ir/api/preregisters",
        apiData,
        {
          headers: {
            "RAYAN-TOKEN": token,
            "RAYAN-DEBUG": true,
          },
        }
      );
      console.log("Response from API:", response.data);

      localStorage.removeItem("signupData");

      Swal.fire({
        title: "ثبت نام شما با موفقیت انجام شد",
        text: `نام کاربری و رمزعبور، کد ملی شما می‌باشد. ID ثبت‌شده: ${
          response.data.preRegisterId || "نامشخص"
        }`,
        icon: "success",
        confirmButtonText: "تأیید",
        confirmButtonColor: "#04364a",
      }).then((result) => {
        if (result.isConfirmed && redirectAfterSubmit) {
          navigate("/logIn");
        }
      });
    } catch (error) {
      console.error("Error posting data:", error.response || error);
      Swal.fire({
        title: "خطا",
        text:
          error.response?.data?.message ||
          error.message ||
          "مشکلی در ثبت‌نام پیش آمد.",
        icon: "error",
      });
    }
  };

  const renderContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <SignUpForm
            initialData={initialData}
            onNext={handleNextStep}
            setGender={setGender}
            updateFormData={updateFormData}
            savedData={allFormData.step1 || {}}
          />
        );
      case 2:
        return (
          <EducationForm
            handlePreviousStep={handlePreviousStep}
            onNext={handleNextStep}
            updateFormData={updateFormData}
            savedData={allFormData.step2 || {}}
          />
        );
      case 3:
        return (
          <ContactForm
            handlePreviousStep={handlePreviousStep}
            onNext={handleNextStep}
            updateFormData={updateFormData}
            savedData={allFormData.step3 || {}}
          />
        );
      case 4:
        return (
          <FileInput
            handlePreviousStep={handlePreviousStep}
            onNext={handleNextStep}
            updateFormData={updateFormData}
            savedData={allFormData.step4 || {}}
          />
        );
      case 5:
        return (
          <BackgroundForm
            handlePreviousStep={handlePreviousStep}
            onFinalSubmit={handleFinalSubmit}
            gender={gender}
            updateFormData={updateFormData}
            savedData={allFormData.step5 || {}}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="stepper-container">
      <div className="stepper">
        {steps.map((step, index) => (
          <div
            key={index}
            className={`step ${index + 1 <= currentStep ? "active" : ""}`}
          >
            <div className="step-number">{persianNumbers[index]}</div>
            <div className="step-label">{step}</div>
          </div>
        ))}
      </div>
      <div className="step-content">{renderContent()}</div>
    </div>
  );
};

export default SignUpStepper;
