import { useEffect, useState } from "react";
import { IComment } from "../../interface";
import axios, { AxiosResponse } from "axios";

interface GetCommentsReturn {
  error: string | null;
  isLoading: boolean;
  comments: IComment[];
  setComments: (comments: IComment[]) => void;
}

const useGetComments = (postId: string): GetCommentsReturn => {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [comments, setComments] = useState<IComment[]>([]);

    useEffect(() => {

        const getComments = async (): Promise<void> => {
            setIsLoading(true);
            try {

                const response: AxiosResponse = await axios.get(`/api/posts/comments/all?postId=${postId}`);
                setIsLoading(false);
                if(response.data.error){
                    throw new Error(response.data.error);
                }
                setComments(response.data.comments);
                
            } catch (error: unknown) {
                if(axios.isAxiosError(error) && error.response){
                    setError(error.response.data.error || "Unknown error");
                }else {
                    setError("An unexpected error occurred")
                }
            }
        }

        getComments();

    }, [postId])

    return {comments, error, isLoading, setComments}
};


export default useGetComments;