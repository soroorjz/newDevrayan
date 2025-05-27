import React, { useState } from "react";
import "./OnlineChat.scss";
const OnlineChat = () => {
  const [formData, setFormData] = useState({
    name: "",
    question: "",
    contact: "",
    department: "پشتیبانی",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  return (
    <div className="chat-container">
      <p className="chat-title">به گفتگوی آنلاین خوش آمدید!</p>
      <p className="chat-subtitle">
        مشکل یا درخواست خودتون رو برای ما بفرستید در سریع‌ترین زمان پاسخگو
        خواهیم بود.
      </p>
      <form onSubmit={handleSubmit} className="chat-form">
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="نام شما"
          className="chat-input"
          required
        />
        <textarea
          name="question"
          value={formData.question}
          onChange={handleChange}
          placeholder="سوال شما"
          className="chat-textarea"
          required
        ></textarea>
        <input
          type="text"
          name="contact"
          value={formData.contact}
          onChange={handleChange}
          placeholder="تلفن"
          className="chat-input"
          required
        />
        <label className="chat-label">دپارتمان:</label>
        <select
          name="department"
          value={formData.department}
          onChange={handleChange}
          className="chat-select"
        >
          <option value="پشتیبانی">پشتیبانی</option>
          <option value="فروش">فروش</option>
          <option value="فنی">فنی</option>
        </select>
        <button type="submit" className="chat-button">
          شروع گفتگو
        </button>
      </form>
    </div>
  );
};

export default OnlineChat;
