"use client";
import React, { useState } from "react";

const page = () => {
    const user =
        typeof window !== "undefined"
            ? JSON.parse(localStorage.getItem("user") || "null")
            : null;

    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [message, setMessage] = useState("");

    const handleChangePassword = async () => {
        if (newPassword !== confirmPassword) {
            setMessage("Şifrələr uyğun deyil");
            return;
        }

        try {
            const token = localStorage.getItem("token");
            const res = await fetch("http://localhost:3001/api/auth/change-password", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ currentPassword, newPassword }),
            });

            const data = await res.json();
            setMessage(data.message);
        } catch (err) {
            setMessage("Xəta baş verdi");
        }
    };

    return (
        <div className="max-w-2xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-800 mb-8">Profile</h1>

            {/* User Info */}
            <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
                <div className="flex items-center gap-5 mb-6">
                    <div className="w-16 h-16 rounded-full bg-black text-white flex items-center justify-center text-[24px] font-bold">
                        {user?.name?.charAt(0).toUpperCase() || "U"}
                    </div>
                    <div>
                        <h2 className="text-[20px] font-bold text-gray-800">{user?.name}</h2>
                        <p className="text-gray-400 text-[14px]">{user?.email}</p>
                    </div>
                </div>

                <div className="flex flex-col gap-3">
                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                        <span className="text-gray-500 text-[14px] w-24">Ad:</span>
                        <span className="text-gray-800 font-medium">{user?.name}</span>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                        <span className="text-gray-500 text-[14px] w-24">Email:</span>
                        <span className="text-gray-800 font-medium">{user?.email}</span>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                        <span className="text-gray-500 text-[14px] w-24">Role:</span>
                        <span className="text-gray-800 font-medium capitalize">{user?.role}</span>
                    </div>
                </div>
            </div>

            {/* Change Password */}
            <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="text-[18px] font-bold text-gray-800 mb-5">
                    Şifrəni Dəyiş
                </h3>
                <div className="flex flex-col gap-4">
                    <input
                        type="password"
                        placeholder="Cari şifrə"
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        className="border px-4 py-2.5 rounded-lg focus:outline-none focus:border-black text-[14px]"
                    />
                    <input
                        type="password"
                        placeholder="Yeni şifrə"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        className="border px-4 py-2.5 rounded-lg focus:outline-none focus:border-black text-[14px]"
                    />
                    <input
                        type="password"
                        placeholder="Yeni şifrəni təsdiqlə"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="border px-4 py-2.5 rounded-lg focus:outline-none focus:border-black text-[14px]"
                    />

                    {message && (
                        <p className={`text-[14px] ${message.includes("deyil") ? "text-red-500" : "text-green-500"}`}>
                            {message}
                        </p>
                    )}

                    <button
                        onClick={handleChangePassword}
                        className="text-[13px] tracking-[1.95px] bg-transparent uppercase font-medium text-black hover:bg-black hover:text-white duration-300 border border-black py-3 px-10 w-fit"
                    >
                        Şifrəni Dəyiş
                    </button>
                </div>
            </div>
        </div>
    );
};

export default page;