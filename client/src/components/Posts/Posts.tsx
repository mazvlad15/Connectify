import { IPost } from "../../interface"; 
import { useEffect, useState } from "react";
import Post from "./Post";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import useGetAllPosts from "../../hooks/posts/useGetAllPosts";
import toast, { Toaster } from "react-hot-toast";

interface PostsProps {
  searchTerm?: string; 
}

const Posts = ({ searchTerm = "" }: PostsProps) => {
  const { posts, error, isLoading } = useGetAllPosts();
  const [filteredPosts, setFilteredPosts] = useState<IPost[]>(posts);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  useEffect(() => {
    const filtered = posts.filter(post =>
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) 
    );
    setFilteredPosts(filtered);
  }, [searchTerm, posts]); 

  return (
    <div className="px-0 my-5 container-fluid d-flex">
      <Toaster />
      {isLoading && <span className="tw-loading tw-loading-spinner"></span>}
      {filteredPosts.length > 0 && !isLoading ? (
        <Row xs={1} md={1} lg={3} className="g-2 d-flex">
          {filteredPosts.map((post) => (
            <Col className="d-flex mb-5" key={post._id}>
              <Post post={post} />
            </Col>
          ))}
        </Row>
      ) : (
        <p>No posts found</p>
      )}
    </div>
  );
};

export default Posts;
