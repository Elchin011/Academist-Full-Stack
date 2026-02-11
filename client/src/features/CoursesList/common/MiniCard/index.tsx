"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import cloudinaryLoader from "@/features/common/BaseImageLoad";
import { Check, DollarSign, Star, User } from "lucide-react";
import Image from "next/image";
import { loadStripe } from "@stripe/stripe-js";
const stripePromise = loadStripe(
    process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string
);

export const MiniCard = ({
    img,
    name,
    price,
    id
}: {
    img: string;
    name: string;
    price: number;
    id: any;
}) => {


    return (
        <Card>
            <CardContent 
            className="flex items-center gap-1 pb-6 bg-[#f9f9f9]"
            onClick={() => {
                window.location.href = `/courses-list`;
            }}
            >
                <div className="w-[85px] h-[60px] overflow-hidden relative">
                    <Image
                        loader={cloudinaryLoader}
                        src={img ?? ""}
                        alt="Placeholder"
                        className="w-full h-full absolute inset-0 object-contain"
                        fill
                    />
                </div>
                <div className='flex flex-col gap-1'>
                    <div>
                        <h4 className='text-[15px] font-normal text-[#444444]'>
                            {name}
                        </h4>
                        <p className="text-[15px] font-normal text-[#ff1949]">${price}</p>
                    </div>
                </div>

            </CardContent>
        </Card>
    );
};
