import React, { useState } from "react";
import "./SupportHelpCenter.scss";
import { categories } from "./SupportHelpCenterData";
import SupportAptions from "./SupportAptions/SupportAptions";

const SupportHelpCenter = () => {
  const [activeCategory, setActiveCategory] = useState(null);
  const [activeQuestion, setActiveQuestion] = useState(null);
  const [selectedExam, setSelectedExam] = useState(null);
  const [feedback, setFeedback] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);

  const resetState = () => {
    setActiveCategory(null);
    setActiveQuestion(null);
    setSelectedExam(null);
    setFeedback(null);
    setSelectedOption(null);
  };

  const handleCategoryClick = (category) => {
    setActiveCategory(category);
    setActiveQuestion(null);
    setSelectedExam(null);
    setFeedback(null);
  };

  const handleQuestionClick = (questionObj) => {
    setActiveQuestion(questionObj);
  };

  const handleExamChange = (event) => {
    setSelectedExam(event.target.value);
  };

  const handleFeedbackClick = (type) => {
    if (type === "like") {
      resetState();
    } else {
      setFeedback("dislike");
    }
  };

  return (
    <div className="support-help-center">
      {/* نمایش دسته‌بندی‌ها */}
      {!activeCategory && !feedback && (
        <div className="categories">
          <h2>دسته‌بندی‌ها</h2>
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => handleCategoryClick(category)}
              className="category-button"
            >
              {category.name}
            </button>
          ))}
        </div>
      )}

      {/* نمایش سوالات مربوط به دسته‌بندی انتخاب شده */}
      {activeCategory && !activeQuestion && (
        <div className="questions">
          <h2>{activeCategory.name}</h2>
          {activeCategory.questions.map((question, index) => (
            <button
              key={index}
              onClick={() => handleQuestionClick(question)}
              className="question-button"
            >
              {question.question}
            </button>
          ))}
          <button onClick={resetState} className="back-button">
            بازگشت
          </button>
        </div>
      )}

      {/* انتخاب آزمون پس از انتخاب سوال */}
      {activeQuestion && !selectedExam && (
        <div className="exam-selection">
          <h2>آزمون مورد نظر خود را انتخاب کنید:</h2>
          <select onChange={handleExamChange} className="exam-dropdown">
            <option value="">انتخاب کنید</option>
            {activeQuestion.exams.map((exam, index) => (
              <option key={index} value={exam.name}>
                {exam.name}
              </option>
            ))}
          </select>
          <button
            onClick={() => setActiveQuestion(null)}
            className="back-button"
          >
            بازگشت
          </button>
        </div>
      )}

      {/* نمایش پاسخ پس از انتخاب آزمون */}
      {selectedExam && !feedback && (
        <div className="answer">
          <h2>{activeQuestion.question}</h2>
          <p>
            {
              activeQuestion.exams.find((exam) => exam.name === selectedExam)
                ?.answer
            }
          </p>

          <div className="feedback-buttons">
            <button
              onClick={() => handleFeedbackClick("like")}
              className="like-button"
            >
              مفید بود
            </button>
            <button
              onClick={() => handleFeedbackClick("dislike")}
              className="dislike-button"
            >
              نیاز به راهنمایی بیشتر دارم
            </button>
          </div>
        </div>
      )}

      {feedback === "dislike" && !selectedOption && (
        <SupportAptions
          onSelectOption={setSelectedOption}
          resetState={resetState}
        />
      )}
    </div>
  );
};

export default SupportHelpCenter;
