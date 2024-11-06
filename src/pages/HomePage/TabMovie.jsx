import React, { useEffect, useState } from "react";
import { movieService } from "../../services/fetchAPI";
import { Tabs } from "antd";
import moment from "moment/moment";
import { useNavigate } from "react-router-dom";

// cột thứ 3
let ItemPhim = ({ phim }) => {
  const navigate = useNavigate();
  return (
    <div className="flex space-x-3 mt-5">
      <img src={phim.hinhAnh} className="w-28 mr-5" alt="" />
      <div>
        <h3 className="text-lg font-semibold">{phim.tenPhim}</h3>
        <div className="grid grid-cols-3 gap-4">
          {phim.lstLichChieuTheoPhim.slice(0, 6).map((lichChieu, index) => {
            return (
              <span
                key={index}
                className="p-1 border-4 font-medium text-lime-500 border-lime-300 bg-gray-100 rounded hover:cursor-pointer"
                onClick={() => {
                  navigate(`/ticket/${lichChieu.maLichChieu}`);
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
    </div>
  );
};

export default function TabMovie() {
  const [danhSachRap, setDanhSachRap] = useState([]);

  const onChange = (key) => {
    console.log(key);
  };

  useEffect(() => {
    movieService
      .layHeThongRap()
      .then((result) => {
        setDanhSachRap(result.data.content);
      })
      .catch(() => {});
  }, []);

  //cột thứ 2
  let renderCumRap = (heThongRap) => {
    return heThongRap.lstCumRap.map((cumRap, index) => {
      return {
        key: index,
        label: (
          <div className="text-left w-80 text-lg">
            <h2 className="truncate text-green-500">{cumRap.tenCumRap}</h2>
            <h4 className="truncate text-gray-500">{cumRap.diaChi}</h4>
          </div>
        ),
        children: (
          <div className="overflow-y-scroll" style={{ height: 680 }}>
            {cumRap.danhSachPhim.map((phim) => {
              return <ItemPhim phim={phim} key={phim.maPhim} />;
            })}
          </div>
        ),
      };
    });
  };

  // cột thứ 1
  let renderDanhSachRap = () => {
    return danhSachRap.map((heThongRap) => {
      return {
        key: heThongRap.maHeThongRap,
        label: <img src={heThongRap.logo} className="w-20" alt="" />,
        children: (
          <Tabs
            defaultActiveKey="1"
            items={renderCumRap(heThongRap)}
            onChange={onChange}
            tabPosition="left"
            style={{ height: 680 }}
          />
        ),
      };
    });
  };

  return (
    <div className="py-20">
      <Tabs
        defaultActiveKey="1"
        items={renderDanhSachRap()}
        onChange={onChange}
        tabPosition="left"
        style={{ height: 680 }}
      />
    </div>
  );
}
