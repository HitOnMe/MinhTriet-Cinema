import { useState, useEffect } from "react";
import configData from "./config";
import { http } from "./config";

const UseFetchTheatre = (url) => {
  const [theatre, setTheatre] = useState(null);
  useEffect(() => {
    const getData = async () => {
      const response = await configData("GET", url);
      setTheatre(response.data);
    };
    getData();
  }, [url]);
  return theatre;
};
export default UseFetchTheatre;

//************************************ */
export let movieService = {
  layDanhSachPhim: () => {
    return http.get("/api/QuanLyPhim/LayDanhSachPhim?maNhom=GP01");
  },

  layChiTietPhim: (idPhim) => {
    return http.get(`/api/QuanLyPhim/LayThongTinPhim?MaPhim=${idPhim}`);
  },

  taiKhoanNguoiDung: (acc) => {
    return http.post("/api/QuanLyNguoiDung/DangNhap", acc);
  },

  dangKyTaiKhoan: (acc) => {
    return http.post("/api/QuanLyNguoiDung/DangKy", acc);
  },

  thongTinTaiKhoan: (acc) => {
    return http.get(
      `/api/QuanLyNguoiDung/TimKiemNguoiDung?MaNhom=GP00&tuKhoa=${acc}`
    );
  },

  layThongTinLichChieuPhim: (idPhim) => {
    return http.get(`/api/QuanLyRap/LayThongTinLichChieuPhim?MaPhim=${idPhim}`);
  },

  layHeThongRap: () => {
    return http.get("/api/QuanLyRap/LayThongTinLichChieuHeThongRap");
  },

  layDanhSachPhongVe: (maLichChieu) => {
    return http.get(
      `/api/QuanLyDatVe/LayDanhSachPhongVe?MaLichChieu=${maLichChieu}`
    );
  },
};
