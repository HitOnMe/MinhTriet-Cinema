import React from 'react';

const SeatBooking = ({ selectedSeats, setSelectedSeats }) => {
  const seats = Array.from({ length: 6 }, () => Array.from({ length: 8 }, () => false));

  const handleSeatClick = (row, col) => {
    const seatId = `${row}-${col}`;
    const isSelected = selectedSeats.includes(seatId);
    const newSelectedSeats = isSelected
      ? selectedSeats.filter(id => id !== seatId)
      : [...selectedSeats, seatId];
    
    setSelectedSeats(newSelectedSeats);
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

export default SeatBooking;