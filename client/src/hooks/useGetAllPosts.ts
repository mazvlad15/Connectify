import { useEffect, useState } from "react";
import { IPost } from "../interface";
import axios from "axios";

interface getAllPostsReturn {
  posts: [IPost] | [];
  isLoading: boolean;
  error: string | null;
}

const useGetAllPosts = (): getAllPostsReturn => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [posts, setPosts] = useState<[IPost] | []>([]);

  useEffect(() => {
    const getAllPosts = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get("/api/posts/all");
        setIsLoading(false);
        if (response.data.error) {
          throw new Error(response.data.error);
        }
        
        setPosts(response.data.posts);
      } catch (error: unknown) {
        if (axios.isAxiosError(error) && error.response) {
          setError(error.response?.data?.error || "Unknown error");
        } else {
          setError("An unexpected error occurred");
        }
      } finally {
        setIsLoading(false);
      }
    };

    getAllPosts();
  }, []);
  return { posts, isLoading, error };
};

export default useGetAllPosts;
