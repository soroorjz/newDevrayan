import axios from "axios";

export const fetchToken = async () => {
  try {
    const response = await axios.post("/api/auth", null, {
      headers: {
        "RAYAN-USERNAME": "S.JAMEIE",
        "RAYAN-PASSWORD": "1156789",
        "RAYAN-DEBUG": true,
      },
    });
    localStorage.setItem("RayanToken", response.data.token);
    return response.data.token;
  } catch (err) {
    console.error("Error fetching token:", err);
    return null;
  }
};

export const fetchGeographies = async (province) => {
  try {
    let token = localStorage.getItem("RayanToken");
    if (!token) {
      token = await fetchToken();
      if (!token) throw new Error("No token available");
    }

    const response = await axios.get("/api/geography/geographies", {
      headers: { "RAYAN-TOKEN": token, "RAYAN-DEBUG": true },
    });

    const geoData = response.data;
    const provinces = geoData.filter((item) => item.geographyParent === null);
    const provinceId = geoData.find(
      (p) => p.geographyName === province
    )?.geographyId;
    const cities = provinceId
      ? geoData.filter((city) => city.geographyParent === provinceId)
      : [];

    return {
      provinces,
      cities,
      allGeographies: geoData,
    };
  } catch (err) {
    console.error("Error fetching geographies:", err);
    throw err;
  }
};
