import React, { useEffect, useState } from "react";
import InputGroup from "react-bootstrap/InputGroup";
import Form from "react-bootstrap/Form";
import "../../styles/bootstrap.scss";
import { IoMdSend } from "react-icons/io";
import { BsEmojiSmileUpsideDown } from "react-icons/bs";
import useWriteComment from "../../hooks/posts/useWriteComment";
import toast, { Toaster } from "react-hot-toast";
import { BiBlock } from "react-icons/bi";

type Props = {
  postId: string;
};

const WriteComment = ({ postId }: Props) => {
  const [message, setMessage] = useState<string>("");
  const isRequired: boolean = message !== "";

  const { writeComment, error, setError } = useWriteComment(postId);

  const writeCommentBtn = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await writeComment(message);
      setMessage("");
    } catch (error: unknown) {
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
      <Form onSubmit={writeCommentBtn}>
        <InputGroup>
          <Form.Control
            className="bg-background "
            value={message}
            onChange={(e) => {
              setMessage(e.target.value);
            }}
          />
          <InputGroup.Text className="bg-background">
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

export default WriteComment;
