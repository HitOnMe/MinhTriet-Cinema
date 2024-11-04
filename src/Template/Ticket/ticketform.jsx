import React, { useState } from 'react';


const TicketForm = () => {
  const [selectedSeats, setSelectedSeats] = useState([]);
  const totalPrice = selectedSeats.length * 100000; // Giả định giá vé là 100000 VNĐ

  return (
    <div className=" p-4 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold mb-4">Thông Tin Đặt Vé</h2>
            <div className="mb-2">
              <strong>Ngày Chiếu:</strong> <span>12/10/2024</span>
            </div>
            <div className="mb-2">
              <strong>Cụm Rạp:</strong> <span>Cụm Rạp B</span>
            </div>
            <div className="mb-2">
              <strong>Ghế Đã Chọn:</strong> 
              <span>
                {selectedSeats.length > 0 ? selectedSeats.join(', ') : 'Chưa chọn ghế'}
              </span>
            </div>
            <div className="mb-4">
              <strong>Tổng Tiền:</strong> <span>{totalPrice.toLocaleString()} VNĐ</span>
            </div>
            <button className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 rounded">
              Mua Vé
            </button>
          </div>
  );
};

export default TicketForm;