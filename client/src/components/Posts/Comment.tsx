import { formatDistanceToNow } from "date-fns";
import { IComment } from "../../interface";
import CloseButton from "react-bootstrap/CloseButton";
import authContext from "../../context/authContext";
import useDeleteComment from "../../hooks/posts/useDeleteComment";
import React, { useEffect } from "react";
import toast from "react-hot-toast";

type Props = {
  comment: IComment;
};

const Comment = ({comment}: Props) => {
  const authState = authContext((state) => state.authState);

  const isSender = authState?._id === comment.creatorId._id;

  const {deleteComment, error, setError, successMessage} = useDeleteComment();

  const deleteCommentBtn = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await deleteComment(comment._id || "");
    } catch (error) {
      if(error instanceof Error){
        setError(error.message);
      }
    }
  }

  const timeAgo = formatDistanceToNow(new Date(comment.createdAt), {
    addSuffix: true,
  });

  useEffect(() => {
    if(error){
      toast.error(error)
    }else if(successMessage){
      toast.success(successMessage)
    }
  }, [error, successMessage])

  return (
      <div className="d-flex align-items-center gap-2">
        {isSender && <CloseButton onClick={deleteCommentBtn} style={{fontSize: "10px"}} />}
        <div className="tw-avatar">
          <div className="tw-w-10 tw-rounded-full">
            <img
              alt="avatar"
              src={comment.creatorId.profilePicture}
            />
          </div>
        </div>
        <div className="d-flex flex-column col-lg-9">
            <div className="tw-font-semibold">
                {comment.creatorId.fullName}
            </div>
          <div>
            {comment.comment}
          </div>
        </div>
        <div className="ms-auto tw-text-sm tw-opacity-60">
            {timeAgo}
        </div>
      </div>
  );
};

export default Comment;
