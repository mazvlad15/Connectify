import { GoHomeFill } from "react-icons/go";
import { GoSearch } from "react-icons/go";
import { MdOutlineAddBox } from "react-icons/md";
import { FaRegEnvelope } from "react-icons/fa6";
import { CgProfile } from "react-icons/cg";
import { SiLivewire } from "react-icons/si";
import { IoIosLogOut } from "react-icons/io";
import { useEffect, useState } from "react";
import { TiThMenu } from "react-icons/ti";
import { IoMdClose } from "react-icons/io";
import { motion } from "framer-motion";
import useLogOut from "../../hooks/auth/useLogOut";
import { Link } from "react-router-dom";

const navbarVariants = {
  hidden: { x: "-100%", opacity: 0 },
  visible: { x: "0%", opacity: 1 },
};

const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 0.5 },
};

const Navbar = () => {
  const [showNavbar, setShowNavbar] = useState<boolean>(false);
  const [isLargeScreen, setIsLargeScreen] = useState<boolean>(
    window.innerWidth > 992
  );
  const { logOut, isLoadingLogOut } = useLogOut();

  useEffect(() => {
    const handleResize = () => {
      setIsLargeScreen(window.innerWidth > 992);
      if (window.innerWidth > 992) {
        setShowNavbar(true);
      } else {
        setShowNavbar(false);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const toggleNavbar = () => {
    setShowNavbar(!showNavbar);
  };

  const logOutBtn = async () => {
    try {
      await logOut();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      {!isLargeScreen && !showNavbar && (
        <div className="tw-fixed tw-top-4 tw-left-4 tw-z-50">
          <TiThMenu
            onClick={toggleNavbar}
            className="tw-cursor-pointer tw-text-primary"
            size={"35px"}
          />
        </div>
      )}

      {!isLargeScreen && showNavbar && (
        <motion.div
          className="tw-fixed tw-inset-0 tw-bg-black tw-z-40"
          initial="hidden"
          animate="visible"
          exit="hidden"
          variants={overlayVariants}
          transition={{ duration: 0.3 }}
          onClick={toggleNavbar}
        ></motion.div>
      )}

      <motion.div
        className={`d-flex flex-column flex-shrink-0 p-3 col-lg-2 me-auto tw-h-screen tw-bg-purple tw-top-0 ${
          isLargeScreen
            ? "position-fixed tw-left-0"
            : "position-fixed tw-left-0 tw-z-50 tw-shadow-lg"
        }`}
        initial={isLargeScreen ? undefined : "hidden"}
        animate={isLargeScreen ? undefined : showNavbar ? "visible" : "hidden"}
        exit={isLargeScreen ? undefined : "hidden"}
        variants={navbarVariants}
        transition={{ duration: 0.5, ease: "easeInOut" }}
      >
        <div className="d-flex align-items-center">
          <a
            href="/"
            className="d-flex align-items-center mb-md-0 me-md-auto text-dark text-decoration-none me-4"
          >
            <SiLivewire className="tw-text-primary" size={"40px"} />
            <span className="fs-4 tw-text-primary">Connectify</span>
          </a>
          {!isLargeScreen && showNavbar && (
            <IoMdClose
              className="ms-auto tw-text-primary tw-cursor-pointer"
              onClick={toggleNavbar}
              size={"30px"}
            />
          )}
        </div>
        <div className="my-2"></div>
        <ul className="nav nav-pills flex-column mb-auto gap-1">
          <li className="nav-item hover:tw-bg-secondary tw-rounded-md ">
            <Link
              to={"/"}
              className="d-flex align-items-center gap-2 nav-link text-dark"
            >
              <GoHomeFill size={"20px"} />
              Home
            </Link>
          </li>
          <li className="hover:tw-bg-secondary tw-rounded-md  ">
            <Link
              to={"/explore"}
              className="d-flex align-items-center gap-2 nav-link text-dark"
            >
              <GoSearch size={"20px"} />
              Explore
            </Link>
          </li>
          <li className="hover:tw-bg-secondary tw-rounded-md  ">
            <Link
              to={"/create"}
              className="d-flex align-items-center gap-2 nav-link text-dark"
            >
              <MdOutlineAddBox size={"20px"} />
              Create
            </Link>
          </li>
          <li className="hover:tw-bg-secondary tw-rounded-md  ">
            <a
              href="#"
              className="d-flex align-items-center gap-2 nav-link text-dark"
            >
              <FaRegEnvelope size={"20px"} />
              Messages
            </a>
          </li>
          <li className="hover:tw-bg-secondary tw-rounded-md  ">
            <a
              href="#"
              className="d-flex align-items-center gap-2 nav-link text-dark"
            >
              <CgProfile size={"20px"} />
              Profile
            </a>
          </li>
        </ul>
        <div className="d-flex align-items-center">
          <img
            src="https://github.com/mdo.png"
            alt=""
            width="32"
            height="32"
            className="rounded-circle me-2 tw-cursor-pointer"
          />
          <strong className="tw-text-primary tw-cursor-pointer">mdo</strong>
          {isLoadingLogOut ? (
            <span className="loading loading-spinner"></span>
          ) : (
            <IoIosLogOut onClick={logOutBtn} className="ms-auto tw-cursor-pointer" size={"24px"} />
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default Navbar;
