import React from "react";
import { useState, useEffect } from "react";
import { NavLink, useParams } from "react-router-dom";
// import Header from "../../components/Header/Header";
import { Flex, Progress, Tabs } from "antd";
import { movieService } from "../../services/fetchAPI";
import LichChieuTheoPhim from "./LichChieuTheoPhim";
import moment from "moment";
import play from "../HomePage/HomePageImg/play.png";
import ModalVideo from "react-modal-video";
import "react-modal-video/css/modal-video.css";

export default function DetailPage() {
  const params = useParams();
  const [detail, setDetail] = useState({});
  const [openVideoId, setOpenVideoId] = useState(null); // Đổi tên state để lưu id của video

  const handleOpenVideo = (trailerUrl) => {
    const videoId = getVideoId(trailerUrl);
    setOpenVideoId(videoId);
  };

  const handleCloseVideo = () => {
    setOpenVideoId(null);
  };

  const getVideoId = (url) => {
    const regex =
      /(?:\?v=|\/embed\/|\/watch\?v=|\/\d+\/|youtu\.be\/|\/v\/)([^\s&?]+)/;
    const match = url.match(regex);
    return match ? match[1] : null;
  };

  useEffect(() => {
    movieService
      .layThongTinLichChieuPhim(params.id)
      .then((result) => {
        console.log(result.data.content);
        setDetail(result.data.content);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div
      style={{
        backgroundImage: `url('https://wallpaperboat.com/wp-content/uploads/2019/11/cinema-20.jpg')`,
        backgroundPosition: "center",
      }}
    >
      <div className="container">
        <div className="flex justify-between mb-16 text-white">
          <div className="flex">
            <img
              src={detail.hinhAnh}
              className="h-96 rounded-lg"
              alt=""
              height={400}
            />
            <div className="ml-8">
              <h1 className="text-5xl font-semibold">{detail.tenPhim}</h1>
              <p className="text-yellow-400 text-2xl mt-2">
                Khởi chiếu: {moment(detail.ngayKhoiChieu).format("DD-MM-YYYY")}
              </p>
              <div className="my-4">
                <h2 className="text-4xl font-semibold mb-2">Mô tả</h2>
                <p className="text-xl text-red-600 font-medium">
                  {detail.moTa}
                </p>
              </div>
              <button
                onClick={() => {
                  handleOpenVideo(detail.trailer);
                }}
                className="flex items-center text-red-600"
              >
                <img alt="" src={play} className="size-8" />
                <p className="px-2 text-xl italic underline">Xem trailer</p>
              </button>
            </div>
          </div>
          <Flex>
            <Progress
              type="circle"
              strokeWidth={8}
              size={100}
              percent={detail.danhGia * 10}
              format={() => (
                <span className="text-2xl font-medium text-white">
                  {detail.danhGia}/10
                </span>
              )}
            />
          </Flex>
        </div>
        {openVideoId && (
          <ModalVideo
            channel="youtube"
            autoplay
            isOpen={!!openVideoId}
            videoId={openVideoId}
            onClose={handleCloseVideo}
          />
        )}
        <LichChieuTheoPhim />
      </div>
    </div>
  );
}
