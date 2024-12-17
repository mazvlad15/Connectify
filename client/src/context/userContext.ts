import { create } from "zustand";

type userContextType = {
  profilePicture: string | null;
  setProfilePicture: (newProfilePicture: string | null) => void;
};

const user = localStorage.getItem("user") || "{}";
const userParse = JSON.parse(user);
const userProfilePicture = userParse.profilePicture;

const userContext = create<userContextType>((set) => ({
  profilePicture: userProfilePicture,
  setProfilePicture: (newProfilePicture) =>
    set({ profilePicture: newProfilePicture }),
}));

export default userContext;
