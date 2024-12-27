import { useState, useEffect } from "react";
import useGetAllPosts from "./useGetAllPosts";
import axios, { AxiosResponse } from "axios";
import authContext from "../../context/authContext";
import { socketContext } from "../../context/socketContext";

interface likeReturn {
  setLikeFunction: () => Promise<void>;
  like: boolean;
  likes: number;
}

const useLike = (postId: string): likeReturn => {
  const { posts } = useGetAllPosts();
  const [like, setLike] = useState<boolean>(false);
  const [likes, setLikes] = useState<number>(0);
  const authState = authContext((state) => state.authState);
  const socket = socketContext((state) => state.socket);

  useEffect(() => {
    // Găsește postarea curentă
    const post = posts.find((post) => post._id === postId);
    if (post) {
      setLike(post.likes.includes(authState?._id || ""));
      setLikes(post.likes.length);
    }

    const handleLikePost = (data: { postId: string }) => {
      if (data.postId === postId) {
        setLikes((prevLikes) => prevLikes + 1);
      }
    };

    const handleUnlikePost = (data: { postId: string }) => {
      if (data.postId === postId) {
        setLikes((prevLikes) => Math.max(prevLikes - 1, 0)); // Evită scăderea sub 0
      }
    };

    socket?.on(`likePost:${postId}`, handleLikePost);
    socket?.on(`unlikePost:${postId}`, handleUnlikePost);

    return () => {
      socket?.off(`likePost:${postId}`, handleLikePost);
      socket?.off(`unlikePost:${postId}`, handleUnlikePost);
    };
  }, [posts, postId, socket, authState]);

  const setLikeFunction = async (): Promise<void> => {
    try {
      if (like) {
        const response: AxiosResponse = await axios.post("/api/posts/unlike", {
          postId,
        });
        if (response.data.message) {
          setLike(false);
        }
      } else {
        const response: AxiosResponse = await axios.post("/api/posts/like", {
          postId,
        });
        if (response.data.message) {
          setLike(true);
        }
      }
    } catch (error) {
      console.error("Error updating like status", error);
    }
  };

  return { setLikeFunction, like, likes };
};

export default useLike;
