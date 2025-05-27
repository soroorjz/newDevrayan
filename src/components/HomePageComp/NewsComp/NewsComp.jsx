import React from "react";
import "./NewsComp.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { newsCards } from "./data";
const NewsComp = () => {
  return (
    <div className="News-Container">
      <div className="news-Title">
        <h1>جدیدترین اخبار آزمون‌های استخدامی</h1>
      </div>
      <div className="newsPart">
        <Swiper
          slidesPerView={1}
          spaceBetween={30}
          loop={true}
          pagination={{
            clickable: true,
          }}
          autoplay={{
            delay: 2600,
            disableOnInteraction: false,
          }}
          speed={2200}
          modules={[Navigation, Autoplay, Pagination]}
          className="NewsSwiper"
        >
          {newsCards.map((newsCard) => (
            <SwiperSlide key={newsCard.id}>
              <div className="newsCard-Container">
                <div className="imagePart">
                  <img src={newsCard.image} alt="" />
                </div>
                <div className="newsSlider-Footer">
                  <div className="tilePart">
                    <h2 className="newsTitle">{newsCard.title}</h2>
                    <p className="newsDate">{newsCard.date}</p>
                  </div>
                  <div className="newsDesc">
                    <p>{newsCard.desc}</p>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default NewsComp;
