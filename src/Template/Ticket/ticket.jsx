import React, { useState, useEffect } from 'react';
import '../../assets/scss/ticket.scss';
import '@splidejs/splide/css';
import MovieSlider from './MovieSlider';  // Ensure this is the correct import
import { useLocation } from 'react-router-dom';
import configData from '../../services/config';

const TicketBookingLayout = () => {
  const location = useLocation();
  const maLichChieu = location.state?.maLichChieu;
  const url = `/api/QuanLyDatVe/LayDanhSachPhongVe?MaLichChieu=${maLichChieu}`;
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [ticket, setTicket] = useState(null); // To store the ticket data
  const [price, setPrice] = useState(null);
  const [total, setTotal] = useState(null)

  const ticketPrice = (prices) => {
    setPrice(prices);
    setTotal(prevTotal => prevTotal += prices)
  }
  useEffect(() => {
    const fetchTicketData = async () => {
      if (maLichChieu) {
        const response = await configData('GET', url);
        setTicket(response.data.content); 
        console.log(response.data.content.danhSachGhe)
      }
    };
    fetchTicketData();  
  }, [maLichChieu]); 


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
              <span className="text-red-400">Ghế</span>
              <div className="text-right">{selectedSeats.length} Ghế</div>
            </div>
            <div className="grid grid-cols-2">
              <span className="text-red-400">Tổng tiền</span>
              <div className="text-right">{total}</div>
            </div>
          </div>
        </div>
        <div className="">
          <MovieSlider selectedSeats={selectedSeats} setSelectedSeats={setSelectedSeats} seat = {ticket} price = {ticketPrice}/>
        </div>
      </div>
    </div>
  );
};

export default TicketBookingLayout;
