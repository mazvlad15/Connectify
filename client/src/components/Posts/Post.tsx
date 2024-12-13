import Card from "react-bootstrap/Card";
import CloseButton from "react-bootstrap/CloseButton";
import { FaHeart } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";
import { FaRegComment } from "react-icons/fa";
import { IPost } from "../../interface";
import { formatDistanceToNow } from "date-fns";
import useLike from "../../hooks/posts/useLike";
import authContext from "../../context/authContext";
import { useEffect, useState } from "react";
import Comments from "./Comments";
import useDeletePost from "../../hooks/posts/useDeletePost";
import toast, { Toaster } from "react-hot-toast";

interface PostProps {
  post: IPost;
}

const Post = ({ post }: PostProps) => {
  const [showComments, setShowComments] = useState(false);

  const timeAgo = formatDistanceToNow(new Date(post.createdAt), {
    addSuffix: true,
  });

  const authState = authContext((state) => state.authState);
  const isCreator = authState?._id === post.creatorId._id;

  const handleClose = () => setShowComments(false);
  const handleShow = () => setShowComments(true);

  const { setLikeFunction, like, likes } = useLike(post._id || "");

  const setLikeBtn = async (postId: string | undefined) => {
    try {
      await setLikeFunction(postId || "");
    } catch (error) {
      console.log(error);
    }
  };

  const {deletePost, error, setError, successMessage} = useDeletePost();


  useEffect(() => {
    if(error){
      toast.error(error)
    }else if(successMessage){
      toast.success(successMessage)
    }
  }, [error, successMessage])

  const deletePostBtn = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await deletePost(post._id || "");
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("An unknown error occurred");
      }
    }
  }

  return (
    <div>
      <Toaster />
    <Card>
      <Card.Header className="d-flex  tw-items-center px-1">
        <img
          src={post.creatorId.profilePicture}
          alt=""
          className="rounded-circle tw-size-8 me-1 tw-cursor-pointer"
        />
        <div className="tw-font-semibold tw-cursor-pointer">
          {post.creatorId.fullName}
        </div>
        {isCreator && <CloseButton onClick={deletePostBtn} className="ms-auto" />}
      </Card.Header>
      <Card.Img className="p-1" src={post.image} />
      <Card.Body>
        <Card.Title>{post.title}</Card.Title>
        <Card.Text>{post.description}</Card.Text>
      </Card.Body>
      <Card.Footer className="d-flex tw-items-center ">
        {like ? (
          <FaHeart
            className={`me-1 tw-text-purple tw-cursor-pointer ${
              like ? "liked" : ""
            }`}
            size={"25px"}
            onClick={() => setLikeBtn(post._id || "")}
          />
        ) : (
          <FaRegHeart
            className={`me-1 tw-text-purple tw-cursor-pointer ${
              like ? "liked" : ""
            }`}
            size={"25px"}
            onClick={() => setLikeBtn(post._id || "")}
          />
        )}
        <div className="tw-text-lg">{likes}</div>
        <FaRegComment
          className="ms-2 tw-cursor-pointer tw-text-purple"
          size={"25px"}
          onClick={handleShow}
        />

        <div className="tw-ms-auto tw-text-sm text-body-secondary">
          {timeAgo}
        </div>
      </Card.Footer>
    </Card>
    <Comments postId={post._id || ""} showComments={showComments} handleClose={handleClose}/>
    </div>
  );
};

export default Post;
