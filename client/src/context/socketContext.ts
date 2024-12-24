import { create } from "zustand";
import io, { Socket } from "socket.io-client";

interface SocketState {
  socket: Socket | null;
  onlineUsers: string[]; 
  initializeSocket: (userId: string) => void;
  disconnectSocket: () => void;
}

export const socketContext = create<SocketState>((set, get) => ({
  socket: null,
  onlineUsers: [],

  initializeSocket: (userId: string) => {
    const socket = io("https://connectify-0g6b.onrender.com", {
      query: { userId },
    });

    socket.on("getOnlineUsers", (users) => {
      set({ onlineUsers: users });
    });

    set({ socket });
  },

  disconnectSocket: () => {
    const socket = get().socket;
    if (socket) {
      socket.close();
      set({ socket: null, onlineUsers: [] });
    }
  },
}));
