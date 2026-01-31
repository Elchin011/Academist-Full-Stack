import CoursesList from '@/features/Admin/Courses';
import { ContactRound } from 'lucide-react';
import Link from 'next/link';
import React from 'react'

const CoursesPage = () => {
  return (
    <div className="container mx-auto p-4">
      <div>
        <Link href="/admin/courses-teacher">
          <button className="flex items-center gap-1 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">
            <ContactRound size={18} /> Courses Teacher
          </button>
        </Link>
      </div>
      <CoursesList />
    </div>
  )
}

export default CoursesPage;
