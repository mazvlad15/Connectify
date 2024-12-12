import Header from "../components/Posts/Header";
import Posts from "../components/Posts/Posts";


const Home = () => {
  return (
    <div className="ms-auto col-12 col-lg-10 p-2 tw-h-screen">
      <Header />
      <Posts />
    </div>
  );
};

export default Home;
