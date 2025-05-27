import { useState, useEffect } from "react";
import {
  fetchToken,
  fetchQuotas,
  fetchMilitaryStatuses,
} from "./StepFiveApi.js";

const defaultData = {
  quota: "آزاد",
  militaryStatus: "پایان خدمت",
  serviceDuration: "24ماه",
  serviceEndDate: "1400/03/25",
};

export const useStepFiveLogic = ({ onNext, onPrevious }) => {
  const [formData, setFormData] = useState(() => {
    const savedData = localStorage.getItem("stepFiveData");
    return savedData ? JSON.parse(savedData) : defaultData;
  });

  const [isEditable, setIsEditable] = useState(false);
  const [quotaOptions, setQuotaOptions] = useState([]);
  const [militaryOptions, setMilitaryOptions] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleDateChange = (date, field) => {
    if (date) {
      const formattedDate = date.format("YYYY/MM/DD"); // فرمت شمسی
      setFormData((prevData) => ({
        ...prevData,
        [field]: formattedDate,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem("stepFiveData", JSON.stringify(formData));
    console.log("Form submitted:", formData);
    if (onNext) onNext();
  };

  const handlePrevious = (e) => {
    e.preventDefault();
    localStorage.setItem("stepFiveData", JSON.stringify(formData));
    if (onPrevious) onPrevious();
  };

  const toggleEdit = async () => {
    if (isEditable) {
      localStorage.setItem("stepFiveData", JSON.stringify(formData));
      setIsEditable(false);
    } else {
      setIsEditable(true);
      try {
        let token = localStorage.getItem("RayanToken");
        if (!token) {
          token = await fetchToken();
        }
        if (token) {
          await Promise.all([
            fetchQuotas(token, setQuotaOptions),
            fetchMilitaryStatuses(token, setMilitaryOptions),
          ]);
        }
      } catch (err) {
        console.error("Error fetching data on edit:", err);
      }
    }
  };

  useEffect(() => {
    if (!localStorage.getItem("stepFiveData")) {
      localStorage.setItem("stepFiveData", JSON.stringify(formData));
    }
  }, []);

  return {
    formData,
    isEditable,
    quotaOptions,
    militaryOptions,
    handleChange,
    handleDateChange,
    handleSubmit,
    handlePrevious,
    toggleEdit,
  };
};
