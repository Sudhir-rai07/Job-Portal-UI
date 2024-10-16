import { QueryClient, useMutation } from "@tanstack/react-query";
import Cookies from 'js-cookie'
import axios from "axios";
import { motion } from "framer-motion";
import React, { useState } from "react";
import { Button } from "react-daisyui";
import toast from "react-hot-toast";
import { Link, useParams } from "react-router-dom";
import apiClient from "../../../api/axios";
import NavbarComponent from "../../NavbarComponent";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<Object | null>(null);

  // Query client
  const queryClient = new QueryClient()

  // handle form submit
  const handleSubmit = async (e: React.FocusEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("All fields are requires");
      return;
    }

    // Api call
    userLogin();
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
  const { mutate: userLogin, isError } = useMutation({
    mutationFn: async () => {
     const response =  await apiClient.post("/api/auth/login", userPayload);
     return response
    },
    onError: (error)=>{
      console.log(error)
      setError(error)
    }, onSuccess: ({data})=>{
      window.localStorage.setItem("token", data?.token)
      Cookies.set('token', data.token, {
        expires: 365,
        path: '/',
        secure: true,
        sameSite: 'strict',
      });
      window.location.href = "/"
      
    }
  });

  return (
    <div className="flex flex-col items-center w-full h-screen text-black bg-[#f8fafc]">
      <NavbarComponent />
      <div className="flex pt-10 transition-shadow duration-200 rounded-sm px-2w-full lg:h-4/5 lg:w-4/5">
        <div className="flex items-center justify-center w-full">
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg"
          >
            <motion.h2
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="text-3xl font-bold text-center text-violet-600"
            >
              Login
            </motion.h2>

            <form onSubmit={handleSubmit} className="py-6 mt-8 space-y-6 w-[350px]">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email address
                </label>
                <motion.input
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5, duration: 0.8 }}
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 mt-1 transition bg-transparent border rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <motion.input
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7, duration: 0.8 }}
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3 py-2 mt-1 transition bg-transparent border rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                  required
                />
                <Link to={'/forgot-password'} className="mt-3 text-blue-600">Forgot password</Link>
              </div>


              {error && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                  className="text-sm text-red-500"
                >
                  {axios.isAxiosError(error)? error.response?.data.error:"Error"}
                </motion.div>
              )}

              <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1, duration: 0.5 }}
                type="submit"
                className="w-full px-4 py-2 font-bold text-white transition rounded-md bg-violet-600 hover:bg-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-400"
              >
                Login
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Login;
