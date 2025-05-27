import React from "react";

const TextInput = ({ label, name, value, onChange, error, type = "text", disabled = false }) => {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}:</label>
      <input
        type={type}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={`${label} خود را وارد کنید`}
        disabled={disabled}
      />
      {error && <small className="error">{error}</small>}
    </div>
  );
};

export default TextInput;
