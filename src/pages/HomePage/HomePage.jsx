import React from "react";
import ListMovie from "./ListMovie";
import TabMovie from "./TabMovie";
import SelectMovie from "./SelectMovie";
import BannerCarousel from "./BannerCarousel";
// import Header from "../../components/Header/Header";
// import { useSelector } from "react-redux";
// import Header from "../../components/Header/Header";

export default function HomePage() {
  return (
    <div>
      <BannerCarousel />
      <div className="container">
        <ListMovie />
        <SelectMovie />
        <TabMovie />
      </div>
    </div>
  );
}
