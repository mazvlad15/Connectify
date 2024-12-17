import { useNavigate, useParams } from "react-router-dom";
import useGetAllMessages from "../../hooks/messages/useGetAllMessages";
import Message from "./Message";
import MessageSkeleton from "../../skeletons/MessageSkeleton";
import chatContext from "../../context/chatContext";
import { IoMdArrowRoundBack } from "react-icons/io";
import WriteMessage from "./WriteMessage";
import { useEffect, useRef } from "react";

const Chat = () => {
  const { chatId } = useParams();
  const navigate = useNavigate();
  const { messages, loading, error } = useGetAllMessages(chatId || "");
  const participant = chatContext((state) => state.participant);

  const lastMessageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (lastMessageRef.current) {
      lastMessageRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <div className="col-12 col-lg-10 d-flex ms-auto tw-h-screen flex-column">
      <div className="tw-bg-background tw-shadow-md d-flex tw-items-center gap-3 p-3">
        <div className="tw-online tw-avatar">
          <div className="tw-rounded-full tw-size-20">
            <img src={participant?.profilePicture} />
          </div>
        </div>
        <h2 className="tw-font-bold tw-text-secondary">
          {participant?.fullName}
        </h2>
        <IoMdArrowRoundBack
          className="ms-auto tw-cursor-pointer  tw-text-primary"
          size={"40px"}
          onClick={() => {
            navigate("/messages");
          }}
        />
      </div>

      <div
        className={`messages d-flex flex-column overflow-auto col-lg-12 mt-1 tw-rounded-md tw-bg-white`}
        style={{ height: "76.37vh" }}
      >
        {!loading &&
          !error &&
          messages.length > 0 &&
          messages.map((message, index) => (
            <div
              key={message._id}
              ref={index === messages.length - 1 ? lastMessageRef : null}
            >
              <Message message={message} />
            </div>
          ))}
        {loading &&
          [...Array(3)].map((_, idx) => <MessageSkeleton key={idx} />)}
        {error && (
          <div className="flex items-center justify-center text-red-500">
            Error to receive messages
          </div>
        )}
        {!loading && !error && messages.length === 0 && (
          <div className="tw-text-xl tw-font-semibold d-flex tw-justify-center tw-items-center tw-h-full">
            Send a message to start the conversation
          </div>
        )}
      </div>

      <div className="mt-auto p-1" style={{ height: "7vh" }}>
        <WriteMessage />
      </div>
    </div>
  );
};

export default Chat;
