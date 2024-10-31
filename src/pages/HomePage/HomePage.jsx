import React from "react";
import ListMovie from "./ListMovie";
import TabMovie from "./TabMovie";
import SelectMovie from "./SelectMovie";
import BannerCarousel from "./BannerCarousel";
import IphoneCarousel from "./AppAdvertising/IphoneCarousel";
import AppInfo from "./AppAdvertising/AppInfo";
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
      <div className="app-ad">
        <div className="container">
          <div className="container flex justify-between">
            <AppInfo />
            <IphoneCarousel />
          </div>
        </div>
      </div>
    </div>
  );
}
