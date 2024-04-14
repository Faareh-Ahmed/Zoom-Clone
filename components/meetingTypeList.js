'use client'
import React, { useState } from 'react';
import HomeCard from './homeCard';
import { useRouter } from 'next/navigation';
import MeetingModal from './meetingModal';
import { useUser } from '@clerk/nextjs';
import { useStreamVideoClient } from '@stream-io/video-react-sdk';
import { useToast } from "@/components/ui/use-toast"

const MeetingTypeList = () => {

    const [meetingState, setMeetingState]=useState(" ");
    const router=useRouter();
    
    const {user}=useUser();
    const client =  useStreamVideoClient();

    const [values,setValues]=useState(
        {
            dateTime:new Date(),
            description:"",
            link:""
        }
    )

    const { toast } = useToast()
    const [callDetails,setCallDetails]=useState();

    const createMeeting=async()=>{

        console.log("Trying to create Meeting")
        if(!user || !client)
        {
            console.log("No user or No client")
            return;
        }

        try {

            // function that generates random id of call
            const id= crypto.randomUUID(); 
            const call = client.call('default',id);

            console.log("Call Object:", call);

            if(!call)
            {
                throw new Error("Failed to Create Call");
            }

            console.log("Call ID:", call.id);

            // If the call is created then get the Starting time of the meeting
            const startsAt= values.dateTime.toISOString() || new Date(Date.now()).toISOString();
            const description= values.description || "Instant meeting";

            await call.getOrCreate({
                data:{
                    starts_at:startsAt,
                    custom:{
                        description
                    }
                }
            })

            setCallDetails(call);

            if(!values.description)
            {
                router.push(`/meeting/${call.id}`);
            }
            

            toast({
                title: "Meeting Created",
              })

        } catch (error) {
            console.log(error)
            toast({
                title: "Failed to Create Meeting",
              })
        }
    }

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

            <MeetingModal
                isOpen={meetingState==='isInstantMeeting'}
                onClose={()=>setMeetingState(" ")}
                title="Start an Instant Meeting"
                className= 'text-center'
                buttonText="Start Meeting"
                handleClick={createMeeting}
            />
        </section>
    );
};

export default MeetingTypeList;
