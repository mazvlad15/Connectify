import { useEffect, useState } from "react";
import { IMessage } from "../../interface";
import axios from "axios";
import { socketContext } from "../../context/socketContext";

interface GetAllMessagesReturn{
    messages: IMessage[];
    error: string | null;
    loading: boolean;
    setMessages: (messages: IMessage[]) => void;
}

const useGetAllMessages = (chatId: string):GetAllMessagesReturn => {
    const [messages, setMessages] = useState<IMessage[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const socket = socketContext((state) => state.socket);

    useEffect(() => {
        const getAllMessages = async () => {
            setLoading(true);
            try {

                const response = await axios.get("/api/messages/chat/" + chatId);
                if(response.data.error){
                    throw new Error(response.data.error);
                }

                setMessages(response.data.messages);
            } catch (error) {
                if(axios.isAxiosError(error) && error.response){
                    setError(error.response.data.error);
                }
            }finally{
                setLoading(false);
            }
        }

        const handleNewMessage = (newMessage: IMessage) => {
            setMessages((prevMessages) => [...prevMessages, newMessage]);
        }

        socket?.on("newMessage", handleNewMessage);

        getAllMessages();

        return () => {
            socket?.off("newMessage", handleNewMessage);
        }

    }, [setMessages, socket])

    return {messages, error, loading, setMessages};

}

export default useGetAllMessages;