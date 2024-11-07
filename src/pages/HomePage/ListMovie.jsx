import React, { useEffect, useState } from "react";
import { Carousel, Row, Col } from "antd";
import { NavLink, useNavigate } from "react-router-dom";
import { movieService } from "../../services/fetchAPI";
import playIcon from "./HomePageImg/play.png";
import ModalVideo from "react-modal-video";
import "react-modal-video/css/modal-video.css";

export default function ListMovie() {
  let navigate = useNavigate();

  const [movieArr, setMovieArr] = useState([]);
  const [openVideoId, setOpenVideoId] = useState(null); // Đổi tên state để lưu id của video
  const [isShowing, setIsShowing] = useState(true); // lưu trạng thái phim đang chiếu hay sắp chiếu

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

  let hotMovie = (hot) => {
    if (hot) {
      return (
        <span className="bg-orange-500 text-white rounded-sm px-4 py-2">
          HOT
        </span>
      );
    }
  };

  //hàm render danh sách phim
  let renderMovies = (pageMovies) => {
    return pageMovies.map((movie) => (
      <Col span={6} className="mt-8">
        <div className="hover: cursor-pointer relative">
          <div>
            <img
              alt=""
              src={movie.hinhAnh}
              className="rounded-lg w-full h-96"
            />
            <div className="absolute top-6 right-4">{hotMovie(movie.hot)}</div>
          </div>
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
                navigate(`/detail/${movie.maPhim}`);
              }}
            >
              CHI TIẾT
            </button>
          </div>
          <p className="font-semibold tracking-wider text-lg pt-3 text-yellow-300">
            {movie.tenPhim}
          </p>
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

  //lọc phim theo loại đang chiếu hoặc sắp chiếu
  const getFilteredMovies = () => {
    return movieArr.filter((movie) =>
      isShowing ? movie.dangChieu : movie.sapChieu
    );
  };

  // hàm chia số lượng phim hiển thị dựa cho từng trang của carousel
  let groupMoviesIntoPages = (movies, itemsPerPage) => {
    const pages = [];
    for (let i = 0; i < movies.length; i += itemsPerPage) {
      pages.push(movies.slice(i, i + itemsPerPage));
    }
    return pages;
  };

  // Tạo carousel với các trang phim
  let moviePages = groupMoviesIntoPages(getFilteredMovies(), 8);

  return (
    <div>
      <div className="flex justify-center items-center">
        <button
          className={`mx-1 font-medium px-4 py-2 rounded-sm ${
            isShowing ? "bg-orange-500 text-white" : "bg-gray-200"
          }`}
          onClick={() => {
            setIsShowing(true);
          }}
        >
          Phim đang chiếu
        </button>
        <button
          className={`mx-1 font-medium px-4 py-2 rounded-sm ${
            !isShowing ? "bg-orange-500 text-white" : "bg-gray-200"
          }`}
          onClick={() => {
            setIsShowing(false);
          }}
        >
          Phim sắp chiếu
        </button>
      </div>
      <Carousel className="mb-20">
        {moviePages.map((pageMovies, pageIndex) => (
          <div key={pageIndex}>
            <Row gutter={[16, 16]}>{renderMovies(pageMovies)}</Row>
          </div>
        ))}
      </Carousel>
      <div className="text-center mb-12">
        <button
          className="text-white font-medium py-4 px-4 bg-orange-500 text-2xl rounded-lg"
          onClick={() => {
            navigate("/cinema");
          }}
        >
          Xem thêm phim tại các cụm rạp
        </button>
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
    </div>
  );
}
