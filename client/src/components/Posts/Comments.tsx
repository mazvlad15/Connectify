import Modal from "react-bootstrap/Modal";
import Comment from "./Comment";
import WriteComment from "./WriteComment";
import useGetComments from "../../hooks/posts/useGetComments";
import toast, { Toaster } from "react-hot-toast";
import CommentSkeleton from "../../skeletons/CommentSkeleton";

type Props = {
  postId: string;
  showComments: boolean;
  handleClose: () => void;
};

const Comments = ({ showComments, handleClose, postId }: Props) => {
  const { comments, isLoading, error } = useGetComments(postId);

  if (error) {
    toast.error(error);
  }

  return (
    <div>
      <Toaster />
      <Modal centered show={showComments} onHide={handleClose} size="lg">
        <div className="tw-bg-background">
          <Modal.Header closeButton>
            <Modal.Title>
              <div className="tw-text-primary">Comments</div>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body className="d-flex flex-column gap-3">
            {isLoading && [
              ...Array(3).map((_, idx) => {
                return <CommentSkeleton key={idx} />;
              }),
            ]}
            {comments.length <= 0 && <div className="tw-opacity-60">No comments</div>}
            {comments.length > 0 &&
              !isLoading &&
              comments.map((comment) => {
                return <Comment comment={comment} key={comment._id} />;
              })}
          </Modal.Body>
          <Modal.Footer className="d-flex">
            <div className="tw-avatar me-auto">
              <div className="tw-w-10 tw-rounded-full">
                <img
                  alt="Tailwind CSS chat bubble component"
                  src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                />
              </div>
            </div>
            <div className="col-lg-11 col-md-10 col-sm-10 col-10">
              <WriteComment postId={postId}/>
            </div>
          </Modal.Footer>
        </div>
      </Modal>
    </div>
  );
};

export default Comments;
