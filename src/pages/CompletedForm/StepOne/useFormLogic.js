import { useState, useEffect } from "react";

export const useFormLogic = ({ onNext }) => {
  const [formData, setFormData] = useState(() => {
    const savedData = localStorage.getItem("formData");
    return savedData
      ? JSON.parse(savedData)
      : {
          nationalCode: "0015838791",
          firstName: "محمد",
          lastName: "معروفی",
          fatherName: "احمد",
          gender: "مرد",
          phoneNumber: "1802142",
          provice: "البرز",
          city: "کرج",
          birtDate: "1375/05/12",
          religion: "اسلام(شیعه)",
          mariage: "متاهل",
          children: "0",
        };
  });

  const [isEditable, setIsEditable] = useState(false);
  const [errors, setErrors] = useState({});

  const isPersian = (text) => /^[\u0600-\u06FF\s]+$/.test(text);

  const validateNationalCode = (nationalCode) => {
    if (!/^\d{10}$/.test(nationalCode)) return false;
    let checkDigit = parseInt(nationalCode[9]);
    let sum = 0;
    for (let i = 0; i < 9; i++) {
      sum += parseInt(nationalCode[i]) * (10 - i);
    }
    let remainder = sum % 11;
    let calculatedCheckDigit = remainder < 2 ? remainder : 11 - remainder;
    return checkDigit === calculatedCheckDigit;
  };

  const validateForm = (name, value) => {
    let newErrors = { ...errors };

    if (
      ["firstName", "lastName", "fatherName", "religion", "mariage"].includes(
        name
      ) &&
      value &&
      !isPersian(value)
    ) {
      newErrors[name] = "فقط حروف فارسی مجاز است";
    } else if (value) {
      delete newErrors[name];
    }

    if (name === "nationalCode" && value && !validateNationalCode(value)) {
      newErrors[name] = "کد ملی نامعتبر است";
    } else if (name === "nationalCode") {
      delete newErrors[name];
    }

    if (name === "mariage" && value === "مجرد" && formData.children !== "0") {
      newErrors["children"] = "برای مجرد تعداد فرزند باید صفر باشد";
    } else if (
      name === "children" &&
      formData.mariage === "مجرد" &&
      value !== "0"
    ) {
      newErrors[name] = "برای مجرد تعداد فرزند باید صفر باشد";
    } else if (name === "children") {
      delete newErrors[name];
    }

    // شرط اجباری بودن شهر وقتی استان انتخاب شده
    if (name === "provice" && value && !formData.city) {
      newErrors["city"] = "لطفاً شهر را انتخاب کنید";
    } else if (name === "city" && value) {
      delete newErrors["city"];
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log("تغییر توی useFormLogic:", name, value); // دیباگ
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    if (isEditable) validateForm(name, value);
  };

  const toggleEdit = () => {
    if (isEditable) {
      localStorage.setItem("formData", JSON.stringify(formData));
    }
    setIsEditable(!isEditable);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (Object.keys(errors).length === 0 && onNext) {
      localStorage.setItem("formData", JSON.stringify(formData));
      onNext();
    }
  };

  useEffect(() => {
    if (!localStorage.getItem("formData")) {
      localStorage.setItem("formData", JSON.stringify(formData));
    }
  }, []);

  return {
    formData,
    isEditable,
    errors,
    handleChange,
    toggleEdit,
    handleSubmit,
  };
};
