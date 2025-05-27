import React from "react";
import { useStepFourLogic } from "./useStepFourLogic";
import "./StepFour.scss";

const StepFour = ({ onNext, onPrevious }) => {
  const {
    formData,
    isEditable,
    errors,
    handleFileChange,
    handleNext,
    handlePrevious,
    toggleEdit,
  } = useStepFourLogic({ onNext, onPrevious });

  return (
    <div className="step4-container">
      <form className="formFour" onSubmit={handleNext}>
        <div className="step4-form-group">
          <label>تصویر کارت ملی:</label>
          <div className="step4-file-preview">
            <img src={formData.idCard} alt="کارت ملی" />
            {isEditable && (
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleFileChange(e, "idCard")}
              />
            )}
            {errors.idCard && <span className="error">{errors.idCard}</span>}
          </div>
        </div>

        <div className="step4-form-group">
          <label>تصویر مدرک تحصیلی:</label>
          <div className="step4-file-preview">
            <img src={formData.degree} alt="مدرک تحصیلی" />
            {isEditable && (
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleFileChange(e, "degree")}
              />
            )}
            {errors.degree && <span className="error">{errors.degree}</span>}
          </div>
        </div>

        <div className="step4-form-group">
          <label>تصویر صفحه اول شناسنامه:</label>
          <div className="step4-file-preview">
            <img src={formData.birthCertPage1} alt="صفحه اول شناسنامه" />
            {isEditable && (
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleFileChange(e, "birthCertPage1")}
              />
            )}
            {errors.birthCertPage1 && (
              <span className="error">{errors.birthCertPage1}</span>
            )}
          </div>
        </div>

        <div className="step4-form-group">
          <label>تصویر صفحه دوم شناسنامه:</label>
          <div className="step4-file-preview">
            <img src={formData.birthCertPage2} alt="صفحه دوم شناسنامه" />
            {isEditable && (
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleFileChange(e, "birthCertPage2")}
              />
            )}
            {errors.birthCertPage2 && (
              <span className="error">{errors.birthCertPage2}</span>
            )}
          </div>
        </div>

        <div className="step4-form-group">
          <label>عکس پرسنلی:</label>
          <div className="step4-file-preview">
            <img src={formData.birthCertOtherPages} alt="عکس پرسنلی" />
            {isEditable && (
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleFileChange(e, "birthCertOtherPages")}
              />
            )}
            {errors.birthCertOtherPages && (
              <span className="error">{errors.birthCertOtherPages}</span>
            )}
          </div>
        </div>

        <div className="step4-form-group">
          <label>تصویر سایر مدارک:</label>
          <div className="step4-file-preview">
            <img src={formData.otherDocs} alt="سایر مدارک" />
            {isEditable && (
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleFileChange(e, "otherDocs")}
              />
            )}
            {errors.otherDocs && (
              <span className="error">{errors.otherDocs}</span>
            )}
          </div>
        </div>

        <div className="step4-form-actions">
          <button
            type="button"
            className="step4-prev-button"
            onClick={handlePrevious}
          >
            مرحله قبل
          </button>
          <button type="submit" className="step4-next-button">
            مرحله بعد
          </button>
          <button
            type="button"
            className="step4-edit-button"
            onClick={toggleEdit}
          >
            {isEditable ? "ذخیره" : "ویرایش"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default StepFour;