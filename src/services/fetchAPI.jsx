import { useState, useEffect } from "react";
import configData from "./config";
import { http } from "./config";

const UseFetchTheatre = (url) => {
  const [theatre, setTheatre] = useState(null);
  const [loading, setLoading] = useState(true);  // State to track loading
  const [error, setError] = useState(null);  // State to track errors

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await configData('GET', url);
        setTheatre(response.data);
      } catch (err) {
        setError(err.message);  // Set error if request fails
      } finally {
        setLoading(false);  // Set loading to false once the request is complete
      }
    };

    getData();

  }, [url]);

  return { theatre, loading, error };  // Return loading and error state
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
