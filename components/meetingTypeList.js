'use client'
import React, { useState } from 'react';
import HomeCard from './homeCard';
import { useRouter } from 'next/navigation';
const MeetingTypeList = () => {

    const [meetingState, setMeetingState]=useState("");
    const router=useRouter();

    return (
        <section className='grid grid-cols-1 md:grid-cols-2 xl:grid-col-4 gap-4'>
            
            <HomeCard
                img='/icons/add-meeting.svg'
                title='New Meeting'
                handleClick={()=>setMeetingState('isInstantMeeting')}
                className=' bg-cyan-600'
            />
            <HomeCard
                img='/icons/schedule.svg'
                title='Schdule Meeting'
                handleClick={()=>setMeetingState('isScheduleMeeting')}
                className=' bg-purple-800'
             />
            <HomeCard
                img='/icons/recordings.svg'
                title='View Recordings'
                handleClick={()=>router.push('/recordings')}
                className=' bg-yellow-600'
            />
            <HomeCard
                img='/icons/join-meeting.svg'
                title='Join Meeting'
                handleClick={()=>setMeetingState('isJoiningMeeting')}
                className=' bg-sky-600'
            />
        </section>
    );
};

export default MeetingTypeList;
