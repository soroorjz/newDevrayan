import React from "react";
import "./ExamCardFile.scss";
import candidateData from "./data.json";

const ExamCardFile = () => {
  return (
    <div className="exam-entryContainer">
      <div className="exam-entry-card">
        <div className="sideWrapper">
          <div className="exam-entry-card-wrapper">
            <div className="header-section">
              <div className="logo-container">
                <img src={candidateData.logo} alt="Logo" className="logo" />
              </div>
              <div className="header-text">
                <h1>
                  کارت شرکت در آزمون استخدامی سازمان ثبت اسناد و املاک کشور
                </h1>
                <h2>اسفند ماه سال ۱۴۰۳</h2>
              </div>
              <div className="stamp">
                <img
                  src="/assets/images/logo2.png"
                  alt="Stamp"
                  className="stamp-image"
                />
              </div>
            </div>
            <div className="info-cell number">
              <div className="numberWrapper">
                <span className="label">شماره داوطلب:</span>
                <span className="value">{candidateData.candidateNumber}</span>
              </div>
              <p>
                <span>به حروف: </span>
                <span> یک میلیون و هشتصد و دو هزار و صد و چهل و دو</span>
              </p>
            </div>
            {/* اطلاعات داوطلب و آزمون */}
            <div className="info-table">
              <div className="info-row"></div>
              <div className="info-row">
                <div className="info-cell">
                  <span className="label"> کد ملی:</span>
                  <span className="value">{candidateData.nationalCode}</span>
                </div>
                <div className="info-cell">
                  <span className="label"> نوع سهمیه‌ ثبت‌نامی:</span>
                  <span className="value">{candidateData.quota}</span>
                </div>
              </div>
              <div className="info-row">
                <div className="info-cell">
                  <span className="label">نام خانوادگی :</span>
                  <span className="value">{candidateData.lastName}</span>
                </div>
                <div className="info-cell">
                  <span className="label"> وضعیت ایثارگری :</span>
                  <span className="value">{candidateData.sacrifice}</span>
                </div>
              </div>
              <div className="info-row">
                <div className="info-cell">
                  <span className="label"> نام:</span>
                  <span className="value">{candidateData.firstName}</span>
                </div>
                <div className="info-cell">
                  <span className="label"> </span>
                  <span className="value"> </span>
                </div>
              </div>
              <div className="info-row">
                <div className="info-cell">
                  <span className="label"> نام پدر:</span>
                  <span className="value">{candidateData.fatherName}</span>
                </div>
                <div className="info-cell">
                  <span className="label">وضعیت تاهل:</span>
                  <span className="value">{candidateData.Marriage}</span>
                </div>
              </div>
              <div className="info-row">
                <div className="info-cell">
                  <span className="label"> جنسیت :</span>
                  <span className="value">{candidateData.gender}</span>
                </div>
                <div className="info-cell">
                  <span className="label"> مقطع تحصیلی:</span>
                  <span className="value">
                    {candidateData.EducationalLevel}
                  </span>
                </div>
              </div>
              <div className="info-row">
                <div className="info-cell">
                  <span className="label">تاریخ تولد:</span>
                  <span className="value">{candidateData.birthDate}</span>
                </div>
                <div className="info-cell">
                  <span className="label">رشته تحصیلی:</span>
                  <span className="value">{candidateData.fieldOfStudy}</span>
                </div>
              </div>
              <div className="info-row">
                <div className="info-cell">
                  <span className="label">شماره شناسنامه :</span>
                  <span className="value">{candidateData.candidateNumber}</span>
                </div>
                <div className="info-cell">
                  <span className="label"> تاریخ فارغ‌التحصیلی:</span>
                  <span className="value">{candidateData.graduationYear}</span>
                </div>
              </div>
              <div className="info-row">
                <div className="info-cell">
                  <span className="label">دین :</span>
                  <span className="value">{candidateData.religion}</span>
                </div>
                <div className="info-cell">
                  <span className="label"> معدل مدرک تحصیلی ثبت‌نامی:</span>
                  <span className="value">{candidateData.gpa}</span>
                </div>
              </div>
              <div className="info-row">
                <div className="info-cell">
                  <span className="label"> معلولیت:</span>
                  <span className="value">{candidateData.secretory}</span>
                </div>
                <div className="info-cell">
                  <span className="label"> نیازمند منشی:</span>
                  <span className="value">{candidateData.secretory}</span>
                </div>
              </div>
              <div className="info-row">
                <div className="info-cell full-width">
                  <span className="label">
                    دستگاه اجرایی/ شغل مورد تقاضا/ محل مورد تقاضا:
                  </span>
                  <span className="value">{candidateData.details}</span>
                </div>
              </div>
              <div className="info-row">
                <div className="info-cell full-width">
                  <span className="label">سهمیه‌ بومی:</span>
                  <span className="value">{candidateData.nativQuota}</span>
                </div>
              </div>
            </div>

            <div className="exam-detail">
              <p>
                <strong>محل آزمون:</strong> {candidateData.examLocation}
              </p>
              <p>
                <strong>آدرس دقیق محل آزمون:</strong>{" "}
                {candidateData.examAddress}
              </p>
              <p>
                <strong>تاریخ و ساعت حضور در محل آزمون:</strong>{" "}
                {candidateData.examDateTime}
              </p>

              <h4>محل امضا و اثر انگشت</h4>
            </div>

            {/* نکات مهم */}
            <div className="important-notes">
              <h3>تذکر مهم:</h3>
              <ul>
                {candidateData.notes.map((note, index) => (
                  <li key={index}>{note}</li>
                ))}
              </ul>
            </div>
            {/* <div className="entryCardSilde">sdgvxd</div> */}
          </div>
          <div className="side">
            <p>شروع فرایند برگزاری آزمون صبح روز جمعه ۱۴۰۳/۱۲/۲۵ ساعت ۸:۳۰</p>
          </div>
        </div>

        <div className="separator">**از قسمت مشخص شده برش داده شود**</div>
      </div>
      <button className="printBtn">
        <p>چاپ کارت</p>
      </button>
      <h4>توضیحات:</h4>
      <div className="examCardeDesc">
        <p>1. {candidateData.footerNote[0]}</p>
        <p>2. {candidateData.footerNote[1]}</p>
        <p>3. {candidateData.footerNote[2]}</p>
        <p>4. {candidateData.footerNote[3]}</p>
        <p>5. {candidateData.footerNote[4]}</p>
        <p>6. {candidateData.footerNote[5]}</p>
        <p>7. {candidateData.footerNote[6]}</p>
        <p>8. {candidateData.footerNote[7]}</p>
        <p>9. {candidateData.footerNote[8]}</p>
      </div>
    </div>
  );
};

export default ExamCardFile;
