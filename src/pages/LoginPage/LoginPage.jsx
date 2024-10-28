import React from "react";
import FormLogin from "./FormLogin";
import Header from "../../components/Header/Header";

export default function LoginPage() {
  return (
    <div>
      <Header />
      <div className="container flex items-center space-x-10">
        <div className="border-2 rounded p-10 border-orange-300">
          <FormLogin />
        </div>
      </div>
    </div>
  );
}
