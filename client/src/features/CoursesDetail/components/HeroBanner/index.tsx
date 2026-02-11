"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { getAPi } from "@/http/api";
import { QueryKeys } from "@/constants/QueryKeys";

const CoursesDetailsHeroBanner = () => {
  const { id } = useParams();

  // Məhsulun məlumatını çəkirik
  const { data, isLoading, error } = useQuery({
    queryKey: [QueryKeys.courses.All, id],
    queryFn: () => getAPi(`/courses/${id}`),
    enabled: !!id,
  });

  const courseTitle = data?.data?.name || "Loading...";

  return (
    <div className='relative w-full'>
      <img className='w-full h-60 object-cover' src="https://academist.qodeinteractive.com/wp-content/uploads/2018/07/Title-area-img.jpg" alt="" />
      <div className='absolute top-18 left-[95px]'>
        <h3 className='text-[45px] text-black font-extrabold'>
          Course single
        </h3>
        <div className='text-[15px] text-black mb-6 flex items-center gap-2'>
          <li className='list-none'><Link href="/" className="text-black transition mb-3.5 text-[15px] relative group cursor-pointer ">Home
            <span className="absolute left-0 bottom-0 w-0 h-[1px] bg-white transition-all duration-400 group-hover:w-full"></span>
          </Link>
          </li>
          <span className='text-black'>/</span>
          <p><Link href="/courses-list" className="text-black transition mb-3.5 text-[15px] relative group cursor-pointer ">Courses List</Link></p>
          <span className='text-black'>/</span>
          <p><Link href={`/courses/${id}`} className="text-black transition mb-3.5 text-[15px] relative group cursor-pointer ">{courseTitle}</Link></p>
        </div>
      </div>
    </div>
  );
};

export default CoursesDetailsHeroBanner;
