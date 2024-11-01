import React, { useState } from "react";
import { Carousel } from "antd";
import "./HomePage.css";
import ModalVideo from "react-modal-video";
import "react-modal-video/css/modal-video.css";
import playIcon from "./HomePageImg/play.png";

const contentStyle = {
  height: "85vh",
  color: "#fff",
  lineHeight: "85vh",
  textAlign: "center",
  background: "#364d79",
  width: "100%",
};

const BannerCarousel = () => {
  const [openVideoIndex, setOpenVideoIndex] = useState(null);

  const handleOpenVideo = (index) => {
    setOpenVideoIndex(index);
  };

  const handleCloseVideo = () => {
    setOpenVideoIndex(null);
  };

  //Link video
  const videoLinks = ["__2bjWbetsA", "rgrWXTz_8eU", "TcMBFSGVi1c"];

  return (
    <div className="banner">
      <Carousel arrows autoplay>
        {[
          "https://tongal.s3.amazonaws.com/custom-files/2024/08/14/VenomTheLastDanceInTheatersOctoberBanner_1.png",
          "https://khenphim.com/wp-content/uploads/2019/10/Joker-4-banner-e1569951070262.jpg",
          "https://i.ytimg.com/vi/fEg2Ug45wrU/maxresdefault.jpg",
        ].map((imgSrc, index) => (
          <div className="relative" key={index}>
            <img src={imgSrc} style={contentStyle} alt="" />
            <div onClick={() => handleOpenVideo(index)} className="play-icon">
              <button>
                <img src={playIcon} alt="" />
              </button>
            </div>
          </div>
        ))}
      </Carousel>

      {/* Đưa PopupVideo ra ngoài Carousel */}
      {openVideoIndex !== null && (
        <ModalVideo
          channel="youtube"
          autoplay
          isOpen={openVideoIndex !== null}
          videoId={videoLinks[openVideoIndex]}
          onClose={handleCloseVideo}
        />
      )}
    </div>
  );
};
export default BannerCarousel;
