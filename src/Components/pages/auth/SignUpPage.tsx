import React, { useState } from "react";
import Cookies from "js-cookie";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import apiClient from "../../../api/axios";
import axios from "axios";

const SignUpPage = () => {
  const [formData, setFormData] = useState({
    username: "",
    fullname: "",
    email: "",
    password: "",
  });

  // Query Client
  const queryClient = useQueryClient();

  // handle data changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // mutaion function for user sign up
  const signUpUser = async () => {
    const response = apiClient.post("/api/auth/signup", formData);
    return response
  };

  // Mutaion for user signUp
  const { mutate: SignUp, isPending } = useMutation({
    mutationFn: signUpUser,
     onError: (error) => {
      if(axios.isAxiosError(error)) {
        const errMessage = error.response?.data?.error || "Something went wrong"
        toast.error(errMessage)
      }
    },
    onSuccess: ({data})=>{
      console.log(data)
      window.localStorage.setItem("token", data?.token)
      Cookies.set('token', data.token, {
        expires: 365,
        path: '/',
        secure: true,
        sameSite: 'strict',
      });
      setFormData({username: "", fullname:"", email:"",password:""})
    toast.success("A verification email has been set to your email account.")
    }
  })

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formData.username || !formData.password)
      return toast.error("All input fields are required!");
    if(formData.password.length < 6)
      return toast.error("Password must be atleast 6 characters long")
    SignUp();
  };

  return (
    <div className="flex w-full bg-[#f8fafc] max-w-screen-xl h-screen pt-10 mx-auto lg:pl-0">
      <section className="items-center justify-center hidden w-full sm:flex-col sm:flex sm:w-1/2">
        <img src="/Logo.svg" alt="" />
        <h2 className="text-2xl font-semibold text-gray-700">JobBox</h2>
      </section>
      <section className="flex flex-col items-center justify-center w-full sm:w-1/2">
        <h2 className="mt-8 text-3xl font-bold lg:text-5xl md:text-3xl">
          Find you dream job
        </h2>
        <h2 className="mt-4 text-2xl font-bold lg:mt-8 lg:text-4xl">
          Join today.
        </h2>
        <form className="w-64 mt-8" onSubmit={handleSubmit}>
          <div className="flex flex-col mt-2">
            <input
              type="text"
              placeholder="username"
              value={formData.username}
              onChange={handleInputChange}
              name="username"
              id="username"
              autoComplete="off"
              className="input input-bordered hover:border-[#0e659b] hover:border-2 text-black bg-transparent border-2 border-gray-400 w-full max-w-xs rounded-lg focus:outline-none focus:border-2 focus:border-[#1DA1F2] transition-colors duration-200"
            />
          </div>

          <div className="flex flex-col mt-2">
            <input
              type="text"
              placeholder="fullname"
              value={formData.fullname}
              onChange={handleInputChange}
              name="fullname"
              id="fullname"
              autoComplete="off"
              className="input input-bordered hover:border-[#0e659b] hover:border-2 text-black bg-transparent border-2 border-gray-400 w-full max-w-xs rounded-lg focus:outline-none focus:border-2 focus:border-[#1DA1F2] transition-colors duration-200"
            />
          </div>

          <div className="flex flex-col mt-2">
            <input
              type="email"
              placeholder="your@email"
              value={formData.email}
              onChange={handleInputChange}
              name="email"
              id="email"
              autoComplete="off"
              className="input input-bordered hover:border-[#0e659b] hover:border-2 text-black bg-transparent border-2 border-gray-400 w-full max-w-xs rounded-lg focus:outline-none focus:border-2 focus:border-[#1DA1F2] transition-colors duration-200"
            />
          </div>

          <div className="flex flex-col mt-2">
            <input
              type="password"
              placeholder="password"
              value={formData.password}
              onChange={handleInputChange}
              name="password"
              id="password"
              autoComplete="off"
              className="input input-bordered hover:border-[#0e659b] hover:border-2 text-black bg-transparent border-2 border-gray-400 w-full max-w-xs rounded-lg focus:outline-none focus:border-2 focus:border-[#1DA1F2] transition-colors duration-200"
            />
          </div>

          {/* {isError && <div className="text-red-400">{error.response.data.error}</div>}
          {isSuccess && <div className="text-green-400">{signUpData.data?.message}</div>} */}
          <div className="mx-auto w-60 ">
            <button
              type="submit"
              className="w-full py-2 mt-4 font-semibold text-center text-black rounded-lg bg-violet-500"
            >
              {isPending ? "Signing up..." : "Sign Up"}
            </button>
          </div>
        </form>

        <div className="flex items-center justify-center w-full pb-4 mx-auto mt-6">
          <span className="mr-2 text-sm text-center">
            Already have an account?{" "}
          </span>
          <Link to={"/login"} className="text-blue-500">
            Login
          </Link>
        </div>
      </section>
    </div>
  );
};

export default SignUpPage;
