'use client'
import { Button } from '@/components/ui/button'
import { useToast } from '@/components/ui/use-toast'
import { useGetCallsById } from '@/hooks/useGetCallById'
import { useUser } from '@clerk/nextjs'
import { useStreamVideoClient } from '@stream-io/video-react-sdk'
import { useRouter } from 'next/navigation'
import React from 'react'



const Table=({title, description})=>(
  <div className=' flex flex-col items-start gap-2 xl:flex-row'>
    <h1 className=' text-base font-medium lg:text-lg xl:min-w-32'> {title}</h1>
    <h1 className=' truncate text-sm font-bold lg:text-xl max-sm:max-w-[320px]'> {description} </h1>
  </div>
)

const PersonalRoom = () => {

  const {user} = useUser();
  const meetingID=user?.id;
  
  const {toast} = useToast();
  const client=useStreamVideoClient();
  console.log("ClInet", client);
  const {call} = useGetCallsById(meetingID);
  const router=useRouter();
  

  const meetingLink=`${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${meetingID}?personal=true`

  const startRoom = async()=>{

    if(!user || !client)
    {
      return;
    }
    if(!call)
    {
      const newCall = client.call('default',meetingID);
      await newCall.getOrCreate({
        data:{
            starts_at:new Date().toISOString()
          }
        })

    }

      router.push(`/meeting/${meetingID}?personal=true`);
      

  }


  return (
    <>
        <section className=' flex flex-col gap-10'>
            <h1 className=' text-3xl font-bold'>
                Personal Room
            </h1>

            <div className=' flex w-full flex-col gap-8 xl:max-w-[900px]'>

              <Table title="Topic" description={`${user?.username} Meeting Room`}/>
              <Table title="Meeting ID" description={meetingID}/>
              <Table title="Invite Link" description={meetingLink}/>

            </div>

            <div className='flex gap-5' >
              <Button className=' bg-blue-500' onClick={startRoom}>
                Start Meeting
              </Button>
              <Button  className=' bg-dark-2' onClick={()=>{
                  navigator.clipboard.writeText(meetingLink);
                  toast({
                      title: "Link Copied",
                  });
              }}>
                Copy Invitation
              </Button>

            </div>
        </section>
    </>
  )
}

export default PersonalRoom