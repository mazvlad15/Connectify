import { IMessage } from "../../interface";
import authContext from "../../context/authContext";
import chatContext from "../../context/chatContext";
import userContext from "../../context/userContext";

type Props = {
  message: IMessage;
};

const Message = ({ message }: Props) => {
  const sendTime = `${new Date(message.createdAt).getHours()}:${new Date(
    message.createdAt
  )
    .getMinutes()
    .toString()
    .padStart(2, "0")}`;
  const authState = authContext((state) => state.authState);
  const participant = chatContext((state) => state.participant);
  const profilePicture = userContext((state) => state.profilePicture);
  const fromMe = message.senderId === authState?._id;
  const chatClassName = fromMe ? "tw-chat-end" : "tw-chat-start";
  const profilePic = fromMe
    ? profilePicture
    : participant?.profilePicture;
  const bubbleBgColor = fromMe ? "tw-bg-purple tw-text-black" : "tw-bg-primary";

  return (
    <div className=" px-3">
      <div className={`tw-chat ${chatClassName}`}>
        <div className="tw-chat-image tw-avatar ">
          <div className="tw-w-10 tw-rounded-full">
            <img alt="profilePic" src={profilePic || ""} />
          </div>
        </div>
        <div className={`tw-chat-bubble ${bubbleBgColor}`}>{message.message}</div>
        <time className="tw-chat-footer tw-opacity-50 tw-tex-xs">{sendTime}</time>
      </div>
    </div>
  );
};

export default Message;
