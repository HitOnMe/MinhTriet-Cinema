import React, { useState, useEffect } from 'react';
import '../../assets/scss/ticket.scss';
import '@splidejs/splide/css';
import MovieSlider from './MovieSlider';
import { useLocation } from 'react-router-dom';
import configData from '../../services/config';

const TicketBookingLayout = () => {
  const location = useLocation();
  const maLichChieu = location.state?.maLichChieu;
  const url = `/api/QuanLyDatVe/LayDanhSachPhongVe?MaLichChieu=${maLichChieu}`;

  const [selectedSeats, setSelectedSeats] = useState([]);
  const [ticket, setTicket] = useState(null);
  const [price, setPrice] = useState(0);
  const [drinkPrice, setDrinkPrice] = useState(0);
  const [countdown, setCountdown] = useState(300);
  const [timer, setTimer] = useState(null); 

  const handleDrinkPrice = (price) => {
    setDrinkPrice(price);
  };

  const handleTicketPrice = (price) => {
    setPrice((prevPrice) => prevPrice + price);
  };

  // Hàm đặt lại giá trị
  const handleReset = () => {
  
    setPrice(0);
    setDrinkPrice(null);
    setSelectedSeats([]); 
    setCountdown(300);
  };
  

  // Hàm bắt đầu đếm ngược
  const startCountdown = () => {
    const interval = setInterval(() => {
      setCountdown((prevCountdown) => {
        if (prevCountdown <= 1) {
          clearInterval(interval);
          alert('Thời gian giữ vé đã hết. Quay lại để chọn vé mới.');
          handleReset(); // Reset nếu hết thời gian
          return 0;
        }
        return prevCountdown - 1;
      });
    }, 1000);
    setTimer(interval);
  };

  // Hàm dừng đếm ngược
  const stopCountdown = () => {
    if (timer) {
      clearInterval(timer);
      setTimer(null);
    }
  };

  useEffect(() => {
    const fetchTicketData = async () => {
      if (maLichChieu) {
        const response = await configData('GET', url);
        setTicket(response.data.content);
        console.log(response.data.content);
      }
    };
    fetchTicketData();
  }, [maLichChieu]);

  useEffect(() => {
    if (ticket) {
      startCountdown(); // Bắt đầu đếm ngược khi dữ liệu vé đã được tải
    }
    return () => stopCountdown(); // Dừng đếm ngược khi component bị hủy
  }, [ticket]);

  return (
    <div className="text-white min-h-screen flex items-center justify-center">
      <div className="container gap-4">
        <div className="flex justify-content-center align-items-center" style={{ height: '50vh' }}>
          <div>
            <h3 className="text-green-400 text-center">Thông tin phim</h3>
            {ticket && (
              <>
                <h3 className="text-xl">{ticket.thongTinPhim.tenPhim}</h3>
                <p>Địa điểm: {ticket.thongTinPhim.diaChi} ({ticket.tenRap})</p>
                <p>Ngày chiếu: {ticket.thongTinPhim.ngayChieu}</p>
              </>
            )}
            <hr />
            <div className="grid grid-cols-2">
              <span className="text-red-400">Giá đặt vé</span>
              <div className="text-right">{price ? `${price} VND` : '0 VND'}</div>
            </div>
            <div className="grid grid-cols-2">
              <span className="text-red-400">Bắp nước</span>
              <div className="text-right">{drinkPrice ? `${drinkPrice} VND` : 'Chưa chọn'}</div>
            </div>
            <hr />
            <div className="grid grid-cols-2">
              <span className="text-red-400">Tổng tiền</span>
              <div className="text-right text-success">{price ? `${price + drinkPrice} VND` : '0 VND'}</div>
            </div>
            <hr />
            <div className="grid grid-cols-2">
              <span className="text-red-400">Thời gian giữ vé</span>
              <div className="text-right text-success">
                {`${Math.floor(countdown / 60)}:${String(countdown % 60).padStart(2, '0')}`}
              </div>
            </div>
          </div>
        </div>
        <div>
          <MovieSlider 
            selectedSeats={selectedSeats} 
            setSelectedSeats={setSelectedSeats} 
            seat={ticket} 
            price={handleTicketPrice} 
            drinkPrice={handleDrinkPrice}
            onReset={handleReset}
            maLichCHieu = {maLichChieu}
            ticket={price}
          />
        </div>
      </div>
    </div>
  );
};

export default TicketBookingLayout;
