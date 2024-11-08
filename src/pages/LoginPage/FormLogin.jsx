import React from "react";
import { Form, Input } from "antd";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginActionService } from "../../redux/userSlice";
import userIcon from "./user-icon.svg";
import Swal from "sweetalert2";

const FormLogin = () => {
  let navigate = useNavigate();
  //hook dùng để gọi action từ redux / đưa dữ liệu lên store
  let dispatch = useDispatch();

  const onFinishNew = (values) => {
    dispatch(loginActionService(values))
      .unwrap()
      .then((result) => {
        let dataJson = JSON.stringify(result);
        localStorage.setItem("USER_LOGIN", dataJson);
        Swal.fire(
          "Đăng nhập thành công",
          `Chào mừng bạn đã đến với chúng tôi`,
          "success"
        );
        navigate("/");
      })
      .catch((err) => {});
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Form
      name="basic"
      layout="vertical"
      style={{ width: 300 }}
      wrapperCol={{
        span: 24,
      }}
      onFinish={onFinishNew}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <div className="w-20 mx-auto mb-6">
        <img src={userIcon} alt="" />
        <h1 className="text-center text-base font-medium my-2">Đăng nhập</h1>
      </div>
      <Form.Item
        name="taiKhoan"
        rules={[
          {
            required: true,
            message: "Tài khoàn không được bỏ trống",
          },
        ]}
      >
        <Input placeholder="Tài khoản *" />
      </Form.Item>

      <Form.Item
        name="matKhau"
        rules={[
          {
            required: true,
            message: "Mật khẩu không được bỏ trống",
          },
        ]}
      >
        <Input.Password placeholder="Mật khẩu *" />
      </Form.Item>

      <Form.Item
        wrapperCol={{
          span: 24,
        }}
      >
        <button className="bg-orange-600 font-medium text-white w-full py-4">
          ĐĂNG NHẬP
        </button>
      </Form.Item>
      <span className="font-semibold">
        Bạn chưa có tài khoản?
        <NavLink
          to="/register"
          className="text-blue-500 hover:text-blue-700 transition duration-300 ml-2"
        >
          Đăng ký ngay!
        </NavLink>
      </span>
    </Form>
  );
};
export default FormLogin;
