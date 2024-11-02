import React from "react";
import ListMovie from "./ListMovie";
import TabMovie from "./TabMovie";
import SelectMovie from "./SelectMovie";
import BannerCarousel from "./BannerCarousel";
import AppAdvertising from "./AppAdvertising/AppAdvertising";

export default function HomePage() {
  return (
    <div>
      <div className="bg-side">
        <BannerCarousel />
        <SelectMovie />
        <div className="container bg-white">
          <ListMovie />
          <TabMovie />
        </div>
      </div>
      <AppAdvertising />
    </div>
  );
}
