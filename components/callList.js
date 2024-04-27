'use client'
import { useGetCalls } from '@/hooks/useGetCalls'
import { useRouter } from 'next/router';
import React, { useState } from 'react'

const CallList = ({type}) => {

    const {endedCalls,upcomingCalls,callRecordings,isLoading} = useGetCalls();

    const [recordinga, setRecordings]=useState([]);

    // const router=useRouter();

    const getCalls=()=>{
        switch (key) {
            case 'ended':
                return endedCalls;
                break;
            case 'recordinga':
                return callRecordings;
                break;
            case 'upcoming':
                return upcomingCalls;
                break;
            default:
                return [];
        }
    }


    const getNoCallsMessage=()=>{
        switch (key) {
            case 'ended':
                return "No ended Calls";
                break;
            case 'recordinga':
                return "No recorded Meetings";
                break;
            case 'upcoming':
                return "No upcoming meetings";
                break;
            default:
                return " ";
        }
    }

  return (
    <div>callList</div>
  )
}

export default CallList