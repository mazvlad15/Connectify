import { useEffect, useState } from "react";
import SearchBar from "../Search/SearchBar";
import UserChat from "./UserChat";
import useGetAllChats from "../../hooks/messages/useGetAllChats";
import toast, { Toaster } from "react-hot-toast";
import { IChat } from "../../interface";

type Props = {
  setSelectedChats: (value: boolean) => void;
};

const Chats = ({ setSelectedChats }: Props) => {
  const [searchTerm, setSearchTerm] = useState<string>("");

  const { error, loading, chats } = useGetAllChats();

  const [filteredChats, setFilteredChats] = useState<IChat[]>(chats);

  useEffect(() => {
    const filtered = chats.filter(chat => 
      chat.participant.fullName?.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredChats(filtered);
  }, [searchTerm, chats]);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  return (
    <div className="tw-h-screen p-1">
      <Toaster />
      <div className="mt-3 mb-4">
        <SearchBar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          placeholder={"Search chats"}
        />
      </div>
      <div className="d-flex flex-column gap-2">
        {loading && <span className="tw-loading tw-loading-spinner"></span>}
        {!loading && chats.length > 0 && filteredChats.map((chat) => {
          return (
            <div key={chat._id} className="hover:tw-bg-background tw-cursor-pointer tw-rounded-md p-1">
              <UserChat chat={chat} />
            </div>
          );
        })}
        {chats.length === 0 && !loading && (
          <div className="d-flex flex-column align-items-center">
            <span className="tw-opacity-60 mb-2">No existing chats</span>
            <button
              onClick={() => setSelectedChats(false)}
              className="tw-btn tw-bg-primary hover:tw-bg-secondary tw-text-white tw-rounded-md p-2 tw-shadow-md"
            >
              Start a New Chat
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Chats;
