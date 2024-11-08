import React from 'react';

const SeatBooking = ({ selectedSeats, setSelectedSeats, seat, price }) => {
    let seats2D = [];
    if (seat) {
      const numCols = 16; // Tổng số cột (16)
      for (let i = 0; i < seat.danhSachGhe.length; i += numCols) {
        seats2D = [...seats2D, seat.danhSachGhe.slice(i, i + numCols)];
      }
    }
  
    const seats = seat ? seats2D : Array.from({ length: 10 }, () => Array.from({ length: 16 }, () => false));
  
    const handleSeatClick = (row, col) => {
      const seatId = `${row}-${col}`;
      const seat = seats[row][col]; 
      
      console.log(seat.giaVe)
      if (seat.daDat) {
        return;
      }
      price(seat.giaVe)
      const isSelected = selectedSeats.includes(seatId);
      const newSelectedSeats = isSelected
        ? selectedSeats.filter((id) => id !== seatId)
        : [...selectedSeats, seatId];
    
      setSelectedSeats(newSelectedSeats); // Cập nhật ghế đã chọn
    };
    
    // Hàm để lấy tên ghế theo cột và dòng
    const getSeatLabel = (row, col) => {
      const rowLabel = String.fromCharCode(65 + row); // Chuyển số hàng thành chữ cái (A, B, C, ...)
      const colLabel = col + 1; // Số cột (1, 2, 3, ...)
      return `${rowLabel}${colLabel}`;
    };
  
    // Hàm để lấy lớp CSS cho ghế theo trạng thái
    const getSeatClass = (seat, isSeat) => {
      if (isSeat) {
        return 'bg-gray-300 cursor-not-allowed opacity-50'; 
      } else {
        switch (seat) {
          case 'Vip':
            return 'bg-red-700'; // Ghế VIP (màu đỏ đậm)
          case 'Thuong':
            return 'bg-blue-500'; // Ghế thường (màu xanh dương)
          default:
            return 'bg-gray-300'; // Mặc định nếu không xác định được trạng thái ghế
        }
      }
    };
  
    return (
      <div className="flex flex-col items-center text-white">
        <h1 className="text-2xl font-bold my-4 text-dark">Chọn Ghế Ngồi</h1>
        <div className="flex gap-2 mb-4">
          {/* Cột chữ cái */}
          <div className="text-white flex flex-col justify-between">
            {Array.from({ length: 16 }, (_, i) => (
              <div key={i} className="text-center">{String.fromCharCode(65 + i)}</div>
            ))}
          </div>
  
          {/* Mảng ghế */}
          <div className="grid gap-2">
            {seats.map((row, rowIndex) => (
              <div key={rowIndex} className="flex gap-2">
                {row.map((seat, colIndex) => {
                  const seatId = `${rowIndex}-${colIndex}`;
                  const seatLabel = getSeatLabel(rowIndex, colIndex); // Lấy tên ghế từ dòng và cột
                  const seatClass = getSeatClass(seat.loaiGhe, seat.daDat); // Lấy lớp CSS cho ghế
  
                  return (
                    <div
                      key={colIndex}
                      onClick={() => handleSeatClick(rowIndex, colIndex, seat.daDat)}
                      className={`w-10 h-10 rounded ${seatClass} hover:bg-green-300 cursor-pointer relative`}
                    >
                      {/* Hiển thị tên ghế trong ô ghế */}
                      {selectedSeats.includes(seatId) && (
                        <div className="absolute inset-0 flex items-center justify-center text-xs text-white font-bold">
                          {seat.stt}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
  
        {/* Dòng số (hiển thị số từ 1 đến 16 theo dòng) */}
        <div className="flex gap-2">
          {Array.from({ length: 16 }, (_, i) => (
            <div key={i} className="text-center w-10">{i + 1}</div>
          ))}
        </div>
  
        {/* Chú thích ghế */}
        <div className="mt-4 flex justify-around w-full text-white">
          <div className="flex items-center">
            <div className="w-6 h-6 bg-gray-300 mr-2"></div>
            <span>Ghế Chưa Đặt</span>
          </div>
          <div className="flex items-center">
            <div className="w-6 h-6 bg-green-500 mr-2"></div>
            <span>Ghế Đã Đặt</span>
          </div>
          <div className="flex items-center">
            <div className="w-6 h-6 bg-red-700 mr-2"></div>
            <span>Ghế VIP</span>
          </div>
          <div className="flex items-center">
            <div className="w-6 h-6 bg-blue-500 mr-2"></div>
            <span>Ghế Thường</span>
          </div>
        </div>
  
        {/* Hiển thị ghế đã chọn trong ô thông tin phim */}
        <div className="mt-4">
          <h2 className="text-lg">Ghế đã chọn:</h2>
          <div className="flex flex-wrap">
            {selectedSeats.map((seatId) => {
              const [row, col] = seatId.split('-').map(Number);
              const seatLabel = getSeatLabel(row, col); // Lấy tên ghế từ dòng và cột
              return (
                <div key={seatId} className="bg-green-500 text-white px-3 py-1 rounded mr-2 mb-2">
                  {seatLabel}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  };
export default SeatBooking