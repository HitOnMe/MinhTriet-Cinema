import React from "react";
import IphoneCarousel from "./IphoneCarousel";
import AppInfo from "./AppInfo";

export default function AppAdvertising() {
  return (
    <div className="app-ad">
      <div className="container">
        <div className="container flex justify-between">
          <AppInfo />
          <IphoneCarousel />
        </div>
      </div>
    </div>
  );
}
