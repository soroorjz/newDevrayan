import React, { useState } from "react";
import "./FinalConfirmation.scss";
import Receipt from "../../SignUpFormComp/SignUpStepper/Receipt/Receipt";

const FinalConfirmation = ({ handlePreviousStep }) => {
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [agreeInfo, setAgreeInfo] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("online");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const isDisabled = !(agreeTerms && agreeInfo);

  const handlePaymentClick = (e) => {
    e.preventDefault();
    if (!isDisabled) {
      setIsModalOpen(true);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="exam-payment-form">
        <div className="examPaymenTitle">
          <h1>تأیید نهایی و پرداخت</h1>
        </div>
        <div className="exam-info">
          <h2>
            عنوان آزمون:
            <span>استخدام دوازدهمین آزمون مشترک</span>
          </h2>
          <h2>
            هزینه ثبت‌نام در آزمون: <span>۴,۰۰۰,۰۰۰ ریال</span>
          </h2>
        </div>
        <div className="checkbox-group">
          <label>
            <input
              type="checkbox"
              checked={agreeInfo}
              onChange={() => setAgreeInfo(!agreeInfo)}
            />
            مشخصات، شغل محل و نام آزمون را تأیید می‌کنم.
          </label>
          <label className="sec AgreeTerms">
            <input
              type="checkbox"
              checked={agreeTerms}
              onChange={() => setAgreeTerms(!agreeTerms)}
            />
            قوانین و مقررات مندرج در دفترچه آزمون را مطالعه کرده‌ام و مورد پذیرش
            اینجانب است.
          </label>
          <span>
            <a href="" download className="bookletDownload">
              (دانلود دفترچه آزمون)
            </a>
          </span>
        </div>
        <div className="payment-method">
          <p className="payment-method-Title">روش پرداخت:</p>
          <label>
            <div className="rightPart">
              <img src="/assets/images/mellat.png" alt="" />
              <div className="paymentMethodDesc">
                <p>پرداخت آنلاین</p>
                <span>بانک ملت</span>
              </div>
            </div>
            <input
              type="radio"
              name="payment"
              value="online"
              checked={paymentMethod === "online"}
              onChange={() => setPaymentMethod("online")}
            />
          </label>
        </div>
        <div className="exam-paymentBtns">
          <button className="submit-button" onClick={handlePreviousStep}>
            مرحله قبل
          </button>
          <button
            className={`submit-button ${isDisabled ? "disabled-button" : ""}`}
            disabled={isDisabled}
            onClick={handlePaymentClick}
          >
            پرداخت
          </button>
        </div>
      </div>

      {isModalOpen && (
        <div className="fc-modal-overlay" onClick={closeModal}>
          <div
            className="fc-modal-container"
            onClick={(e) => e.stopPropagation()}
          >
            <Receipt onClose={closeModal} />
          </div>
        </div>
      )}
    </>
  );
};

export default FinalConfirmation;
