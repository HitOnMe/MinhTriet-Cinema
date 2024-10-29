import React from "react";
import MediaQuery from "react-responsive";
import FooterDesktop from "./FooterDesktop";
import FooterMobile from "./FooterMobile";

export default function Footer(props) {
  return (
    <div className="bg-gray-800 text-white py-12">
      <div className="container">
        <MediaQuery minWidth={1200}>
          <FooterDesktop />
        </MediaQuery>
        <MediaQuery maxWidth={1199.8}>
          <FooterMobile />
        </MediaQuery>
      </div>
    </div>
  );
}
