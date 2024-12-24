import { useNavigate } from "react-router-dom";
import { IUser } from "../../interface";
import { useEffect, useState } from "react";
import useGetChatId from "../../hooks/messages/useGetChatId";
import toast, { Toaster } from "react-hot-toast";
import chatContext from "../../context/chatContext";
import { socketContext } from "../../context/socketContext";

type Props = {
  user: IUser;
};

const User = ({user}: Props) => {
  const navigate = useNavigate();
  const setParticipant = chatContext((state) => state.setParticipant);

  const {error, getChatId} = useGetChatId(); 

  const { onlineUsers } = socketContext();
  const isOnline = onlineUsers.includes(user._id || "");

  const navigateToChat = async () => {
    try {
      const response = await getChatId(user._id || "");
      setParticipant(user);
      navigate("/messages/"+response);
    } catch (error) {
      if(error instanceof Error){
        toast.error(error.toString());
      }
    }
  } 

  useEffect(() => {
    if(error){
      toast.error(error);
    }
  }, [error]);

  return (
    <div className="d-flex align-items-center gap-2" onClick={navigateToChat}>
      <Toaster />
      <div className="tw-avatar">
        <div className="tw-w-14 tw-rounded-full">
          <img alt="avatar" src={user?.profilePicture || ""} />
        </div>
      </div>
      <div className="d-flex flex-column col-lg-9">
        <div className="tw-font-bold tw-text">{user.fullName}</div>
      </div>
      <div className={`ms-auto tw-rounded-full tw-size-3 ${isOnline ? "tw-bg-green-500" : "tw-bg-red-500"} `}></div>
    </div>
  );
};

export default User;
