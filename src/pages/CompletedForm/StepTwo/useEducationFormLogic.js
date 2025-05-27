import { useState, useEffect } from "react";

export const useEducationFormLogic = ({ onNext }) => {
  const [formData, setFormData] = useState(() => {
    const savedData = localStorage.getItem("educationData");
    return savedData
      ? JSON.parse(savedData)
      : {
          degree: "کارشناسی", // مقطع تحصیلی
          universityType: "دولتی", // نوع دانشگاه
          graduationDate: "1398/06/15", // تاریخ فارغ‌التحصیلی
          gpa: "17.5", // معدل
        };
  });

  const [isEditable, setIsEditable] = useState(false);
  const [errors, setErrors] = useState({});

  const validateForm = (name, value) => {
    let newErrors = { ...errors };
    const today = new Date();

    if (name === "graduationDate" && value) {
      const gradDate = new Date(value.replace(/\//g, "-"));
      if (gradDate > today) {
        newErrors[name] = "تاریخ فارغ‌التحصیلی نمی‌تواند در آینده باشد";
      } else {
        delete newErrors[name];
      }
    }

    if (name === "gpa" && value) {
      const gpaValue = parseFloat(value);
      if (isNaN(gpaValue) || gpaValue < 0 || gpaValue > 20) {
        newErrors[name] = "معدل باید بین 0 و 20 باشد";
      } else {
        delete newErrors[name];
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    if (isEditable) validateForm(name, value);
  };

  const handleDateChange = (date) => {
    const formattedDate = date ? date.format("YYYY/MM/DD") : "";
    setFormData((prevData) => ({
      ...prevData,
      graduationDate: formattedDate,
    }));
    if (isEditable) validateForm("graduationDate", formattedDate);
  };

  const toggleEdit = () => {
    if (isEditable) {
      localStorage.setItem("educationData", JSON.stringify(formData));
    }
    setIsEditable(!isEditable);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (Object.keys(errors).length === 0 && onNext) {
      localStorage.setItem("educationData", JSON.stringify(formData));
      onNext();
    }
  };

  useEffect(() => {
    if (!localStorage.getItem("educationData")) {
      localStorage.setItem("educationData", JSON.stringify(formData));
    }
  }, []);

  return {
    formData,
    isEditable,
    errors,
    handleChange,
    handleDateChange,
    toggleEdit,
    handleSubmit,
  };
};
