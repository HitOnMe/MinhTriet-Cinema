import React from "react";
import { useSelector } from "react-redux";
import { DotLoader } from "react-spinners";

export default function Spinner() {
  let isLoading = useSelector((state) => state.spinnerSlice.isLoading);

  return isLoading ? (
    <div className="fixed w-screen h-screen top-0 left-0 bg-black z-20 flex justify-center items-center">
      <DotLoader color="#FF6500" size={150} speedMultiplier={1.5} />
    </div>
  ) : (
    <></>
  );
}
