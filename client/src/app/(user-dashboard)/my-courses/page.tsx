"use client";
import { useQuery } from "@tanstack/react-query";
import { getAPi } from "@/http/api";
import React from "react";
import { useRouter } from "next/navigation";


const page = () => {
    const router = useRouter();
    const user =
        typeof window !== "undefined"
            ? JSON.parse(localStorage.getItem("user") || "null")
            : null;

    const userId = user?._id;

    const { data, isLoading } = useQuery({
        queryKey: ["my-courses", userId],
        queryFn: async () => {
            const token = localStorage.getItem("token");
            const res = await fetch(`http://localhost:3001/api/enrollments/enrollments`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            return res.json();
        },
        enabled: !!userId,
    });

    if (!user || !user._id) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-100">
                <div className="bg-white p-8 rounded-lg shadow-lg w-xl">
                    <div className="text-center text-red-500 text-lg font-semibold">
                        Zəhmət olmasa, əvvəlcə daxil olun.
                    </div>
                </div>
            </div>
        );
    }

    if (isLoading)
        return (
            <div className="flex justify-center items-center h-screen">
                <img
                    className="w-20 h-10"
                    src="https://raw.githubusercontent.com/Codelessly/FlutterLoadingGIFs/master/packages/cupertino_activity_indicator_large.gif"
                    alt="Loading..."
                />
            </div>
        );

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 py-10">
            <div className="bg-white p-8 rounded-lg shadow-lg w-6xl">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-800">My Courses</h1>
                </div>

                {data && data?.data?.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {data.data.map((enrollment: any) => (
                            <div
                                key={enrollment._id}
                                onClick={() => router.push(`/courses-list/${enrollment.course?._id}`)}
                                className="border rounded-xl overflow-hidden shadow-sm hover:shadow-md transition cursor-pointer"
                            >
                                <img
                                    className="w-full h-44 object-cover"
                                    src={enrollment.course?.imageUrl}
                                    alt={enrollment.course?.name}
                                />
                                <div className="p-4">
                                    <h2 className="text-[17px] font-bold text-gray-800">
                                        {enrollment.course?.name}
                                    </h2>
                                    <p className="text-gray-500 text-[13px] mt-1">
                                        {enrollment.course?.courseFeatures}
                                    </p>
                                    <p className="text-gray-700 text-[14px] mt-1">
                                        <strong>Qiymət:</strong> {enrollment.course?.price} $
                                    </p>
                                    <p className="text-green-600 font-semibold text-[13px] uppercase tracking-wide mt-3">
                                        ✅ Qeydiyyatdan keçildi
                                    </p>
                                    <p className="text-gray-400 text-[12px] mt-1">
                                        {new Date(enrollment.enrolledAt).toLocaleDateString()}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-center text-gray-500">No courses found.</p>
                )}
            </div>
        </div>
    );
};

export default page;