'use client'
import React, { useState } from 'react';
import HomeCard from './homeCard';
import { useRouter } from 'next/navigation';
import MeetingModal from './meetingModal';
import { useUser } from '@clerk/nextjs';
import { useStreamVideoClient } from '@stream-io/video-react-sdk';
import { useToast } from "@/components/ui/use-toast"
import { Textarea } from "@/components/ui/textarea"
import ReactDatePicker from 'react-datepicker'
import { Input } from './ui/input';

const MeetingTypeList = () => {

    const [meetingState, setMeetingState] = useState(" ");
    const router = useRouter();

    const { user } = useUser();
    const client = useStreamVideoClient();

    const [values, setValues] = useState(
        {
            dateTime: new Date(),
            description: "",
            link: ""
        }
    )

    const { toast } = useToast()
    const [callDetails, setCallDetails] = useState();

    const meetingLink = `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${callDetails?.id}`

    const createMeeting = async () => {

        console.log("Trying to create Meeting")
        if (!user || !client) {
            console.log("No user or No client")
            return;
        }

        try {

            // function that generates random id of call
            const id = crypto.randomUUID();
            const call = client.call('default', id);

            console.log("Call Object:", call);

            if (!call) {
                throw new Error("Failed to Create Call");
            }

            console.log("Call ID:", call.id);

            // If the call is created then get the Starting time of the meeting
            const startsAt = values.dateTime.toISOString() || new Date(Date.now()).toISOString();
            const description = values.description || "Instant meeting";

            await call.getOrCreate({
                data: {
                    starts_at: startsAt,
                    custom: {
                        description
                    }
                }
            })

            setCallDetails(call);

            if (!values.description) {
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
                handleClick={() => setMeetingState('isInstantMeeting')}
                className=' bg-cyan-600'
            />
            <HomeCard
                img='/icons/schedule.svg'
                title='Schdule Meeting'
                handleClick={() => setMeetingState('isScheduleMeeting')}
                className=' bg-purple-800'
            />
            <HomeCard
                img='/icons/recordings.svg'
                title='View Recordings'
                handleClick={() => router.push('/recordings')}
                className=' bg-yellow-600'
            />
            <HomeCard
                img='/icons/join-meeting.svg'
                title='Join Meeting'
                handleClick={() => setMeetingState('isJoiningMeeting')}
                className=' bg-sky-600'
            />

            {!callDetails ? (
                <MeetingModal
                    isOpen={meetingState === 'isScheduleMeeting'}
                    onClose={() => setMeetingState(" ")}
                    title="Create Meeting"
                    handleClick={createMeeting}
                >
                    <div className='flex flex-col gap-2.5'>
                        <label className=' text-base leading-[22px] text-sky-50 '>
                            Add a Description
                        </label>
                        <Textarea className='border-none bg-dark-1 focus-visible:ring-0 focus-visible:ring-offset-0'
                            onChange={(e) => {
                                setValues({ ...values, description: e.target.value })
                            }}
                        />
                    </div>
                    <div className=' flex w-full flex-col gap-2'>
                        <label className=' text-base leading-[22px] text-sky-50 '>
                            Select Date and Time
                        </label>
                        <ReactDatePicker
                            selected={values.dateTime}
                            onChange={(date) => setValues({ ...values, dateTime: date })}
                            showTimeSelect
                            timeFormat='HH:mm'
                            timeIntervals={15}
                            timeCaption='time'
                            dateFormat='MMMM d, yyyy h:mm aa'

                            className='w-full rounded bg-black p-2'
                        />

                    </div>
                </MeetingModal>

            ) : (
                <MeetingModal
                    isOpen={meetingState === 'isScheduleMeeting'}
                    onClose={() => setMeetingState(" ")}
                    title="Meeting Created"
                    className='text-center'
                    handleClick={() => {
                        navigator.clipboard.writeText(meetingLink);
                        toast({ title: 'Link Copied' });
                    }}
                    image="/icons/checked.svg"
                    buttonIcon="/icons/copy.svg"
                    buttonText="Copy Meeting Link"
                />
            )

            }

            <MeetingModal
                isOpen={meetingState === 'isInstantMeeting'}
                onClose={() => setMeetingState(" ")}
                title="Start an Instant Meeting"
                className='text-center'
                buttonText="Start Meeting"
                handleClick={createMeeting}
            />

            <MeetingModal
                isOpen={meetingState === 'isJoiningMeeting'}
                onClose={() => setMeetingState(" ")}
                title="Enter Meeting Link"
                className='text-center'
                buttonText="Join Meeting"
                handleClick={()=>router.push(values.link)}
            >
                <Input
                    placeholder="Meeting Link"
                    className=' border-none bg-dark-1 focus-visible:ring-0 focus-visible:ring-offset-0'
                    onChange={(e)=>setValues({...values,link:e.target.value})}
                />
            </MeetingModal>

        </section>
    );
};

export default MeetingTypeList;
