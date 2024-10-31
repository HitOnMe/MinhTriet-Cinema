// Import các thư viện cần thiết
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Autoplay, Navigation } from "swiper/modules";
import "./AppAdvertising.css"; // Import file CSS cho khung iPhone
import app1 from "../HomePageImg/app1.jpg";
import app2 from "../HomePageImg/app2.jpg";
import app3 from "../HomePageImg/app3.jpg";

const IphoneCarousel = () => {
  return (
    <div className="iphone-frame">
      <div className="screen">
        <Swiper
          modules={[Navigation, Autoplay]}
          loop={true}
          navigation={false}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          className="swiper-container"
        >
          <SwiperSlide className="swiper-slide">
            <img src={app1} alt="" />
          </SwiperSlide>
          <SwiperSlide>
            <img src={app2} alt="" />
          </SwiperSlide>
          <SwiperSlide>
            <img src={app3} alt="" />
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
};

export default IphoneCarousel;
