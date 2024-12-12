import { useState } from "react";
import { IUser } from "../interface";
import axios, { AxiosResponse } from "axios";
import authContext from "../context/authContext";

const useSignUp = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorSignUp, setError] = useState<string>("");
  const setAuthState = authContext((state) => state.setAuthState);

  const signUp = async (userData: IUser) => {
    setIsLoading(true);

    try {
      const response: AxiosResponse = await axios.post("/api/auth/signup", userData);
      setIsLoading(false);

      localStorage.setItem("user", JSON.stringify(response.data));
      setAuthState(response.data);

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
