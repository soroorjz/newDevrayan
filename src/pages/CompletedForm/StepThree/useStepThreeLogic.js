import { useState, useEffect, useCallback } from "react";
import { fetchToken, fetchGeographies } from "./useStepThreeApi.js";

const defaultData = {
  postalCode: "3155494717",
  city: "کرج",
  address: "البرز، کرج، میدان اسبی",
  mobile: "09355986776",
  province: "البرز",
};

export const useStepThreeLogic = ({ onNext, onPrevious }) => {
  const [formData, setFormData] = useState(() => {
    const savedData = localStorage.getItem("stepThreeData");
    return savedData ? JSON.parse(savedData) : defaultData;
  });

  const [isEditable, setIsEditable] = useState(false);
  const [provinces, setProvinces] = useState([]);
  const [cities, setCities] = useState([]);
  const [allGeographies, setAllGeographies] = useState([]);
  const [errors, setErrors] = useState({});
  const [hasEdited, setHasEdited] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    if (!/^09[0-9]{9}$/.test(formData.mobile)) {
      newErrors.mobile = "شماره تلفن نامعتبر است";
    }
    if (!/^\d{10}$/.test(formData.postalCode)) {
      newErrors.postalCode = "کد پستی نامعتبر است";
    }
    if (!formData.province) {
      newErrors.province = "استان را انتخاب کنید";
    }
    if (!formData.city) {
      newErrors.city = "شهر را انتخاب کنید";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const fetchGeoData = useCallback(async () => {
    try {
      const geoData = await fetchGeographies(formData.province);
      setProvinces(geoData.provinces);
      setAllGeographies(geoData.allGeographies);
      setCities(geoData.cities);
    } catch (err) {
      console.error("Error in fetchGeoData:", err);
    }
  }, [formData.province]);

  useEffect(() => {
    if (isEditable) {
      fetchGeoData();
    }
  }, [isEditable, fetchGeoData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
    setHasEdited(true);
  };

  const handleProvinceChange = (e) => {
    const provinceId = e.target.value;
    const provinceName = provinces.find(
      (p) => p.geographyId === Number(provinceId)
    )?.geographyName;
    setFormData((prev) => ({ ...prev, province: provinceName, city: "" }));
    const filteredCities = allGeographies.filter(
      (city) => city.geographyParent === Number(provinceId)
    );
    setCities(filteredCities);
    setHasEdited(true);
  };

  const handleCityChange = (e) => {
    const cityId = e.target.value;
    const cityName = cities.find(
      (c) => c.geographyId === Number(cityId)
    )?.geographyName;
    setFormData((prev) => ({ ...prev, city: cityName }));
    setHasEdited(true);
  };

  const handleNext = (e) => {
    e.preventDefault();
    if (hasEdited) {
      if (validateForm()) {
        localStorage.setItem("stepThreeData", JSON.stringify(formData));
        if (onNext) onNext();
      }
    } else {
      localStorage.setItem("stepThreeData", JSON.stringify(formData));
      if (onNext) onNext();
    }
  };

  const handlePrevious = (e) => {
    e.preventDefault();
    localStorage.setItem("stepThreeData", JSON.stringify(formData));
    if (onPrevious) onPrevious();
  };

  const toggleEdit = () => {
    if (isEditable) {
      const updatedData = {
        postalCode: formData.postalCode || defaultData.postalCode,
        city: formData.city || defaultData.city,
        address: formData.address || defaultData.address,
        mobile: formData.mobile || defaultData.mobile,
        province: formData.province || defaultData.province,
      };
      setFormData(updatedData);
      if (!hasEdited || validateForm()) {
        localStorage.setItem("stepThreeData", JSON.stringify(updatedData));
        setIsEditable(false);
        setHasEdited(false);
      }
    } else {
      setIsEditable(true);
    }
  };

  return {
    formData,
    isEditable,
    provinces,
    cities,
    errors,
    handleChange,
    handleProvinceChange,
    handleCityChange,
    handleNext,
    handlePrevious,
    toggleEdit,
  };
};
