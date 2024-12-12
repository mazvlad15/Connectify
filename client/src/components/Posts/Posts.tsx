import { useEffect } from "react";
import Post from "./Post";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import useGetAllPosts from "../../hooks/useGetAllPosts";
import toast, { Toaster } from "react-hot-toast";

const Posts = () => {
  const { posts, error, isLoading } = useGetAllPosts();

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  return (
    <div className="px-0 my-5 container-fluid d-flex ">
      <Toaster />
      {isLoading && <span className="tw-loading tw-loading-spinner"></span>}
      {posts.length > 0 && !isLoading && (
        <Row xs={1} md={1} lg={3} className="g-2 d-flex">
          {posts.map((post) => {
            return (
              <Col className="d-flex mb-5" key={post._id}>
                <Post post={post} />
              </Col>
            );
          })}
        </Row>
      )}
    </div>
  );
};

export default Posts;
