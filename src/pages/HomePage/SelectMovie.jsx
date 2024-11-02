import React, { useState, useEffect } from "react";
import { Select, Space } from "antd";
import { movieService } from "../../services/fetchAPI";
import { useNavigate } from "react-router";

export default function SelectMovie() {
  const [phim, setPhim] = useState([]); // Dữ liệu phim
  const [raps, setRaps] = useState([]); // Dữ liệu các cụm rạp
  const [lichChieu, setLichChieu] = useState([]); // Dữ liệu các suất chiếu

  const [selectedPhim, setSelectedPhim] = useState(); // Phim được chọn
  const [selectedRap, setSelectedRap] = useState(); // Cụm rạp được chọn
  const [selectedLichChieu, setSelectedLichChieu] = useState(); // Thêm state cho mã lịch chiếu đã chọn

  let navigate = useNavigate();

  useEffect(() => {
    movieService
      .layDanhSachPhim()
      .then((result) => {
        setPhim(result.data.content);
      })
      .catch((err) => {});
  }, []);

  // Khi chọn phim, gọi API để lấy thông tin các rạp chiếu của phim đó
  const handleSelectPhim = (maPhim) => {
    setSelectedPhim(maPhim);
    setSelectedRap(null);
    setLichChieu([]);
    // Gọi API để lấy thông tin lịch chiếu dựa trên mã phim
    movieService
      .layThongTinLichChieuPhim(maPhim)
      .then((result) => {
        const heThongRap = result.data.content.heThongRapChieu;
        setRaps(heThongRap); // Lưu danh sách hệ thống rạp chiếu
        setLichChieu([]); // Reset các suất chiếu khi chọn phim mới
      })
      .catch((err) => {});
  };

  // Khi chọn cụm rạp, cập nhật danh sách suất chiếu
  const handleSelectRap = (maPhim, maCumRap) => {
    setSelectedRap(maCumRap); // Cập nhật cụm rạp đã chọn
    setLichChieu([]);

    // Tìm cụm rạp trong hệ thống rạp của phim đã chọn
    const rap = raps.find((rap) =>
      rap.cumRapChieu.some((cr) => cr.maCumRap === maCumRap)
    );

    if (rap) {
      const cumRap = rap.cumRapChieu.find((cr) => cr.maCumRap === maCumRap);

      if (cumRap) {
        console.log("Danh sách lịch chiếu:", cumRap.lichChieuPhim);
        setLichChieu(cumRap.lichChieuPhim); // Lưu danh sách suất chiếu của cụm rạp đó
      } else {
        console.log("Không tìm thấy cụm rạp");
      }
    } else {
      console.log("Không tìm thấy hệ thống rạp cho mã phim:", maPhim);
    }
  };

  const handleSelectLichChieu = (maLichChieu) => {
    setSelectedLichChieu(maLichChieu); // Lưu mã lịch chiếu được chọn
  };

  // Hàm điều hướng tới trang đặt vé
  const handleBooking = () => {
    if (selectedLichChieu) {
      navigate(`/booking/${selectedLichChieu}`);
    } else {
      alert("Vui lòng chọn giờ chiếu để đặt vé!");
    }
  };

  // render danh sách phim
  let renderMovies = () => {
    return phim.map((movie) => {
      return {
        label: movie.tenPhim,
        value: movie.maPhim,
      };
    });
  };

  // Render danh sách cụm rạp cho dropdown rạp
  const renderRaps = () => {
    return raps.flatMap((rap) =>
      rap.cumRapChieu.map((cumRap) => ({
        label: cumRap.tenCumRap, // Hiển thị tên cụm rạp
        value: cumRap.maCumRap, // Sử dụng mã cụm rạp khi chọn
      }))
    );
  };

  // Render danh sách suất chiếu cho dropdown ngày giờ chiếu
  const renderLichChieu = () => {
    return lichChieu.map((lich) => ({
      label: `${lich.ngayChieuGioChieu} - Rạp: ${lich.tenRap}`, // Hiển thị ngày giờ chiếu và tên rạp
      value: lich.maLichChieu, // Mã lịch chiếu khi chọn
    }));
  };

  return (
    <div className="container">
      <Space wrap className="mt-6 mb-4 flex justify-between">
        <Select
          value={selectedPhim || "Chọn phim"}
          style={{
            margin: 5,
          }}
          onChange={handleSelectPhim}
          options={renderMovies()}
          className="w-64 h-12"
        />
        <Select
          value={selectedRap || "Chọn rạp"}
          style={{
            margin: 5,
          }}
          className="w-64 h-12"
          onChange={(value) => handleSelectRap(selectedPhim, value)}
          options={renderRaps()}
        />
        <Select
          defaultValue="Ngày giờ chiếu"
          style={{
            margin: 5,
          }}
          className="w-64 h-12"
          onChange={handleSelectLichChieu}
          options={renderLichChieu()}
        />
        <button
          className="px-8 py-4 text-white bg-orange-500 font-bold rounded-sm"
          onClick={handleBooking}
        >
          MUA VÉ
        </button>
      </Space>
    </div>
  );
}
