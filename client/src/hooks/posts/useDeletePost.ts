import axios from "axios";
import { useState } from "react";

interface DeletePostReturn {
  deletePost: (postId: string) => Promise<void>;
  error: string | null;
  successMessage: string | null;
  setError: (error: string | null) => void;
}

const useDeletePost = (): DeletePostReturn => {
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const deletePost = async (postId: string): Promise<void> => {
    try {
      const response = await axios.delete("/api/posts/delete", {
        data: {
          postId,
        },
      });
      if (response.data.error) {
        throw new Error(response.data.error);
      } else {
        setSuccessMessage(response.data.message);
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        setError(error.response.data.error);
      }
    }
  };

  return { deletePost, error, successMessage, setError };
};

export default useDeletePost;
