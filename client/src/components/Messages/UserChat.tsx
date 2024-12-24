import { useNavigate } from "react-router-dom";
import { IChat } from "../../interface";
import { formatDistanceToNow } from "date-fns";
import chatContext from "../../context/chatContext";
import { socketContext } from "../../context/socketContext";

type Props = {
  chat: IChat;
};

const UserChat = ({ chat }: Props) => {
  const navigate = useNavigate();
  const setParticipant = chatContext((state) => state.setParticipant);
  const timeAgo = formatDistanceToNow(new Date(chat.lastMessage?.createdAt) , {
    addSuffix: true,
  });

  const { onlineUsers } = socketContext();
  const isOnline = onlineUsers.includes(chat.participant._id || "");

  const truncateMessage = (message: string, charLimit: number): string => {
    return message.length > charLimit
      ? message.slice(0, charLimit) + "..."
      : message;
  };

  const lastMessage = chat.lastMessage.message;

  return (
    <div className="col-lg-12" onClick={() => {navigate("/messages/"+chat._id); setParticipant(chat.participant)}}>
      <div className="d-flex align-items-center gap-2">
        <div className={`tw-avatar ${isOnline ? "tw-online" : "tw-offline"} `}>
          <div className="tw-w-14 tw-rounded-full">
            <img alt="avatar" src={chat.participant.profilePicture || ""} />
          </div>
        </div>
        <div className="d-flex flex-column col-lg-9">
          <div className="tw-font-bold tw-text">
            {chat.participant.fullName}
          </div>
          <div className="tw-opacity-70 ">
            {truncateMessage(lastMessage, 15)}
          </div>
        </div>
        <div className="ms-auto tw-text-sm tw-opacity-60">
          {timeAgo}
        </div>
      </div>
    </div>
  );
};

export default UserChat;
