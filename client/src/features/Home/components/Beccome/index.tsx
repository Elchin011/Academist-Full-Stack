import { Leaf, LeafyGreen, Sun } from 'lucide-react'
import React from 'react'

const Become = () => {
    return (
        <div className=''>
            <div>
                <div className='grid grid-cols-1 md:grid-cols-2 items-center mt-24'>
                    <div className='bg-[#ff1949] h-full flex items-center justify-center'>
                        <h1 className='text-white text-4xl md:text-5xl font-bold p-28 text-start leading-[1.2]'>
                            Become a sales expert with us.
                        </h1>
                    </div>
                    <div>
                        <img className='w-full h-[447px] overflow-hidden ' src="https://academist.qodeinteractive.com/wp-content/uploads/2018/06/main-home-img-2.jpg" alt="" />
                    </div>
                </div>
                <div className='grid grid-cols-1 md:grid-cols-2 items-center'>
                    <div>
                        <img className='w-full h-[447px] overflow-hidden ' src="https://academist.qodeinteractive.com/wp-content/uploads/2018/07/courses-8.jpg" alt="" />
                    </div>
                    <div className='relative'>
                        <img className='w-full h-[447px] overflow-hidden ' src="https://academist.qodeinteractive.com/wp-content/uploads/2018/07/pattern.jpg" alt="" />
                        <h1 className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-black text-4xl md:text-5xl font-bold text-start leading-[1.2]'>
                            Learn to code like a professional.
                        </h1>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Become
