import axios from "axios";
import { useState } from "react";

interface GetChatIdReturn {
  getChatId: (userId: string) => Promise<string>;
  error: string | null;
}

const useGetChatId = (): GetChatIdReturn => {
  const [error, setError] = useState<string | null>(null);

  const getChatId = async (userId: string) => {
    try {
      const response = await axios.post("/api/messages/get/chatId", { userId });
      if (response.data.error) {
        throw new Error(response.data.console.error);
      }
      return response.data._id;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setError(error.response?.data.error);
      }
    }
  };

  return {error, getChatId};
};

export default useGetChatId;
