import { Instagram, Linkedin, Twitter } from 'lucide-react'
import React from 'react'

const StaffCard = ({ imageUrl, name, specialties }: { imageUrl: string, name: string, specialties: { name: string } }) => {

    return (
        <div className='flex items-center gap-8.5'>
            <div className='w-[140px] h-[140px]'>
                <img className='w-full h-full object-contain' src={imageUrl} alt="" />
            </div>
            <div className='text-start'>
                <h3 className='text-[20px] text-[#252525] font-extrabold'>{name}</h3>
                <p className='text-[15px] text-[#252525] mt-1'>{specialties?.name}</p>
                <div className='flex items-center gap-2 mt-3'>
                    <Linkedin size={13} color='black' fill='black' />
                    <Twitter size={13} color='black' fill='black' />
                    <Instagram size={13} color='black' />
                </div>
            </div>
        </div>
    )
}

export default StaffCard
