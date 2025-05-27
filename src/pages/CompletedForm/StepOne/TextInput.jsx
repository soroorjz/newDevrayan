import React from "react";

const TextInput = ({ label, name, value, onChange, isEditable, placeholder }) => (
  <div className="step1-form-group">
    <label>{label}:</label>
    <input
      type="text"
      name={name}
      value={value}
      onChange={onChange}
      readOnly={!isEditable}
      placeholder={placeholder}
    />
  </div>
);

export default TextInput;