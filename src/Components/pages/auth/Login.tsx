import Cookies from "js-cookie";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import apiClient from "../../../api/axios";
import NavbarComponent from "../../NavbarComponent";
import { QueryClient, useMutation } from "@tanstack/react-query";
import { loginSchema } from "@/zod/validation";
import { z } from "zod";
import axios from "axios";
import { useLocation } from "react-router-dom";

type ErrorType = Record<string, string | undefined>;
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<ErrorType>({});
  // Query client
  const queryClient = new QueryClient()

  const location = useLocation()
  const message = location.state?.message

  // handle form submit
  const handleSubmit = async (e: React.FocusEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("All fields are requires");
      return;
    }

    try {
      await loginSchema.parseAsync({ email, password });
      userLogin();
    } catch (error) {
      if (error instanceof z.ZodError) {
        console.log(error.errors);
        const newErrors: ErrorType = {};
        error.errors.forEach((element) => {
          if (element.path.length > 0) {
            newErrors[element.path[0]] = element.message;
          }
        });
        setErrors(newErrors);
      }
      console.log(errors);
    }
  };

  type User = {
    email: string;
    password: string;
  };

  const userPayload: User = {
    email,
    password,
  };

  // Login mutation
  const { mutate: userLogin } = useMutation({
    mutationFn: async () => {
      const response = await apiClient.post("/api/auth/login", userPayload);
      return response;
    },
    onError: (error) => {
      if(axios.isAxiosError(error)){
        if(error.response){
          toast.error(error.response?.data?.error)
          setErrors({'loginError': error.response?.data?.error})
        }
      }
      console.log(error);
    },
    onSuccess: ({ data }) => {
      window.localStorage.setItem("token", data?.token);
      Cookies.set("token", data.token, {
        expires: 7,
        path: "/",
        secure: true,
        sameSite: "strict",
      });
      queryClient.invalidateQueries({queryKey: ["getMe"]})
      window.location.href = "/";
    },
  });

  return (
    <div className="flex flex-col items-center w-full min-h-screen text-black bg-[#f8fafc]">
      <NavbarComponent />
      <div className="flex pt-10 transition-shadow duration-200 rounded-sm px-2w-full lg:h-4/5 lg:w-4/5">
        <div className="flex items-center justify-center w-full h-full">
          <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
            <h2 className="text-3xl font-bold text-center text-pink-600">
              Login
            </h2>
              {message && <div className="text-red-500 text-center mt-4">{message}</div>}
            <form
              onSubmit={handleSubmit}
              className="py-6 mt-8 space-y-6 w-[350px]"
            >
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="input-box"
                  required
                />
                {errors && <p className="text-red-600">{errors?.email}</p>}
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input-box"
                  required
                />
                {errors && <p className="text-red-600">{errors?.password}</p>}
                {errors && <p className="text-red-600">{errors?.loginError}</p>}

                <Link to={"/forgot-password"} className="mt-3 text-blue-600">
                  Forgot password
                </Link>
              </div>

              {/* {error && (
                <div
                          
                  className="text-sm text-red-500"
                >
                  {axios.isAxiosError(error)? error.response?.data.error:"Error"}
                </div>
              )} */}

              <button
                type="submit"
                className="w-full px-4 py-2 font-bold text-white transition bg-pink-600 rounded-md hover:bg-pink-500 focus:outline-none focus:ring-2 focus:ring-pink-400"
              >
                Login
              </button>
            </form>
            <div className="flex items-center justify-center w-full pb-4 mx-auto mt-6">
          <span className="mr-2 text-sm text-center">
            Don't have an account?{" "}
          </span>
          <Link to={"/signup"} className="text-blue-500">
            Create
          </Link>
        </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
