import React, { useState } from 'react';
import SeatBooking from './SeatBooking';
import '../../assets/scss/ticket.scss';
import '@splidejs/splide/css';
import MovieSlider from './SeatBooking';
const TicketBookingLayout = () => {
  const [selectedSeats, setSelectedSeats] = useState([]);
  const totalPrice = selectedSeats.length * 100000;

  return (
    <div className="text-white min-h-screen flex items-center justify-center">
      <div className="container gap-4">
      <div className="flex justify-content-center align-items-center" style={{'height': '50vh'}}>
        <div>
          <h3 className='text-green-400 text-center'>Thông tin phim</h3>
          <h3 className='text-xl'>Lật mặt 48h</h3>
          <p>Địa điểm: BKD Star - Vincom 3/2</p>
          <p>Ngày chiếu: 25/04/2021 - 12:05 Rạp 5</p>
          <hr />
          <div className='grid grid-cols-2'>
            <span className='text-red-400'>Ghế</span>
            <div className='text-right'>{selectedSeats.length} Ghế</div>
          </div>
          <div className='grid grid-cols-2'>
            <span className='text-red-400'>Tổng tiền</span>
            <div className='text-right'>{totalPrice.toLocaleString()} Đ</div>
          </div>
          </div>
        </div>
        <div className="">
          <MovieSlider selectedSeats={selectedSeats} setSelectedSeats={setSelectedSeats} />
        </div>

        
      </div>
    </div>
  );
};

export default TicketBookingLayout;
