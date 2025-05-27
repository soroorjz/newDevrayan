import { useState } from "react";
import "./Faq.scss";
import { questions } from "./faqData";
const Faq = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("ثبت‌نام"); // مقدار پیش‌فرض روی "ثبت‌نام"

  const toggleAnswer = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const filterQuestionsByCategory = (category) => {
    setSelectedCategory(category);
    setActiveIndex(null);
  };

  return (
    <div className="faqPart">
      <div className="faqCategoryBtns">
        <button
          className={selectedCategory === "ثبت‌نام" ? "categoryActive" : ""}
          onClick={() => filterQuestionsByCategory("ثبت‌نام")}
        >
          ثبت‌نام
        </button>
        <button
          className={
            selectedCategory === "کارت ورود به آزمون" ? "categoryActive" : ""
          }
          onClick={() => filterQuestionsByCategory("کارت ورود به آزمون")}
        >
          کارت ورود به آزمون
        </button>
        <button
          className={selectedCategory === "حساب کاربری" ? "categoryActive" : ""}
          onClick={() => filterQuestionsByCategory("حساب کاربری")}
        >
          حساب کاربری
        </button>
        <button
          className={
            selectedCategory === "شرکت در آزمون" ? "categoryActive" : ""
          }
          onClick={() => filterQuestionsByCategory("شرکت در آزمون")}
        >
          شرکت در آزمون
        </button>
        <button
          className={selectedCategory === "نتایج" ? "categoryActive" : ""}
          onClick={() => filterQuestionsByCategory("نتایج")}
        >
          نتایج
        </button>
      </div>
      <div className="faq-container">
        <div className="faq-list">
          {questions
            .filter((item) => item.category === selectedCategory)
            .map((item, index) => (
              <div
                key={index}
                className={`faq-item ${activeIndex === index ? "active" : ""}`}
              >
                <div
                  className="faq-question"
                  onClick={() => toggleAnswer(index)}
                >
                  <span>{item.question}</span>
                  <span className="faq-toggle">
                    {activeIndex === index ? "−" : "＋"}
                  </span>
                </div>
                {activeIndex === index && (
                  <div className="faq-answer">{item.answer}</div>
                )}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Faq;
