import { formatDistanceToNow } from "date-fns";
import { IComment } from "../../interface";

type Props = {
  comment: IComment;
};

const Comment = ({comment}: Props) => {
  const timeAgo = formatDistanceToNow(new Date(comment.createdAt), {
    addSuffix: true,
  });

  return (
      <div className="d-flex align-items-center gap-2">
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
