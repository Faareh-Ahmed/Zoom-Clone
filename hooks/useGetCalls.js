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
                            starts_at:{$exists:true},
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

                console.log(calls);


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
    console.log("inside hook: calls: ",calls);

    const now=new Date();

    const endedCalls= calls.filter(({state: {startsAt, endedAt}})=>{
        return (
            // Ensures that the call has started and Ended Before Current Time OR if it has Some Ended Time
            startsAt&& new Date(endedAt)<now || !!endedAt
        )
    })

    const upcomingCalls= calls.filter(({state: {startsAt,endedAt}})=>{
        return (
            // Ensures the calls has Starting Time > Current and Also has No Ended Time
             new Date(startsAt)>now && !endedAt
        )
    })

    return{
        endedCalls,
        upcomingCalls,
        callRecordings:calls,
        isLoading,

    }

}