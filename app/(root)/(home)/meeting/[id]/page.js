'use client'
import Loader from '@/components/loader';
import MeetingRoom from '@/components/meetingRoom';
import MeetingSetup from '@/components/meetingSetup';
import { useGetCallsById } from '@/hooks/useGetCallById';
import { useUser } from '@clerk/nextjs'
import { StreamCall, StreamTheme } from '@stream-io/video-react-sdk';
import React, { useState } from 'react'

const Meeting = ({ params:id }) => {



  const {user, isLoaded}=useUser();
  const [isSetupComplete,setIsSetupComplete]=useState(false);

  const {call,isCallLoading}=useGetCallsById(id)

  if(!isLoaded || isCallLoading)
  {
    return <Loader/>
  }

  return (
    <>
      <main className='w-full h-screen'>
          <StreamCall call={call}>
            <StreamTheme>
              {!isSetupComplete?(
                <MeetingSetup setIsSetupComplete={setIsSetupComplete}/>
              ):(
                <MeetingRoom/>
              )}
            </StreamTheme>
          </StreamCall>
      </main>
    </>
  )
}

export default Meeting