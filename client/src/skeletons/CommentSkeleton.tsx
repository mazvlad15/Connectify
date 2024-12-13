const CommentSkeleton = () => {
  return (
    <div className="d-flex align-items-center gap-2">
      <div className="tw-avatar">
        <div className="tw-skeleton tw-w-10 tw-h-10 tw-rounded-full"></div>
      </div>

      <div className="d-flex flex-column col-lg-9">
        <div className="tw-skeleton tw-w-32 tw-h-4 tw-rounded"></div>

        <div className="tw-skeleton tw-w-48 tw-h-3 tw-rounded mt-2"></div>

        <div className="tw-skeleton tw-w-40 tw-h-3 tw-rounded mt-1"></div>
      </div>

      <div className="ms-auto tw-skeleton tw-w-24 tw-h-3 tw-rounded mt-1"></div>
    </div>
  );
};

export default CommentSkeleton;
