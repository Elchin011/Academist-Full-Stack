"use client"
import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectFade, Pagination, Navigation } from 'swiper/modules';
import { ChevronLeft, ChevronRight } from "lucide-react";
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import './styles.css';
import { Button } from '@/components/ui/button';

const HeroBannerSlider = () => {
    return (
        <div className=''>
            <div className="relative h-[675px] w-full overflow-hidden hidden lg:block">
                <Swiper
                    navigation={{
                        nextEl: ".custom-next",
                        prevEl: ".custom-prev",
                    }}
                    loop={true}
                    modules={[Navigation]}
                    className="mySwiper"
                >
                    <SwiperSlide>
                        <div className='w-full'>
                            <div className='relative flex items-center justify-center text-center'>
                                <img src="https://academist.qodeinteractive.com/wp-content/uploads/2018/07/courses-2.jpg" alt="" />
                                <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-white '>
                                    <h1 className="text-[90px] font-bold">Learn & discover</h1>
                                    <p className='mb-3 text-start tracking-[1px]'>Ready to learn and have fun? Find a <br /> perfect course and join us today.</p>
                                    <div className='flex gap-5 mt-5'>
                                        <button className='bg-transparent text-white hover:bg-red-600 transition-all duration-300 mt-4 py-5 px-12 rounded-none border border-white hover:border-red-600'>
                                            <a className='text-[16px] font-semibold' href="#">Read More</a>
                                        </button>
                                        <button className='bg-red-600 text-white hover:bg-red-600 transition-all duration-300 mt-4 py-5 px-12 rounded-none border border-red-600'>
                                            <a className='text-[16px] font-semibold' href="#">Apply Now</a>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                   <SwiperSlide>
                        <div className='w-full'>
                            <div className='relative flex items-center justify-center text-center'>
                                <img src="https://academist.qodeinteractive.com/wp-content/uploads/2018/07/courses-12.jpg" alt="" />
                                <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-white '>
                                    <h1 className="text-[90px] font-bold">New knowledge</h1>
                                    <p className='mb-3 text-start tracking-[1px]'>Ready to learn and have fun? Find a <br /> perfect course and join us today.</p>
                                    <div className='flex gap-5 mt-5'>
                                        <button className='bg-transparent text-white hover:bg-red-600 transition-all duration-300 mt-4 py-5 px-12 rounded-none border border-white hover:border-red-600'>
                                            <a className='text-[16px] font-semibold' href="#">Read More</a>
                                        </button>
                                        <button className='bg-red-600 text-white hover:bg-red-600 transition-all duration-300 mt-4 py-5 px-12 rounded-none border border-red-600'>
                                            <a className='text-[16px] font-semibold' href="#">Apply Now</a>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide><SwiperSlide>
                        <div className='w-full'>
                            <div className='relative flex items-center justify-center text-center'>
                                <img src="https://academist.qodeinteractive.com/wp-content/uploads/2018/07/courses-4.jpg" alt="" />
                                <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-white '>
                                    <h1 className="text-[90px] font-bold">Improve skills</h1>
                                    <p className='mb-3 text-start tracking-[1px]'>Ready to learn and have fun? Find a <br /> perfect course and join us today.</p>
                                    <div className='flex gap-5 mt-5'>
                                        <button className='bg-transparent text-white hover:bg-red-600 transition-all duration-300 mt-4 py-5 px-12 rounded-none border border-white hover:border-red-600'>
                                            <a className='text-[16px] font-semibold' href="#">Read More</a>
                                        </button>
                                        <button className='bg-red-600 text-white hover:bg-red-600 transition-all duration-300 mt-4 py-5 px-12 rounded-none border border-red-600'>
                                            <a className='text-[16px] font-semibold' href="#">Apply Now</a>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                </Swiper>

                {/* Custom arrows */}
                <div className="custom-prev absolute top-1/2 left-2 z-10 cursor-pointer">
                    <ChevronLeft className='text-white' size={120} strokeWidth={0.3} />
                </div>
                <div className="custom-next absolute top-1/2 right-18 z-10 cursor-pointer">
                    <ChevronRight className='text-white' size={120} strokeWidth={0.3} />
                </div>
            </div>
            <div className='lg:hidden'>
                <div className='relative'>
                    <img className='object-cover' src="https://neoocular.qodeinteractive.com/wp-content/uploads/2021/10/main-rev-img1.jpg" alt="" />
                    <div className='absolute top-70 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center bg-white p-14'>
                        <div className='w-[224px] h-[392px]'>
                            <img className='w-full h-full  object-cover' src="https://neoocular.qodeinteractive.com/wp-content/uploads/2021/08/main-home-rev-img-19.png" alt="" />
                        </div>
                        <div className='mt-8'>
                            <li>
                                <a href="#" className="text-[#565656] hover:text-black transition mb-3.5 text-[13px] relative group cursor-pointer ">BOOK NEW
                                    <span className="absolute left-0 bottom-0 w-0 h-[1px] bg-black transition-all duration-300 group-hover:w-full"></span></a>
                            </li>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HeroBannerSlider
