import React from "react";
import { Button, Form, Input, message } from "antd";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginActionService, setUserAction } from "../../redux/userSlice";

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
      initialValues={{
        // giá trị đăng nhập mặc định
        taiKhoan: "mafia",
        matKhau: "8386",
      }}
      onFinish={onFinishNew}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item
        name="taiKhoan"
        rules={[
          {
            required: true,
            message: "Tài khoàn không được bỏ trống",
          },
        ]}
      >
        <Input placeholder="Tài khoàn" />
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
        <Input.Password placeholder="Mật khẩu" />
      </Form.Item>

      <Form.Item
        wrapperCol={{
          offset: 4,
          span: 16,
        }}
      >
        <Button type="primary" htmlType="submit" block>
          ĐĂNG NHẬP
        </Button>
      </Form.Item>
    </Form>
  );
};
export default FormLogin;
