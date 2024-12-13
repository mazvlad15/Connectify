import { useState, useEffect } from "react";
import useGetAllPosts from "./useGetAllPosts";
import axios, { AxiosResponse } from "axios";
import authContext from "../../context/authContext";

interface likeReturn {
  setLikeFunction: (postId: string) => void;
  like: boolean;
  likes: number;
}

const useLike = (postId: string): likeReturn => {
  const { posts } = useGetAllPosts();
  const [like, setLike] = useState<boolean>(false); 
  const [likes, setLikes] = useState<number>(0);
  const authState = authContext((state) => state.authState);

  useEffect(() => {
    const post = posts.find(post => post._id === postId);
    if (post) {
      setLike(post.likes.includes(authState?._id || "")); 
      setLikes(post.likes.length);
    }
  }, [posts, postId]);

  const setLikeFunction = async (postId: string): Promise<void> => { 
    try {
      if (like) {
        const response: AxiosResponse = await axios.post("/api/posts/unlike", {
          postId,
        });
        if (response.data.message) {
          setLike(false);
          setLikes(prevLikes => prevLikes - 1);
        }
      } else {
        const response: AxiosResponse = await axios.post("/api/posts/like", {
          postId,
        });
        if (response.data.message) {
          setLike(true);
          setLikes(prevLikes => prevLikes + 1);
        }
      }
    } catch (error) {
      console.error("Error updating like status", error);
    }
  };

  return { setLikeFunction, like, likes };
};

export default useLike;
