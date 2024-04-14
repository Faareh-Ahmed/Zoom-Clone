'use client'
import { tokenProvider } from '@/actions/stream.actions';
import Loader from '@/components/loader';
import { useUser } from '@clerk/nextjs';
import {
    StreamVideo,
    StreamVideoClient,
  } from '@stream-io/video-react-sdk';
import { useEffect, useState } from 'react';
  
  const apiKey = process.env.NEXT_PUBLIC_STREAM_API_KEY;

  
  export const StreamVideoProvider = ({children}) => {

    const [videoClient, setVideoClient]= useState();
    const {user, isLoaded}=useUser();

    useEffect(()=>{

        if(!user || !isLoaded){
            console.log("No user or No isLoaded");
            return ;
        }
        if(!apiKey)
        {
            throw new Error("Stream API key Missing");
        }

        const client= new StreamVideoClient({
            apiKey,
            user:{
                id:user?.id,
                name:user?.username || user?.id,
                image: user?.imageUrl,
            },
            tokenProvider,
        })

        setVideoClient(client);
    },[user,isLoaded]);

    if(!videoClient)
    {
        return <Loader/>;
    }


    return (
      <StreamVideo client={videoClient}>
        {children}
      </StreamVideo>
    );
  };

  export default StreamVideoProvider