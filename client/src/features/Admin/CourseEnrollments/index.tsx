"use client";
import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getAPi } from "@/http/api";
import { BasicTable } from "@/features/common/BasicTable";
import { CommonDialog } from "@/features/common/Dialog";
import { Button } from "@/components/ui/button";
import { QueryKeys } from "@/constants/QueryKeys";

interface Enrollment {
    _id: string;
    course: {
        _id: string;
        name: string;
    };
    user: {
        _id: string;
        firstName: string;
        lastName: string;
        email: string;
    };
}

const CourseEnrollmentsList = () => {
    const [openModalUsers, setOpenModalUsers] = useState<boolean>(false);
    const [selectedUsers, setSelectedUsers] = useState<Enrollment["user"][]>([]);
    const [selectedCourse, setSelectedCourse] = useState<string>("");

    // Backend: /admin/enrollments endpoint
    const { data, isLoading } = useQuery({
        queryKey: QueryKeys.courses.coursesEnrollments,
        queryFn: async () => getAPi("/enrollments/admin/enrollments"),
    });

    // Transform enrollments into course-based grouping
    const courseMap: Record<string, Enrollment["user"][]> = {};
    data?.data?.forEach((enrollment: Enrollment) => {
        const courseName = enrollment.course.name;
        if (!courseMap[courseName]) courseMap[courseName] = [];
        courseMap[courseName].push(enrollment.user);
    });

    const columns = ["Course Name", "Enrolled Count", "Enrolled Users"];

    const rows = Object.entries(courseMap).map(([courseName, users]) => ({
        courseName,
        enrolledCount: (
            <Button
                onClick={() => {
                    setSelectedUsers(users);
                    setSelectedCourse(courseName);
                    setOpenModalUsers(true);
                }}
                className="text-[14px] px-4 py-2 rounded-md bg-blue-500 text-white hover:bg-blue-600"
            >
                {users.length}
            </Button>
        ),
        enrolledUsers:
            users
                .slice(0, 3)
                .map((u) => `${u.firstName} ${u.lastName}`)
                .join(", ") + (users.length > 3 ? ", ..." : ""),
    }));

    return (
        <div>
            <div className="flex items-center my-5 justify-between">
                <div className="relative">
                    <h1 className="text-3xl font-bold text-gray-800">Course Enrollments</h1>
                    <span className="h-[2px] w-full bg-red-500 absolute bottom-0.5"></span>
                </div>
            </div>

            <BasicTable cols={columns} rows={rows} isLoading={isLoading} />

            {openModalUsers && (
                <CommonDialog
                    open={openModalUsers}
                    onClose={() => {
                        setOpenModalUsers(false);
                        setSelectedUsers([]);
                        setSelectedCourse("");
                    }}
                >
                    <div className="p-5">
                        <h2 className="text-xl font-semibold mb-3">
                            {selectedCourse} - Enrolled Users
                        </h2>
                        <ul className="list-disc pl-5 space-y-1 max-h-[300px] overflow-y-auto">
                            {selectedUsers.map((user) => (
                                <li key={user._id}>
                                    {user.firstName} {user.lastName} ({user.email})
                                </li>
                            ))}
                        </ul>
                        <Button
                            onClick={() => setOpenModalUsers(false)}
                            className="mt-4 px-4 py-2 bg-red-500 text-white hover:bg-red-600"
                        >
                            Close
                        </Button>
                    </div>
                </CommonDialog>
            )}
        </div>
    );
};

export default CourseEnrollmentsList;
