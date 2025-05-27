import { motion, AnimatePresence } from "framer-motion";
import {
  FaPhone,
  FaEnvelope,
  FaPaperPlane,
  FaInstagram,
  FaWhatsapp,
  FaTimes,
  FaComment,
} from "react-icons/fa";
import "./ChatBot.scss";
import { useState } from "react";
import MessageForm from "./MessageForm";
import ChatBox from "./ChatBox";
import MenuItems from "./MenuItems";

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredItem, setHoveredItem] = useState(null);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isMessageFormOpen, setIsMessageFormOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    message: "",
    phone: "",
    department: "پشتیبانی",
  });

  const toggleMenu = () => {
    if (isOpen) {
      setIsChatOpen(false);
      setIsMessageFormOpen(false);
    }
    setIsOpen(!isOpen);
  };

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
    if (!isChatOpen) setIsMessageFormOpen(false);
  };

  const toggleMessageForm = () => {
    setIsMessageFormOpen(!isMessageFormOpen);
    if (!isMessageFormOpen) setIsChatOpen(false);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const menuItems = [
    { icon: <FaComment />, key: "chat", label: "چت آنلاین", action: toggleChat },
    { icon: <FaEnvelope />, key: "message", label: "ارسال پیام", action: toggleMessageForm },
    { icon: <FaPhone />, key: "phone", label: "تماس", action: () => window.open("tel:02634164030") },
    { icon: <FaPaperPlane />, key: "telegram", label: "تلگرام", action: () => window.open("https://t.me/rayanegan_support", "_blank") },
    { icon: <FaInstagram />, key: "instagram", label: "اینستاگرام", action: () => window.open("https://www.instagram.com/rayanegan_institute/", "_blank") },
    { icon: <FaWhatsapp />, key: "whatsapp", label: "واتساپ", action: () => window.open("https://api.whatsapp.com/send?phone=+989018329109", "_blank") },
  ];

  return (
    <div className="floating-menu">
      <motion.button
        onClick={toggleMenu}
        className={`chatBotMenu-toggle ${isOpen ? "active" : ""}`}
        whileTap={{ scale: 0.9 }}
        id="chatBotMainBtn"
      >
        {isOpen ? <FaTimes size={24} /> : <FaEnvelope size={24} />}
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="menu"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
          >
            <MenuItems menuItems={menuItems} setHoveredItem={setHoveredItem} isOpen={isOpen} hoveredItem={hoveredItem} />
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isChatOpen && <ChatBox toggleChat={toggleChat} />}
      </AnimatePresence>

      <AnimatePresence>
        {isMessageFormOpen && (
          <MessageForm toggleMessageForm={toggleMessageForm} formData={formData} handleChange={handleChange} />
        )}
      </AnimatePresence>
    </div>
  );
};

export default ChatBot;
