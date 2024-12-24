import axios, { AxiosResponse } from "axios";
import { useState } from "react";
import authContext from "../../context/authContext";

const useLogOut = () => {
  const [isLoadingLogOut, setIsLoadingLogOut] = useState<boolean>(false);
  const setAuthState = authContext((state) => state.setAuthState);

  const logOut = async () => {
    setIsLoadingLogOut(true);
    try {
      const response: AxiosResponse = await axios.post("/api/auth/logout");
      setIsLoadingLogOut(false);
      if (response.data.error) {
        throw new Error(response.data.error);
      }

      localStorage.removeItem("user");
      setAuthState(null);
      return response.data;
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoadingLogOut(false);
    }
  };

  return { logOut, isLoadingLogOut };
};

export default useLogOut;
