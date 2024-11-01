import React, { useEffect, useState } from "react";
import { Carousel, Row, Col } from "antd";
import { useNavigate } from "react-router-dom";
import { movieService } from "../../services/fetchAPI";
import playIcon from "./HomePageImg/play.png";
import ModalVideo from "react-modal-video";
import "react-modal-video/css/modal-video.css";

export default function ListMovie() {
  let navigate = useNavigate();

  const [movieArr, setMovieArr] = useState([]);
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

  //hàm render danh sách phim
  let renderMovies = (pageMovies) => {
    return pageMovies.map((movie) => (
      <Col span={6} className="mt-8">
        <div className="hover: cursor-pointer relative">
          <img alt="" src={movie.hinhAnh} className="rounded-lg w-full h-96" />
          <div
            className="filter"
            onClick={() => handleOpenVideo(movie.trailer)}
          >
            <button>
              <img src={playIcon} alt="" className="play-icon" />
            </button>
            <button
              className="bg-orange-600 px-6 py-4 font-bold text-white detail-button"
              onClick={() => {
                navigate(`./detail/${movie.maPhim}`);
              }}
            >
              CHI TIẾT
            </button>
          </div>
          <p className="font-bold text-lg pt-3">{movie.tenPhim}</p>
        </div>
      </Col>
    ));
  };

  useEffect(() => {
    movieService
      .layDanhSachPhim()
      .then((result) => {
        // console.log(result.data.content);
        setMovieArr(result.data.content);
      })
      .catch((err) => {});
  }, []);

  // hàm chia số lượng phim hiển thị dựa cho từng trang của carousel
  let groupMoviesIntoPages = (movies, itemsPerPage) => {
    const pages = [];
    for (let i = 0; i < movies.length; i += itemsPerPage) {
      pages.push(movies.slice(i, i + itemsPerPage));
    }
    return pages;
  };

  // Tạo carousel với các trang phim
  let moviePages = groupMoviesIntoPages(movieArr, 8);

  return (
    <div>
      <Carousel>
        {moviePages.map((pageMovies, pageIndex) => (
          <div key={pageIndex}>
            <Row gutter={[16, 16]}>{renderMovies(pageMovies)}</Row>
          </div>
        ))}
      </Carousel>
      {openVideoId && (
        <ModalVideo
          channel="youtube"
          autoplay
          isOpen={!!openVideoId}
          videoId={openVideoId}
          onClose={handleCloseVideo}
        />
      )}
    </div>
  );
}
