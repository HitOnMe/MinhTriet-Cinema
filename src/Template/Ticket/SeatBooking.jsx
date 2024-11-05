import React,{useEffect} from 'react';

import Splide from '@splidejs/splide';
import '@splidejs/splide/dist/css/splide.min.css'; // Import CSS cho Splide
const SeatBooking = ({ selectedSeats, setSelectedSeats }) => {
  const seats = Array.from({ length: 6 }, () => Array.from({ length: 8 }, () => false));

  const handleSeatClick = (row, col) => {
    const seatId = `${row}-${col}`;
    const isSelected = selectedSeats.includes(seatId);
    const newSelectedSeats = isSelected
      ? selectedSeats.filter(id => id !== seatId)
      : [...selectedSeats, seatId];
    
    setSelectedSeats(newSelectedSeats); // Cập nhật ghế đã chọn
  };

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-2xl font-bold my-4">Chọn Ghế Ngồi</h1>
      <div className="grid gap-2">
        {seats.map((row, rowIndex) => (
          <div key={rowIndex} className="flex gap-2">
            {row.map((_, colIndex) => {
              const seatId = `${rowIndex}-${colIndex}`;
              const isSelected = selectedSeats.includes(seatId);

              return (
                <div
                  key={colIndex}
                  onClick={() => handleSeatClick(rowIndex, colIndex)}
                  className={`w-10 h-10 rounded ${isSelected ? 'bg-green-500' : 'bg-gray-300'} hover:bg-green-300 cursor-pointer`}
                />
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
};
const MovieSlider = ({ selectedSeats, setSelectedSeats }) => {
  useEffect(() => {
    const splide = new Splide('.splide', {
      type: 'loop',
      perPage: 1,
      autoplay: false,
      pagination: false,
      arrows: true,
    });

    splide.mount();

    return () => {
      splide.destroy(); // Hủy khi component bị unmount
    };
  }, []);

  return (
    <div className="splide">
      <div className="splide__track">
        <ul className="splide__list">
          <li className="splide__slide">
            <SeatBooking selectedSeats={selectedSeats} setSelectedSeats={setSelectedSeats} />
          </li>
          <li className="splide__slide">Slide 2: Hình ảnh phim 2</li>
          <li className="splide__slide">Slide 3: Hình ảnh phim 3</li>
          {/* Thay thế các slide bằng hình ảnh thực tế */}
        </ul>
      </div>
    </div>
  );
};

export default MovieSlider;


