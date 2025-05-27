import { useState, useEffect, useCallback } from "react";
import axios from "axios";

export const useGeography = () => {
  const [provinces, setProvinces] = useState([]);
  const [cities, setCities] = useState([]);
  const [allGeographies, setAllGeographies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

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

  const fetchGeographies = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      let token = localStorage.getItem("RayanToken");
      if (!token) {
        token = await fetchToken();
        if (!token) return;
      }
      const cachedGeoData = localStorage.getItem("GeoData");
      let geoData;
      if (cachedGeoData) {
        geoData = JSON.parse(cachedGeoData);
      } else {
        const response = await axios.get("/api/geography/geographies", {
          headers: { "RAYAN-TOKEN": token, "RAYAN-DEBUG": true },
        });
        if (response.status !== 200) throw new Error("خطا در دریافت داده‌ها!");
        geoData = response.data;
        localStorage.setItem("GeoData", JSON.stringify(geoData));
      }
      setAllGeographies(geoData);
      setProvinces(geoData.filter((item) => item.geographyParent === null));
    } catch (err) {
      console.error("Error fetching geographies:", err);
      setError("خطا در دریافت داده‌ها!");
    } finally {
      setLoading(false);
    }
  }, [fetchToken]);

  useEffect(() => {
    fetchGeographies();
  }, [fetchGeographies]);

  const updateCities = (provinceId) => {
    if (!provinceId) {
      setCities([]);
      return;
    }
    const filteredCities = allGeographies.filter(
      (city) => city.geographyParent === Number(provinceId)
    );
    setCities(filteredCities);
  };

  return { provinces, cities, loading, error, updateCities, allGeographies };
};