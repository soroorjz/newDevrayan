import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { FaCheck } from "react-icons/fa";
import "./ExamLocation.scss";

const ExamLocation = ({ onNext, handlePreviousStep }) => {
  const [province, setProvince] = useState("");
  const [city, setCity] = useState("");
  const [provinces, setProvinces] = useState([]);
  const [cities, setCities] = useState([]);
  const [allGeographies, setAllGeographies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // دریافت و ذخیره توکن
  const fetchToken = useCallback(async () => {
    try {
      const response = await axios.post("/api/auth", null, {
        headers: {
          "RAYAN-USERNAME": "S.JAMEIE",
          "RAYAN-PASSWORD": "1156789",
          "RAYAN-DEBUG": true,
        },
      });

      if (response.status !== 200) throw new Error("خطا در دریافت توکن!");

      localStorage.setItem("RayanToken", response.data.token);
      return response.data.token;
    } catch (err) {
      console.error("Error fetching token:", err);
      setError("خطا در دریافت توکن!");
      return null;
    }
  }, []);

  // تابع دریافت داده‌ها با کش کردن
  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      let token = localStorage.getItem("RayanToken");
      if (!token) {
        token = await fetchToken();
        if (!token) return;
      }

      // چک کردن کش
      const cachedGeoData = localStorage.getItem("GeoData");
      if (cachedGeoData) {
        // console.log("داده‌ها از کش خوانده شدند");
        const geoData = JSON.parse(cachedGeoData);
        setProvinces(geoData.filter((item) => item.geographyParent === null));
        setAllGeographies(geoData);
        setLoading(false);
        return;
      }

      // درخواست داده‌های جغرافیایی
      const geoResponse = await axios.get("/api/geography/geographies", {
        headers: { "RAYAN-TOKEN": token, "RAYAN-DEBUG": true },
      });

      if (geoResponse.status !== 200) {
        throw new Error("خطا در دریافت داده‌ها!");
      }

      const geoData = geoResponse.data;

      // ذخیره داده‌ها در localStorage
      localStorage.setItem("GeoData", JSON.stringify(geoData));

      setProvinces(geoData.filter((item) => item.geographyParent === null));
      setAllGeographies(geoData);
    } catch (err) {
      console.error("Error fetching data:", err);
      setError("خطا در دریافت داده‌ها!");
    } finally {
      setLoading(false);
    }
  }, [fetchToken]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // به‌روزرسانی شهرها بر اساس استان انتخاب‌شده
  const handleProvinceChange = (e) => {
    const selectedProvinceId = e.target.value;
    setProvince(selectedProvinceId);
    setCity(""); // ریست کردن شهر هنگام تغییر استان
    const filteredCities = allGeographies.filter(
      (city) => city.geographyParent === Number(selectedProvinceId)
    );
    setCities(filteredCities);
  };

  const handleCityChange = (e) => {
    setCity(e.target.value);
  };

  const isDisabled = !province || !city;

  return (
    <div className="location-container">
      <h1 className="title">انتخاب محل آزمون</h1>

      {error && <div className="error">{error}</div>}
      {/* {loading && <p>در حال بارگذاری...</p>} */}

      {!loading && !error && (
        <div className="ExamLocation-selections">
          <div className="selection-row">
            <label>استان:</label>
            <select
              className="select-box"
              value={province}
              onChange={handleProvinceChange}
            >
              <option value="">انتخاب کنید</option>
              {provinces.length > 0 ? (
                provinces.map((province) => (
                  <option
                    key={province.geographyId}
                    value={province.geographyId}
                  >
                    {province.geographyName}
                  </option>
                ))
              ) : (
                <option disabled>داده‌ای یافت نشد</option>
              )}
            </select>
          </div>

          <div className="selection-row">
            <label>شهرستان:</label>
            <select
              className="select-box"
              value={city}
              onChange={handleCityChange}
              disabled={!province} // غیرفعال کردن اگر استانی انتخاب نشده باشد
            >
              <option value="">انتخاب کنید</option>
              {cities.length > 0 ? (
                cities.map((city) => (
                  <option key={city.geographyId} value={city.geographyId}>
                    {city.geographyName}
                  </option>
                ))
              ) : (
                <option disabled>ابتدا استان را انتخاب کنید</option>
              )}
            </select>
          </div>
        </div>
      )}

      <ul className="info-list">
        <li>
          <FaCheck className="icon" />
          محل برگزاری آزمون می‌تواند با استان محل سکونت شما متفاوت باشد.
        </li>
        <li>
          <FaCheck className="icon" />
          محل برگزاری آزمون تأثیری در شرایط بومی یا غیربومی بودن شما ندارد.
        </li>
        <li>
          <FaCheck className="icon" />
          آزمون شما در محلی برگزار خواهد شد، که در این بخش انتخاب می‌کنید.
        </li>
      </ul>

      <div className="ExamLocationSubmitBtns">
        <button onClick={handlePreviousStep}>مرحله قبل</button>
        <button
          onClick={onNext}
          className={`submit-button ${isDisabled ? "disabled-button" : ""}`}
          disabled={isDisabled}
        >
          مرحله بعد
        </button>
      </div>
    </div>
  );
};

export default ExamLocation;
