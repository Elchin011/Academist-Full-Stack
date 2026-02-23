"use client";
import React, { useState } from "react";

const page = () => {
    const user =
        typeof window !== "undefined"
            ? JSON.parse(localStorage.getItem("user") || "null")
            : null;

    const [showPasswordForm, setShowPasswordForm] = useState(false);
    const [showProfileForm, setShowProfileForm] = useState(false);

    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [passwordMessage, setPasswordMessage] = useState("");

    const [name, setName] = useState(user?.name || "");
    const [email, setEmail] = useState(user?.email || "");
    const [profileMessage, setProfileMessage] = useState("");

    const handleChangePassword = async () => {
        if (newPassword !== confirmPassword) {
            setPasswordMessage("Şifrələr uyğun deyil");
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
            setPasswordMessage(data.message);
        } catch {
            setPasswordMessage("Xəta baş verdi");
        }
    };

    const handleChangeProfile = async () => {
        try {
            const token = localStorage.getItem("token");
            const res = await fetch("http://localhost:3001/api/auth/update-profile", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ name, email }),
            });
            const data = await res.json();
            setProfileMessage(data.message);

            // localStorage-i yenilə
            if (data.user) {
                localStorage.setItem("user", JSON.stringify(data.user));
                window.location.reload(); // səhifəni yenilə
            }
        } catch {
            setProfileMessage("Xəta baş verdi");
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

                {/* Edit Profile Button */}
                <button
                    onClick={() => setShowProfileForm(!showProfileForm)}
                    className="mt-4 text-[13px] tracking-[1.95px] bg-transparent uppercase font-medium text-black hover:bg-black hover:text-white duration-300 border border-black py-2.5 px-8"
                >
                    {showProfileForm ? "Bağla" : "Məlumatları Dəyiş"}
                </button>

                {/* Profile Form */}
                {showProfileForm && (
                    <div className="mt-5 flex flex-col gap-4">
                        <input
                            type="text"
                            placeholder="Ad"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="border px-4 py-2.5 rounded-lg focus:outline-none focus:border-black text-[14px]"
                        />
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="border px-4 py-2.5 rounded-lg focus:outline-none focus:border-black text-[14px]"
                        />
                        {profileMessage && (
                            <p className="text-[14px] text-green-500">{profileMessage}</p>
                        )}
                        <button
                            onClick={handleChangeProfile}
                            className="text-[13px] tracking-[1.95px] bg-transparent uppercase font-medium text-black hover:bg-black hover:text-white duration-300 border border-black py-2.5 px-8 w-fit"
                        >
                            Yadda Saxla
                        </button>
                    </div>
                )}
            </div>

            {/* Change Password */}
            <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-center justify-between">
                    <h3 className="text-[18px] font-bold text-gray-800">Şifrəni Dəyiş</h3>
                    <button
                        onClick={() => setShowPasswordForm(!showPasswordForm)}
                        className="text-[13px] tracking-[1.95px] bg-transparent uppercase font-medium text-black hover:bg-black hover:text-white duration-300 border border-black py-2.5 px-8"
                    >
                        {showPasswordForm ? "Bağla" : "Dəyiş"}
                    </button>
                </div>

                {showPasswordForm && (
                    <div className="flex flex-col gap-4 mt-5">
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
                        {passwordMessage && (
                            <p className={`text-[14px] ${passwordMessage.includes("deyil") ? "text-red-500" : "text-green-500"}`}>
                                {passwordMessage}
                            </p>
                        )}
                        <button
                            onClick={handleChangePassword}
                            className="text-[13px] tracking-[1.95px] bg-transparent uppercase font-medium text-black hover:bg-black hover:text-white duration-300 border border-black py-2.5 px-8 w-fit"
                        >
                            Şifrəni Dəyiş
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default page;