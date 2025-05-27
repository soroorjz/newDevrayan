import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "../../../AuthContext";
import { Link } from "react-router-dom";
import { getExamStatuses, getExams, getExamById } from "../../../apiService";
import "./ExamCard.scss";
import CardListSkeleton from "./CardListSkeleton";

const ExamCard = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  // کوئری اول: دریافت وضعیت‌های آزمون
  const examStatusesQuery = useQuery({
    queryKey: ["examStatuses"],
    queryFn: async () => {
      const data = await getExamStatuses();
      console.log("Exam statuses fetched:", data); // لاگ برای دیباگ
      return data;
    },
    staleTime: 1000 * 60 * 60, // 1 ساعت
    retry: 1,
  });

  // کوئری دوم: دریافت آزمون‌ها
  const examsQuery = useQuery({
    queryKey: ["exams"],
    queryFn: async () => {
      const examData = await getExams();
      console.log("Exams fetched:", examData); // لاگ برای دیباگ
      if (examStatusesQuery.data) {
        return examData.map((exam) => {
          console.log("Processing exam:", exam); // لاگ برای هر آزمون
          return {
            ...exam,
            examStatusRef:
              examStatusesQuery.data[exam.examStatusRef] || "نامشخص",
          };
        });
      }
      return examData;
    },
    enabled: !examStatusesQuery.isLoading && !!examStatusesQuery.data,
    staleTime: 1000 * 60 * 60, // 1 ساعت
    retry: 1,
  });

  const prefetchExamInfo = (examId) => {
    console.log("Prefetching exam info for ID:", examId); // لاگ برای دیباگ
    queryClient.prefetchQuery({
      queryKey: ["examInfo", examId],
      queryFn: () => getExamById(examId),
      staleTime: 1000 * 60 * 5,
    });
  };

  const loading = examStatusesQuery.isLoading || examsQuery.isLoading;
  const error = examStatusesQuery.error || examsQuery.error;

  if (loading) {
    console.log("Loading exam statuses or exams..."); // لاگ برای دیباگ
    return <CardListSkeleton />;
  }

  if (error) {
    console.error("Error in ExamCard:", error.message); // لاگ برای دیباگ
    return (
      <div className="examCard-Container">
        <p>خطا: {error.message}</p>
        <button
          onClick={() => {
            examStatusesQuery.refetch();
            examsQuery.refetch();
          }}
        >
          تلاش مجدد
        </button>
      </div>
    );
  }

  const exams = examsQuery.data || [];
  console.log("Exams to render:", exams); // لاگ برای دیباگ

  return (
    <div className="examCard-Container">
      {exams.length > 0 ? (
        <Swiper
          slidesPerView={3}
          spaceBetween={8}
          loop={exams.length > 3}
          navigation={true}
          modules={[Navigation]}
          className="examSwiper"
          breakpoints={{
            1025: { slidesPerView: 3, spaceBetween: 10 },
            900: { slidesPerView: 2, spaceBetween: 5 },
            426: { slidesPerView: 1, spaceBetween: 10 },
            0: { slidesPerView: 1, spaceBetween: 5 },
          }}
        >
          {exams.map((examCard) => (
            <SwiperSlide key={examCard.examId}>
              <div
                className="examCards-swiper"
                onMouseEnter={() => prefetchExamInfo(examCard.examId)}
              >
                <div className="examCardTop">
                  <div className="examCard-Title">
                    <h2 className="examCard-Title-H">{examCard.examName}</h2>
                  </div>
                </div>
                <div className="examCard-details">
                  <p className="examCard-Status detail">
                    وضعیت آزمون:{" "}
                    <span>{examCard.examStatusRef || "نامشخص"}</span>
                  </p>
                </div>
                <div className="examCard-Footer">
                  {!user && (
                    <Link to="/signUpForm" key="signup">
                      <button className="btn1">ثبت‌نام</button>
                    </Link>
                  )}
                  <a
                    href={examCard.bookletUrl || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <button className="btn2">دفترچه</button>
                  </a>
                  <Link
                    to={`/examInfo/${examCard.examId}`}
                    key={`examInfo-${examCard.examId}`}
                    onClick={() =>
                      console.log("Navigating to exam ID:", examCard.examId)
                    } // لاگ برای دیباگ
                  >
                    <button className="btn3">بیشتر</button>
                  </Link>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <p className="no-data-text">هیچ آزمونی یافت نشد.</p>
      )}
    </div>
  );
};

export default ExamCard;
