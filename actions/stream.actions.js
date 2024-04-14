'use server'

import { currentUser } from "@clerk/nextjs";
import { StreamClient } from "@stream-io/node-sdk";

const apiKey = process.env.NEXT_PUBLIC_STREAM_API_KEY;
const apiSecret=process.env.STREAM_SECRET_KEY;

export const tokenProvider=async()=>{
    const user=await currentUser();

    if(!user){
        throw new Error("User Not Logged In");
    }
    if(!apiKey)
    {
        throw new Error("Api Key Missing");
    }
    if(!apiSecret)
    {
        throw new Error("Secret Key Missing");
    }


    const client= new StreamClient(apiKey,apiSecret);

    const exp = Math.round(new Date().getTime() / 1000) + 60 * 60;
    const issued= Math.floor(Date.now()/1000)-60;

    const token=client.createToken(user.id,exp,issued)

    return token;
}