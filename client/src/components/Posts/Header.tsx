import { Link } from "react-router-dom"

const Header = () => {
  return (
    <div
        style={{
          backgroundImage:
            "linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.4)), url('./header.png')",
        }}
        className="tw-h-[70vh] tw-bg-cover tw-rounded-2xl d-flex flex-column p-5 justify-content-center tw-items-start sm:tw-items-center "
      >
        <h1 className="text-white fs-1 tw-font-black tw-mt-11 sm:text-center sm:mb-4">
          Welcome to Connectify
        </h1>
        <h2 className="text-white tw-text-lg sm:text-center sm:tw-mb-5">
          The social network designed for creatives. Here, you can share your
          work, connect with other creatives, and get discovered.
        </h2>
        <Link
          to={"/create"}
          className="tw-btn tw-rounded-2xl tw-btn-active tw-bg-primary hover:tw-bg-secondary tw-border-none col-lg-3 text-white tw-text-lg sm:w-full sm:text-center sm:mb-4"
        >
          Get started
        </Link>
      </div>
  )
}

export default Header