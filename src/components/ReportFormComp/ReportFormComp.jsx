import React, { useState } from "react";
import "./ReportFormComp.scss";
import provinces_cities from "../../jsonFiles/provinces_cities.json";
import ReportModal from "./ReportModal/ReportModal";

const ReportFormComp = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    nationalId: "",
    mobile: "",
    phone: "",
    email: "",
    examType: "",
    exam: "",
    examState: "",
    violationType: "",
    description: "",
  });
  const [errors, setErrors] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [trackingCode, setTrackingCode] = useState("");

  const provinces = [
    ...new Set(provinces_cities.map((item) => item.provinceName)),
  ];

  const isValidIranianNationalId = (nationalId) => {
    if (!/^\d{10}$/.test(nationalId)) return false;

    const check = +nationalId[9];
    const sum = nationalId
      .split("")
      .slice(0, 9)
      .reduce((acc, digit, index) => acc + +digit * (10 - index), 0);
    const remainder = sum % 11;

    return remainder < 2 ? check === remainder : check === 11 - remainder;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    let newErrors = { ...errors };

    if (name === "mobile") {
      if (!/^09\d{0,9}$/.test(value)) {
        newErrors[name] = "شماره تلفن معتبر نیست.";
      } else {
        delete newErrors[name];
      }
    }

    if (name === "nationalId") {
      if (value.length === 10 && !isValidIranianNationalId(value)) {
        newErrors[name] = "کد ملی معتبر نیست.";
      } else {
        delete newErrors[name];
      }
    }

    if (["firstName", "lastName"].includes(name)) {
      if (/[^آ-ی\s]/.test(value)) {
        newErrors[name] = "لطفاً با حروف فارسی بنویسید.";
      } else {
        delete newErrors[name];
      }
    }

    setFormData({ ...formData, [name]: value });
    setErrors(newErrors);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // let newErrors = {};

    // Object.keys(formData).forEach((key) => {
    //   if (!formData[key] && key !== "phone") {
    //     newErrors[key] = "تکمیل این فیلد الزامی است.";
    //   }
    // });

    // if (formData.mobile && !/^09\d{9}$/.test(formData.mobile)) {
    //   newErrors.mobile = "شماره تلفن معتبر نیست.";
    // }

    // if (formData.nationalId && !isValidIranianNationalId(formData.nationalId)) {
    //   newErrors.nationalId = "کد ملی معتبر نیست.";
    // }

    // if (Object.keys(newErrors).length > 0) {
    //   setErrors(newErrors);
    //   return;
    // }

    // تولید یک کد پیگیری تصادفی (مثلا ۸ رقمی)
    const generatedTrackingCode = Math.floor(
      10000000 + Math.random() * 90000000
    ).toString();

    setTrackingCode(generatedTrackingCode);
    setIsModalOpen(true);
  };

  return (
    <div className="report-container">
      <h2 className="title">گزارش اعتراض</h2>
      <form onSubmit={handleSubmit} className="report-form">
        <div className="row">
          <div className="form-group">
            <label>نام</label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
            />
            {/* {errors.firstName && (
              <small className="error">{errors.firstName}</small>
            )} */}
          </div>
          <div className="form-group">
            <label>نام خانوادگی</label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
            />
            {/* {errors.lastName && (
              <small className="error">{errors.lastName}</small>
            )} */}
          </div>
          <div className="form-group">
            <label>کد ملی</label>
            <input
              type="text"
              name="nationalId"
              value={formData.nationalId}
              onChange={handleChange}
              maxLength="10"
            />
            {/* {errors.nationalId && (
              <small className="error">{errors.nationalId}</small>
            )} */}
          </div>
        </div>

        <div className="row">
          <div className="form-group">
            <label>شماره تلفن همراه</label>
            <input
              type="text"
              name="mobile"
              value={formData.mobile}
              onChange={handleChange}
              maxLength="11"
            />
            {/* {errors.mobile && <small className="error">{errors.mobile}</small>} */}
          </div>
          <div className="form-group">
            <label>شماره تلفن ثابت</label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>آدرس پست الکترونیکی (email)</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="row">
          <div className="form-group">
            <label>نوع آزمون</label>
            <select
              name="examType"
              value={formData.examType}
              onChange={handleChange}
            >
              <option value="">----</option>
              <option value="کنکور">کنکور</option>
              <option value="کارشناسی ارشد">کارشناسی ارشد</option>
            </select>
            {/* {errors.examType && (
              <small className="error">{errors.examType}</small>
            )} */}
          </div>

          <div className="form-group">
            <label>آزمون</label>
            <select name="exam" value={formData.exam} onChange={handleChange}>
              <option value="">چیزی انتخاب نشده است</option>
              <option value="A"> آزمون A</option>
            </select>
            {/* {errors.exam && <small className="error">{errors.exam}</small>} */}
          </div>
          <div className="form-group">
            <label>استان محل آزمون</label>
            <select
              name="examState"
              value={formData.examState}
              onChange={handleChange}
            >
              <option value="">----</option>
              {provinces.map((province, index) => (
                <option key={index} value={province}>
                  {province}
                </option>
              ))}
            </select>
            {/* {errors.examState && (
              <small className="error">{errors.examState}</small>
            )} */}
          </div>
        </div>

        <div className="form-group ">
          <label>نوع تخلف</label>
          <select
            className="violation"
            name="violationType"
            value={formData.violationType}
            onChange={handleChange}
          >
            <option value="">----</option>
            <option value="تقلب">تقلب در آزمون کتبی</option>
          </select>
          {/* {errors.violationType && (
            <small className="error">{errors.violationType}</small>
          )} */}
        </div>

        <div className="form-group">
          <label>شرح تخلف رخ داده</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="4"
          ></textarea>
          {/* {errors.description && (
            <small className="error">{errors.description}</small>
          )} */}
        </div>

        <button type="submit">تأیید و دریافت کد پیگیری</button>
      </form>

      {isModalOpen && (
        <ReportModal
          trackingCode={trackingCode}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
};

export default ReportFormComp;