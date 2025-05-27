import { useState, useEffect, useCallback } from "react";
import axios from "axios";

export const useEducationData = () => {
  const [degrees, setDegrees] = useState([]);
  const [universityTypes, setUniversityTypes] = useState([]);
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

  const fetchDegrees = async (token) => {
    try {
      const response = await axios.get("/api/grade/grades", {
        headers: { "RAYAN-TOKEN": token, "RAYAN-DEBUG": true },
      });
      console.log("Degrees response:", response.data);
      setDegrees(Array.isArray(response.data) ? response.data : []);
    } catch (err) {
      console.error("Error fetching degrees:", err);
      setDegrees([]);
      setError("خطا در دریافت مقاطع تحصیلی!");
    }
  };

  const fetchUniversityTypes = async (token) => {
    try {
      const response = await axios.get("/api/universitytype/universitytypes", {
        headers: { "RAYAN-TOKEN": token, "RAYAN-DEBUG": true },
      });
      console.log("UniversityTypes response:", response.data);
      setUniversityTypes(Array.isArray(response.data) ? response.data : []);
    } catch (err) {
      console.error("Error fetching university types:", err);
      setUniversityTypes([]);
      setError("خطا در دریافت انواع دانشگاه!");
    }
  };

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      let token = localStorage.getItem("RayanToken");
      if (!token) {
        token = await fetchToken();
        if (!token) return;
      }
      await Promise.all([fetchDegrees(token), fetchUniversityTypes(token)]);
    } catch (err) {
      console.error("Error fetching education data:", err);
    } finally {
      setLoading(false);
    }
  }, [fetchToken]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { degrees, universityTypes, loading, error };
};
