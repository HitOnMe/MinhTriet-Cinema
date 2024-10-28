import React, { useEffect, useState } from "react";
// import {message} from 'antd';
// import {setUserAction} from '../../redux/userSlice';
import Meta from "antd/es/card/Meta";
import { Card, Popover, Carousel, Row, Col } from "antd";
import { useNavigate } from "react-router-dom";
import { movieService } from "../../services/fetchAPI";

export default function ListMovie() {
  let navigate = useNavigate();

  const [movieArr, setMovieArr] = useState([]);

  //hàm render danh sách phim
  let renderMovies = (pageMovies) => {
    return pageMovies.map((movie) => (
      <Col span={6}>
        <Card
          hoverable
          key={movie.maPhim}
          className="hover:bg-blue-500 hover:scale-90 duration-300 transition mb-12"
          cover={
            <img
              alt="example"
              className="h-60 object-cover"
              src={movie.hinhAnh}
            />
          }
          onClick={() => {
            navigate(`/detail/${movie.maPhim}`);
          }}
        >
          <Meta
            title={<Popover content={movie.tenPhim}>{movie.tenPhim}</Popover>}
          />
        </Card>
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
    <Carousel>
      {moviePages.map((pageMovies, pageIndex) => (
        <div key={pageIndex}>
          <Row gutter={[16, 16]}>{renderMovies(pageMovies)}</Row>
        </div>
      ))}
    </Carousel>
  );
}
