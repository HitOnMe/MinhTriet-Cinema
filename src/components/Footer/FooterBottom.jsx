import React from "react";
import zion from "./FooterImg/zion.png";
import chungNhan from "./FooterImg/chung_nhan.png";

export default function FooterBottom() {
  return (
    <div className="border-t-2 border-white py-6 flex">
      <div className="w-1/6">
        <img src={zion} alt="" />
      </div>
      <div className="w-2/3 font-bold text-sm">
        <h2 className="mb-4">TIX – SẢN PHẨM CỦA CÔNG TY CỔ PHẦN ZION</h2>
        <h3>
          Địa chỉ: Z06 Đường số 13, Phường Tân Thuận Đông, Quận 7, Tp. Hồ Chí
          Minh, Việt Nam.
        </h3>
        <h3>Giấy chứng nhận đăng ký kinh doanh số: 0101659783,</h3>
        <h3>
          đăng ký thay đổi lần thứ 30, ngày 22 tháng 01 năm 2020 do Sở kế hoạch
          và đầu tư Thành phố Hồ Chí Minh cấp.
        </h3>
        <h3>Số Điện Thoại (Hotline): 1900 545 436</h3>
      </div>
      <div className="w-1/6">
        <img alt="" src={chungNhan} className="w-1/2" />
      </div>
    </div>
  );
}
