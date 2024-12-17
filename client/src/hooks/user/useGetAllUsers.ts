import { useEffect, useState } from "react";
import { IUser } from "../../interface";
import axios from "axios";


interface GetAllUsersReturn {
    users: IUser[];
    error: string | null;
    loading: boolean;
}


const useGetAllUsers = ():GetAllUsersReturn => {
    const [users, setUsers] = useState<IUser[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        const getAllUsers = async () => {
            setLoading(true);
            try {
                
                const response = await axios.get("/api/users/all");
                setLoading(false);
                if(response.data.error){
                    throw new Error(response.data.error);
                }

                setUsers(response.data);
            } catch (error) {
                if(axios.isAxiosError(error) && error.response){
                    setError(error.response.data.error);
                }
            }finally{
                setLoading(false);
            }
        }
        getAllUsers();

    }, [])

    return {users, error, loading};
}

export default useGetAllUsers;