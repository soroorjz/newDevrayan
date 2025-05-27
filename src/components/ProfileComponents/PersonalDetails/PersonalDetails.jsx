import React, { useState } from "react";
import "./PersonalDetails.scss";
const PersonalDetails = () => {
  const [userInfo, setUserInfo] = useState({
    firstName: "سرور",
    lastName: "جامعی‌زاده",
    birthDate: "1995-06-15",
    nationalId: "۰۱۴۲۳۳۵۶",
    fatherName: "علی",
    major: "علوم کامپوتر",
    maritalStatus: "مجرد",
  });

  const [editField, setEditField] = useState(null);
  const [tempValue, setTempValue] = useState("");

  const fields = [
    { key: "firstName", label: "نام" },
    { key: "lastName", label: "نام خانوادگی" },
    { key: "birthDate", label: "تاریخ تولد", type: "date" },
    { key: "nationalId", label: "کد ملی" },
    { key: "fatherName", label: "نام پدر" },
    { key: "major", label: "رشته تحصیلی" },
    {
      key: "maritalStatus",
      label: "وضعیت تأهل",
      type: "select",
      options: ["single", "married"],
    },
  ];

  const startEditing = (key, value) => {
    setEditField(key);
    setTempValue(value);
  };

  const saveField = (key) => {
    setUserInfo({ ...userInfo, [key]: tempValue });
    setEditField(null);
  };

  const cancelEditing = () => {
    setEditField(null);
    setTempValue("");
  };

  return (
    <div className="user-info-form">
      <h2 className="form-title">اطلاعات فردی</h2>
      <div className="form-fields">
        {fields.map((field) => (
          <div className="form-field" key={field.key}>
            <label className="field-label">{field.label}:</label>
            {editField === field.key ? (
              <div className="edit-mode">
                {field.type === "select" ? (
                  <select
                    className="edit-input"
                    value={tempValue}
                    onChange={(e) => setTempValue(e.target.value)}
                  >
                    {field.options.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                ) : (
                  <input
                    className="edit-input"
                    type={field.type || "text"}
                    value={tempValue}
                    onChange={(e) => setTempValue(e.target.value)}
                  />
                )}
                <div className="edit-actions">
                  <button
                    className="save-btn"
                    onClick={() => saveField(field.key)}
                  >
                    ✓
                  </button>
                  <button className="cancel-btn" onClick={cancelEditing}>
                    ✕
                  </button>
                </div>
              </div>
            ) : (
              <div className="display-mode">
                <span className="field-value">{userInfo[field.key]}</span>
                <button
                  className="edit-btn"
                  onClick={() => startEditing(field.key, userInfo[field.key])}
                >
                  ✎
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PersonalDetails;
