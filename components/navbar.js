import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import MobileNav from './mobilenav'
import '@/app/globals.css'
const Navbar = () => {
  return (
    <>
        <nav className=' flex z-50 justify-between  items-center  w-full bg-dark-2 px-5 py-5 lg:px-10 '>

            <Link href='/' className=' flex items-center '>

              <Image
                src='/icons/logo.svg'
                alt='Zoom Logo'
                width={32}
                height={32}
                className=' max-sm:size-10 '
              />

              <p className=' text-[24px] font-extrabold max-sm:hidden'>Zoom</p>

              <div className='flex justify-between items-center '>
                {/* Clerk User Mangement */}
                <MobileNav/>
              </div>

            </Link>
        </nav>
    </>
  )
}

export default Navbar