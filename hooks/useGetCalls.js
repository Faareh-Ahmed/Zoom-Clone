import { useUser } from "@clerk/nextjs";
import { useStreamVideoClient } from "@stream-io/video-react-sdk";
import { useState,useEffect } from "react";

export const useGetCalls=()=>{
    const [calls, setCalls] = useState([]);
    const [isLoading, setisLoading] = useState(false);
    const client = useStreamVideoClient();
    const {user}=useUser();


    useEffect(()=>{

        const loadCalls=async()=>{

            if(!client || !user?.id)
            {
                return;
            }

            setisLoading(true);

            try {
                const {calls}=await client.queryCalls(
                    {
                        sort:[{field: 'starts_at', direction:-1}],
                        filter_conditions:{
                            start_at:{$exists:true},
                            $or:[
                                {
                                    created_by_user_id:user.id
                                },
                                {
                                    members:{$in:[user.id]}
                                }
                            ]
                        }
                    }
                )

                setCalls(calls);

            } catch (error) {
                console.log(error);
            } finally{
                setisLoading(false);
            }
        }

        loadCalls();

    },[client, user?.id]);

    // Logic to filter between the upcoming and endingcalls

    const now=new Date();

    const endedCalls= calls.filter(({state: {startsAt, endedAt}})=>{
        return (
            startsAt&& new Date(startsAt)<now || !!endedAt
        )
    })

    const upcomingCalls= calls.filter(({state: {startsAt}})=>{
        return (
            startsAt&& new Date(startsAt)<now 
        )
    })

    return{
        endedCalls,
        upcomingCalls,
        callRecordings:calls,
        isLoading,
    }

}