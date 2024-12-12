import {create} from "zustand";
import { IUser } from "../interface";

type authContextType = {
    authState: IUser | null;
    setAuthState: (newState: IUser | null) => void;
}

const authContext = create<authContextType>((set) => ({
    authState: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user") as string) : null,
    setAuthState: (newState) => set({authState: newState}),
}))

export default authContext;