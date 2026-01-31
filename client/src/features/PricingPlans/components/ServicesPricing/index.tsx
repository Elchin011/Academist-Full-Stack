"use client"
import React from 'react'
import { PricingCard } from "../../common/PricingCard";
import { getAPi } from '@/http/api';
import { useQuery } from '@tanstack/react-query';
import { QueryKeys } from '@/constants/QueryKeys';

const ServicesPricing = () => {


 const data = [
    {
      "_id": "648f1e2f4f1c2c001c8e4b1a",
      "name": "Basic Plan",
      "price": 19,
      "teacherName": "John Doe",
      "category": "Certificate",
      "imageUrl": "https://academist.qodeinteractive.com/wp-content/uploads/2018/07/courses-12.jpg"
      },
    {
      "_id": "648f1e3a4f1c2c001c8e4b1c",
      "name": "Standard Plan",
      "price": 49,
      "teacherName": "Sarah Lee",
      "category": "Standard",
      "imageUrl": "https://academist.qodeinteractive.com/wp-content/uploads/2018/07/courses-12.jpg"
      },
    {
      "_id": "648f1e444f1c2c001c8e4b1e",
      "name": "Premium Plan",
      "price": 99,
      "teacherName": "Mary Smith",
      "category": "Populyar",
      "imageUrl": "https://academist.qodeinteractive.com/wp-content/uploads/2018/07/courses-12.jpg"
      }
 ]

  return (
    <div className='container mx-auto pt-37.5 pb-25 px-7.5 md:px-3 lg:px-0'>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12.5'>
        {data && data?.map((item: any) => (
          <PricingCard
            key={item?._id}
            img={item?.imageUrl}
            name={item?.name}
            price={item?.price}
            teacherName={item?.teacherName}
            category={item?.category}
          />
        ))}
      </div>
    </div>
  )
}

export default ServicesPricing
