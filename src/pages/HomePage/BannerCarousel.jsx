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

  const videoLinks = [
    "egI9GUIjeYE", // Link video của slide 1
    "rgrWXTz_8eU", // Link video của slide 2
    "TcMBFSGVi1c", // Link video của slide 3
  ];

  return (
    <div className="banner">
      <Carousel arrows autoplay>
        {[
          "https://www.signature-entertainment.co.uk/wp-content/uploads/2024/09/T3-Website-Banner-Only-In-Cinemas-11-Oct-1.jpg",
          "https://khenphim.com/wp-content/uploads/2019/10/Joker-4-banner-e1569951070262.jpg",
          "https://i.ytimg.com/vi/fEg2Ug45wrU/maxresdefault.jpg",
        ].map((imgSrc, index) => (
          <div className="relative" key={index}>
            <img src={imgSrc} style={contentStyle} alt="" />
            <div onClick={() => handleOpenVideo(index)} className="play-icon">
              <img src={playIcon} alt="" />
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
