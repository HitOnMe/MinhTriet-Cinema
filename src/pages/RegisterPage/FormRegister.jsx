import React from "react";
import { Form, Input, message } from "antd";
import { useDispatch } from "react-redux";
import { registerActionService } from "../../redux/userSlice";
import userIcon from "./user-icon.svg";
import { NavLink } from "react-router-dom";
import Swal from "sweetalert2";

const FormRegister = () => {
  let dispatch = useDispatch();

  const onFinish = (values) => {
    dispatch(registerActionService(values))
      .unwrap()
      .then(() => {
        Swal.fire("Chúc mừng", "Bạn đã đăng ký thành công!", "success");
      })
      .catch((err) => {
        Swal.fire("Thông báo", "Đăng ký thất bại", "error");
      });
  };

  return (
    <Form
      name="register"
      layout="vertical"
      onFinish={onFinish}
      style={{ width: 300 }}
      wrapperCol={{
        span: 24,
      }}
      autoComplete="off"
    >
      <div className="w-20 mx-auto mb-6">
        <img src={userIcon} alt="" />
        <h1 className="text-center text-base font-medium my-2">Đăng ký</h1>
      </div>
      <Form.Item
        name="taiKhoan"
        rules={[{ required: true, message: "Tài khoản không được bỏ trống" }]}
      >
        <Input placeholder="Tài khoản" />
      </Form.Item>
      <Form.Item
        name="matKhau"
        rules={[{ required: true, message: "Mật khẩu không được bỏ trống" }]}
      >
        <Input.Password placeholder="Mật khẩu" />
      </Form.Item>
      <Form.Item
        name="email"
        rules={[{ required: true, message: "Email không được bỏ trống" }]}
      >
        <Input placeholder="Email" />
      </Form.Item>
      <Form.Item
        name="soDT"
        rules={[
          { required: true, message: "Số điện thoại không được bỏ trống" },
        ]}
      >
        <Input placeholder="Số điện thoại" />
      </Form.Item>
      <Form.Item
        name="hoTen"
        rules={[{ required: true, message: "Họ tên không được bỏ trống" }]}
      >
        <Input placeholder="Họ tên" />
      </Form.Item>

      <Form.Item
        wrapperCol={{
          span: 24,
        }}
      >
        <button className="bg-orange-600 font-medium text-white w-full py-4">
          ĐĂNG KÝ
        </button>
      </Form.Item>
      <span className="font-semibold">
        Bạn đã có tài khoản?
        <NavLink
          to="/login"
          className="text-blue-500 hover:text-blue-700 transition duration-300 ml-2"
        >
          Đăng nhập
        </NavLink>
      </span>
    </Form>
  );
};

export default FormRegister;
