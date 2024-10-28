import React from "react";
import ListMovie from "./ListMovie";
import TabMovie from "./TabMovie";
import SelectMovie from "./SelectMovie";
// import Header from "../../components/Header/Header";
// import { useSelector } from "react-redux";
// import Header from "../../components/Header/Header";

export default function HomePage() {
  return (
    <div className="container">
      {/* <Header /> */}
      <ListMovie />
      <SelectMovie />
      <TabMovie />
    </div>
  );
}
