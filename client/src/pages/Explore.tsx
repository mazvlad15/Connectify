import { useState } from "react";
import Posts from "../components/Posts/Posts";
import { GoSearch } from "react-icons/go";

const Explore = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div className="ms-auto col-12 col-lg-10 p-4 tw-h-screen">
      <div className="mt-5">
        <label className="tw-input tw-input-bordered d-flex tw-items-center gap-2 tw-cursor-text">
          <input
            type="text"
            className="grow"
            placeholder="Search posts..."
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <GoSearch className="tw-cursor-pointer ms-auto tw-opacity-70 tw-h-6 tw-w-6 tw-text-secondary"/>
        </label>
      </div>
      <Posts searchTerm={searchTerm} /> 
    </div>
  );
};

export default Explore;
