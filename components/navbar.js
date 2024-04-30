import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import MobileNav from './mobilenav';
import '@/app/globals.css';
import { SignedIn } from '@clerk/nextjs';
import { UserButton } from '@clerk/nextjs';

const Navbar = () => {
  return (
    <>
      <nav className='flex justify-between items-center fixed z-50 w-full bg-dark-2 px-6 py-5 lg:px-10'>
        <Link href='/' className='flex items-center gap-1'>
          <Image
            src='/icons/logo.svg'
            alt='Zoom Logo'
            width={32}
            height={32}
            className='max-sm:size-10'
          />
          <p className='text-[24px] font-extrabold max-sm:hidden'>Zoom</p>
          <MobileNav />
        </Link>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </nav>
    </>
  );
};

export default Navbar;
