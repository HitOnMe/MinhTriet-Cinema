import React from "react";
import FormLogin from "./FormLogin";
import Header from "../../components/Header/Header";
import Background from "./bg-login.jpg";

export default function LoginPage() {
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
            <FormLogin />
          </div>
        </div>
      </div>
    </div>
  );
}
