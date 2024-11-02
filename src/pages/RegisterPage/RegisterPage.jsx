import React from "react";
import Header from "../../components/Header/Header";
import Background from "../RegisterPage/bg-register.jpg";
import FormRegister from "./FormRegister";

export default function RegisterPage() {
  return (
    <div>
      <Header />
      <div
        style={{
          backgroundImage: `url(${Background})`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          minHeight: "100vh",
          backgroundSize: "cover",
        }}
      >
        <div className="container flex items-center justify-center space-x-10 pt-20">
          <div className="border-2 rounded p-10 bg-white">
            <FormRegister />
          </div>
        </div>
      </div>
    </div>
  );
}
