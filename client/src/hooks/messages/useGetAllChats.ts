import axios from "axios";
import { useEffect, useState } from "react";
import { IChat} from "../../interface";


interface GetAllChatsReturn{
    chats: IChat[];
    loading: boolean;
    error: string | null;
}


const useGetAllChats = ():GetAllChatsReturn => {

    const [chats, setChats] = useState<IChat[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {

        const getAllChats = async () => {
            setLoading(true);
            try {

                const response = await axios.get("/api/messages/conversations/all");
                if(response.data.error){
                    throw new Error(response.data.error);
                }

                setChats(response.data);
            } catch (error) {
                if(axios.isAxiosError(error) && error.response){
                    setError(error.response.data.error);
                }

            }finally{
                setLoading(false);
            }
        }

        getAllChats();
    }, []);

    return {error, loading, chats}
};

export default useGetAllChats;