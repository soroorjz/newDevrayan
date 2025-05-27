import { useState, useEffect } from "react";
import { FaTimes } from "react-icons/fa";
import { IoIosSend } from "react-icons/io";
import { motion } from "framer-motion";
import "./ChatBox.scss"
const ChatBox = ({ toggleChat }) => {
  const [isSupportOnline, setIsSupportOnline] = useState(false);
  const [message, setMessage] = useState("");

  // استفاده از useEffect برای بارگذاری وضعیت آنلاین بودن از localStorage
  useEffect(() => {
    const savedStatus = localStorage.getItem("supportOnline");
    if (savedStatus === "true") {
      setIsSupportOnline(true);
    } else if (savedStatus === "false") {
      setIsSupportOnline(false);
    } else {
      // اگر اطلاعات موجود نباشه، وضعیت آنلاین بودن رو تصادفی تعیین می‌کنیم
      const randomStatus = Math.random() > 0.5;
      setIsSupportOnline(randomStatus);
      localStorage.setItem("supportOnline", randomStatus.toString());
    }
  }, []);

  // تابع برای ارسال پیام
  const handleSendMessage = () => {
    if (message.trim()) {
      console.log("پیام ارسال شد:", message);
      setMessage("");
    }
  };

  // تابع برای تغییر وضعیت آنلاین بودن
  const toggleSupportStatus = () => {
    const newStatus = !isSupportOnline;
    setIsSupportOnline(newStatus);
    localStorage.setItem("supportOnline", newStatus.toString());
  };

  return (
    <motion.div
      className="chat-box"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.3 }}
    >
      <div className="chat-header">
        {isSupportOnline ? "پشتیبانی آنلاین" : "شروع گفتگو"}
        <button className="close-chat" onClick={toggleChat}>
          <FaTimes size={16} />
        </button>
      </div>

      <div className="chat-body">
        {isSupportOnline ? (
          <div className="chat-messages">
            <p className="support-msg">👋 سلام! چطور می‌توانم کمک کنم؟</p>
          </div>
        ) : (
          <p className="offlineText">متاسفانه فعلاً آنلاین نیستیم. پیام خود را از طریق ارسال پیام ثبت کنید.</p>
        )}
      </div>

      <div className="chat-footer">
        <input
          type="text"
          placeholder="پیام خود را بنویسید..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          disabled={!isSupportOnline}
        />
        <button
          className="chat-submit"
          onClick={handleSendMessage}
          disabled={!isSupportOnline}
        >
          <IoIosSend />
        </button>
      </div>

      {/* دکمه برای تغییر وضعیت آنلاین بودن پشتیبان */}
      <button className="Temporary" onClick={toggleSupportStatus}>
        {isSupportOnline ? "-" : "+ "}
      </button>
    </motion.div>
  );
};

export default ChatBox;
