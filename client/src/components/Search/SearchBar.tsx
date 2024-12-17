import React from "react";
import { GoSearch } from "react-icons/go";

type Props = {
  placeholder: string;
  searchTerm: string;
  setSearchTerm: (value: string) => void; 
};

const SearchBar = ({ placeholder, searchTerm, setSearchTerm }: Props) => {
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div>
      <label className="tw-input tw-input-bordered d-flex tw-items-center gap-2 tw-cursor-text">
        <input
          type="text"
          className="grow"
          placeholder={placeholder + "..."}
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <GoSearch className="tw-cursor-pointer ms-auto tw-opacity-70 tw-h-6 tw-w-6 tw-text-secondary" />
      </label>
    </div>
  );
};

export default SearchBar;
