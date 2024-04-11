'use client'
import React from 'react'
import Image from 'next/image'
import { cn } from '@/lib/utils'
const HomeCard = ({className, img, title, handleClick}) => {
    return (
        <div className={cn('px-4 py-6 flex flex-col justify-between w-full rounded-[12px] min-h-[260px] min-w-[260px]',className)}
            onClick={handleClick}>
            <div className='flex items-center gap-2'>
                <Image
                    src={img}
                    width={25}
                    height={25}
                    alt='meeting'
                />
                <h1 className='font-bold text-xl'>{title}</h1>
            </div>
        </div>
)
}

export default HomeCard