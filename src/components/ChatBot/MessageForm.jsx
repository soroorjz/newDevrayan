import React from "react";
import { motion } from "framer-motion";
import { FaTimes } from "react-icons/fa";
const MessageForm = ({ toggleMessageForm, formData, handleChange }) => {
  return (
    <motion.div
      className="message-form"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="form-header">
        پشتیبانی پیامکی پشتیبانی گویا
        <button className="close-btn" onClick={toggleMessageForm}>
          <FaTimes size={16} />
        </button>
      </div>
      <form className="form-body">
        <input
          type="text"
          name="name"
          placeholder="نام شما"
          value={formData.name}
          onChange={handleChange}
        />
        <textarea
          name="message"
          placeholder="سوال شما"
          value={formData.message}
          onChange={handleChange}
        />
        <input
          type="text"
          name="phone"
          placeholder="شماره تلفن"
          value={formData.phone}
          onChange={handleChange}
        />
        <div className="department">
          <label>دپارتمان:</label>
          <select
            name="department"
            value={formData.department}
            onChange={handleChange}
          >
            <option value="پشتیبانی">پشتیبانی</option>
            <option value="فروش">فروش</option>
            <option value="مالی">مالی</option>
          </select>
        </div>
        <button type="submit" className="submit-btn">
          لطفا پیام بگذارید
        </button>
      </form>
    </motion.div>
  );
};

export default MessageForm;
