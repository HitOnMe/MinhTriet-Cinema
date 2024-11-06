import React, { useEffect } from "react";
import { Tabs } from "antd";
import { useState } from "react";
import { movieService } from "../../services/fetchAPI";
import { useNavigate, useParams } from "react-router-dom";
import moment from "moment/moment";

export default function LichChieuTheoPhim() {
  const params = useParams();
  const [danhSachRap, setDanhSachRap] = useState(null); // Khởi tạo giá trị là null
  const navigate = useNavigate();

  const onChange = (key) => {
    console.log(key);
  };

  useEffect(() => {
    movieService
      .layThongTinLichChieuPhim(params.id)
      .then((result) => {
        setDanhSachRap(result.data.content);
      })
      .catch(() => {});
  }, [params.id]);

  // Cột thứ 2: cụm rạp
  const renderCumRap = (cumRapChieu) => {
    return cumRapChieu.map((rap) => {
      return (
        <div key={rap.maCumRap}>
          <div className="text-left w-80 text-lg">
            <h2 className="truncate text-green-500 mb-4 font-semibold">
              {rap.tenCumRap}
            </h2>
          </div>
          <div className="grid grid-cols-4 gap-4 mb-6">
            {rap.lichChieuPhim.slice(0, 6).map((lichChieu, index) => {
              return (
                <span
                  key={index}
                  className="p-2 border-4 font-medium border-lime-300 bg-gray-100 rounded text-center hover:cursor-pointer"
                  onClick={() => {
                    navigate(`/booking/${lichChieu.maLichChieu}`);
                  }}
                >
                  {moment(lichChieu.ngayChieuGioChieu).format(
                    "DD-MM-YYYY ~ HH:mm"
                  )}
                </span>
              );
            })}
          </div>
        </div>
      );
    });
  };

  // Cột thứ 1: danh sách rạp
  const renderDanhSachRap = () => {
    // Kiểm tra nếu danhSachRap có dữ liệu và heThongRapChieu là mảng
    if (danhSachRap && danhSachRap.heThongRapChieu.length) {
      return danhSachRap.heThongRapChieu.map((rap, index) => {
        return {
          key: index,
          label: <img src={rap.logo} className="w-10" alt="" />,
          children: (
            <div className="overflow-y-scroll" style={{ height: 450 }}>
              {renderCumRap(rap.cumRapChieu)}
            </div>
          ), // Chỉ render các cụm rạp liên quan đến hệ thống rạp đó
        };
      });
    }
    return [
      {
        key: "no-showtimes",

        children: (
          <div className="text-center text-white p-4 text-lg font-semibold">
            <p>
              Hiện tại không có lịch chiếu cho bộ phim này. Mong quý khách thông
              cảm vì sự cố này
            </p>
            <p>Chân thành xin lỗi quý khách!</p>
          </div>
        ),
      },
    ];
  };

  return (
    <div>
      <Tabs
        defaultActiveKey="1"
        onChange={onChange}
        items={renderDanhSachRap()}
        tabPosition="left"
        style={{ height: 450 }}
      />
    </div>
  );
}
