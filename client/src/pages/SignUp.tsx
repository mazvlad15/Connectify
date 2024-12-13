import "bootstrap/dist/css/bootstrap.min.css";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import { z, ZodType } from "zod";
import { IUser } from "../interface";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import useSignUp from "../hooks/auth/useSignUp";
import { motion } from "framer-motion";
import toast, { Toaster } from "react-hot-toast";
import { useEffect } from "react";
import { Link } from "react-router-dom";

const signUpSchema: ZodType<IUser> = z
  .object({
    fullName: z.string().min(3, "Full Name must have at least 3 characters"),
    email: z.string().email("Invalid email format"),
    password: z.string().min(6, "Password must have at least 6 characters"),
    confirmPassword: z
      .string()
      .min(6, "Password must have at least 6 characters"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password do not match",
    path: ["confirmPassword"],
  });

const pageVariants = {
  initial: { opacity: 0, x: -50 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 50 },
};

const SignUp = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IUser>({
    resolver: zodResolver(signUpSchema),
  });

  const { signUp, isLoading, errorSignUp, setError } = useSignUp();

  const onSubmit = async (data: IUser) => {
    try {
      await signUp(data);
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("An unknown error occurred");
      }
      toast.error(errorSignUp);
    }
  };

  useEffect(() => {
    if (errorSignUp) {
      toast.error(errorSignUp);
    }
  }, [errorSignUp]);

  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageVariants}
      transition={{ duration: 0.5 }}
      className="container tw-bg-secondary col-lg-6 h-50"
    >
      {errorSignUp && <Toaster />}
      <div className="d-flex align-items-center justify-content-center tw-gap-8 tw-h-full ">
        <div className="d-flex flex-column d-none d-lg-block col-lg-5 ms-4">
          <h2 className="text-white tw-text-4xl mb-2">Have an account?</h2>
          <Link
            to={"/login"}
            className="tw-btn tw-btn-outline hover:tw-bg-primary text-white tw-text-xl col-lg-6"
          >
            Log in
          </Link>
        </div>
        <div className="d-flex flex-column col-lg-6 justify-content-center align-items-center tw-bg-background tw-shadow-2xl tw-shadow-secondary p-4 tw-h-auto tw-w-80">
          <h1 className="tw-text-primary">Sign Up</h1>
          <Form
            onSubmit={handleSubmit(onSubmit)}
            className="tw-w-full d-flex flex-column gap-2 text-decoration-none mt-2"
          >
            <FloatingLabel label="Full Name">
              <Form.Control
                type="text"
                placeholder="John Doe"
                {...register("fullName")}
                isInvalid={!!errors.fullName}
              />
            </FloatingLabel>
            {errors.fullName && (
              <div className="text-danger">{errors.fullName.message}</div>
            )}
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
            <FloatingLabel label="Confirm Password">
              <Form.Control
                {...register("confirmPassword")}
                isInvalid={!!errors.confirmPassword}
                type="password"
                placeholder="*****"
              />
            </FloatingLabel>
            {errors.confirmPassword && (
              <div className="text-danger">
                {errors.confirmPassword.message}
              </div>
            )}
            <button
              type="submit"
              className="tw-btn mt-4 tw-bg-primary text-white hover:tw-bg-secondary"
            >
              {isLoading ? (
                <span className="loading loading-spinner"></span>
              ) : (
                "Sign up"
              )}
            </button>
          </Form>
          <span className="tw-text-secondary tw-cursor-default mt-1 d-lg-none d-xl-none">
            Already have an account?
            <Link to={"/login"} className="link tw-cursor-pointer">
              {" "}
              Log in
            </Link>
          </span>
        </div>
      </div>
    </motion.div>
  );
};

export default SignUp;
