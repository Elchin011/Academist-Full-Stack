"use client"
import React from 'react'
import { useQuery } from "@tanstack/react-query";
import { QueryKeys } from "@/constants/QueryKeys";
import { getAPi } from "@/http/api";
import { useCart } from "@/Providers/CartProvider";
import { ProductCard } from '../../common/ProductCard';
import toast from 'react-hot-toast';
import { CourseCard } from '@/features/CoursesList/common/CourseCard';

const CoursesList = () => {



  const { data, isLoading, isError, error } = useQuery({
    queryKey: QueryKeys.courses.All,
    queryFn: async () => await getAPi("/courses"),
  });

  return (
    <div className='container mx-auto pt-40'>
      <div className='flex gap-14'>
        <h4 className='text-[18px] font-semibold'>Show all</h4>
        <h4 className='text-[18px] font-semibold'>Certificate</h4>
        <h4 className='text-[18px] font-semibold'>Learning</h4>
        <h4 className='text-[18px] font-semibold'>Popular</h4>
      </div>
      <div className='container mx-auto pt-10 pb-25 px-7.5 md:px-3 lg:px-0'>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12.5'>
          {data &&
            data?.data?.map((item: any) => (
              <CourseCard
                key={item?._id}
                img={item?.imageUrl}
                name={item?.name}
                price={item?.price}
                teacherName={item?.teacher?.name}
                courseFeatures={item?.courseFeatures}
                id={item?._id}
              />
            ))}
        </div>
      </div>
    </div >
  )
}

export default CoursesList
