'use client'
import { DeviceSettings, VideoPreview, useCall } from '@stream-io/video-react-sdk'
import React, { useEffect, useState } from 'react'
import { Button } from './ui/button';

const MeetingSetup = ({setIsSetupComplete}) => {

    const [isMicCamToggledOn,setIsMicCamToggledOn]=useState(false);
    const call=useCall();

    if(!call)
    {
        throw new Error("usecall must be used within Stream Client Component")
    }

    useEffect(()=>{

        if(isMicCamToggledOn)
        {
            call?.microphone.disable();
            call?.camera.disable();
        }else{
            call?.microphone.enable();
            call?.camera.enable();
        }

    },[isMicCamToggledOn,call?.camera,call?.microphone]);

  return (
    <>
        <div className=' flex h-screen w-full flex-col items-center justify-center gap-3 text-white'>

            <h1 className=' font-bold text-2xl'> Setup</h1>
            <VideoPreview/>
            <div className='flex h-16 items-center justify-center gap-3'>
                <label className=' flex items-center justify-center gap-2 font-semibold'>
                    <input
                        type='checkbox'
                        checked={isMicCamToggledOn}
                        onChange={(e)=>setIsMicCamToggledOn(e.target.checked)}
                    />
                    Join with Mic and camera Off
                </label>

                <DeviceSettings/>

            </div>

            <Button className=' rounded-sm bg-green-500 px-4 py-2'
            onClick={()=>{
                call.join();
                setIsSetupComplete(true)
            }}>
                Join Meeting
            </Button>

        </div>
    </>
  )
}

export default MeetingSetup