import React, { useEffect, useState } from "react";
import { Form, Input, message } from "antd";
import { NavLink } from "react-router-dom";
import { movieService } from "../../services/fetchAPI";

const FormAccount = () => {
  const [accountData, setAccountData] = useState({}); // Lưu toàn bộ dữ liệu tài khoản

  // Lấy dữ liệu từ localStorage
  const userData = localStorage.getItem("USER_LOGIN");
  const user = JSON.parse(userData);
  const tenTaiKhoan = user?.taiKhoan; // Kiểm tra nếu `user` tồn tại trước khi truy xuất

  useEffect(() => {
    movieService
      .thongTinTaiKhoan(tenTaiKhoan)
      .then((result) => {
        console.log(result.data.content[0]);
        // Lưu toàn bộ dữ liệu tài khoản từ API vào state
        setAccountData(result.data.content[0]);
      })
      .catch((err) => {
        console.error("Error fetching account data:", err);
      });
  }, [tenTaiKhoan]);

  return (
    <Form
      name="account"
      layout="vertical"
      style={{ width: 300 }}
      wrapperCol={{
        span: 24,
      }}
      autoComplete="off"
      initialValues={accountData}
    >
      <div className="w-40 mx-auto mb-6">
        <h1 className="text-center text-base font-medium my-2">
          Thông tin tài khoản
        </h1>
      </div>
      <Form.Item name="taiKhoan">
        <Input placeholder="Tài khoản" value={accountData.taiKhoan} readOnly />
      </Form.Item>
      <Form.Item name="matKhau">
        <Input.Password
          placeholder="Mật khẩu"
          value={accountData.matKhau || ""}
          readOnly
        />
      </Form.Item>
      <Form.Item name="email">
        <Input placeholder="Email" value={accountData.email || ""} readOnly />
      </Form.Item>
      <Form.Item name="soDT">
        <Input
          placeholder="Số điện thoại"
          value={accountData.soDT || ""}
          readOnly
        />
      </Form.Item>
      <Form.Item name="hoTen">
        <Input placeholder="Họ tên" value={accountData.hoTen || ""} readOnly />
      </Form.Item>
    </Form>
  );
};

export default FormAccount;
