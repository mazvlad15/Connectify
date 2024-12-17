import axios from "axios";
import { useState } from "react";
import userContext from "../../context/userContext";

interface ModifyProfilePictureReturn {
  modifyProfilePicture: (image: File) => Promise<void>;
  errorUpload: string | null;
  isLoading: boolean;
  successMessage: string | null;
}

const useModifyProfilePicture = (): ModifyProfilePictureReturn => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorUpload, setErrorUpload] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const setProfilePicture = userContext((state) => state.setProfilePicture);

  const modifyProfilePicture = async (image: File) => {
    setIsLoading(true);
    try {
      const response = await axios.patch(
        "/api/users/profile/modify",
        { image },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.data.error) {
        throw new Error(response.data.error);
      }
      if(response.data.newProfilePicture){
        const userStorage = localStorage.getItem("user");
        const user = JSON.parse(userStorage || "");

        user.profilePicture = response.data.newProfilePicture;

        localStorage.setItem("user", JSON.stringify(user));
        setProfilePicture(response.data.newProfilePicture);
      }
      setSuccessMessage(response.data.message);
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        setErrorUpload(error.response.data.error);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return { modifyProfilePicture, errorUpload, successMessage, isLoading };
};

export default useModifyProfilePicture;
