import axios from "axios";
import { useState } from "react";

interface DeleteCommentReturn {
  deleteComment: (commentId: string) => Promise<void>;
  error: string | null;
  successMessage: string | null;
  setError: (error: string | null) => void;
}

const useDeleteComment = ():DeleteCommentReturn => {
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const deleteComment = async (commentId: string) => {
    try {
      const response = await axios.delete("/api/posts/comments/delete", {
        data: {
          commentId,
        },
      });

      if (response.data.error) {
        throw new Error(response.data.error);
      } else {
        setSuccessMessage(response.data.message);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setError(error.response?.data.error);
      }
    }
  };

  return {error, setError, successMessage, deleteComment};
};

export default useDeleteComment;
