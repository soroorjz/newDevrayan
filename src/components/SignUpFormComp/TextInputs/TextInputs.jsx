import React from "react";
import { textInputsDatas } from "../data";
import "./TextInputs.scss";
const TextInputs = ({ formData, handleChange, errors }) => {
  return (
    <div className="TextInputs">
      {textInputsDatas.map((input) => (
        <div key={input.id} className="form-group">
          <label htmlFor={input.id}>{input.label}:</label>
          <input
            type={input.type}
            id={input.id}
            name={input.id}
            value={formData[input.id]}
            onChange={handleChange}
            placeholder={`${input.label} خود را وارد کنید`}
          />
          {errors[input.id] && (
            <small className="error">{errors[input.id]}</small>
          )}
        </div>
      ))}
    </div>
  );
};

export default TextInputs;
