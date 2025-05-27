import React from "react";
import { useQueries } from "@tanstack/react-query";
import { getHandler } from "../../apiService";

const RadioGroup = ({
  isChildrenEnabled,
  formData,
  handleChange,
  setGender,
  errors,
}) => {
  // Fetch gender and marriage status data with React Query
  const [
    { data: genders = [], isLoading: isLoadingGenders, error: errorGenders },
    {
      data: marriageStatuses = [],
      isLoading: isLoadingMarriageStatuses,
      error: errorMarriageStatuses,
    },
  ] = useQueries({
    queries: [
      {
        queryKey: ["genders"],
        queryFn: () => getHandler("gender"),
        select: (data) => {
          console.log("Genders API raw response:", data); // Debug log
          return Array.isArray(data)
            ? data.filter((g) => g.genderId === 1 || g.genderId === 2) // Only genderId 1 (مرد) and 2 (زن)
            : [];
        },
        staleTime: 1000 * 60 * 60, // 1 hour
        retry: 0,
      },
      {
        queryKey: ["marriageStatuses"],
        queryFn: () => getHandler("marriage"),
        select: (data) => {
          console.log("Marriage Statuses API raw response:", data); // Debug log
          return Array.isArray(data) ? data : [];
        },
        staleTime: 1000 * 60 * 60, // 1 hour
        retry: 0,
      },
    ],
  });

  // Combine error states
  const error = errorGenders || errorMarriageStatuses;

  const handleGenderChange = (e) => {
    handleChange(e); // Update formData
    setGender(e.target.value); // Update gender in SignUpStepper
  };

  if (error) {
    return (
      <div className="form-group">
        <p>خطا: {error.message}</p>
        <button onClick={() => window.location.reload()}>تلاش مجدد</button>
      </div>
    );
  }

  return (
    <>
      <div className="form-group">
        <label>وضعیت تاهل:</label> {/* Marriage status */}
        <div className="radio-group">
          {console.log(
            "isLoadingMarriageStatuses:",
            isLoadingMarriageStatuses,
            "errorMarriageStatuses:",
            errorMarriageStatuses,
            "marriageStatuses:",
            marriageStatuses
          )}{" "}
          {/* Debug log */}
          {marriageStatuses.length > 0 &&
          marriageStatuses.every((m) => m.marriageId && m.marriageName) ? (
            marriageStatuses.map((status) => (
              <label key={status.marriageId}>
                <input
                  type="radio"
                  name="maritalStatus"
                  value={status.marriageId}
                  checked={formData.maritalStatus === String(status.marriageId)}
                  onChange={handleGenderChange} // Use handleGenderChange for consistency
                />
                {status.marriageName}
              </label>
            ))
          ) : (
            <span>داده‌ای یافت نشد</span>
          )}
        </div>
        {errors.maritalStatus && (
          <small className="error">{errors.maritalStatus}</small>
        )}
      </div>
      <div className="form-group">
        <label htmlFor="children">تعداد فرزندان:</label>
        <input
          type="number"
          id="children"
          name="children"
          value={formData.children}
          onChange={handleChange}
          min="0"
          disabled={!isChildrenEnabled}
          placeholder="تعداد فرزندان خود را وارد کنید"
        />
        {errors.children && <small className="error">{errors.children}</small>}
      </div>
      <div className="form-group">
        <label>جنسیت:</label>
        <div className="radio-group">
          {console.log(
            "isLoadingGenders:",
            isLoadingGenders,
            "errorGenders:",
            errorGenders,
            "genders:",
            genders
          )}{" "}
          {/* Debug log */}
          {genders.length > 0 &&
          genders.every((g) => g.genderId && g.genderName) ? (
            genders.map((gender) => (
              <label key={gender.genderId}>
                <input
                  type="radio"
                  name="gender"
                  value={gender.genderId}
                  checked={formData.gender === String(gender.genderId)}
                  onChange={handleGenderChange}
                />
                {gender.genderName}
              </label>
            ))
          ) : (
            <span>داده‌ای یافت نشد</span>
          )}
        </div>
        {errors.gender && <small className="error">{errors.gender}</small>}
      </div>
    </>
  );
};

export default RadioGroup;
