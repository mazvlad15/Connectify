import { useState } from "react";
import Posts from "../../Posts/Posts";
import { GoSearch } from "react-icons/go";
import SearchBar from "../../Search/SearchBar";

const Explore = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");


  return (
    <div className="ms-auto col-12 col-lg-10 p-4 tw-h-screen">
      <div className="mt-5">
      <SearchBar placeholder={"Search posts"} searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>
      </div>
      <Posts searchTerm={searchTerm} /> 
    </div>
  );
};

export default Explore;
