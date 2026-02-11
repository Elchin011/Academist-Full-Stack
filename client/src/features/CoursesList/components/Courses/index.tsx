"use client"
import React from 'react'
import { CourseCard } from "../../common/CourseCard";
import { getAPi } from '@/http/api';
import { useQuery } from '@tanstack/react-query';
import { QueryKeys } from '@/constants/QueryKeys';

const Courses = () => {


  const { data, isLoading, isError, error } = useQuery({
    queryKey: QueryKeys.courses.All,
    queryFn: async () => await getAPi("/courses"),
  });

  return (
    <div className='container mx-auto pt-37.5 pb-25 px-7.5 md:px-3 lg:px-0'>
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
  )
}

export default Courses;
