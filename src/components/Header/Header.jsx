import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import logo from "./logo.png";

export default function Header() {
  //hook dùng để lấy data từ store về: useSelector
  let user = useSelector((state) => state.userSlice.dataLogin);

  let renderMenu = () => {
    if (user) {
      return (
        <div>
          <strong className="me-4">{user.hoTen}</strong>
          <button
            className="text-red-600 border-red-600 border-2 bg-white px-10 py-2 rounded-s-lg rounded-e-lg"
            onClick={handleLogout}
          >
            Log out
          </button>
          <NavLink
            to="/MinhTriet-Cinema/register"
            className="text-white rounded px-10 py-2 ml-4 border-2 bg-red-600"
          >
            Register
          </NavLink>
        </div>
      );
    } else {
      return (
        <div>
          <NavLink
            to="/MinhTriet-Cinema/login"
            className="text-white rounded px-10 py-2 border-2 bg-red-600"
          >
            Login
          </NavLink>
          <NavLink
            to="/MinhTriet-Cinema/register"
            className="text-white rounded px-10 py-2 ml-4 border-2 bg-red-600"
          >
            Register
          </NavLink>
        </div>
      );
    }
  };

  let handleLogout = () => {
    //xóa localStorage
    localStorage.removeItem("USER_LOGIN");
    //quay lại trang login
    window.location.href = "/login";
  };

  return (
    <div>
      <div className="shadow-2xl fixed left-0 right-0 z-10 bg-white opacity-80">
        <div className="header container">
          <NavLink to="/" className="text-red-600 font-bold text-2xl italic">
            <img alt="" src={logo} className="max-w-16" />
          </NavLink>
          <div>{renderMenu()}</div>
        </div>
      </div>
      <div className="pb-24"></div>
    </div>
  );
}
