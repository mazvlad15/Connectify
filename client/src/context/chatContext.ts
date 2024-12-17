import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { IUser } from "../interface";

type ChatContextType = {
  participant: IUser | null;
  setParticipant: (participant: IUser | null) => void;
};

const chatContext = create<ChatContextType>()(
  persist(
    (set) => ({
      participant: null,
      setParticipant: (newParticipant) =>
        set({ participant: newParticipant }),
    }),
    {
      name: "chat-participant-storage", 
      storage: createJSONStorage(() => localStorage), 
    }
  )
);

export default chatContext;
