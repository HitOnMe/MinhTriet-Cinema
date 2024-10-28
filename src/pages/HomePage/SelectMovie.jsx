import React, { useState, useEffect } from "react";
import { Select, Space } from "antd";
import { movieService } from "../../services/fetchAPI";

export default function SelectMovie() {
  const [phim, setPhim] = useState([]); // Dữ liệu phim
  const [raps, setRaps] = useState([]); // Dữ liệu các cụm rạp
  const [lichChieu, setLichChieu] = useState([]); // Dữ liệu các suất chiếu

  const [selectedPhim, setSelectedPhim] = useState(); // Phim được chọn
  const [selectedRap, setSelectedRap] = useState(); // Cụm rạp được chọn

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
  const handleSelectRap = (maHeThongRap, maCumRap) => {
    setSelectedRap(maCumRap); // Cập nhật cụm rạp đã chọn

    // Tìm hệ thống rạp
    const rap = raps.find((r) => r.maHeThongRap === maHeThongRap);

    if (rap) {
      // Tìm cụm rạp trong hệ thống rạp đã chọn
      const cumRap = rap.cumRapChieu.find((cr) => cr.maCumRap === maCumRap);

      if (cumRap) {
        console.log("Danh sách lịch chiếu:", cumRap.lichChieuPhim);
        setLichChieu(cumRap.lichChieuPhim); // Lưu danh sách suất chiếu của rạp đó
      } else {
        console.log("Không tìm thấy cụm rạp");
      }
    } else {
      console.log("Không tìm thấy hệ thống rạp");
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
      <Space wrap className="mt-10 mb-4">
        <Select
          defaultValue="Phim"
          style={{
            width: 300,
            margin: 5,
          }}
          onChange={handleSelectPhim}
          options={renderMovies()}
        />
        <Select
          defaultValue="Rạp"
          style={{
            width: 300,
            margin: 5,
          }}
          onChange={(value) => handleSelectRap(selectedPhim, value)}
          options={renderRaps()}
          disabled={!selectedPhim} // chỉ chọn khi đã có phim
        />
        <Select
          defaultValue="Ngày giờ chiếu"
          style={{
            width: 300,
            margin: 5,
          }}
          options={renderLichChieu()}
          disabled={!selectedRap} // chỉ chọn khi đã có rạp
        />
      </Space>
    </div>
  );
}
