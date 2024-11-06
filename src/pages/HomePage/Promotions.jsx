import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import "./HomePage.css";
import promotion1 from "./HomePageImg/promotion-1.png";
import promotion2 from "./HomePageImg/promotion-2.jpg";
import promotion3 from "./HomePageImg/promotion-3.jpg";
import promotion4 from "./HomePageImg/promotion-4.jpg";
import promotion5 from "./HomePageImg/promotion-5.jpg";

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 4,
    slidesToSlide: 1, // optional, default to 1.
  },
  tablet: {
    breakpoint: { max: 1024, min: 768 },
    items: 3,
    slidesToSlide: 1, // optional, default to 1.
  },
  mobile: {
    breakpoint: { max: 767, min: 464 },
    items: 2,
    slidesToSlide: 1, // optional, default to 1.
  },
};
const sliderImageUrl = [
  { url: promotion1 },
  { url: promotion2 },
  { url: promotion3 },
  { url: promotion4 },
  { url: promotion5 },
];
const Promotions = () => {
  return (
    <div>
      <h2 className="text-4xl font-semibold text-center">Tin khuyến mãi</h2>
      <Carousel
        responsive={responsive}
        autoPlay={true}
        autoPlaySpeed={3000}
        transitionDuration={1000}
        swipeable={true}
        draggable={true}
        infinite={true}
        partialVisible={false}
      >
        {sliderImageUrl.map((imageUrl, index) => {
          return (
            <div className="slider" key={index}>
              <img src={imageUrl.url} alt="movie" />
            </div>
          );
        })}
      </Carousel>
    </div>
  );
};
export default Promotions;
