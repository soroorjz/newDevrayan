import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "./EmploymentTestsComp.scss";
import { Link } from "react-router-dom";
import { useAuth } from "../../AuthContext";
import { useQuery } from "@tanstack/react-query";
import { getExams } from "../../apiService";
import ExamCardSkeleton from "../../pages/EmploymentTests/ExamCardSkeleton";

const EmploymentTestsComp = ({ examStatuses, statusTitle, title }) => {
  const { user } = useAuth();

  const {
    data: examCards,
    isLoading,
    error,
    isFetching,
  } = useQuery({
    queryKey: ["exams", statusTitle],
    queryFn: async () => {
      const data = await getExams();
      console.log(`Exams Loaded for ${statusTitle}:`, data);
      const processedData = data.map((exam) => ({
        ...exam,
        examStatusRef: Number(exam.examStatusRef) || 0,
      }));
      console.log(`Processed Exams for ${statusTitle}:`, processedData);
      return processedData;
    },
    staleTime: 1000 * 60 * 60, // 1 ساعت
    cacheTime: 1000 * 60 * 60 * 24, // 24 ساعت
    retry: 2,
    onError: (err) => console.log(`Exams Error for ${statusTitle}:`, err),
    enabled: !!examStatuses, // فقط وقتی examStatuses لود شده
  });

  const getFilteredExams = () => {
    if (!examStatuses || !examCards) {
      console.log(
        `No data for ${statusTitle}: examStatuses or examCards missing`
      );
      return [];
    }
    const statusId = Object.keys(examStatuses).find(
      (key) => examStatuses[key] === statusTitle
    );
    console.log(`Filtering ${statusTitle}: statusId=${statusId}`);
    if (!statusId) {
      console.log(`No statusId found for ${statusTitle}`);
      return [];
    }
    const filtered = examCards.filter(
      (exam) => exam.examStatusRef === Number(statusId)
    );
    console.log(`Filtered exams for ${statusTitle}:`, filtered);
    return filtered;
  };

  const examData = getFilteredExams();

  if (isLoading) {
    console.log(`Still Loading Exams for ${statusTitle}...`);
    return (
      <div className="active-exams-sj">
        <div className="active-exams-header-sj">{title}</div>
        <ExamCardSkeleton />
      </div>
    );
  }

  if (error) {
    console.log(`Error for ${statusTitle}:`, error);
    return (
      <div className="active-exams-sj">
        <div className="active-exams-header-sj">{title}</div>
        <div className="error-message">
          <p>خطا در دریافت آزمون‌ها: {error.message}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="active-exams-sj">
      <div className="active-exams-header-sj">{title}</div>
      {isFetching && <ExamCardSkeleton />}
      {examData && examData.length > 0 ? (
        <Swiper
          spaceBetween={15}
          slidesPerView={"auto"}
          centeredSlides={false}
          loop={examData.length > 1}
          breakpoints={{
            900: {
              slidesPerView: 3,
              spaceBetween: 30,
            },
            899: {
              slidesPerView: 1,
              spaceBetween: 10,
            },
          }}
          className="active-exams-slider-sj"
        >
          {examData.map((exam) => (
            <SwiperSlide key={exam.examId || exam.id} className="exam-card-sj">
              <div className="exam-title-sj">{exam.examName}</div>
              <div className="exam-deadline-sj">
                تاریخ برگزاری آزمون: {exam.examDate}
              </div>
              <div className="examCard-Footer">
                {!user && (
                  <Link to="/signUpForm" key="signup">
                    <button className="btn1">ثبت‌نام</button>
                  </Link>
                )}
                <a
                  href={exam.bookletUrl || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <button className="btn2">دفترچه</button>
                </a>
                <Link
                  to={`/examInfo/${exam.examId}`}
                  key={`examInfo-${exam.examId}`}
                >
                  <button className="btn3">بیشتر</button>
                </Link>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <div className="no-exams-message">
          <p>در حال حاضر هیچ آزمونی در وضعیت "{title}" وجود ندارد.</p>
        </div>
      )}
    </div>
  );
};

export default EmploymentTestsComp;
