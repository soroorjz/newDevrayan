import { useState } from "react";
import "./FaqChat.scss";
const FaqChat = () => {
  const [messages, setMessages] = useState([
    { type: "bot", text: "سلام! چطور می‌تونم کمکتون کنم؟" },
  ]);

  const [inputValue, setInputValue] = useState("");
  const [activeCategory, setActiveCategory] = useState(null);

  const faqAnswers = {
    "چطور ثبت نام کنم؟":
      'برای ثبت نام، به بخش "ثبت نام" سایت مراجعه کرده و اطلاعات خود را تکمیل کنید.',
    "مهلت ثبت نام چقدره؟": "مهلت ثبت نام تا پایان ماه جاری است.",
    "هزینه آزمون چقدره؟": "هزینه آزمون ۵۰ هزار تومان است.",
    "مدارک لازم برای ثبت نام چیه؟":
      "مدارک لازم شامل کپی شناسنامه، کارت ملی و آخرین مدرک تحصیلی است.",
  };

  const suggestedQuestions = Object.keys(faqAnswers);

  const handleSendMessage = (question) => {
    const userMessage = { type: "user", text: question };
    setMessages((prevMessages) => [...prevMessages, userMessage]);

    const botResponse =
      faqAnswers[question] ||
      "متأسفم، پاسخ سوال شما را ندارم. لطفاً سوال دیگری بپرسید.";
    const botMessage = { type: "bot", text: botResponse };
    setTimeout(() => {
      setMessages((prevMessages) => [...prevMessages, botMessage]);
    }, 1000);

    setInputValue("");
    setActiveCategory(null);
  };

  const toggleSuggestions = (category) => {
    setActiveCategory((prevCategory) =>
      prevCategory === category ? null : category
    );
  };

  return (
    <div className="faqChatPart">
      <div className="faqChatPart-Container">
        <div className="faqCategory">
          <div
            className="faqCategory-Title"
            onClick={() => toggleSuggestions("ثبت‌نام در آزمون")}
          >
            <p>ثبت‌نام در آزمون</p>
            {activeCategory === "ثبت‌نام در آزمون" && (
              <div className="faq-chat-suggestions">
                {suggestedQuestions.map((question, index) => (
                  <button
                    key={index}
                    onClick={() => handleSendMessage(question)}
                    className="suggestion-button"
                  >
                    {question}
                  </button>
                ))}
              </div>
            )}
          </div>
          <div
            className="faqCategory-Title"
            onClick={() => toggleSuggestions("حساب کاربری")}
          >
            <p>حساب کاربری</p>
          </div>
          <div
            className="faqCategory-Title"
            onClick={() => toggleSuggestions("آزمون‌ها")}
          >
            <p>آزمون‌ها</p>
          </div>
        </div>
        <div className="faq-chat-container">
          {/* <div className="faq-chat-header">
            سوالات متداول
            <p></p>
          </div> */}
          {/* <div className="faq-chat-messages">
            {messages.map((msg, index) => (
              <div key={index} className={`message ${msg.type}`}>
                {msg.text}
              </div>
            ))}
          </div> */}
          {/* <div className="faq-chat-input">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="سوال خود را بنویسید..."
            />
            <button onClick={() => handleSendMessage(inputValue)}>ارسال</button>
          </div> */}
        </div>
      </div>
    </div>
  );
};
export default FaqChat;
