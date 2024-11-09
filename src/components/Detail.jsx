import React, { PureComponent } from 'react';
import '../../src/assets/scss/detail.scss';
import moment from 'moment';
import Calendar from './Calendar';
import { NavLink } from 'react-router-dom';
import configData from '../services/config';

export default class MovieList extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      day: [],  // Danh sách các ngày
      selectedDay: null,  // Ngày được chọn
      selectDay: null,  // Ngày chọn để lọc phim
      selectedShowtimes: {},  // Danh sách các giờ chiếu của phim
      film: null,  // Phim hiện tại
    };
  }

  handleFilm = (film) => {
    const url = `/api/QuanLyRap/LayThongTinLichChieuPhim?MaPhim=${film}`;
    const getFilm = async () => {
      const data = await configData('GET', url);
      this.props.getFilm(data.data.content);
    };
    getFilm();
  };

  componentDidMount() {
    this.extractMovieDates();
  }

  componentDidUpdate(prevProps) {
    // Kiểm tra khi props reset thay đổi
    if (prevProps.reset !== this.props.reset && this.props.reset) {
      this.setState({ selectedDay: null, selectDay: null, selectedShowtimes: {} });
      this.props.resetMovie(false);
    }
    // Kiểm tra khi props sendData thay đổi
    if (prevProps.sendData !== this.props.sendData) {
      this.extractMovieDates();
    }
  }

  // Trích xuất các ngày chiếu phim từ dữ liệu
  extractMovieDates = () => {
    const { sendData } = this.props;
    let movieDate = [];

    if (sendData) {
      sendData.forEach(data => {
        data.lstLichChieuTheoPhim.forEach(film => {
          if (!movieDate.includes(film.ngayChieuGioChieu)) {
            movieDate.push(film.ngayChieuGioChieu);
          }
        });
      });

      this.setState({ day: movieDate });
    }
  };

  // Xử lý khi chọn một ngày
  selectedDate = (date, filmId) => {
    this.setState(prevState => ({
      selectedDay: date,
      selectDay: null,
      selectedShowtimes: {
        ...prevState.selectedShowtimes,
        [filmId]: this.updateShowtimes(date, filmId),
      },
    }));
  };

  // Xử lý ngày được chọn từ component Calendar
  daySelect = (props) => {
    const { sendData } = this.props; // Lấy dữ liệu phim từ props
    const selectedShowtimes = {};
    if (sendData) {
      sendData.forEach(film => {
        selectedShowtimes[film.maPhim] = this.updateShowtimes(props, film.maPhim);
      });
    
      this.setState({
        selectDay: props,
        selectedShowtimes, 
      });
    }
  }

  // Cập nhật giờ chiếu cho ngày và phim đã chọn
  updateShowtimes = (date, filmId) => {
    const { sendData } = this.props;
    const film = sendData.find(film => film.maPhim === filmId);
    if (film) {
      return film.lstLichChieuTheoPhim
        .filter(schedule => moment(schedule.ngayChieuGioChieu).format('DD/MM/YYYY') === date)
        .map(schedule => moment(schedule.ngayChieuGioChieu).format('hh:mm A'));
    }
    return [];
  };

  // Xử lý khi nhấn vào giờ chiếu
  handleShowtimeClick = (selectedShowtime, filmId) => {
    const { sendData } = this.props;
    const film = sendData.find(f => f.maPhim === filmId);

    if (film) {
      const matchingSchedule = film.lstLichChieuTheoPhim.find(schedule =>
        moment(schedule.ngayChieuGioChieu).format('hh:mm A') === selectedShowtime
      );

      if (matchingSchedule) {
        return matchingSchedule.maLichChieu;
      }
    }
    return null; // Trả về null nếu không tìm thấy
  };

  // Hiển thị danh sách phim sau khi lọc
  renderMovie = () => {
    const { sendData } = this.props;
    if (!sendData) {
      return (
        <div className="flex items-center justify-center w-full">
          <p className="text-2xl font-semibold text-gray-600">
            Không có dữ liệu phim
          </p>
        </div>
      );
    }

    // Lọc phim theo ngày đã chọn
    const filteredMovies = this.state.selectDay
      ? sendData.filter(film =>
          film.lstLichChieuTheoPhim.some(schedule =>
            moment(schedule.ngayChieuGioChieu).format('DD/MM/YYYY') === this.state.selectDay
          ))
      : sendData;

    return filteredMovies.map((film, index) => (
      <div className="pt-5 card mx-2" key={index} onClick={() => this.handleFilm(film.maPhim)}>
        <div className="flex flex-row">
          <div className="movie-image mb-3 w-1/3 flex-1 mx-3">
            <img src={film.hinhAnh} alt={film.tenPhim} className="rounded-lg shadow-md w-full h-auto" />
          </div>
          <h1 className="text-xl font-semibold flex-1">{film.tenPhim}</h1>
        </div>

        <div className="ml-4">
          {!this.state.selectDay && (
            <select
              className="showtimes mt-5 bg-gray-100 p-3 rounded-lg"
              onChange={(e) => this.selectedDate(e.target.value, film.maPhim)}
            >
              <option value="">Chọn ngày</option>
              {Array.from(
                new Set(
                  film.lstLichChieuTheoPhim.map(schedule =>
                    moment(schedule.ngayChieuGioChieu).format('DD/MM/YYYY')
                  )
                )
              )
                .sort((a, b) => moment(a, 'DD/MM/YYYY') - moment(b, 'DD/MM/YYYY'))
                .map((time, idx) => (
                  <option key={idx} value={time}>
                    {time}
                  </option>
                ))}
            </select>
          )}

          {this.state.selectedShowtimes[film.maPhim]?.length > 0 && (
            <div className="mt-3 grid grid-cols-3">
              <h2 className="font-semibold" style={{ lineHeight: '40px' }}>
                Giờ chiếu:
              </h2>
              {this.state.selectedShowtimes[film.maPhim].map((showtime, idx) => {
                const maLichChieu = this.handleShowtimeClick(showtime, film.maPhim); // Lấy maLichChieu từ handleShowtimeClick
                return (
                  <NavLink 
                    to='/ticket' 
                    key={idx} 
                    state={{ maLichChieu }} // Truyền maLichChieu qua state
                    className="col-span-1 text-blue-600 text-center bg-white p-2 rounded-lg shadow-md hover:bg-blue-50 transition"
                  >
                    {showtime}
                  </NavLink>
                );
              })}
            </div>
          )}
        </div>
      </div>
    ));
  };

  render() {
    return (
      <div className="col-span-6 max-w-screen-lg mx-auto">
        <Calendar date={this.state.day} select={this.daySelect} reset={this.props.resetMovie} />
        <div className="wrapper">{this.renderMovie()}</div>
      </div>
    );
  }
}