import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

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
        </div>
      );
    } else {
      return (
        <div>
          <NavLink
            to="/login"
            className="text-white rounded px-10 py-2 border-2 bg-red-600"
          >
            Login
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
            CyberFlix
          </NavLink>
          <div>{renderMenu()}</div>
        </div>
      </div>
      <div className="pb-24"></div>
    </div>
  );
}
