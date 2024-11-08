import React, { useEffect } from 'react';
import Splide from '@splidejs/splide';
import PriceTable from './drink';
import PaymentOptions from './payment';
import '@splidejs/splide/dist/css/splide.min.css'; // Import CSS cho Splide
import SeatBooking from './seatBooking';

const MovieSlider = ({ selectedSeats, setSelectedSeats, seat, price, drinkPrice, onReset }) => {
  
  useEffect(() => {
    const splide = new Splide('.splide', {
      type: 'slide',
      perPage: 1,
      autoplay: false,
      pagination: false,
      arrows: true,
      rewind: false,
    });

    splide.mount();

    // Kiểm tra khi chuyển slide
    splide.on('move', (newIndex) => {
      console.log(newIndex); // In chỉ mục của slide hiện tại để kiểm tra
    });
    
    return () => {
      splide.destroy();
    };
  }, []);

  // Xử lý khi nhấn nút thanh toán
  const handlePayment = () => {
    alert('Thanh toán thành công!');
    onReset()
  };

  return (
    <div className="splide">
      <div className="splide__track">
        <ul className="splide__list">
          <li className="splide__slide">
            <SeatBooking selectedSeats={selectedSeats} setSelectedSeats={setSelectedSeats} seat={seat} price={price} />
          </li>
          <li className="splide__slide">
            <PriceTable price={drinkPrice} />
          </li>
          <li className="splide__slide">
            <PaymentOptions />
            <div style={{ marginTop: '20px', textAlign: 'center' }}>
              <button
                onClick={handlePayment} // Gọi hàm thanh toán khi nhấn nút
                style={{
                  padding: '10px 20px',
                  backgroundColor: '#28a745',
                  color: 'white',
                  border: 'none',
                  borderRadius: '5px',
                  cursor: 'pointer',
                }}
              >
                Đặt vé
              </button>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default MovieSlider;
