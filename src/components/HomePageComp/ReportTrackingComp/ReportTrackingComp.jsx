import React, { useState } from "react";
import "./ReportTrackingComp.scss";

const ReportTrackingComp = () => {
  const [trackingCode, setTrackingCode] = useState("");
  const [reportData, setReportData] = useState(null);
  const [error, setError] = useState(null);

  const handleCheckReport = () => {
    if (trackingCode === "123456") {
      setReportData({
        title: "برخورد نامناسب مراقب آزمون",
        date: "1403/02/05",
        status: "در حال بررسی",
        description:
          "به محض دریافت پاسخ از سوی مسئولین مربوطه، در این صفحه نمایش داده می شود.",
      });
      setError(null);
    } else {
      setReportData(null);
      setError("کد پیگیری نامعتبر است.");
    }
  };

  return (
    <div className="tracking-container">
      <h2 className="tracking-title">پیگیری گزارش</h2>
      <p className="tracking-desc">
        کد پیگیری گزارش خود را در کادر زیر وارد کنید .
      </p>
      <div className="tracking-input">
        <input
          type="text"
          placeholder="کد پیگیری را وارد کنید"
          value={trackingCode}
          onChange={(e) => setTrackingCode(e.target.value)}
        />
        <button onClick={handleCheckReport}>بررسی</button>
      </div>
      {error && <small className="error">{error}</small>}
      {reportData && (
        <div className="report-box">
          <h3>{reportData.title}</h3>
          <p>
            <strong>تاریخ:</strong> {reportData.date}
          </p>
          <p className="status">
            وضعیت: <span>{reportData.status}</span>
          </p>
          <p>{reportData.description}</p>
        </div>
      )}
    </div>
  );
};
export default ReportTrackingComp;
