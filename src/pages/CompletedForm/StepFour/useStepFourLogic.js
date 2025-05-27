import { useState, useEffect } from "react";
import { validateFile } from "./fileValidation";

const defaultData = {
  idCard: "/assets/images/idCard.png",
  degree: "/assets/images/fa.png",
  birthCertPage1: "/assets/images/hghj.png",
  birthCertPage2: "/assets/images/page2.png",
  birthCertOtherPages: "/assets/images/shxfdb.jpg",
  otherDocs: "/assets/images/page2.png",
};

export const useStepFourLogic = ({ onNext, onPrevious }) => {
  const [formData, setFormData] = useState(() => {
    const savedData = localStorage.getItem("stepFourData");
    return savedData ? JSON.parse(savedData) : defaultData;
  });

  const [isEditable, setIsEditable] = useState(false);
  const [errors, setErrors] = useState({});

  const handleFileChange = (e, field) => {
    const file = e.target.files[0];
    if (file) {
      const validationError = validateFile(file);
      console.log(`Validation result for ${field}:`, validationError); // برای دیباگ
      if (validationError) {
        setErrors((prev) => {
          const newErrors = { ...prev, [field]: validationError };
          console.log("Updated errors:", newErrors); // برای دیباگ
          return newErrors;
        });
      } else {
        const fileURL = URL.createObjectURL(file);
        setFormData((prevData) => ({
          ...prevData,
          [field]: fileURL,
        }));
        setErrors((prev) => {
          const newErrors = { ...prev };
          delete newErrors[field]; // خطا رو پاک کن اگه فایل معتبر باشه
          console.log("Cleared error for", field, "New errors:", newErrors); // برای دیباگ
          return newErrors;
        });
      }
    }
  };

  const handleNext = (e) => {
    e.preventDefault();
    console.log("Current errors before next:", errors); // برای دیباگ
    if (Object.keys(errors).length === 0) {
      localStorage.setItem("stepFourData", JSON.stringify(formData));
      if (onNext) onNext();
    } else {
      console.log("Cannot proceed due to errors:", errors);
    }
  };

  const handlePrevious = (e) => {
    e.preventDefault();
    localStorage.setItem("stepFourData", JSON.stringify(formData));
    if (onPrevious) onPrevious();
  };

  const toggleEdit = () => {
    if (isEditable) {
      console.log("Saving with errors:", errors); // برای دیباگ
      if (Object.keys(errors).length === 0) {
        localStorage.setItem("stepFourData", JSON.stringify(formData));
        setIsEditable(false);
      }
    } else {
      setIsEditable(true);
    }
  };

  useEffect(() => {
    if (!localStorage.getItem("stepFourData")) {
      localStorage.setItem("stepFourData", JSON.stringify(formData));
    }
  }, []);

  return {
    formData,
    isEditable,
    errors,
    handleFileChange,
    handleNext,
    handlePrevious,
    toggleEdit,
  };
};