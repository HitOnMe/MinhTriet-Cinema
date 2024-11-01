import React from "react";
import appStore from "../HomePageImg/app-store.svg";
import googlePlay from "../HomePageImg/google-play.svg";

export default function AppInfo() {
  return (
    <div className="w-1/2">
      <h1
        className="text-4xl font-bold bg-gradient-to-r from-red-600 via-yellow-500 to-orange-300 inline-block text-transparent bg-clip-text"
        style={{ lineHeight: "5rem" }}
      >
        Ứng dụng tiện lợi dành cho người yêu điện ảnh
      </h1>
      <p className="text-xl leading-9 py-8 font-medium">
        Không chỉ đặt vé, bạn còn có thể bình luận phim, chấm điểm rạp và đổi
        quà hấp dẫn.
      </p>
      <div className="flex">
        <button>
          <img alt="" src={appStore} className="mr-6" />
        </button>
        <button>
          <img alt="" src={googlePlay} />
        </button>
      </div>
    </div>
  );
}
