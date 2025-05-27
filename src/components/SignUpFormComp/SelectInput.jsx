import React, { useState } from "react";
import { useQueries } from "@tanstack/react-query";
import { getHandler } from "../../apiService";

const SelectInput = ({ formData, handleChange, errors }) => {
  const [selectedProvince, setSelectedProvince] = useState("");
  const [filteredCities, setFilteredCities] = useState([]);

  // Fetch data using react-query
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

  // Derive provinces and cities from geographies
  const provinces = geographies.filter((item) => item.geographyParent === null);
  const allCities = geographies.filter((item) => item.geographyParent !== null);

  // Update filtered cities when province changes
  const handleProvinceChange = (e) => {
    const provinceId = e.target.value;
    setSelectedProvince(provinceId);
    handleChange(e);

    // Filter cities based on selected province
    const filtered = allCities.filter(
      (city) => city.geographyParent === Number(provinceId)
    );
    setFilteredCities(filtered);
  };

  // Combine loading and error states
  const isLoading = isLoadingGeographies || isLoadingReligions;
  const error = errorGeographies || errorReligions;

  return (
    <>
      {error && (
        <div className="error">خطا در دریافت داده‌ها: {error.message}</div>
      )}
      {isLoading && <p>در حال بارگذاری...</p>}

      {!isLoading && !error && (
        <>
          <div className="form-group">
            <label htmlFor="province">استان :</label>
            <select
              id="province"
              name="province"
              value={formData.province}
              onChange={handleProvinceChange}
            >
              <option value="">انتخاب نمایید</option>
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

          <div className="form-group">
            <label htmlFor="city">شهر :</label>
            <select
              id="city"
              name="city"
              value={formData.city}
              onChange={handleChange}
              disabled={!selectedProvince}
            >
              <option value="">انتخاب نمایید</option>
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
            {errors.city && <small className="error">{errors.city}</small>}
          </div>

          <div className="form-group">
            <label htmlFor="religion">دین :</label>
            <select
              id="religion"
              name="religion"
              value={formData.religion}
              onChange={handleChange}
            >
              <option value="">انتخاب نمایید</option>
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
        </>
      )}
    </>
  );
};

export default SelectInput;
