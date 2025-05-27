import React from "react";
import "./EmploymentTests.scss";
import { IoMdHome } from "react-icons/io";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import EmploymentTestsComp from "../../components/EmploymentTestsComp/EmploymentTestsComp";
import EmploymentTestsIcons from "../../components/EmploymentTestsComp/EmploymentTestsIcons/EmploymentTestsIcons";
import NavbarTop from "../../components/HomePageComp/NavbarTop/NavbarTop";
import EmploymentTestsBanner from "../../components/EmploymentTestsComp/EmploymentTestsBanner/EmploymentTestsBanner";
import { Link } from "react-router-dom";
import { getExamStatuses } from "../../apiService";
import ExamCardSkeleton from "./ExamCardSkeleton";

const EmploymentTests = () => {
  const queryClient = useQueryClient();

  const {
    data: examStatuses,
    isLoading: statusesLoading,
    error: statusesError,
    isFetching: statusesFetching,
    refetch: refetchStatuses,
  } = useQuery({
    queryKey: ["examStatuses"],
    queryFn: async () => {
      const data = await getExamStatuses();
      console.log("Exam Statuses Loaded:", data);
      return data;
    },
    staleTime: 1000 * 60 * 60, // 1 ساعت
    cacheTime: 1000 * 60 * 60 * 24, // 24 ساعت
    retry: 2,
    onError: (err) => console.log("Exam Statuses Error:", err),
  });

  const loading = statusesLoading;
  const fetching = statusesFetching;
  const error = statusesError;

  if (loading) {
    console.log("Still Loading Statuses...");
    return (
      <div className="EmploymentTests">
        <NavbarTop hideJobSearch={true} />
        <ExamCardSkeleton />
      </div>
    );
  }

  if (error) {
    console.log("Error occurred:", error);
    return (
      <div className="EmploymentTests">
        <NavbarTop hideJobSearch={true} />
        <div className="error-message">
          <p>خطا در دریافت اطلاعات: {error.message}</p>
          <button
            onClick={() => {
              queryClient.invalidateQueries(["examStatuses"]);
              refetchStatuses();
            }}
          >
            تلاش مجدد
          </button>
        </div>
      </div>
    );
  }

  console.log("Rendering with examStatuses:", examStatuses);

  const statusTitles = [
    { title: "در انتظار", id: "InProgress" },
    { title: "درحال ثبت نام", id: "Registering" },
    { title: "پایان ثبت نام", id: "EndOfRegistering" },
    { title: "دریافت کارت ورود به جلسه", id: "ExamCard" },
    { title: "آزمون کتبی برگزار شده", id: "Held" },
    { title: "در حال بررسی", id: "UnderReview" },
    { title: "اعلام نتایج آزمون کتبی", id: "Announcing" },
    { title: "ارزیابی تکمیلی", id: "Filter" },
    { title: "گزینش", id: "Selection" },
    { title: "پایان آزمون", id: "Expired" },
  ];

  return (
    <div className="EmploymentTests">
      <NavbarTop hideJobSearch={true} />
      <div className="EmploymentTestsBanner">
        <EmploymentTestsBanner />
      </div>
      <div className="EmploymentTestsIcons">
        <EmploymentTestsIcons statusTitles={statusTitles} />
      </div>
      {fetching && <ExamCardSkeleton />}
      {statusTitles.map(({ title, id }) => (
        <div
          key={title}
          id={id}
          className={`EmploymentTestsComp ${
            title === "پایان آزمون" ? "expiredExams" : ""
          }`}
        >
          <EmploymentTestsComp
            examStatuses={examStatuses}
            statusTitle={title}
            title={title}
          />
        </div>
      ))}
      <Link to="/">
        <button className="homeBtn">
          <IoMdHome />
        </button>
      </Link>
    </div>
  );
};

export default EmploymentTests;
