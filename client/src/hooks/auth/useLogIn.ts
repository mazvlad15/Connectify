import { useState } from "react";
import authContext from "../../context/authContext";
import { IUser } from "../../interface";
import axios, { AxiosResponse } from "axios";
import userContext from "../../context/userContext";

const useLogIn = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorLogIn, setErrorLogIn] = useState<string>("");
  const setAuthState = authContext((state) => state.setAuthState);
  const setProfilePicture = userContext((state) => state.setProfilePicture);

  const logIn = async (userData: IUser) => {
    setIsLoading(true);
    try {
      const response: AxiosResponse = await axios.post(
        "/api/auth/login",
        userData
      );
      setIsLoading(false);

      localStorage.setItem("user", JSON.stringify(response.data));
      setAuthState(response.data);
      const user = localStorage.getItem("user") || "{}";
      const userParse = JSON.parse(user);
      const userProfilePicture = userParse.profilePicture;

      setProfilePicture(userProfilePicture || "");
      return response.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response) {
        setErrorLogIn(error.response.data.error || "Unknown error");
      } else {
        setErrorLogIn("An unexpected error occurred");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return { logIn, isLoading, errorLogIn, setErrorLogIn };
};

export default useLogIn;
