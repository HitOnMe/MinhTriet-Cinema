import React from "react";
import android from "./FooterImg/android.png";
import apple from "./FooterImg/apple.png";
import facebook from "./FooterImg/facebook.png";
import threads from "./FooterImg/threads.png";

export default function FooterTop() {
  return (
    <div className="flex">
      <div className="w-1/3">
        <h1 className="mb-6 font-bold">Tix</h1>
        <div className="flex justify-between">
          <div>
            <h2 className="hover:text-white text-gray-300 transition-all">
              FAQ
            </h2>
            <h2 className="hover:text-white text-gray-300 transition-all">
              Brand Guidelines
            </h2>
          </div>
          <div>
            <h2 className="hover:text-white text-gray-300 transition-all">
              Thỏa thuận sử dụng
            </h2>
            <h2 className="hover:text-white text-gray-300 transition-all">
              Chính sách bảo mật
            </h2>
          </div>
        </div>
      </div>
      <div className="w-1/3 px-16">
        <h1 className="mb-6 font-bold">Đối tác</h1>
        <div className="flex justify-between flex-wrap">
          <span className="w-12 mr-8 mb-8">
            <img
              src="https://movienew.cybersoft.edu.vn/hinhanh/cgv.png"
              alt=""
            />
          </span>
          <span className="w-12 mr-8 mb-8">
            <img
              src="https://movienew.cybersoft.edu.vn/hinhanh/bhd-star-cineplex.png"
              alt=""
            />
          </span>
          <span className="w-12">
            <img
              src="https://movienew.cybersoft.edu.vn/hinhanh/galaxy-cinema.png"
              alt=""
            />
          </span>
          <span className="w-12 mr-8 mb-8">
            <img
              src="https://movienew.cybersoft.edu.vn/hinhanh/cinestar.png"
              alt=""
            />
          </span>
          <span className="w-12 mr-8 mb-8">
            <img
              src="https://movienew.cybersoft.edu.vn/hinhanh/lotte-cinema.png"
              alt=""
            />
          </span>
          <span className="w-12 mb-8">
            <img
              src="https://movienew.cybersoft.edu.vn/hinhanh/megags.png"
              alt=""
            />
          </span>
        </div>
      </div>
      <div className="w-1/5">
        <h1 className="mb-6 font-bold">Mobile App</h1>
        <div className="flex">
          <img alt="" src={apple} className="w-12 mr-4" />
          <img alt="" src={android} className="w-12 mr-4" />
        </div>
      </div>
      <div className="w-1/5">
        <h1 className="mb-6 font-bold">Social</h1>
        <div className="flex">
          <img src={facebook} alt="" className="w-12 mr-4" />
          <img src={threads} alt="" className="w-12 mr-4" />
        </div>
      </div>
    </div>
  );
}
