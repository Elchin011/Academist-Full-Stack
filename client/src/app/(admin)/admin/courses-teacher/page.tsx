import CoursesTeacherList from "@/features/Admin/Courses/CoursesTeacher";
import { ArrowBigLeft } from "lucide-react";

export default function CoursesTeacherPage() {
    return (
        <div className="container mx-auto p-4">
            <button>
                <a href="/admin/courses" className="p-2 bg-red-500 text-white rounded hover:bg-red-600">
                    <ArrowBigLeft size={23} className="inline-block" />
                </a>
            </button>
            <CoursesTeacherList />
        </div>
    );
}