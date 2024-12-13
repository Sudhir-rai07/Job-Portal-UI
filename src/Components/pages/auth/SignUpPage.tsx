import React, { useState } from "react";
import Cookies from "js-cookie";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import apiClient from "../../../api/axios";
import axios from "axios";
import { signUpSchema } from "@/zod/validation";
import { z } from "zod";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/Components/ui/select";

type ErrorType = Record<string, string | undefined>;
const SignUpPage = () => {
  const [username, setUsername] = useState<string>("")
  const [fullname, setFullname] = useState<string>("")
  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [role, setRole] = useState<string>("")

  const [errors, setErrors] = useState<ErrorType>({});
  // Query Client
  // const queryClient = useQueryClient();

  const formData = {
    username, 
    fullname,
    email,
    password,
    role
  }

  // mutaion function for user sign up
  const signUpUser = async () => {
    const response = apiClient.post("/api/auth/signup", formData);
    return response;
  };

  // Mutaion for user signUp
  const { mutate: SignUp, isPending } = useMutation({
    mutationFn: signUpUser,
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        const errMessage =
          error.response?.data?.error || "Something went wrong";
        toast.error(errMessage);
      }
    },
    onSuccess: ({ data }) => {
      console.log(data);
      window.localStorage.setItem("token", data?.token);
      Cookies.set("token", data.token, {
        expires: 7,
        path: "/",
        secure: true,
        sameSite: "strict",
      });
      toast.success("A verification email has been set to your email account.");
    },
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await signUpSchema.parseAsync(formData);
      console.log(formData)
      SignUp();
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: ErrorType = {};
        error.errors.forEach((err) => {
          if (err.path.length > 0) {
            newErrors[err.path[0]] = err.message;
          }
        });
        setErrors(newErrors);
      }
    }
  };

  return (
    <div className="flex w-full bg-[#f8fafc] max-w-screen-xl h-screen pt-10 mx-auto">
      <section className="items-center justify-center hidden w-full sm:flex-col sm:flex sm:w-1/2">
        <img src="/Logo.svg" alt="" />
        <h2 className="text-2xl font-semibold text-gray-700">JobBox</h2>
      </section>
      <section className="flex flex-col items-center justify-center w-full h-full">
        <h2 className="mt-8 text-3xl font-bold lg:text-5xl md:text-3xl">
          Find you dream job
        </h2>
        <h2 className="mt-4 text-2xl font-bold lg:mt-8 lg:text-4xl">
          Join today.
        </h2>
        <form className="w-full mt-8 max-w-72 min-w-64" onSubmit={handleSubmit}>
          <div className="flex flex-col mt-2">
            <input
              type="text"
              placeholder="username"
              value={username}
              onChange={(e)=> setUsername(e.target.value)}
              name="username"
              id="username"
              autoComplete="off"
              className="input-box"
            />
            {errors && <p className="text-red-600">{errors?.username}</p>}
          </div>

          <div className="flex flex-col mt-2">
            <input
              type="text"
              placeholder="fullname"
              value={fullname}
              onChange={(e)=> setFullname(e.target.value)}
              name="fullname"
              id="fullname"
              autoComplete="off"
              className="input-box"
            />
            {errors && <p className="text-red-600">{errors?.fullname}</p>}
          </div>

          <div className="flex flex-col mt-2">
            <input
              type="email"
              placeholder="your@email"
              value={email}
              onChange={(e)=> setEmail(e.target.value)}
              name="email"
              id="email"
              autoComplete="off"
              className="input-box"
            />
            {errors && <p className="text-red-600">{errors?.email}</p>}
          </div>

          <div className="flex flex-col mt-2">
          <Select onValueChange={value => setRole(value)}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Select role" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Roles</SelectLabel>
          <SelectItem value="job_seeker">Job Seeker</SelectItem>
          <SelectItem value="recruiter">Recruiter</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
            {errors && <p className="text-red-600">{errors?.email}</p>}
          </div>

          <div className="flex flex-col mt-2">
            <input
              type="password"
              placeholder="password"
              value={password}
              onChange={(e)=> setPassword(e.target.value)}
              name="password"
              id="password"
              autoComplete="off"
              className="input-box"
            />
            {errors && <p className="text-red-600">{errors?.password}</p>}
          </div>

          {/* {isError && <div className="text-red-400">{error.response.data.error}</div>}
          {isSuccess && <div className="text-green-400">{signUpData.data?.message}</div>} */}

          <button
            type="submit"
            className="w-full py-2 mt-4 font-semibold text-center text-white bg-pink-500 rounded-lg"
          >
            {isPending ? "Signing up..." : "Sign Up"}
          </button>
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
