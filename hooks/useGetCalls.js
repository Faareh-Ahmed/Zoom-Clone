import { useUser } from "@clerk/nextjs";
import { useStreamVideoClient } from "@stream-io/video-react-sdk";
import { useEffect } from "react";

export const useGetCalls=()=>{
    const [calls, setcalls] = useState([]);
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
                
            } catch (error) {
                console.log(error);
            } finally{
                setisLoading(false);
            }
        }

        loadCalls();

    },[client, user?.id])
}