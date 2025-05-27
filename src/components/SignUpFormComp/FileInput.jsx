import React, { useRef, useState } from "react";
import "./FileInput.scss";
import { FaTimes } from "react-icons/fa";
import { MdOutlineAddPhotoAlternate } from "react-icons/md";

const FileInput = ({ handlePreviousStep, fileError, onNext }) => {
  const [previews, setPreviews] = useState({
    profileImage: null,
    nationalCard: null,
    birthCertPage1: null,
    birthCertPage2: null,
    birthCertPage3: null,
    educationCertificate: null,
  });

  const [errors, setErrors] = useState({
    profileImage: null,
    nationalCard: null,
    birthCertPage1: null,
    birthCertPage2: null,
    birthCertPage3: null,
    educationCertificate: null,
  });

  const fileInputs = useRef({});

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (files[0]) {
      const file = files[0];
      const validFormats = ["image/jpeg", "image/png", "image/jpg"];
      const maxSize = 2 * 1024 * 1024; // ۲ مگابایت

      // چک کردن فرمت
      if (!validFormats.includes(file.type)) {
        setErrors((prev) => ({
          ...prev,
          [name]: "فرمت تصویر معتبر نیست (فقط jpeg, png, jpg)",
        }));
        return;
      }

      // چک کردن حجم
      if (file.size > maxSize) {
        setErrors((prev) => ({
          ...prev,
          [name]: "حجم تصویر نباید بیشتر از ۲ مگابایت باشد",
        }));
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviews((prev) => ({ ...prev, [name]: reader.result }));
        setErrors((prev) => ({ ...prev, [name]: null })); // حذف خطا
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = (name) => {
    setPreviews((prev) => ({ ...prev, [name]: null }));
    if (fileInputs.current[name]) {
      fileInputs.current[name].value = ""; // ریست اینپوت
    }
    setErrors((prev) => ({
      ...prev,
      [name]: `بارگذاری ${fieldNames[name]} الزامی است`,
    }));
  };

  const requiredFields = [
    "profileImage",
    "nationalCard",
    "birthCertPage1",
    "birthCertPage2",
    "birthCertPage3",
    "educationCertificate",
  ];

  const fieldNames = {
    profileImage: "عکس پرسنلی",
    nationalCard: "تصویر کارت ملی",
    birthCertPage1: "صفحه اول شناسنامه",
    birthCertPage2: "صفحه دوم شناسنامه",
    birthCertPage3: "صفحه سوم شناسنامه",
    educationCertificate: "تصویر آخرین مدرک تحصیلی",
  };

  const isNextEnabled = requiredFields.every((field) => previews[field] !== null);

  const handleNextClick = () => {
    if (!isNextEnabled) {
      const newErrors = {};
      requiredFields.forEach((field) => {
        if (!previews[field]) {
          newErrors[field] = `بارگذاری ${fieldNames[field]} الزامی است`;
        }
      });
      setErrors((prev) => ({ ...prev, ...newErrors }));
    } else {
      onNext();
    }
  };

  return (
    <div className="file-input-container">
      {requiredFields.map((field, index) => (
        <div key={index} className="file-upload-section">
          {!previews[field] && (
            <label htmlFor={field} className="upload-icon">
              <span>
                {field === "profileImage"
                  ? "عکس پرسنلی خود را بارگذاری کنید."
                  : field === "nationalCard"
                  ? "تصویر کارت ملی خود را بارگذاری کنید."
                  : field === "educationCertificate"
                  ? "تصویر آخرین مدرک تحصیلی خود را بارگذاری کنید."
                  : `تصویر ${fieldNames[field]} خود را بارگذاری کنید.`}
              </span>
              <MdOutlineAddPhotoAlternate size={40} />
            </label>
          )}
          <input
            type="file"
            id={field}
            name={field}
            accept="image/png, image/jpeg, image/jpg"
            style={{ display: "none" }}
            ref={(el) => (fileInputs.current[field] = el)}
            onChange={handleFileChange}
          />
          {previews[field] && (
            <div className="image-preview">
              <img src={previews[field]} alt="Uploaded" />
              <button
                className="remove-btn"
                onClick={() => handleRemoveImage(field)}
              >
                <FaTimes />
              </button>
            </div>
          )}
          {errors[field] && <small className="error">{errors[field]}</small>}
        </div>
      ))}
      {fileError && <small className="error">{fileError}</small>}
      <div className="button-group">
        <button className="prev-button" onClick={handlePreviousStep}>
          مرحله قبل
        </button>
        <button
          className="next-button"
          onClick={handleNextClick}
          disabled={false}
        >
          مرحله‌ی بعد
        </button>
      </div>
    </div>
  );
};

export default FileInput;