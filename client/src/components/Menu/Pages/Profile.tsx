import { useEffect, useRef} from "react";
import authContext from "../../../context/authContext";
import useModifyProfilePicture from "../../../hooks/user/useModifyProfilePicture";
import toast, { Toaster } from "react-hot-toast";
import userContext from "../../../context/userContext";
import UserPosts from "../../Profile/UserPosts";

const Profile = () => {
  const profilePicture = userContext((state) => state.profilePicture);
  const authState = authContext((state) => state.authState);
  const dateString = authState?.createdAt || "";
  const date = new Date(dateString);

  const formattedDate = date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const { modifyProfilePicture, errorUpload, successMessage, isLoading } =
    useModifyProfilePicture();

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const image = e.target.files[0];
      await modifyProfilePicture(image);
    }
  };

  useEffect(() => {
    if (errorUpload) {
      toast.error(errorUpload);
    } else if (successMessage) {
      toast.success(successMessage);
    }
  }, [errorUpload, successMessage]);

  return (
    <div
      className="tw-relative tw-flex col-12 col-lg-10 ms-auto tw-min-h-screen tw-flex-col "
      style={{ fontFamily: "Epilogue, Noto Sans, sans-serif" }}
    >
      <Toaster />
      <div className="container-fluid tw-flex tw-h-full tw-flex-col">
        <div
          className="tw-flex tw-min-h-[480px] tw-flex-col tw-gap-4 tw-bg-center tw-bg-no-repeat  tw-items-center tw-justify-center tw-p-4"
          style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 0.4) 100%), url("${profilePicture}")`,
          }}
        >
          <div className="tw-flex tw-flex-col tw-gap-2 tw-text-center">
            <h1 className="tw-text-white tw-text-4xl tw-font-black tw-leading-tight tw-tracking-[-0.033em] tw-@[480px]:text-5xl tw-@[480px]:font-black tw-@[480px]:leading-tight tw-@[480px]:tracking-[-0.033em]">
              {authState?.fullName}
            </h1>
            <h2 className="tw-text-white tw-text-sm tw-font-normal tw-leading-normal tw-@[480px]:text-base tw-@[480px]:font-normal tw-@[480px]:leading-normal">
              {authState?.email}
            </h2>
          </div>
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            style={{ display: "none" }}
            onChange={handleFileChange}
          />
          <button
            onClick={handleFileUploadClick}
            className="tw-flex tw-min-w-[84px] tw-max-w-[480px] tw-cursor-pointer tw-items-center tw-justify-center tw-overflow-hidden tw-rounded-xl tw-h-10 tw-px-4 tw-@[480px]:h-12 tw-@[480px]:px-5 tw-bg-primary hover:tw-bg-secondary tw-text-[#f9f8fb] tw-text-sm tw-font-bold tw-leading-normal tw-tracking-[0.015em] tw-@[480px]:text-base tw-@[480px]:font-bold tw-@[480px]:leading-normal tw-@[480px]:tracking-[0.015em]"
          >
            {isLoading ? (
              <span className="tw-loading tw-loading-spinner"></span>
            ) : (
              <span className="tw-truncate">Change photo</span>
            )}
          </button>
        </div>
      </div>
      <div className="tw-p-4">
        <div className="tw-grid tw-gap-4 md:tw-grid-cols-2 ">
          <div className="tw-flex tw-flex-col tw-gap-1 tw-border-t tw-border-solid tw-border-t-purple tw-py-4">
            <p className="tw-text-secondary tw-text-sm tw-font-normal tw-leading-normal">
              Name
            </p>
            <p className="tw-text-primary tw-text-sm tw-font-normal tw-leading-normal">
              {authState?.fullName}
            </p>
          </div>
          <div className="tw-flex tw-flex-col tw-gap-1 tw-border-t tw-border-solid tw-border-t-purple tw-py-4">
            <p className="tw-text-secondary tw-text-sm tw-font-normal tw-leading-normal">
              Email
            </p>
            <p className="tw-text-primary tw-text-sm tw-font-normal tw-leading-normal">
              {authState?.email}
            </p>
          </div>
        </div>
        <div className="tw-flex tw-flex-col tw-gap-1 tw-border-t tw-border-solid tw-border-t-purple tw-py-4 tw-col-span-2">
          <p className="tw-text-secondary tw-text-sm tw-font-normal tw-leading-normal">
            Account created
          </p>
          <p className="tw-text-primary tw-text-sm tw-font-normal tw-leading-normal">
            {formattedDate}
          </p>
        </div>
      </div>
      <div className="p-2 ">
        <h2 className="text-center tw-border-b tw-border-solid tw-border-b-purple p-2 tw-shadow-sm tw-text-secondary tw-text-5xl">
          Posts
        </h2>
        <UserPosts />
      </div>
    </div>
  );
};

export default Profile;
