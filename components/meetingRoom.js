import { cn } from '@/lib/utils';
import { CallControls, CallParticipantsList, CallStatsButton, PaginatedGridLayout, SpeakerLayout } from '@stream-io/video-react-sdk';
import React, { useState } from 'react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Layout, LayoutList, User, UserIcon, Users } from 'lucide-react';
import { Item } from '@radix-ui/react-dropdown-menu';
import { useSearchParams } from 'next/navigation';
import EndCallButton from './endCallButton';


const MeetingRoom = () => {

  const searchParams=useSearchParams();
  const isPersonalRoom=!!searchParams.get('personal');

  const CallLayoutType=["grid","speaker-left","speaker-right"];
  const [layout, setLayout]=useState("speaker-left");

  const [showParticipants, setShowParticipants]=useState(false);

  const CallLayout=()=>{
    switch (layout) {
      case 'grid':
        return <PaginatedGridLayout/>
      case 'speaker-left':
        return <SpeakerLayout participantsBarPosition='left'/>
      case 'speaker-right':
        return <SpeakerLayout participantsBarPosition='right'/>
      default:
        return <SpeakerLayout participantsBarPosition='right'/>
    }
  }
  return (
    <>
      <section className='relative h-screen w-full overflow-hidden pt-4 text-white'>
        <div className=' relative flex size-full items-center justify-center'>
          <div className=' flex size-full items-center max-w-[1000px]'>
          <CallLayout/>
          </div>
          <div className={cn('h-[calc(100vh-86px)] hidden ml-2',{'show-block': showParticipants})}> 
            <CallParticipantsList onClose={()=>
            {
              setShowParticipants(false);
            }}/>

          </div>
        </div>

        <div className=' fixed bottom-0 flex w-full items-center justify-center gap-5 flex-wrap'>
          <CallControls/>

          <DropdownMenu>

            <div className=' flex items-center'>
            <DropdownMenuTrigger className=' cursor-pointer rounded-2xl px-4 py-2 hover:bg-slate-800'>
              <LayoutList size={20} className=' text-white'/>
            </DropdownMenuTrigger>
            </div>

            <DropdownMenuContent className=' border-dark-1 text-white bg-black'>
              
              {['Grid','Speaker-left','Speaker-right'].map((item,index)=>(
                <div key={index}>

                  <DropdownMenuItem className='cursor-pointer' onClick={()=>{
                    setLayout(item.toLowerCase())
                  }}>
                    {item}
                  </DropdownMenuItem>

                </div>
              ))
              
              }
            </DropdownMenuContent>
          </DropdownMenu>

          <CallStatsButton/>

          <button onClick={()=>{  setShowParticipants((prev)=>!prev)}}>
            <div className=' curson-pointer rounded-2xl px-4 py-2 hover:slate-800'>
              <Users size={20} className=' text-white'/>
            </div>
          </button>
          

          {!isPersonalRoom && <EndCallButton/>}

        </div>


      </section>
    </>
  )
}

export default MeetingRoom