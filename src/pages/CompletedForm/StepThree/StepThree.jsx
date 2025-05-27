import React, { useState, useEffect } from "react";
import "./StepThree.scss";
import { useQueries } from "@tanstack/react-query";
import { getHandler } from "../../../apiService";

const StepThree = ({ onNext, onPrevious }) => {
  const [formData, setFormData] = useState(() => {
    const savedData = localStorage.getItem("stepThreeData");
    return savedData
      ? JSON.parse(savedData)
      : {
          province: "",
          city: "",
          address: "",
          postalCode: "",
          mobile: "",
        };
  });

  const [isEditable, setIsEditable] = useState(false);
  const [errors, setErrors] = useState({});
  const [selectedProvince, setSelectedProvince] = useState("");
  const [filteredCities, setFilteredCities] = useState([]);

  // Fetch geographies using react-query, matching SelectInput
  const [
    {
      data: geographies = [],
      isLoading: isLoadingGeographies,
      error: errorGeographies,
    },
  ] = useQueries({
    queries: [
      {
        queryKey: ["geographies"],
        queryFn: () => getHandler("geography"),
        select: (response) => {
          console.log("Geographies API raw response:", response); // Debug log
          return Array.isArray(response) ? response : [];
        },
        staleTime: 1000 * 60 * 60, // 1 hour
        retry: 1, // Match SelectInput
      },
    ],
  });

  // Derive provinces and cities from geographies
  const provinces = geographies.filter((item) => item.geographyParent === null);
  const allCities = geographies.filter((item) => item.geographyParent !== null);

  // Combine loading and error states
  const isLoading = isLoadingGeographies;
  const error = errorGeographies;

  // Update filtered cities when province changes
  useEffect(() => {
    if (selectedProvince) {
      const filtered = allCities.filter(
        (city) => city.geographyParent === Number(selectedProvince)
      );
      setFilteredCities(filtered);
      // Reset city if it’s not in the filtered list
      if (
        formData.city &&
        !filtered.some((city) => city.geographyId === Number(formData.city))
      ) {
        setFormData((prev) => ({ ...prev, city: "" }));
      }
    } else {
      setFilteredCities([]);
      setFormData((prev) => ({ ...prev, city: "" }));
    }
  }, [selectedProvince, allCities]);

  const validateForm = (name, value) => {
    let newErrors = { ...errors };

    if (name === "province" && !value) {
      newErrors[name] = "استان الزامی است";
    } else if (name === "province") {
      delete newErrors[name];
    }

    if (name === "city" && !value && formData.province) {
      newErrors[name] = "شهر الزامی است";
    } else if (name === "city") {
      delete newErrors[name];
    }

    if (name === "address" && !value.trim()) {
      newErrors[name] = "آدرس الزامی است";
    } else if (name === "address") {
      delete newErrors[name];
    }

    if (name === "postalCode" && value) {
      const postalCodeRegex = /^\d{10}$/;
      if (!postalCodeRegex.test(value)) {
        newErrors[name] = "کد پستی باید 10 رقم باشد";
      } else {
        delete newErrors[name];
      }
    } else if (name === "postalCode") {
      delete newErrors[name];
    }

    if (name === "mobile" && value) {
      const mobileRegex = /^09\d{9}$/;
      if (!mobileRegex.test(value)) {
        newErrors[name] = "تلفن همراه باید 11 رقم و با 09 شروع شود";
      } else {
        delete newErrors[name];
      }
    } else if (name === "mobile") {
      delete newErrors[name];
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

  const handleProvinceChange = (e) => {
    const provinceId = e.target.value;
    setSelectedProvince(provinceId);
    setFormData((prevData) => ({
      ...prevData,
      province: provinceId,
      city: "", // Reset city
    }));
    if (isEditable) validateForm("province", provinceId);
  };

  const handleCityChange = (e) => {
    const cityId = e.target.value;
    setFormData((prevData) => ({
      ...prevData,
      city: cityId,
    }));
    if (isEditable) validateForm("city", cityId);
  };

  const handleNext = (e) => {
    e.preventDefault();
    const isValid = Object.keys(formData).every((key) =>
      validateForm(key, formData[key])
    );
    if (isValid) {
      localStorage.setItem("stepThreeData", JSON.stringify(formData));
      if (onNext) onNext();
    }
  };

  const handlePrevious = (e) => {
    e.preventDefault();
    localStorage.setItem("stepThreeData", JSON.stringify(formData));
    if (onPrevious) onPrevious();
  };

  const toggleEdit = () => {
    if (isEditable) {
      localStorage.setItem("stepThreeData", JSON.stringify(formData));
    }
    setIsEditable(!isEditable);
  };

  useEffect(() => {
    if (!localStorage.getItem("stepThreeData")) {
      localStorage.setItem("stepThreeData", JSON.stringify(formData));
    }
    // Restore selectedProvince from formData on mount
    if (formData.province) {
      setSelectedProvince(formData.province);
    }
  }, []);

  // Lookup geographyName for display
  const getGeographyName = (id, geographies) => {
    const item = geographies.find((g) => g.geographyId === Number(id));
    return item ? item.geographyName : "";
  };

  return (
    <div className="step3-container">
      <form className="formThree" onSubmit={handleNext}>
        {isEditable ? (
          <>
            {isLoading && <p>در حال بارگذاری...</p>}
            {error && (
              <div className="error">
                خطا در دریافت داده‌ها: {error.message}
              </div>
            )}
            {!isLoading && !error && (
              <div className="step3-form-group">
                <label>استان:</label>
                <select
                  name="province"
                  value={formData.province}
                  onChange={handleProvinceChange}
                >
                  <option value="">انتخاب کنید</option>
                  {console.log(
                    "isLoadingGeographies:",
                    isLoadingGeographies,
                    "errorGeographies:",
                    errorGeographies,
                    "provinces:",
                    provinces,
                    "formData.province:",
                    formData.province
                  )}{" "}
                  {/* Debug log */}
                  {provinces.length > 0 &&
                  provinces.every((p) => p.geographyId && p.geographyName) ? (
                    provinces.map((province) => (
                      <option
                        key={province.geographyId}
                        value={province.geographyId}
                      >
                        {province.geographyName}
                      </option>
                    ))
                  ) : (
                    <option disabled>هیچ استانی یافت نشد</option>
                  )}
                </select>
                {errors.province && (
                  <span className="error">{errors.province}</span>
                )}
              </div>
            )}
          </>
        ) : (
          <div className="step3-form-group">
            <label>استان:</label>
            <input
              type="text"
              value={getGeographyName(formData.province, geographies)}
              readOnly
              placeholder="استان خود را وارد کنید"
            />
          </div>
        )}

        {isEditable ? (
          <>
            {!isLoading && !error && (
              <div className="step3-form-group">
                <label>شهر:</label>
                <select
                  name="city"
                  value={formData.city}
                  onChange={handleCityChange}
                  disabled={!selectedProvince}
                >
                  <option value="">انتخاب کنید</option>
                  {console.log(
                    "isLoadingGeographies:",
                    isLoadingGeographies,
                    "errorGeographies:",
                    errorGeographies,
                    "filteredCities:",
                    filteredCities,
                    "selectedProvince:",
                    selectedProvince,
                    "formData.city:",
                    formData.city
                  )}{" "}
                  {/* Debug log */}
                  {filteredCities.length > 0 &&
                  filteredCities.every(
                    (c) => c.geographyId && c.geographyName
                  ) ? (
                    filteredCities.map((city) => (
                      <option key={city.geographyId} value={city.geographyId}>
                        {city.geographyName}
                      </option>
                    ))
                  ) : (
                    <option disabled>ابتدا استان را انتخاب کنید</option>
                  )}
                </select>
                {errors.city && <span className="error">{errors.city}</span>}
              </div>
            )}
          </>
        ) : (
          <div className="step3-form-group">
            <label>شهر:</label>
            <input
              type="text"
              value={getGeographyName(formData.city, geographies)}
              readOnly
              placeholder="شهر خود را وارد کنید"
            />
          </div>
        )}

        <div className="step3-form-group">
          <label>آدرس:</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            readOnly={!isEditable}
            placeholder="آدرس خود را وارد کنید"
          />
          {errors.address && <span className="error">{errors.address}</span>}
        </div>

        <div className="step3-form-group">
          <label>کد پستی:</label>
          <input
            type="text"
            name="postalCode"
            value={formData.postalCode}
            onChange={handleChange}
            readOnly={!isEditable}
            placeholder="کد پستی خود را وارد کنید"
          />
          {errors.postalCode && (
            <span className="error">{errors.postalCode}</span>
          )}
        </div>

        <div className="step3-form-group">
          <label>تلفن همراه:</label>
          <input
            type="text"
            name="mobile"
            value={formData.mobile}
            onChange={handleChange}
            readOnly={!isEditable}
            placeholder="تلفن همراه خود را وارد کنید"
          />
          {errors.mobile && <span className="error">{errors.mobile}</span>}
        </div>

        <div className="step3-form-actions">
          <button
            type="button"
            className="step3-prev-button"
            onClick={handlePrevious}
          >
            مرحله قبل
          </button>
          <button
            type="submit"
            className="step3-next-button"
            disabled={Object.keys(errors).length > 0}
          >
            مرحله بعد
          </button>
          <button
            type="button"
            className="step3-edit-button"
            onClick={toggleEdit}
          >
            {isEditable ? "ذخیره" : "ویرایش"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default StepThree;
