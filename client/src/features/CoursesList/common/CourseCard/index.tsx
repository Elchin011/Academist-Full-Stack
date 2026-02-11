"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import cloudinaryLoader from "@/features/common/BaseImageLoad";
import { Check, DollarSign, Star, User } from "lucide-react";
import Image from "next/image";
import { loadStripe } from "@stripe/stripe-js";
import Link from "next/link";
const stripePromise = loadStripe(
    process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string
);

export const CourseCard = ({
    img,
    name,
    price,
    teacherName,
    courseFeatures,
    id
}: {
    img: string;
    name: string;
    price: number;
    teacherName: string;
    courseFeatures: string;
    id: any;
}) => {


    return (
        <Card>
            <CardContent 
            className="space-y-2"
            onClick={() => {
                window.location.href = `/courses-list/${id}`;
            }}
            >
                <div className="w-full h-69 overflow-hidden relative">
                    <Image
                        loader={cloudinaryLoader}
                        src={img ?? ""}
                        alt="Placeholder"
                        className="w-full h-full absolute inset-0 object-contain"
                        fill
                    />
                    <div className="absolute bottom-8 right-0">
                        <Button variant="default" className="py-2 px-7 text-[14px] text-white font-medium bg-[#ff1949] hover:bg-[#1c1c1c] transition-colors duration-300">
                            {courseFeatures}
                        </Button>
                    </div>
                </div>
                <div className=''>
                    <div className="mb-5">
                        <h4 className='text-[20px] font-bold'>
                            {name}
                        </h4>
                        <h4 className='text-[15px] font-light'>{teacherName}</h4>
                    </div>
                    <span className="h-[3px] bg-[#ff1949] block w-10"></span>
                    <p className="mt-5 text-[15px] font-light text-[#444]"> Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit placeat sunt quidem voluptatum ipsum aspernatur!</p>
                    <div className="flex items-center justify-between mt-7">
                        <div className="flex items-center gap-4">
                            <div className="flex items-center">
                                <User size={14} className="inline-block mr-2 text-[#252525]" />
                                <span className="text-[13px] font-medium text-[#252525]">25 Students</span>
                            </div>
                            <div className="flex items-center">
                                <Star size={14} className="inline-block mr-2 text-[#252525]" />
                                <span className="text-[13px] font-medium text-[#252525]">4.8 Ratings</span>
                            </div>
                        </div>
                        <span className="text-[20px] font-medium text-[#ff1949]">${price}</span>
                    </div>
                </div>

            </CardContent>
        </Card>
    );
};
