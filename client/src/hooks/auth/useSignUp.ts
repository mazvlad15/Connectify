import { useState } from "react";
import { IUser } from "../../interface";
import axios, { AxiosResponse } from "axios";
import authContext from "../../context/authContext";
import userContext from "../../context/userContext";

const useSignUp = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorSignUp, setError] = useState<string>("");
  const setAuthState = authContext((state) => state.setAuthState);
  const setProfilePicture = userContext((state) => state.setProfilePicture);

  const signUp = async (userData: IUser) => {
    setIsLoading(true);

    try {
      const response: AxiosResponse = await axios.post("/api/auth/signup", userData);
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
        setError(error.response.data.error || "Unknown error");
      } else {
        setError("An unexpected error occurred");
      }
    } finally {
      setIsLoading(false);
    }
  };
  return { signUp, isLoading, errorSignUp, setError };
};

export default useSignUp;
