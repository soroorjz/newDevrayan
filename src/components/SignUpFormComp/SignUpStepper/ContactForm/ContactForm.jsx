import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useQuery } from "@tanstack/react-query";
import { getHandler } from "../../../../apiService";
import "./ContactForm.scss";

// Validation schema
const schema = yup.object().shape({
  phone: yup
    .string()
    .matches(/^09[0-9]{9}$/, "شماره تلفن نامعتبر است")
    .required("شماره تلفن را وارد کنید"),
  postalCode: yup
    .string()
    .matches(/^\d{10}$/, "کد پستی باید ۱۰ رقم باشد")
    .required("کد پستی را وارد کنید"),
  province: yup.string().required("استان را انتخاب کنید"),
  city: yup.string().required("شهر را انتخاب کنید"),
  address: yup
    .string()
    .required("آدرس را وارد کنید")
    .matches(/^[\u0600-\u06FF\s\d]+$/, "آدرس باید با حروف فارسی باشد"),
});

const ContactForm = ({ onNext, handlePreviousStep }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [selectedProvince, setSelectedProvince] = useState("");
  const [filteredCities, setFilteredCities] = useState([]);

  // Fetch geographies using react-query
  const {
    data: geographies = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["geographies"],
    queryFn: () => getHandler("geography"),
    staleTime: 1000 * 60 * 60, // 1 hour
    retry: 1,
  });

  // Derive provinces and cities
  const provinces = geographies.filter((item) => item.geographyParent === null);
  const allCities = geographies.filter((item) => item.geographyParent !== null);

  // Handle province selection
  const handleProvinceChange = (e) => {
    const provinceId = e.target.value;
    setSelectedProvince(provinceId);

    // Filter cities based on selected province
    const filtered = allCities.filter(
      (city) => city.geographyParent === Number(provinceId)
    );
    setFilteredCities(filtered);
  };

  const onSubmit = (data) => {
    console.log("فرم ارسال شد:", data);
    onNext();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="contact-form-sj">
      <div className="contact-formWrapper">
        {error && (
          <div className="error">خطا در دریافت داده‌ها: {error.message}</div>
        )}
        {isLoading && <p>در حال بارگذاری...</p>}

        {!isLoading && !error && (
          <>
            <div className="form-group">
              <label>تلفن همراه:</label>
              <input type="text" {...register("phone")} />
              {errors.phone && <span>{errors.phone.message}</span>}
            </div>

            <div className="form-group">
              <label>کد پستی:</label>
              <input type="text" {...register("postalCode")} />
              {errors.postalCode && <span>{errors.postalCode.message}</span>}
            </div>

            <div className="form-group">
              <label>استان:</label>
              <select {...register("province")} onChange={handleProvinceChange}>
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
              {errors.province && <span>{errors.province.message}</span>}
            </div>

            <div className="form-group">
              <label>شهر:</label>
              <select {...register("city")} disabled={!selectedProvince}>
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
              {errors.city && <span>{errors.city.message}</span>}
            </div>

            <div className="form-group">
              <label>آدرس:</label>
              <textarea {...register("address")} rows="3"></textarea>
              {errors.address && <span>{errors.address.message}</span>}
            </div>
          </>
        )}
      </div>

      <div className="contactSubmitBtns">
        <button
          onClick={handlePreviousStep}
          className="submit-btn contactSubmit-btn"
        >
          مرحله قبل
        </button>
        <button
          type="submit"
          className="contactSubmit-btn"
          disabled={isLoading || error}
        >
          مرحله بعد
        </button>
      </div>
    </form>
  );
};

export default ContactForm;
