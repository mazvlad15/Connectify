import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { BsEmojiSmileUpsideDown } from "react-icons/bs";
import { IoMdSend } from "react-icons/io";
import chatContext from "../../context/chatContext";
import useSendMessage from "../../hooks/messages/useSendMessage";
import { BiBlock } from "react-icons/bi";

const WriteMessage = () => {
  const participant = chatContext((state) => state.participant);

  const [message, setMessage] = useState<string>("");
  const isRequired: boolean = message !== "";

  const { error, setError, sendMessage } = useSendMessage();

  const sendMessageForm = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await sendMessage(message, participant?._id || "");
      setMessage("");
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("An unknown error occurred");
      }
    }
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);
  return (
    <div>
      <Toaster />
      <Form onSubmit={sendMessageForm}>
        <InputGroup>
          <Form.Control
            className=""
            placeholder="Type here..."
            value={message}
            onChange={(e) => {
              setMessage(e.target.value);
            }}
          />
          <InputGroup.Text className="">
            <BsEmojiSmileUpsideDown
              size={"25px"}
              className="tw-text-secondary tw-cursor-pointer hover:-tw-rotate-180 "
            />
          </InputGroup.Text>
          <InputGroup.Text className="bg-background">
            <button
              type="submit"
              disabled={!isRequired}
              className={`tw-text-secondary tw-cursor-pointer hover:-tw-rotate-12 ${
                !isRequired ? "opacity-50" : ""
              }`}
            >
              {isRequired ? (
                <IoMdSend size={"25px"} />
              ) : (
                <BiBlock size={"25px"} />
              )}
            </button>
          </InputGroup.Text>
        </InputGroup>
      </Form>
    </div>
  );
};

export default WriteMessage;
