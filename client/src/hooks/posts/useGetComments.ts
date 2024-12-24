import { useEffect, useState } from "react";
import { IComment } from "../../interface";
import axios, { AxiosResponse } from "axios";
import { socketContext } from "../../context/socketContext";

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
  const socket = socketContext((state) => state.socket);

  useEffect(() => {
    const getComments = async (): Promise<void> => {
      setIsLoading(true);
      try {
        const response: AxiosResponse = await axios.get(
          `/api/posts/comments/all?postId=${postId}`
        );
        setIsLoading(false);
        if (response.data.error) {
          throw new Error(response.data.error);
        }
        setComments(response.data.comments);
      } catch (error: unknown) {
        if (axios.isAxiosError(error) && error.response) {
          setError(error.response.data.error || "Unknown error");
        } else {
          setError("An unexpected error occurred");
        }
      }
    };

    const handleNewComment = (newComment: IComment) => {
      setComments((prevComments) => [...prevComments, newComment]);
    };

    const handleDeleteComment = ({ commentId }: { commentId: string }) => {
      setComments((prevComments) =>
        prevComments.filter((comment) => comment._id !== commentId)
      );
    };

    socket?.on("newComment", handleNewComment);
    socket?.on("deleteComment", handleDeleteComment);

    getComments();

    return () => {
      socket?.off("newComment", handleNewComment);
      socket?.off("deleteComment", handleDeleteComment);
    };
  }, [postId, socket]);

  return { comments, error, isLoading, setComments };
};

export default useGetComments;
