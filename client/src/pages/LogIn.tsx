import "bootstrap/dist/css/bootstrap.min.css";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import { z, ZodType } from "zod";
import { IUser } from "../interface";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import toast, { Toaster } from "react-hot-toast";
import { useEffect } from "react";
import useLogIn from "../hooks/useLogIn";
import { Link } from "react-router-dom";

const LogInSchema: ZodType<IUser> = z.object({
  email: z.string().email("Invalid email format"),
  password: z.string().min(6, "Password must have at least 6 characters"),
});

const pageVariants = {
  initial: { opacity: 0, x: -50 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 50 },
};

const LogIn = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IUser>({
    resolver: zodResolver(LogInSchema),
  });

  const { logIn, isLoading, errorLogIn, setErrorLogIn } = useLogIn();

  const onSubmit = async (data: IUser) => {
    try {
      await logIn(data);
    } catch (error: unknown) {
      if (error instanceof Error) {
        setErrorLogIn(error.message);
      } else {
        setErrorLogIn("An unknown error occurred");
      }
      toast.error(errorLogIn);
    }
  };

  useEffect(() => {
    if (errorLogIn) {
      toast.error(errorLogIn);
    }
  }, [errorLogIn]);

  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageVariants}
      transition={{ duration: 0.5 }}
      className="container tw-bg-secondary col-lg-6 "
    >
        {errorLogIn && <Toaster />}
        <div className="d-flex align-items-center justify-content-center tw-gap-8 tw-h-full ">
          <div className="d-flex flex-column d-none d-lg-block col-lg-5 ms-4">
            <h2 className="text-white tw-text-4xl mb-2">
              Don't have an account?
            </h2>
            <Link
              to={"/signup"}
              className="tw-btn tw-btn-outline hover:tw-bg-primary text-white tw-text-xl col-lg-6"
            >
              Sign up
            </Link>
          </div>
          <div className="d-flex tw-rounded-sm flex-column col-lg-6 justify-content-center align-items-center tw-bg-background tw-shadow-2xl tw-shadow-secondary tw-h-96 gap-4 p-4">
            <h1 className="tw-text-primary">Log In</h1>
            <Form
              onSubmit={handleSubmit(onSubmit)}
              className="tw-w-full d-flex flex-column gap-2 text-decoration-none mt-2"
            >
              <FloatingLabel label="Email">
                <Form.Control
                  {...register("email")}
                  isInvalid={!!errors.email}
                  type="email"
                  placeholder="johndoe@example.com"
                />
              </FloatingLabel>
              {errors.email && (
                <div className="text-danger">{errors.email.message}</div>
              )}
              <FloatingLabel label="Password">
                <Form.Control
                  {...register("password")}
                  isInvalid={!!errors.password}
                  type="password"
                  placeholder="*****"
                />
              </FloatingLabel>
              {errors.password && (
                <div className="text-danger">{errors.password.message}</div>
              )}
              <button
                type="submit"
                className="tw-btn mt-4 tw-bg-primary text-white hover:tw-bg-secondary"
              >
                {isLoading ? (
                  <span className="loading loading-spinner"></span>
                ) : (
                  "Log In"
                )}
              </button>
            </Form>
            <span className="tw-text-secondary tw-cursor-default mt-1 d-lg-none d-xl-none">
              Don't have an account?
              <Link to={"/signup"} className="link tw-cursor-pointer">
                {" "}
                Sign up
              </Link>
            </span>
          </div>
        </div>
    </motion.div>
  );
};

export default LogIn;
