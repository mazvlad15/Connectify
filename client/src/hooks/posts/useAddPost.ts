import { useState } from "react";
import axios from "axios";

interface AddPostData {
  title: string;
  description: string;
  image: File;
}

interface UseAddPostReturn {
  addPost: (data: AddPostData) => Promise<void>;
  loading: boolean;
  error: string | null;
  message: string;
  setError: (error: string | null) => void;
}

const useAddPost = (): UseAddPostReturn => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string>("");

  const addPost = async ({ title, description, image }: AddPostData): Promise<void> => {
    setLoading(true);
    setError(null);
    setMessage("");

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("image", image);

    try {
      const response = await axios.post(
        "/api/posts/add",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setMessage("Post created successfully!");
      return response.data;
    } catch (error: unknown) {
        if (axios.isAxiosError(error) && error.response) {
          setError(error.response.data.error || "Unknown error");
        } else {
          setError("An unexpected error occurred");
        }
    } finally {
      setLoading(false);
    }
  };

  return { addPost, loading, error, message, setError };
};

export default useAddPost;
