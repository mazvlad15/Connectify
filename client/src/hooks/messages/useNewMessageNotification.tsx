import { useEffect } from "react";
import { socketContext } from "../../context/socketContext";
import toast from "react-hot-toast";

interface NewMessageNotification {
  chatId: string;
  senderName: string;
  profilePicture: string;
  message: string;
}

const useNewMessageNotification = (): void => {
  const socket = socketContext((state) => state.socket);

  useEffect(() => {
    const handleNewMessageNotification = (data: NewMessageNotification) => {
      const { senderName, profilePicture, message} = data;

      toast.custom((t) => (
        <div 
          className={`${
            t.visible ? "tw-animate-enter" : "tw-animate-leave"
          } tw-max-w-md tw-w-full tw-bg-white tw-shadow-lg tw-rounded-lg tw-pointer-events-auto tw-flex tw-items-center tw-ring-1 tw-ring-black tw-ring-opacity-5 tw-p-4`}
        >
          <div className="tw-flex tw-items-center tw-gap-3">
            <img
              className="tw-h-10 tw-w-10 tw-rounded-full"
              src={profilePicture}
              alt={`${senderName}'s profile`}
            />
            <div className="tw-flex tw-flex-col">
              <span className="tw-font-semibold tw-text-gray-900">{senderName}</span>
              <span className="tw-text-sm tw-text-gray-500">{message}</span>
            </div>
          </div>
          <button
            onClick={() => toast.dismiss(t.id)}
            className="tw-ml-auto tw-border tw-border-transparent tw-rounded tw-px-3 tw-py-1 tw-text-sm tw-font-medium tw-text-indigo-600 hover:tw-text-indigo-500 focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-indigo-500"
          >
            Close
          </button>
        </div>
      ));
      
    };

    socket?.on("newMessageNotification", handleNewMessageNotification);

    return () => {
      socket?.off("newMessageNotification", handleNewMessageNotification);
    };
  }, [socket]);
};

export default useNewMessageNotification;
