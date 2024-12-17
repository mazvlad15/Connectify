import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import useGetUserPosts from "../../hooks/user/useGetUserPosts";
import { IPost } from "../../interface";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Post from "../Posts/Post";
import SearchBar from "../Search/SearchBar";

const UserPosts = () => {
  const { posts, errorGetPosts, isLoading } = useGetUserPosts();
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filteredPosts, setFilteredPosts] = useState<IPost[]>(posts);

  useEffect(() => {
    if (errorGetPosts) {
      toast.error(errorGetPosts);
    }
  }, [errorGetPosts]);

  useEffect(() => {
    const filtered = posts.filter((post) =>
      post.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredPosts(filtered);
  }, [searchTerm, posts]);

  return (
    <div className="col-lg-12">
      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} placeholder={"Search posts"} />
      <div className="px-0 my-5 container-fluid d-flex ">
        <Toaster />
        {isLoading && <span className="tw-loading tw-loading-spinner"></span>}
        {filteredPosts.length > 0 && !isLoading ? (
          <Row xs={1} md={1} lg={3} className="g-2 d-flex col-lg-12">
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
    </div>
  );
};

export default UserPosts;
