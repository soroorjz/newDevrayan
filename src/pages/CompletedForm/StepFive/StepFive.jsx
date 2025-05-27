import React, { useState } from "react";
import DatePicker from "react-multi-date-picker";
import Swal from "sweetalert2";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import { useQueries } from "@tanstack/react-query";
import { getHandler } from "../../../apiService";
import "./StepFive.scss";

const StepFive = ({ onPrevious, gender, onReset }) => {
  const [formData, setFormData] = useState(() => {
    const savedData = localStorage.getItem("stepFiveData");
    return savedData
      ? JSON.parse(savedData)
      : {
          quota: "",
          militaryStatus: "",
          serviceDuration: "",
          serviceEndDate: "",
        };
  });

  const [isEditable, setIsEditable] = useState(false);

  // Fetch quotas and military statuses using react-query
  const [
    { data: quotaOptions = [], isLoading: isLoadingQuotas, error: errorQuotas },
    {
      data: militaryOptions = [],
      isLoading: isLoadingMilitary,
      error: errorMilitary,
    },
  ] = useQueries({
    queries: [
      {
        queryKey: ["quotas"],
        queryFn: () => getHandler("quota"),
        select: (data) => {
          console.log("Quotas API raw response:", data); // Debug log
          return Array.isArray(data)
            ? data.filter((quota) => quota.quotaParent === null)
            : [];
        },
        staleTime: 1000 * 60 * 60, // 1 hour
        retry: 1,
      },
      {
        queryKey: ["militaryStatuses"],
        queryFn: () => getHandler("dutystatus"),
        select: (data) => {
          console.log("Military Statuses API raw response:", data); // Debug log
          return Array.isArray(data) ? data : [];
        },
        enabled: gender === "مرد",
        staleTime: 1000 * 60 * 60, // 1 hour
        retry: 1,
      },
    ],
  });

  // Combine loading and error states
  const isLoading = isLoadingQuotas || (gender === "مرد" && isLoadingMilitary);
  const error = errorQuotas || (gender === "مرد" && errorMilitary);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleDateChange = (date) => {
    setFormData((prevData) => ({
      ...prevData,
      serviceEndDate: date ? date.format("YYYY/MM/DD") : "",
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem("stepFiveData", JSON.stringify(formData));
    // onNext is not used in the original final confirmation
  };

  const handleFinalConfirmation = () => {
    localStorage.setItem("stepFiveData", JSON.stringify(formData));
    Swal.fire({
      title: "تأیید نهایی",
      text: "اطلاعات شما با موفقیت تأیید شد!",
      icon: "success",
      showConfirmButton: false,
      timer: 2000,
      timerProgressBar: true,
    }).then(() => {
      if (onReset) onReset();
    });
  };

  const toggleEdit = () => {
    if (isEditable) {
      localStorage.setItem("stepFiveData", JSON.stringify(formData));
    }
    setIsEditable(!isEditable);
  };

  return (
    <div className="step5-container">
      <form className="formFive" onSubmit={handleSubmit}>
        {error && (
          <div className="error">خطا در دریافت داده‌ها: {error.message}</div>
        )}
        {isLoading && <p>در حال بارگذاری...</p>}

        {!isLoading && !error && (
          <>
            <div className="step5-form-group">
              <label>سهمیه:</label>
              {isEditable ? (
                <select
                  name="quota"
                  value={formData.quota}
                  onChange={handleChange}
                >
                  <option value="">انتخاب کنید</option>
                  {console.log(
                    "isLoadingQuotas:",
                    isLoadingQuotas,
                    "errorQuotas:",
                    errorQuotas,
                    "quotaOptions:",
                    quotaOptions
                  )}{" "}
                  {/* Debug log */}
                  {quotaOptions.length > 0 &&
                  quotaOptions.every((q) => q.quotaId && q.quotaTitle) ? (
                    quotaOptions.map((quota) => (
                      <option key={quota.quotaId} value={quota.quotaTitle}>
                        {quota.quotaTitle}
                      </option>
                    ))
                  ) : (
                    <option disabled>داده‌ای یافت نشد</option>
                  )}
                </select>
              ) : (
                <input type="text" value={formData.quota} readOnly />
              )}
            </div>

            {gender === "مرد" && (
              <>
                <div className="step5-form-group">
                  <label>وضعیت نظام وظیفه:</label>
                  {isEditable ? (
                    <select
                      name="militaryStatus"
                      value={formData.militaryStatus}
                      onChange={handleChange}
                    >
                      <option value="">انتخاب کنید</option>
                      {console.log(
                        "isLoadingMilitary:",
                        isLoadingMilitary,
                        "errorMilitary:",
                        errorMilitary,
                        "militaryOptions:",
                        militaryOptions
                      )}{" "}
                      {/* Debug log */}
                      {militaryOptions.length > 0 &&
                      militaryOptions.every(
                        (m) => m.dutyStatusId && m.dutyStatusName
                      ) ? (
                        militaryOptions.map((status) => (
                          <option
                            key={status.dutyStatusId}
                            value={status.dutyStatusName}
                          >
                            {status.dutyStatusName}
                          </option>
                        ))
                      ) : (
                        <option disabled>داده‌ای یافت نشد</option>
                      )}
                    </select>
                  ) : (
                    <input
                      type="text"
                      value={formData.militaryStatus}
                      readOnly
                    />
                  )}
                </div>

                <div className="step5-form-group">
                  <label>میزان خدمت (به ماه):</label>
                  <input
                    type="text"
                    name="serviceDuration"
                    value={formData.serviceDuration}
                    onChange={handleChange}
                    readOnly={!isEditable}
                    placeholder="میزان خدمت خود را وارد کنید"
                  />
                </div>
              </>
            )}

            <div className="step5-form-group">
              <label>تاریخ پایان خدمت:</label>
              {isEditable ? (
                <DatePicker
                  value={formData.serviceEndDate}
                  onChange={handleDateChange}
                  calendar={persian}
                  locale={persian_fa}
                  format="YYYY/MM/DD"
                  calendarPosition="bottom-right"
                />
              ) : (
                <input type="text" value={formData.serviceEndDate} readOnly />
              )}
            </div>
          </>
        )}

        <div className="step5-form-actions">
          <button
            type="button"
            className="step5-prev-button"
            onClick={onPrevious}
            disabled={isLoading || error}
          >
            مرحله قبل
          </button>
          <button
            type="button"
            className="step5-edit-button"
            onClick={toggleEdit}
            disabled={isLoading || error}
          >
            {isEditable ? "ذخیره" : "ویرایش"}
          </button>
          <button
            type="button"
            className="step5-submit-button"
            onClick={handleFinalConfirmation}
            disabled={isLoading || error}
          >
            تأیید نهایی
          </button>
        </div>
      </form>
    </div>
  );
};

export default StepFive;
