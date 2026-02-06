"use client";
import React from 'react'
import StaffCard from '../../common/StaffCard'
import { QueryKeys } from '@/constants/QueryKeys';
import { getAPi } from '@/http/api';
import { useQuery } from '@tanstack/react-query';

const MeetProfessionals = () => {

  const { data , isLoading, isError, error } = useQuery({
    queryKey: QueryKeys.persons.All,
    queryFn: async () => await getAPi("/persons"),
  });

  console.log("Persons Data:", data);
  return (
    <div className='container mx-auto mt-38 text-center px-4'>
      <div className='flex flex-wrap items-center gap-15'>
        {data && 
          data?.data?.map((item: any) => (
            <StaffCard
              name={item?.name}
              specialties={item?.specialty}
              key={item?._id}
              imageUrl={item?.imageUrl}
            />
          ))}
      </div>
    </div>
  )
}

export default MeetProfessionals
