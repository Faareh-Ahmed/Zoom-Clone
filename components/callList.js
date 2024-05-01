'use client'
import { useGetCalls } from '@/hooks/useGetCalls'
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import MeetingCard from './meetingCard';
import Loader from './loader';
import { toast } from './ui/use-toast';

const CallList = ({ type }) => {

    const { endedCalls, upcomingCalls, callRecordings, isLoading } = useGetCalls();

    console.log("Call Recording from hook comin:", callRecordings);
    console.log("Upcoming Calls from hook comin:", upcomingCalls);
    console.log("Ended Calls from hook comin:", endedCalls);

    const [recordings, setRecordings] = useState([]);

    const router = useRouter();

    const getCalls = () => {
        switch (type) {
            case 'ended':
                return endedCalls;
            case 'recordings':
                return callRecordings;
            case 'upcoming':
                return upcomingCalls;
            default:
                return [];
        }
    }


    const getNoCallsMessage = () => {
        switch (type) {
            case 'ended':
                return "No ended Calls";
            case 'recordings':
                return "No recorded Meetings";
            case 'upcoming':
                return "No upcoming meetings";
            default:
                return " ";
        }
    }

    const calls = getCalls();
    const noCallMessage = getNoCallsMessage();
    console.log("Calls: ", calls);




    useEffect(() => {

        const fetchRecordings = async () => {

            if (!Array.isArray(callRecordings)) {
                console.error("callRecordings is not an array");
                return;
            }
            try {

                const callData = await Promise.all(callRecordings?.map((meeting) => meeting.queryRecordings()) ?? []);
                console.log("Call Data: ", callData);

                const recordings = callData.filter((call) => call.recordings.length > 0)
                    .flatMap((call) => call.recordings);

                console.log("Recordings", recordings);
                setRecordings(recordings);

            } catch (error) {
                toast({ title: 'Try Again Later' })
            }
        }


        if (type === 'recordings') {
            console.log("Recording Clicked and fetching");
            fetchRecordings();
        }


    }, [type, callRecordings])

    if (isLoading) {
        return (
            <Loader />
        )
    }

    console.log("Recordings", recordings);

    return (
        <div className=' grid grid-cols-1 gap-4 xl:grid-cols-2'>


    {/* // For Recorded Calls */}
{type === 'recordings' && recordings.length > 0 ? (
                recordings.map((meeting) => (
                    <MeetingCard
                        key={meeting?.id}
                        icon={type === 'ended' ? '/icons/previous.svg' : type === 'upcoming' ? 'icons/upcoming.svg' : 'icons/recordings.svg'}
                        title={meeting?.state?.custom?.description?.substring(0, 30) || meeting?.filename?.substring(0, 30) || "Personal Meeting"}
                        date={meeting?.state?.startsAt?.toLocaleString() || meeting?.start_time?.toLocaleString()}
                        isPreviousMeeting={type === 'ended'}
                        buttonIcon1={type === 'recordings' ? '/icons/play.svg' : undefined}
                        buttonText={type === 'recordings' ? 'Play' : 'Start'}
                        handleClick={type === 'recordings' ? () => router.push(`${meeting?.url}`) : () => router.push(`/meeting/${meeting?.id}`)}
                        link={type === 'recordings' ? meeting?.url : `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${meeting?.id}`}
                    />
                ))

                // For Ended Calls

            ) : type === 'ended' && endedCalls.length > 0 ? (
                endedCalls.map((meeting) => (
                    <MeetingCard
                        key={meeting?.id}
                        icon={type === 'ended' ? '/icons/previous.svg' : type === 'upcoming' ? 'icons/upcoming.svg' : 'icons/recordings.svg'}
                        title={meeting?.state?.custom?.description?.substring(0, 30) || meeting?.filename?.substring(0, 30) || "Personal Meeting"}
                        date={meeting?.state?.startsAt?.toLocaleString() || meeting?.start_time?.toLocaleString()}
                        isPreviousMeeting={type === 'ended'}
                        buttonIcon1={type === 'recordings' ? '/icons/play.svg' : undefined}
                        buttonText={type === 'recordings' ? 'Play' : 'Start'}
                        handleClick={type === 'recordings' ? () => router.push(`${meeting?.url}`) : () => router.push(`/meeting/${meeting?.id}`)}
                        link={type === 'recordings' ? meeting?.url : `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${meeting?.id}`}
                    />
                ))

                // For Upcoming Calls

            ) : type === 'upcoming' && upcomingCalls.length > 0 ? (
                upcomingCalls.map((meeting) => (
                    <MeetingCard
                        key={meeting?.id}
                        icon={type === 'ended' ? '/icons/previous.svg' : type === 'upcoming' ? 'icons/upcoming.svg' : 'icons/recordings.svg'}
                        title={meeting?.state?.custom?.description?.substring(0, 30) || meeting?.filename?.substring(0, 30) || "Personal Meeting"}
                        date={meeting?.state?.startsAt?.toLocaleString() || meeting?.start_time?.toLocaleString()}
                        isPreviousMeeting={type === 'ended'}
                        buttonIcon1={type === 'recordings' ? '/icons/play.svg' : undefined}
                        buttonText={type === 'recordings' ? 'Play' : 'Start'}
                        handleClick={type === 'recordings' ? () => router.push(`${meeting?.url}`) : () => router.push(`/meeting/${meeting?.id}`)}
                        link={type === 'recordings' ? meeting?.url : `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${meeting?.id}`}
                    />
                ))
            ) : (
                <h1 className="text-2xl font-bold text-white">{noCallMessage}</h1>
            )}

            







        </div>
    )
}

export default CallList