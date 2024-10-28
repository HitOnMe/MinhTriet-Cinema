import React from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";

export default function HomeTemplate({ content }) {
  return (
    <div>
      <Header />
      {content}
      <Footer />
    </div>
  );
}
