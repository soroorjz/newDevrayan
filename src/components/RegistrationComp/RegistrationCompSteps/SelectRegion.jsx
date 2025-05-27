import React, { useState } from "react";
import "./SelectRegion.scss";
import { FaCheckDouble } from "react-icons/fa6";
import { FaDownload } from "react-icons/fa6";
import { FaTimes } from "react-icons/fa";
import { GoQuestion } from "react-icons/go";

const SelectRegion = ({ onNext, handlePreviousStep }) => {
  const [residency, setResidency] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [error, setError] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const allowedFormats = [
      "image/jpeg",
      "image/png",
      "image/jpg",
      "image/webp",
    ];
    if (!allowedFormats.includes(file.type)) {
      setError(
        "فرمت فایل نامعتبر است! لطفا یک تصویر با فرمت JPG, PNG یا WEBP انتخاب کنید."
      );
      return;
    }

    const maxSize = 2 * 1024 * 1024;
    if (file.size > maxSize) {
      setError("حجم فایل بیش از 2 مگابایت است!");
      return;
    }

    setSelectedFile(URL.createObjectURL(file));
    setError("");
  };

  const removeFile = () => {
    setSelectedFile(null);
    setError("");
    document.getElementById("file-upload").value = "";
  };

  const isNextDisabled = !residency || (residency === "بومی" && !selectedFile);

  return (
    <div className="job-selection-residency">
      <div className="rules">
        <h2>داوطلب بومی:</h2>
        <p>
          افرادی كه حداقل دارای یكی از ویژگی‌های زیر باشند، داوطلب بومی محسوب
          می‌شوند:
        </p>
        <p>۱- شهرستان محل تولد داوطلب با شهرستان محل مورد تقاضا یکی باشد.</p>
        <p>۲- محل سکونت فعلی داوطلب با شهرستان محل مورد تقاضا یکی باشد.</p>
        <p>
          ۳- حداقل چهار سال از سنوات تحصیلی در شهرستان یا استان مورد تقاضا طی
          شده باشد.
        </p>
        <p>
          ۴- حداقل چهار سال سابقه پرداخت بیمه در شهرستان مورد تقاضا وجود داشته
          باشد.
        </p>
        <p>
          <span>توضیحات:</span> داوطلبان در صورت قبولی حداکثر ۳ ماه مهلت دارند
          محل سکونت خود را به شهرستان مورد نظر منتقل کنند.
        </p>
      </div>
      
      <div className="selection">
        <p>
          <FaCheckDouble />
          انتخاب شغل محل براساس
          <select
            onChange={(e) => setResidency(e.target.value)}
            className="residency-select"
          >
            <option value="">انتخاب کنید</option>
            <option value="بومی">بومی</option>
            <option value="غیر بومی">غیر بومی</option>
          </select>
          <span>صورت گرفته است.</span>
        </p>
      </div>
      {residency === "بومی" && (
        <div className="boomi-options">
          <p className="OathPart" onClick={() => setIsModalOpen(true)}>
            <GoQuestion className="modalIcon" />
            توضیحات استشهاد محلی
          </p>
          <a
            href="/assets/forms/native_form2.pdf"
            className="download-link"
            download
          >
            <FaDownload /> دریافت فرم استشهادنامه محلی
          </a>
          <div className="upload-wrapper">
            <label htmlFor="file-upload" className="upload-label">
              بارگذاری فرم استشهادنامه محلی
            </label>
            <input
              id="file-upload"
              type="file"
              accept="image/*"
              className="upload-file"
              onChange={handleFileChange}
              hidden
            />
            {error && <p className="error-message">{error}</p>}
            {selectedFile && (
              <div className="preview">
                <img
                  src={selectedFile}
                  alt="فرم استشهاد"
                  className="preview-image"
                />
                <button onClick={removeFile} className="remove-preview">
                  <FaTimes />
                </button>
              </div>
            )}
          </div>
        </div>
      )}
      <div className="SelectRegionSubmitBtns">
        <button className="RegionPrevBtn" onClick={handlePreviousStep}>
          مرحله قبل
        </button>
        <button
          className={`RegionSubmitBtn ${isNextDisabled ? "disabled-btn" : ""}`}
          onClick={onNext}
          disabled={isNextDisabled}
        >
          مرحله بعد
        </button>
      </div>
      {isModalOpen && (
        <div className="modal-container show">
          <div className="modal-content">
            <button className="close-btn" onClick={() => setIsModalOpen(false)}>
              <FaTimes />
            </button>
            <h2>توضیحات استشهاد محلی</h2>

            <div className="SelectRegionModalContent">
              <p>◼️ فرم را از طریق فایل پیوست قرار داده شده دانلود نمایید.</p>
              <p>
                ◼️ برگه استشهاد محلی را بصورت چاپ شده تهیه نمایید. (می‌توانید در
                خانه و یا از طریق کافی‌نت فرم را پرینت بگیرید)
              </p>
              <p>
                ◼️ در بخش اول فرم، نام و نام خانوادگی، نام پدر و کد ملی خود را
                وارد کنید. (امضا و اثر انگشت الزامی است){" "}
              </p>
              <p>
                ◼️ در بخش دوم، سه نفر باید ساکن بودن شما را در شهرستان مورد
                تقاضا با امضا و اثر انگشت گواهی نمایند.
              </p>
              <p>
                ◼️ برای ممهور کردن فرم استشهاد محلی، برگه را به نیروی انتظامی
                (پاسگاه یا کلانتری محل) یا فرمانداری شهرستان مورد تقاضا مراجعه
                نموده و تأییدیه لازم را بگیرید.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SelectRegion;
