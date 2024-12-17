import { useState } from "react";
import axios from "axios";
import useGetComments from "./useGetComments";
import { IComment } from "../../interface";

interface WriteCommentReturn {
  writeComment: (comment: string) => Promise<void>;
  error: string | null;
  isLoading: boolean;
  setError: (error: string | null) => void;
}

const useWriteComment = (postId: string): WriteCommentReturn => {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { comments, setComments } = useGetComments(postId);

  const writeComment = async (comment: string) => {
    setIsLoading(true);
    try {
      const response = await axios.post("/api/posts/comments/add", {
        postId,
        comment,
      });
      setIsLoading(false);
      if (response.data.error) {
        throw new Error(response.data.error);
      }

      const newComment: IComment = response.data;

      setComments([...comments,newComment]);

      return response.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response) {
        setError(error.response.data.error);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return { writeComment, error, isLoading, setError };
};

export default useWriteComment;
