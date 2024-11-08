import React, { PureComponent } from 'react';
import '../../src/assets/scss/detail.scss';
import moment from 'moment';
import Calendar from './Calendar';
import { NavLink } from 'react-router-dom';
import configData from '../services/config'
export default class MovieList extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      day: [],
      selectedDay: null,
      selectDay:null,
      selectedShowtimes: {},
      film: null
    };
  }
  handleFilm = (film) => {
    const url = `/api/QuanLyRap/LayThongTinLichChieuPhim?MaPhim= ${film}`;
    const getFilm = async() => {
      const data = await configData('GET', url);
     
      return this.props.getFilm(data.data.content)
    }
   getFilm()
   
  }
  componentDidMount() {
    this.extractMovieDates();
  }
  componentDidUpdate(prevProps) {
   
    if (prevProps.reset !== this.props.reset && this.props.reset) {
      this.setState({ selectedDay: null, selectDay: null, selectedShowtimes: {} });
      this.props.resetMovie(false);
    }
    if (prevProps.sendData !== this.props.sendData) {
      this.extractMovieDates();
    }
  }

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

  selectedDate = (date, filmId) => {
    this.setState(prevState => ({
      selectedDay: date,
      selectDay: null,
      selectedShowtimes: {
        ...prevState.selectedShowtimes,
        [filmId]: this.updateShowtimes(date, filmId),
      },
    }));
  }
  selectedDay = (props) => {
    const { sendData } = this.props; // Lấy dữ liệu phim từ props
    const selectedShowtimes = {};
  
    sendData.forEach(film => {
      selectedShowtimes[film.maPhim] = this.updateShowtimes(props, film.maPhim);
    });
  
    this.setState({
      selectDay: props,
      selectedShowtimes, // Cập nhật giờ chiếu cho các phim dựa trên ngày đã chọn
    });
  }
  handleShowtimeClick = (selectedShowtime, filmId) => {
    const { sendData } = this.props;
    const film = sendData.find(f => f.maPhim === filmId);
  
    if (film) {
      
      const matchingSchedule = film.lstLichChieuTheoPhim.find(schedule => 
        moment(schedule.ngayChieuGioChieu).format('hh:mm A') === selectedShowtime
      );
  
      if (matchingSchedule) {
        console.log('Mã Lịch Chiếu:', matchingSchedule.maLichChieu);
        
      } else {
        console.log('Không tìm thấy lịch chiếu khớp.');
      }
    }
  };
  
updateShowtimes = (date, filmId) => {
  const { sendData } = this.props;
  const film = sendData.find(film => film.maPhim === filmId);
  if (film) {
    const [day, month, year] = date.split('/');

    console.log(`20${year}-${month}-${day}`)
    console.log(film.lstLichChieuTheoPhim)
      return film.lstLichChieuTheoPhim
          .filter(schedule => moment(schedule.ngayChieuGioChieu).format('DD/MM/YY') === date)
          .map(schedule => moment(schedule.ngayChieuGioChieu).format('hh:mm A'));
  }
  return [];
}

  renderMovie = () => {
    const { sendData } = this.props;
    if (!sendData) {
      return (
        <div className="flex items-center justify-center w-full">
          <p className="text-2xl font-semibold text-gray-600">
            No movie data available
          </p>
        </div>
      );
    }
 
    const filteredMovies = this.state.selectDay 
    ? sendData.filter(film => 
        film.lstLichChieuTheoPhim.some(schedule =>
          moment(schedule.ngayChieuGioChieu).format('DD/MM/YY') === this.state.selectDay
        ))
    : sendData;
    return filteredMovies.map((film, index) => (
      <div className="pt-5 card mx-2" key={index} onClick = {() => this.handleFilm(film.maPhim)}>
        <div className='flex flex-row'>
          <div className="movie-image mb-3 w-1/3 flex-1 mx-3">
            <img src={film.hinhAnh} alt={film.tenPhim} className="rounded-lg shadow-md w-full h-auto" />
          </div>
          <h1 className="text-xl font-semibold flex-1">{film.tenPhim}</h1>
        </div>

        <div className="ml-4">
          {!this.state.selectDay && (
            <select 
            className="showtimes mt-5 bg-gray-100 p-3 rounded-lg"
            onChange={(e) => this.selectedDate(e.target.value, film.maPhim)} // Gửi filmId vào hàm selectedDate
          >
            <option value="">Chọn ngày</option>
            {Array.from(new Set(film.lstLichChieuTheoPhim.map(schedule => 
              moment(schedule.ngayChieuGioChieu).format('DD/MM/YY')
            ))).sort((a, b) => moment(a, 'DD/MM/YY') - moment(b, 'DD/MM/YY')).map((time, idx) => (
              <option key={idx} value={time}>{time}</option>
            ))}
          </select>
          )}
          

          {this.state.selectedShowtimes[film.maPhim]?.length > 0  && ( // Hiển thị giờ chiếu nếu có
  <div className="mt-3 grid grid-cols-3">
    <h2 className="font-semibold" style={{ lineHeight: "40px" }}>Giờ chiếu:</h2>
    {this.state.selectedShowtimes[film.maPhim].map((showtime, idx) => (
      <NavLink to = '/ticket' key={idx} className="col-span-1 text-blue-600 text-center bg-white p-2 rounded-lg shadow-md hover:bg-blue-50 transition">
        {showtime}
      </NavLink>
    ))}
  </div>
)}

        </div>
      </div>
    ));
  };

  render() {
    return (
      <div className="col-span-6 max-w-screen-lg mx-auto">
        <Calendar date={this.state.day} select={this.selectedDay} reset={this.props.resetMovie} />
        <div className='wrapper'>
          {this.renderMovie()}
        </div>
      </div>
    );
  }
}
