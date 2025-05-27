import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import { useQueries } from "@tanstack/react-query";
import { getHandler } from "../../../../apiService";
import "./BackgroundForm.scss";

const BackgroundForm = ({ onFinalSubmit, handlePreviousStep, gender }) => {
  // Validation schema
  const schema = yup.object().shape({
    quota: yup.string().required("لطفاً نوع سهمیه را انتخاب کنید"),
    disabilityType: yup.string().when("quota", {
      is: (val) => val === "disability",
      then: yup.string().required("لطفاً نوع معلولیت را مشخص کنید"),
    }),
    militaryStatus: yup.string().when("gender", {
      is: "male",
      then: yup.string().required("لطفاً وضعیت نظام وظیفه را انتخاب کنید"),
    }),
    serviceDuration: yup
      .number()
      .typeError("مدت خدمت باید عدد باشد")
      .min(0, "مدت خدمت نمی‌تواند کمتر از 0 ماه باشد")
      .when("gender", {
        is: "male",
        then: yup.number().required("لطفاً میزان خدمت را به ماه وارد کنید"),
      }),
    serviceEndDate: yup.string().when("gender", {
      is: "male",
      then: yup.string().required("لطفاً تاریخ پایان خدمت را وارد کنید"),
    }),
    workExperience: yup
      .number()
      .typeError("میزان سابقه باید عدد باشد")
      .min(0, "میزان سابقه نمی‌تواند کمتر از 0 ماه باشد")
      .when("workExperienceEnabled", {
        is: true,
        then: yup.number().required("لطفاً میزان سابقه کار را وارد کنید"),
      }),
  });

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      workExperienceEnabled: false,
      workExperience: 0,
    },
    context: { gender },
  });

  const [workExperienceEnabled, setWorkExperienceEnabled] = useState(false);
  const selectedQuota = watch("quota");
  const serviceEndDate = watch("serviceEndDate");

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
        select: (data) => data.filter((quota) => quota.quotaParent === null),
        staleTime: 1000 * 60 * 60, // 1 hour
        retry: 1,
      },
      {
        queryKey: ["militaryStatuses"],
        queryFn: () => getHandler("dutystatus"),
        enabled: gender === "male",
        staleTime: 1000 * 60 * 60, // 1 hour
        retry: 1,
      },
    ],
  });

  // Combine loading and error states
  const isLoading = isLoadingQuotas || (gender === "male" && isLoadingMilitary);
  const error = errorQuotas || (gender === "male" && errorMilitary);

  const handleDateChange = (value) => {
    if (value) {
      setValue("serviceEndDate", value.format("YYYY-MM-DD"), {
        shouldValidate: true,
      });
    }
  };

  const onSubmit = (data) => {
    console.log("Background Data:", data);
    onFinalSubmit();
  };

  const handleToggle = () => {
    const newValue = !workExperienceEnabled;
    setWorkExperienceEnabled(newValue);
    setValue("workExperienceEnabled", newValue);
    setValue("workExperience", newValue ? 0 : 0);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="background-form-sj">
      <div className="backgroundFormWrapper">
        {error && (
          <div className="error">خطا در دریافت داده‌ها: {error.message}</div>
        )}
        {/* {isLoading && <p>در حال بارگذاری...</p>} */}

        {!isLoading && !error && (
          <>
            <div className="form-group">
              <label>سهمیه:</label>
              <select {...register("quota")}>
                <option value="">انتخاب کنید</option>
                {quotaOptions.length > 0 ? (
                  quotaOptions.map((quota) => (
                    <option key={quota.quotaId} value={quota.quotaTitle}>
                      {quota.quotaTitle}
                    </option>
                  ))
                ) : (
                  <option disabled>داده‌ای یافت نشد</option>
                )}
              </select>
              {errors.quota && <span>{errors.quota.message}</span>}
            </div>

            {selectedQuota === "disability" && (
              <div className="form-group">
                <label>نوع معلولیت:</label>
                <input type="text" {...register("disabilityType")} />
                {errors.disabilityType && (
                  <span>{errors.disabilityType.message}</span>
                )}
              </div>
            )}

            {gender === "male" && (
              <>
                <div className="form-group">
                  <label>وضعیت نظام وظیفه:</label>
                  <select {...register("militaryStatus")}>
                    <option value="">انتخاب کنید</option>
                    {militaryOptions.length > 0 ? (
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
                  {errors.militaryStatus && (
                    <span>{errors.militaryStatus.message}</span>
                  )}
                </div>

                <div className="form-group">
                  <label>میزان خدمت (ماه):</label>
                  <input type="number" {...register("serviceDuration")} />
                  {errors.serviceDuration && (
                    <span>{errors.serviceDuration.message}</span>
                  )}
                </div>

                <div className="form-group">
                  <label>تاریخ پایان خدمت:</label>
                  <DatePicker
                    calendar={persian}
                    locale={persian_fa}
                    value={serviceEndDate}
                    onChange={handleDateChange}
                    inputClass="custom-date-input"
                    placeholder="تاریخ پایان خدمت را انتخاب کنید"
                  />
                  {errors.serviceEndDate && (
                    <span>{errors.serviceEndDate.message}</span>
                  )}
                </div>
              </>
            )}

            <div className="form-group Experience">
              <div className="toggle-container" onClick={handleToggle}>
                <div
                  className={`toggle ${workExperienceEnabled ? "active" : ""}`}
                ></div>
                <p className="workExperienceP">
                  {workExperienceEnabled ? "سابقه کار دارم" : "سابقه کار ندارم"}
                </p>
              </div>
            </div>

            <div className="form-group">
              <label>میزان سابقه کار (ماه):</label>
              <input
                type="number"
                {...register("workExperience")}
                disabled={!workExperienceEnabled}
              />
              {errors.workExperience && (
                <span>{errors.workExperience.message}</span>
              )}
            </div>
          </>
        )}
      </div>

      <div className="backgroundFormBtns">
        <button onClick={handlePreviousStep} className="submit-btn">
          مرحله قبل
        </button>
        <button
          type="submit"
          className="submit-btn"
          disabled={isLoading || error}
        >
          تکمیل ثبت‌نام
        </button>
      </div>
    </form>
  );
};

export default BackgroundForm;
