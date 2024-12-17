import { useEffect, useState } from "react";
import SearchBar from "../Search/SearchBar";
import User from "./User";
import useGetAllUsers from "../../hooks/user/useGetAllUsers";
import toast, { Toaster } from "react-hot-toast";
import { IUser } from "../../interface";

const Users = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");

  const { users, error, loading } = useGetAllUsers();
  const [filteredUsers, setFilteredUsers] = useState<IUser[]>(users);


  useEffect(() => {
    const filtered = users.filter(user => 
      user.fullName?.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredUsers(filtered)
  }, [searchTerm, users])

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);
  return (
    <div>
      <Toaster />
      <div className="tw-h-screen p-1">
        <div className="mt-3 mb-4">
          <SearchBar
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            placeholder={"Search chats"}
          />
        </div>
        {loading && <div className="d-flex tw-justify-center tw-items-center"><span className="tw-loading tw-loading-spinner"></span></div>}
        <div className="d-flex flex-column gap-2">
          {users.length > 0 && !loading ? filteredUsers.map((user) => {
            return (
              <div className="hover:tw-bg-background tw-cursor-pointer tw-rounded-md p-1">
                <User user={user} key={user._id} />
              </div>
            );
          }) : <div>No users available</div>}
        </div>
      </div>
    </div>
  );
};

export default Users;
