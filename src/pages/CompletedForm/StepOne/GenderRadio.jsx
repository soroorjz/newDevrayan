import React from "react";

const GenderRadio = ({ value, onChange, isEditable }) => (
  <div className="step1-form-group">
    <label>جنسیت:</label>
    <div className="step1-radio-group">
      <label>
        <input
          type="radio"
          name="gender"
          value="مرد"
          checked={value === "مرد"}
          onChange={onChange}
          disabled={!isEditable}
        />
        مرد
      </label>
      <label>
        <input
          type="radio"
          name="gender"
          value="زن"
          checked={value === "زن"}
          onChange={onChange}
          disabled={!isEditable}
        />
        زن
      </label>
    </div>
  </div>
);

export default GenderRadio;