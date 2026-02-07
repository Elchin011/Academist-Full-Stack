"use client"
import LoginForm from "@/features/Login/components/LoginForm";
import RegisterForm from "@/features/Register/components";
import React, { useEffect, useState } from "react";

const Appointment = () => {
  const [offsetY, setOffsetY] = useState(0);
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [showRegister, setShowRegister] = useState(true);

  useEffect(() => {
    const handleScroll = () => setOffsetY(window.pageYOffset);
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);



  const updateUser = (userData: any) => {
    localStorage.setItem("user", JSON.stringify(userData));
    setUser(userData);
  };

  return (
    <div
      className="relative w-full h-[900px] overflow-hidden bg-cover bg-center flex items-center justify-center "
      style={{
        backgroundImage: "url(https://academist.qodeinteractive.com/wp-content/uploads/2018/06/main-background-2.jpg)",
        backgroundPosition: `center ${offsetY * 0.21}px`
      }}
    >
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center bg-white lg:w-[910px] lg:h-[500px] md:w-[768px] md:h-[436px] sm:w-[500px] sm:h-[423px] overflow-hidden">
        <div className="flex col-span-12 items-center">
          <div className="bg-[#ff1949] h-[500px] w-full col-span-6 flex items-center justify-center px-20 text-start">
            <h1 className="text-white text-[34px] font-bold">Create an account and join courses led by expert instructors.</h1>
          </div>
          <div className="col-span-2 w-1/2 py-0">
            <h1 className="text-[#ff1949] text-[24px] font-bold uppercase">
              {showRegister ? "Create an account" : "Login"}
            </h1>

            {showRegister ? (
              <RegisterForm onRegisterSuccess={() => setShowRegister(false)} />
            ) : (
              <LoginForm onLoginSuccess={updateUser} />
            )}

            <p
              className="mt-4 text-sm text-gray-600 cursor-pointer"
              onClick={() => setShowRegister(!showRegister)}
            >
              {showRegister
                ? "Already have an account? Login"
                : "Don't have an account? Register"}
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Appointment;
