'use client'
import React, { useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { sidebarContent } from '@/constants';
import { cn } from '@/lib/utils';
import { Sheet, SheetClose, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { usePathname } from 'next/navigation';

const MobileNav = () => {

    const pathname = usePathname();

    return (
        <>
            <section className='w-full max-w-[264px]'>
                <Sheet>
                    <SheetTrigger  >
                        <Image
                            src='/icons/hamburger.svg'
                            width={36}
                            height={36}
                            alt='hamburger Icon'
                            className='cursor-pointer sm:hidden'
                        />
                    </SheetTrigger>
                    <SheetContent side='left' className='border-none bg-dark-1'>
                        <Link href='/' className='flex items-center gap-4'>
                            <Image
                                src='/icons/logo.svg'
                                width={32}
                                height={32}
                            />
                            <p className='text-[24px] font-extrabold text-white'>Zoom</p>
                        </Link>
                        <div className='flex h-[calc(100vh-720px)] justify-between flex-col'>
                            <SheetClose asChild>
                                <section className='flex flex-col h-full gap-16 pt-8 text-white'>
                                    {sidebarContent.map((link) => {
                                        const isActive = pathname === link.route;
                                        return (
                                            <SheetClose asChild key={link.route}>
                                                <Link
                                                    href={link.route}
                                                    key={link.label}
                                                    className={cn('flex gap-1 items-center rounded-lg w-full', {
                                                        'bg-dark-2': isActive,
                                                    })}
                                                >
                                                    <Image
                                                        src={link.imgUrl}
                                                        alt={link.label}
                                                        width={24}
                                                        height={24}
                                                    />
                                                    <p className='font-semibold text-white'>{link.label}</p>
                                                </Link>
                                            </SheetClose>
                                        );
                                    })}
                                </section>
                            </SheetClose>
                        </div>
                    </SheetContent>
                </Sheet>
            </section>
        </>
    );
}

export default MobileNav;
