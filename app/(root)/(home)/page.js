import React from 'react'
import Image from 'next/image'
import MeetingTypeList from '@/components/meetingTypeList';
const Home = () => {

  const now = new Date();
  const time = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  const date = (new Intl.DateTimeFormat('en-US', { dateStyle: 'full' })).format(now);
  return (
    <section className=' flex flex-col gap-10 size-full' >
      <div className=' bg-cover'>
        <Image
          src='/images/hero-background.png'
          className=' w-full h-full'
          width={10000}
          height={10000}
          alt='background image'
        />        
      </div>
      <div className=' flex flex-col gap-2 backdrop-filter'>

        <h1 className=' text-4xl font-bold'>
          {time}
        </h1>
        <p className=' text-lg font-medium'>
          {date}
        </p>

      </div>

      <MeetingTypeList/>
    </section>)
}

export default Home