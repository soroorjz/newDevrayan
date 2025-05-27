import React from "react";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";

const DatePickerInput = ({setFormData,formData,errors}) => {
  const handleDateChange = (value) => {
    setFormData({
      ...formData,
      birthDate: value.format("YYYY-MM-DD"),
    });
  };

  return (
    <div className="form-group">
                <label htmlFor="birthDate">تاریخ تولد:</label>
                <DatePicker
                style={{ width: "100%" }}
                  id="birthDate"
                  name="birthDate"
                  calendar={persian}
                  locale={persian_fa}
                  value={formData.birthDate}
                  onChange={handleDateChange}
                  inputClass="custom-date-input"
                  placeholder="تاریخ تولد را انتخاب کنید"
                />
                {errors.birthDate && (
                  <small className="error">{errors.birthDate}</small>
                )}
              </div>
  );
};

export default DatePickerInput;
