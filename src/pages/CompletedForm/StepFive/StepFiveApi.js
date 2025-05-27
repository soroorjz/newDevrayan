import axios from "axios";

export const fetchToken = async () => {
  try {
    const response = await fetch("/api/auth", {
      headers: {
        "RAYAN-USERNAME": "S.JAMEIE",
        "RAYAN-PASSWORD": "1156789",
        "RAYAN-DEBUG": true,
      },
      method: "POST",
    });
    const data = await response.json();
    localStorage.setItem("RayanToken", data.token);
    return data.token;
  } catch (err) {
    console.error("Error fetching token:", err);
    return null;
  }
};

export const fetchQuotas = async (token, setQuotaOptions) => {
  try {
    const response = await axios.get("/api/quota/quotas", {
      headers: {
        "RAYAN-TOKEN": token,
        "RAYAN-DEBUG": true,
      },
    });
    const filteredQuotas = response.data.filter(
      (quota) => quota.quotaParent === null
    );
    setQuotaOptions(Array.isArray(filteredQuotas) ? filteredQuotas : []);
  } catch (err) {
    console.error("Error fetching quotas:", err);
    setQuotaOptions([]);
  }
};

export const fetchMilitaryStatuses = async (token, setMilitaryOptions) => {
  try {
    const response = await axios.get("/api/dutystatus/dutystatuses", {
      headers: { "RAYAN-TOKEN": token, "RAYAN-DEBUG": true },
    });
    console.log("Military statuses response:", response.data);
    setMilitaryOptions(Array.isArray(response.data) ? response.data : []);
  } catch (err) {
    console.error("Error fetching military statuses:", err);
    setMilitaryOptions([]);
  }
};