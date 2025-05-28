import React from "react";
import candidateData from "../../../ExamCardFile/data.json";
import { useNavigate } from "react-router-dom"; // برای ناوبری
import "./Receipt.scss";

const Receipt = ({ onClose }) => {
  const navigate = useNavigate(); // تعریف navigate برای هدایت

  const handleConfirm = () => {
    navigate("/"); // هدایت به صفحه اصلی
  };

  return (
    <div className="receipt-modal">
      <div className="receipt-card-body">
        <button className="receipt-close-btn" onClick={onClose}>
          ×
        </button>
        <div className="receipt-card-title">
          <h4>رسید ثبت نام </h4>
        </div>
        <div className="receipt-header-card">
          <div className="receipt-header-row">
            <div className="receipt-col-9">
              <div className="receipt-applicant-code">
                <strong>
                  نام و نام خانوادگی{" "}
                  <span>
                    {candidateData.firstName} {candidateData.lastName}
                  </span>
                </strong>
              </div>
            </div>
            <div className="receipt-col-3">
              <div className="receipt-personal-img-div">
                <img src={candidateData.logo} alt="personal photo" />
              </div>
            </div>
          </div>
        </div>
        <div className="receipt-info-div-col personal-info">
          <div className="receipt-info-div">
            <div className="mt-1">
              <label>
                کد ملی: <span>{candidateData.nationalCode}</span>
              </label>
            </div>
            <div className="mt-1">
              <label>
                جنسیت: <span>{candidateData.gender}</span>
              </label>
            </div>
            <div className="mt-1">
              <label>
                تاریخ تولد: <span>{candidateData.birthDate}</span>
              </label>
            </div>
            <div className="mt-1">
              <label>
                سن: <span>{candidateData.age}</span>
              </label>
            </div>
            <div className="mt-1">
              <label>
                نام پدر: <span>{candidateData.fatherName}</span>
              </label>
            </div>
            <div className="mt-1">
              <label>
                تلفن: <span>{candidateData.phone}</span>
              </label>
            </div>
          </div>
          <div className="receipt-info-div">
            <div className="mt-1">
              <label>
                شماره شناسنامه: <span>{candidateData.BirthCertificate}</span>
              </label>
            </div>
            <div className="mt-1">
              <label>
                محل تولد: <span>{candidateData.placeOfBirth}</span>
              </label>
            </div>
            <div className="mt-1">
              <label>
                مدرک تحصیلی: <span>{candidateData.EducationalLevel}</span>
              </label>
            </div>
            <div className="mt-1">
              <label>
                رشته تحصیلی: <span>{candidateData.fieldOfStudy}</span>
              </label>
            </div>
            <div className="mt-1">
              <label>
                وضعیت تاهل: <span>{candidateData.Marriage}</span>
              </label>
            </div>
            <div className="mt-1">
              <label>
                شماره همراه: <span>{candidateData.mobile}</span>
              </label>
            </div>
          </div>
          <div className="receipt-info-div">
            <div className="mt-1">
              <label>
                کد پستی: <span>{candidateData.postCode}</span>
              </label>
            </div>
            <div className="mt-1">
              <label>
                آدرس: <span className="wrap-text">{candidateData.address}</span>
              </label>
            </div>
          </div>
        </div>
        <div className="receipt-info-div-col">
          <div>
            <small>ثبت نام با موفقیت انجام شد.</small>
          </div>
          <div>
            <small>
              مبلغ پرداخت شده: <span>{candidateData.amountPaid}</span>
            </small>
          </div>
          <div>
            <label>
              کد رهگیری پرداخت شما: <span>561645</span>
            </label>
          </div>
        </div>
        <div className="receipt-confirm-button">
          <button onClick={handleConfirm}>تأیید</button>
        </div>
      </div>
    </div>
  );
};

export default Receipt;