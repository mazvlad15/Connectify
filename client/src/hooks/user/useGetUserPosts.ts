import { useEffect, useState } from "react";
import { IPost } from "../../interface";
import axios from "axios";

interface GetUserPostsReturn {
  posts: IPost[] | [];
  errorGetPosts: string | null;
  isLoading: boolean;
}

const useGetUserPosts = (): GetUserPostsReturn => {
  const [posts, setPosts] = useState<IPost[] | []>([]);
  const [errorGetPosts, setErrorGetPosts] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const getUserPosts = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get("/api/users/posts");
        setIsLoading(false);
        if (response.data.error) {
          throw new Error(response.data.error);
        }

        setPosts(response.data);
      } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
          setErrorGetPosts(error.response.data.error);
        }
      } finally {
        setIsLoading(false);
      }
    };

    getUserPosts();
  }, []);

  return { posts, errorGetPosts, isLoading };
};

export default useGetUserPosts;
