import { Clock, Facebook, Instagram, Linkedin, MapPin, Phone, Twitch, Twitter } from 'lucide-react'
import React from 'react'

const Footer = () => {
    return (
        <footer className='pt-[100px] bg-[#252525]'>
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-30">
                    <div className="space-y-4">
                        <h3 className="text-[20px] text-white font-semibold">About</h3>
                        <p className='text-[14px] text-white mb-6'>Academist is dedicated to constant learning & knowledge sharing.</p>
                        <div className="space-y-3 ">
                            <div className='flex items-center gap-2 text-white hover:text-[#ff1949] transition'>
                                <MapPin size={16} />
                                <li className='list-none'>
                                    <a href="#" className="text-[15px]">457 Mott Street, NY 10013 </a>
                                </li>
                            </div>
                        </div>
                        <div className='flex items-center gap-2 text-white hover:text-[#ff1949] transition'>
                            <Phone size={16} />
                            <li className='list-none'>
                                <a href="#" className="text-[15px]">+994 50 720 05 58</a>
                            </li>
                        </div>

                        <div className='flex items-center gap-2 text-white hover:text-[#ff1949] transition'>
                            <Clock size={16} />
                            <li className='list-none'>
                                <a href="#" className="text-[15px]">Mon - Fri: 9:00 AM - 9:00 PM</a>
                            </li>
                        </div>
                    </div>
                    <div className="space-y-4">
                        <h3 className="text-[20px] text-white font-semibold">Popular courses</h3>
                        <div className='space-y-3 mt-4'>
                            <div>
                                <li className='text-white text-[15px] list-none font-bold hover:text-[#ff1949] transition'><a href="/">Leadership Skills</a></li>
                                <li className='list-none'>
                                    <a href="/" className="text-[#dadada] hover:text-[#ff1949] transition  text-[14px] relative group cursor-pointer ">Mark Hook
                                        <span className="absolute left-0 bottom-0 w-0 h-[1px] bg-[#ff1949] transition-all duration-300 group-hover:w-full"></span>
                                    </a>
                                </li>
                            </div>
                            <div>
                                <li className='text-white text-[15px] list-none font-bold hover:text-[#ff1949] transition'> <a href="/">Typography Design</a></li>
                                <li className='list-none'>
                                    <a href="/" className="text-[#dadada] hover:text-[#ff1949] transition  text-[14px] relative group cursor-pointer ">Una Anston
                                        <span className="absolute left-0 bottom-0 w-0 h-[1px] bg-[#ff1949] transition-all duration-300 group-hover:w-full"></span>
                                    </a>
                                </li>
                            </div>
                            <div>
                                <li className='text-white text-[15px] list-none font-bold hover:text-[#ff1949] transition'><a href="/">Learn German</a></li>
                                <li className='list-none'>
                                    <a href="/" className="text-[#dadada] hover:text-[#ff1949] transition  text-[14px] relative group cursor-pointer ">Scott Brown
                                        <span className="absolute left-0 bottom-0 w-0 h-[1px] bg-[#ff1949] transition-all duration-300 group-hover:w-full"></span>
                                    </a>
                                </li>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-[20px] text-white font-semibold">Services</h3>
                        <ul className="mt-[15px] space-y-1 text-[#1c1c1c] leading-7">
                            <li><a href="#" className="text-white hover:text-[#ff1949] transition  text-[16px] relative group cursor-pointer ">About Us
                                <span className="absolute left-0 bottom-0 w-0 h-[1px] bg-[#ff1949] transition-all duration-300 group-hover:w-full"></span>
                            </a>
                            </li>
                            <li><a href="#" className="text-white hover:text-[#ff1949] transition  text-[16px] relative group cursor-pointer ">Registration
                                <span className="absolute left-0 bottom-0 w-0 h-[1px] bg-[#ff1949] transition-all duration-300 group-hover:w-full"></span>
                            </a>
                            </li>
                            <li><a href="#" className="text-white hover:text-[#ff1949] transition  text-[16px] relative group cursor-pointer ">Available Courses
                                <span className="absolute left-0 bottom-0 w-0 h-[1px] bg-[#ff1949] transition-all duration-300 group-hover:w-full"></span>
                            </a>
                            </li>
                            <li><a href="#" className="text-white hover:text-[#ff1949] transition  text-[16px] relative group cursor-pointer ">Become An Instructor
                                <span className="absolute left-0 bottom-0 w-0 h-[1px] bg-[#ff1949] transition-all duration-300 group-hover:w-full"></span>
                            </a>
                            </li>
                            <li><a href="#" className="text-white hover:text-[#ff1949] transition  text-[16px] relative group cursor-pointer ">Events
                                <span className="absolute left-0 bottom-0 w-0 h-[1px] bg-[#ff1949] transition-all duration-300 group-hover:w-full"></span>
                            </a>
                            </li>
                        </ul>
                    </div>




                    <div className="space-y-4">
                        <h3 className="text-[20px] font-bold text-white">Flexible learning</h3>
                        <div className="flex items-center">
                            <img className='object-cover' src="https://academist.qodeinteractive.com/wp-content/uploads/2018/06/footer-map-img-300x175.png" alt="" />
                        </div>
                    </div>
                </div>
            </div>
            <div className='bg-[#1d1d1d]'>
                <div className="container mx-auto px-4">
                    <div className="flex flex-col sm:flex-row  sm:justify-between pt-5 pb-15 container mx-auto gap-4 sm:gap-0">
                        {/* Sosial ikonlar */}


                        {/* Copyright */}
                        <div className="flex mt-2 sm:mt-0">
                            <a href="#" className="text-[#e1e1e1] hover:text-black text-sm transition">
                                @ 2021 Qode Interactive, All Rights Reserved
                            </a>
                        </div>
                        <div className="flex items-center gap-2">
                            <p className='text-[#b6b6b6] text-[14px] mr-1'>Call +994 50 720 05 58</p>
                            <p className='text-[#b6b6b6] text-[14px]'>Follow us:</p>
                            <Linkedin size={14} color='white' />
                            <Twitter size={14} color='white' fill='white' />
                            <Instagram size={14} color='white' />
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer
