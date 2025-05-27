import React, { useState, useEffect } from "react";
import "./StepOne.scss";
import { useFormLogic } from "./useFormLogic";
import { useQueries } from "@tanstack/react-query";
import { getHandler } from "../../../apiService";
import TextInput from "./TextInput";
import GenderRadio from "./GenderRadio";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";

const StepOne = ({ onNext, onGenderChange }) => {
  const {
    formData,
    isEditable,
    errors,
    handleChange,
    toggleEdit,
    handleSubmit,
  } = useFormLogic({ onNext });

  const [filteredCities, setFilteredCities] = useState([]);

  // Static marriage status options (replace with API call if endpoint exists)
  const marriageOptions = [
    { value: "single", label: "مجرد" },
    { value: "married", label: "متاهل" },
  ];

  // Fetch geographies and religions using react-query
  const [
    {
      data: geographies = [],
      isLoading: isLoadingGeographies,
      error: errorGeographies,
    },
    {
      data: religions = [],
      isLoading: isLoadingReligions,
      error: errorReligions,
    },
  ] = useQueries({
    queries: [
      {
        queryKey: ["geographies"],
        queryFn: () => getHandler("geography"),
        staleTime: 1000 * 60 * 60, // 1 hour
        retry: 1,
      },
      {
        queryKey: ["religions"],
        queryFn: () => getHandler("religion"),
        staleTime: 1000 * 60 * 60, // 1 hour
        retry: 1,
      },
    ],
  });

  // Derive provinces and cities
  const provinces = geographies.filter((item) => item.geographyParent === null);
  const allCities = geographies.filter((item) => item.geographyParent !== null);

  // Combine loading and error states
  const isLoading = isLoadingGeographies || isLoadingReligions;
  const error = errorGeographies || errorReligions;

  const handleProvinceChange = (e) => {
    const provinceId = e.target.value;
    handleChange({ target: { name: "city", value: "" } }); // Reset city
    handleChange(e); // Update province
    // Filter cities based on selected province
    const filtered = allCities.filter(
      (city) => city.geographyParent === Number(provinceId)
    );
    setFilteredCities(filtered);
  };

  const handleDateChange = (date) => {
    const formattedDate = date ? date.format("YYYY/MM/DD") : "";
    handleChange({ target: { name: "birtDate", value: formattedDate } });
  };

  const getDisplayValue = (key, type) => {
    const value = formData[key];
    if (!value) return "";
    if (type === "province" || type === "city") {
      if (!isNaN(value) && geographies.length > 0) {
        const item =
          type === "province"
            ? provinces.find((p) => p.geographyId === Number(value))
            : filteredCities.find((c) => c.geographyId === Number(value));
        return item ? item.geographyName : "";
      }
    } else if (type === "religion") {
      const religion = religions.find((r) => r.religionName === value);
      return religion ? religion.religionName : value;
    } else if (type === "marriage") {
      const marriage = marriageOptions.find((m) => m.value === value);
      return marriage ? marriage.label : value;
    }
    return value;
  };

  const handleGenderChange = (e) => {
    handleChange(e);
    onGenderChange(e.target.value);
  };

  useEffect(() => {
    if (formData.gender) {
      onGenderChange(formData.gender);
    }
  }, [formData.gender, onGenderChange]);

  return (
    <div className="step1-container">
      <form className="formOne" onSubmit={handleSubmit}>
        <TextInput
          label="کد ملی"
          name="nationalCode"
          value={formData.nationalCode}
          onChange={handleChange}
          isEditable={isEditable}
          placeholder="کد ملی خود را وارد کنید"
          error={errors.nationalCode}
        />
        <TextInput
          label="نام"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          isEditable={isEditable}
          placeholder="نام خود را وارد کنید"
          error={errors.firstName}
        />
        <TextInput
          label="نام خانوادگی"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          isEditable={isEditable}
          placeholder="نام خانوادگی خود را وارد کنید"
          error={errors.lastName}
        />
        <TextInput
          label="نام پدر"
          name="fatherName"
          value={formData.fatherName}
          onChange={handleChange}
          isEditable={isEditable}
          placeholder="نام پدر خود را وارد کنید"
          error={errors.fatherName}
        />
        <TextInput
          label="شماره شناسنامه"
          name="phoneNumber"
          value={formData.phoneNumber}
          onChange={handleChange}
          isEditable={isEditable}
          placeholder="شماره شناسنامه خود را وارد کنید"
          error={errors.phoneNumber}
        />
        {isEditable ? (
          <div className="step1-form-group">
            <label>تاریخ تولد:</label>
            <DatePicker
              style={{ width: "100%" }}
              id="birtDate"
              name="birtDate"
              calendar={persian}
              locale={persian_fa}
              value={formData.birtDate}
              onChange={handleDateChange}
              placeholder="تاریخ تولد را انتخاب کنید"
              format="YYYY/MM/DD"
            />
            {errors.birtDate && (
              <small className="error">{errors.birtDate}</small>
            )}
          </div>
        ) : (
          <TextInput
            label="تاریخ تولد"
            name="birtDate"
            value={formData.birtDate}
            onChange={handleChange}
            isEditable={false}
            placeholder="تاریخ تولد خود را وارد کنید"
            error={errors.birtDate}
          />
        )}
        {isEditable ? (
          <>
            {isLoading && <p>در حال بارگذاری...</p>}
            {error && (
              <div className="error">
                خطا در دریافت داده‌ها: {error.message}
              </div>
            )}
            {!isLoading && !error && (
              <>
                <div className="step1-form-group">
                  <label>استان:</label>
                  <select
                    name="province"
                    value={formData.province}
                    onChange={handleProvinceChange}
                  >
                    <option value="">انتخاب کنید</option>
                    {provinces.length > 0 ? (
                      provinces.map((province) => (
                        <option
                          key={province.geographyId}
                          value={province.geographyId}
                        >
                          {province.geographyName}
                        </option>
                      ))
                    ) : (
                      <option disabled>داده‌ای یافت نشد</option>
                    )}
                  </select>
                  {errors.province && (
                    <small className="error">{errors.province}</small>
                  )}
                </div>
                <div className="step1-form-group">
                  <label>شهر:</label>
                  <select
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    disabled={!formData.province}
                  >
                    <option value="">انتخاب کنید</option>
                    {filteredCities.length > 0 ? (
                      filteredCities.map((city) => (
                        <option key={city.geographyId} value={city.geographyId}>
                          {city.geographyName}
                        </option>
                      ))
                    ) : (
                      <option disabled>ابتدا استان را انتخاب کنید</option>
                    )}
                  </select>
                  {errors.city && (
                    <small className="error">{errors.city}</small>
                  )}
                </div>
                <div className="step1-form-group">
                  <label>دین:</label>
                  <select
                    name="religion"
                    value={formData.religion}
                    onChange={handleChange}
                  >
                    <option value="">انتخاب کنید</option>
                    {religions.length > 0 ? (
                      religions.map((religion) => (
                        <option
                          key={religion.religionId}
                          value={religion.religionName}
                        >
                          {religion.religionName}
                        </option>
                      ))
                    ) : (
                      <option disabled>داده‌ای یافت نشد</option>
                    )}
                  </select>
                  {errors.religion && (
                    <small className="error">{errors.religion}</small>
                  )}
                </div>
                <div className="step1-form-group">
                  <label>تاهل:</label>
                  <select
                    name="marriage"
                    value={formData.marriage}
                    onChange={handleChange}
                  >
                    <option value="">انتخاب کنید</option>
                    {marriageOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                  {errors.marriage && (
                    <small className="error">{errors.marriage}</small>
                  )}
                </div>
              </>
            )}
          </>
        ) : (
          <>
            <TextInput
              label="استان"
              name="province"
              value={getDisplayValue("province", "province")}
              onChange={handleChange}
              isEditable={false}
              placeholder="استان خود را وارد کنید"
              error={errors.province}
            />
            <TextInput
              label="شهر"
              name="city"
              value={getDisplayValue("city", "city")}
              onChange={handleChange}
              isEditable={false}
              placeholder="شهر خود را وارد کنید"
              error={errors.city}
            />
            <TextInput
              label="دین"
              name="religion"
              value={getDisplayValue("religion", "religion")}
              onChange={handleChange}
              isEditable={false}
              placeholder="دین خود را وارد کنید"
              error={errors.religion}
            />
            <TextInput
              label="تاهل"
              name="marriage"
              value={getDisplayValue("marriage", "marriage")}
              onChange={handleChange}
              isEditable={false}
              placeholder="وضعیت تاهل خود را وارد کنید"
              error={errors.marriage}
            />
          </>
        )}
        <TextInput
          label="تعداد فرزند"
          name="children"
          value={formData.children}
          onChange={handleChange}
          isEditable={isEditable}
          placeholder="تعداد فرزندان خود را وارد کنید"
          error={errors.children}
        />
        <GenderRadio
          value={formData.gender}
          onChange={handleGenderChange}
          isEditable={isEditable}
        />

        <div className="step1-form-actions">
          <button
            type="submit"
            className="step1-next-button"
            disabled={Object.keys(errors).length > 0}
          >
            مرحله بعد
          </button>
          <button
            type="button"
            className="step1-edit-button"
            onClick={toggleEdit}
          >
            {isEditable ? "ذخیره" : "ویرایش"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default StepOne;
