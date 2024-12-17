import axios from "axios";
import { useState } from "react";
import useGetAllMessages from "./useGetAllMessages";
import { IMessage } from "../../interface";

interface SendMessageReturn{
    sendMessage: (message: string, participantId: string) => Promise<void>;
    error: string | null;
    loading: boolean;
    setError: (error: string | null) => void; 
}

const useSendMessage = (chatId: string):SendMessageReturn => {
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);


    const sendMessage = async (message: string, participantId: string) => {
        setLoading(true);
        try {

            const response = await axios.post("/api/messages/send/"+participantId, {message});
            if(response.data.error){
                throw new Error(response.data.error);
            }

        } catch (error) {
            if(axios.isAxiosError(error) && error.response){
                setError(error.response.data.error);
            }
        }finally{
            setLoading(false);
        }
    }

    return {error, loading, sendMessage, setError};
}


export default useSendMessage;
