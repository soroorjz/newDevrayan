import React, { useState, useRef } from "react";
import { IoMdCloseCircle } from "react-icons/io";
import { FaLocationDot } from "react-icons/fa6";
import { FaCircleCheck, FaUpload } from "react-icons/fa6";
import { RiFileDamageFill } from "react-icons/ri";
import { motion, AnimatePresence } from "framer-motion";
import "./DocumentReviewResult.scss";

const DocumentReviewResult = () => {
  const [activeTab, setActiveTab] = useState("approved");
  const [showRejectionDetails, setShowRejectionDetails] = useState(false);
  const [showIncompleteDetails, setShowIncompleteDetails] = useState(false);
  const [showInpersonDetails, setShowInpersonDetails] = useState(false);
  const fileInputRefs = useRef([]);

  const tabs = [
    { id: "approved", label: "تایید شده" },
    { id: "rejected", label: "رد شده" },
    { id: "incomplete", label: "دارای نواقص" },
    { id: "inperson", label: "نیاز به حضور" },
  ];

  const incompleteDocuments = [
    {
      title: "کارت ملی",
      requirement: "اجباری",
      deadlineDate: "1404/03/30",
      deadlineTime: "23:59",
    },
    {
      title: "شناسنامه",
      requirement: "اختیاری",
      deadlineDate: "1404/03/28",
      deadlineTime: "20:00",
    },
  ];

  const handleUploadClick = (index) => {
    fileInputRefs.current[index].click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      console.log("فایل انتخاب شده:", file.name); // می‌توانید این را با منطق آپلود خود جایگزین کنید
    }
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "approved":
        return (
          <div className="tab-content approved">
            <FaCircleCheck />
            <p>
             مدارک شما مورد بررسی قرار گرفته و تأیید گردید.
             </p>
          </div>
        );
      case "rejected":
        return (
          <div className="tab-content rejected">
            <IoMdCloseCircle />
            <p>مدارک شما بررسی و رد شده است.</p>
            <button
              className="details-button"
              onClick={() => setShowRejectionDetails(!showRejectionDetails)}
            >
              توضیحات
            </button>
            <AnimatePresence>
              {showRejectionDetails && (
                <motion.p
                  className="rejection-details"
                  initial={{ height: 0, opacity: 0, y: -10 }}
                  animate={{ height: "auto", opacity: 1, y: 0 }}
                  exit={{ height: 0, opacity: 0, y: -10 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                >
                  با توجه به نقص مدارک و عدم ارسال مدارک در بازه‌ی زمانی مذکور،
                  مدارک شما رد شده است.
                </motion.p>
              )}
            </AnimatePresence>
          </div>
        );
      case "incomplete":
        return (
          <div className="tab-content incomplete">
            <RiFileDamageFill />
            <p>
              مدارک شما بررسی شده است و دارای نواقص ذیل می‌باشد. لطفاً در بازه‌ی
              تعیین شده مدارک لازم را بارگذاری کنید.
            </p>
            <div className="deadline-info">
              <p>
                مهلت بارگذاری:{" "}
                <span>{incompleteDocuments[0].deadlineDate}</span>
              </p>
              <p>
                ساعت: <span>{incompleteDocuments[0].deadlineTime}</span>{" "}
              </p>
            </div>
            <table className="documents-table">
              <thead>
                <tr>
                  <th>عنوان مدرک</th>
                  <th>نوع الزام</th>
                  <th>بارگذاری</th>
                </tr>
              </thead>
              <tbody>
                {incompleteDocuments.map((doc, index) => (
                  <tr key={index} className="document-item">
                    <td>{doc.title}</td>
                    <td>{doc.requirement}</td>
                    <td>
                      <div className="upload-button-wrapper">
                        <button
                          className="upload-button"
                          onClick={() => handleUploadClick(index)}
                        >
                          <FaUpload />
                        </button>
                        <input
                          type="file"
                          ref={(el) => (fileInputRefs.current[index] = el)}
                          onChange={handleFileChange}
                          style={{ display: "none" }}
                        />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <button
              className="details-button"
              onClick={() => setShowIncompleteDetails(!showIncompleteDetails)}
            >
              توضیحات
            </button>
            <AnimatePresence>
              {showIncompleteDetails && (
                <motion.p
                  className="incomplete-details"
                  initial={{ height: 0, opacity: 0, y: -10 }}
                  animate={{ height: "auto", opacity: 1, y: 0 }}
                  exit={{ height: 0, opacity: 0, y: -10 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                >
                  لطفاً مدارک مورد نیاز را طبق نوع الزام (اجباری یا اختیاری)
                  بارگذاری کنید. عدم بارگذاری مدارک اجباری ممکن است منجر به رد
                  نهایی مدارک شود.
                </motion.p>
              )}
            </AnimatePresence>
          </div>
        );
      case "inperson":
        return (
          <div className="tab-content inperson">
            <FaLocationDot />
            <p>
              مدارک شما بررسی شده است و نیاز به حضور شما در تاریخ{" "}
              <span className="bold">1404/03/25</span> و رأس ساعت{" "}
              <span className="bold">8:00</span> در نشانی تهران، نجات اللهی،
              خیابان مفتح، خیابان کریم خان زند می‌باشد.
            </p>
            <button
              className="details-button"
              onClick={() => setShowInpersonDetails(!showInpersonDetails)}
            >
              توضیحات
            </button>
            <AnimatePresence>
              {showInpersonDetails && (
                <motion.p
                  className="inperson-details"
                  initial={{ height: 0, opacity: 0, y: -10 }}
                  animate={{ height: "auto", opacity: 1, y: 0 }}
                  exit={{ height: 0, opacity: 0, y: -10 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                >
                  لطفاً در زمان و مکان مشخص‌شده حاضر شوید و مدارک لازم را
                  به‌صورت فیزیکی ارائه دهید. عدم حضور ممکن است منجر به رد نهایی
                  مدارک شود.
                </motion.p>
              )}
            </AnimatePresence>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="document-review-result">
      <h1 className="title">نتیجه ی بررسی مدارک:</h1>
      <div className="tabs">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`tab ${activeTab === tab.id ? "active" : ""}`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="tab-content-wrapper">{renderTabContent()}</div>
    </div>
  );
};

export default DocumentReviewResult;
