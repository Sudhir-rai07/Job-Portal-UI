import { useMutation, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import toast from "react-hot-toast";
import { RiArrowGoBackFill, RiKey2Fill } from "react-icons/ri";
import { Link } from "react-router-dom";
import apiClient from "../../../api/axios";
import { User } from "../../../Types/types";
import axios from "axios";
import { MdOutlineEmail } from "react-icons/md";

const ForgotPassword = () => {
  const [email, setEmail] = useState<string>("");

  // Query for finding the user by email
  const {
    data: userData,
    refetch: fetchUser,
    isFetching,
    error,
    isError,
  } = useQuery<User>({
    queryKey: ["findUser", email], // Dependency on email value
    queryFn: async () => {
      if (!email) throw new Error("Email is required");
      const response = await apiClient.get(`/api/auth/find-user/${email}`);
      return response.data;
    },
    enabled: false, // Don't auto-fetch until submit
    refetchOnWindowFocus: false,
  });

  // QueryToSendPasswordResetLink
  const { mutate: sendPasswordResetLink, isSuccess: passwordResetEmailSent } =
    useMutation({
      mutationFn: async () => {
        const response = await apiClient.post("/api/auth/forgot-password", {
          email: email,
        });
        return response.data;
      },
      onError: async (error) => {
        if (axios.isAxiosError(error)) {
          if (error.response) {
            toast.error(error.response.data.error);
          }
        }
      },
      onSuccess: () => {
        toast.success("Password reset link sent to your email");
        return <CheckEmail />;
      },
    });

  // Handle form submission
  const handleSarchUser = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email) {
      toast.error("Please enter a valid email");
      return;
    }
    fetchUser();
  };

  // Handle send password reset link
  const handlePass = () => {
    sendPasswordResetLink();
  };

  return (
    <div className="w-full h-screen bg-white">
      <div className="flex flex-col items-center justify-center w-full h-full">
        {!userData && (
          <div className="flex flex-col items-center justify-center w-full h-full">
            <div className="px-3 py-3 text-2xl rounded-full shadow-md shadow-violet-200 bg-violet-100 text-violet-400">
              <RiKey2Fill size={25} />
            </div>

            <div className="my-4 text-center text-gray-500">
              <h2 className="text-2xl lg:text-3xl">Forgot password?</h2>
              <p className="mt-3 text-base">
                No worries, We will send you reset instructions.
              </p>
            </div>

            <form className="flex flex-col" onSubmit={handleSarchUser}>
              <label htmlFor="email" className="font-semibold text-gray-700">
                Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="px-3 py-2 bg-transparent border-2 placeholder:text-gray-500 text-black border-gray-200 focus:border-gray-400 transition min-w-[350px] rounded-md outline-none"
              />
              <button
                className="px-4 py-2 mt-4 font-semibold text-white transition rounded bg-violet-500 hover:bg-violet-700"
                type="submit"
                disabled={isFetching} // Disable button while fetching
              >
                {isFetching ? "Searching..." : "Search account"}
              </button>
            </form>

            {error && <p className="mt-3 text-red-500">User not found</p>}

            <Link to={"/login"} className="flex items-center mt-3 text-center">
              <RiArrowGoBackFill /> Back to login
            </Link>
          </div>
        )}

        {userData && !passwordResetEmailSent && (
          <div className="border-2 min-w-[350px] flex flex-col my-4 py-2 px-2 border-gray-300 rounded-md">
            <div className="flex flex-col items-center">
              <div className="text-2xl text-center text-gray-500">
                We'll send you a code to your <br /> email address <br />{" "}
                <span className="text-sm">{email}</span>
              </div>
              <img
                src="/profile-placeholder.png"
                alt="profile placeholder"
                className="w-32 h-32 overflow-hidden rounded-full"
              />
              <p className="text-2xl font-semibold text-gray-600">
                {userData?.username}
              </p>{" "}
              {/* Show username from userData */}
            </div>
            <button
              onClick={handlePass}
              className="px-4 py-2 mt-4 font-semibold text-white transition rounded bg-violet-500 hover:bg-violet-700"
            >
              Continue
            </button>
            <Link
              to={"/login"}
              className="flex items-center mx-auto mt-3 text-center"
            >
              <RiArrowGoBackFill /> Back to login
            </Link>
          </div>
        )}

        {passwordResetEmailSent && (
          // MdOutlineEmail
          <div className="flex flex-col items-center justify-center mt-8">
            <div className="email-icon-container">
              <div className="inline-block px-3 py-3 text-2xl rounded-full shadow-md shadow-violet-200 bg-violet-100 text-violet-400">
                <MdOutlineEmail size={25} />
              </div>
            </div>
            <div className="text-center email-message">
              <p className="text-2xl font-semibold text-gray-500">
                Check your email
              </p>
              <p>
                We have sent a password reset link to <br />
                <span className="font-semibold">{email}</span>
              </p>
            </div>
            <button className="px-4 py-2 mt-4 font-semibold text-white transition rounded open-email-app-btn bg-violet-500 hover:bg-violet-700">
              <a href="https://mail.google.com" target="_blank">
                Open email app
              </a>
            </button>
            <div className="mt-4">
              Didn't receive the email ?{" "}
              <span
                className="text-sm font-semibold cursor-pointer text-violet-500"
                onClick={handlePass}
              >
                Click to resend
              </span>
            </div>
            <Link
              to={"/login"}
              className="flex items-center mx-auto mt-3 text-center"
            >
              <RiArrowGoBackFill /> Back to login
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;

const CheckEmail = () => {
  return <h1>Chebck Baby</h1>;
};
