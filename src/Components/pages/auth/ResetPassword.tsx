import React, { ReactElement, useState } from "react";
import apiClient from "../../../api/axios";
import { QueryClient, useMutation, useQueryClient } from "@tanstack/react-query";
import { RiArrowGoBackFill, RiKey2Fill } from "react-icons/ri";
import { Link, redirect, useParams } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { SiTicktick } from "react-icons/si";

const ResetPassword = () => {
  const { token } = useParams();
  const queryClient = new QueryClient();

  const {mutate:Reset, error, isError, isSuccess} = useMutation({mutationFn:  async() =>{
    const response = await apiClient.patch("/api/auth/reset-password/"+token, {newPassword: password})
    return response.data
  }
,
onError: (err)=>{
  if(axios.isAxiosError(err)){
    if(err.response)
      toast.error(err.response.data.error)
  }
},
onSuccess: ()=>{
  toast.success("Password reset successfully")
}});


  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  const handleResetPassword = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      return alert("Passwords do not match");
    }
    if (password.length < 6)
      return alert("Password must be at least 6 characters long");

   await Reset()

    setPassword("")
    setConfirmPassword("")
    queryClient.invalidateQueries({queryKey: ["getMe"]})
  };

  return (
    <div className="flex items-center justify-center w-full h-screen bg-white flec-col">
      {!isSuccess && (
        <div className="flex flex-col items-center justify-center w-full h-full">
        <div className="flex flex-col items-center text-center">
          <div className="inline-block px-3 py-3 text-2xl rounded-full shadow-md shadow-violet-200 bg-violet-100 text-violet-400">
            <RiKey2Fill size={25} />
          </div>
          <h1 className="mt-3 text-3xl font-semibold text-center text-gray-500">
            Set new password
          </h1>
          <p className="mt-2">
            Your new password must be different to <br /> previously used
            passwords.
          </p>
        </div>

        <form
          onSubmit={handleResetPassword}
          className="max-w-[350px] w-full mt-6"
        >
          <div>
            <label htmlFor="password" className="font-semibold text-gray-700">
              Password
            </label>
            <input
              type="text"
              className="w-full px-2 py-2 text-black transition bg-transparent border-2 border-gray-400 rounded-md outline-none focus:border-violet-400"
              placeholder="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="mt-6">
            <label htmlFor="password" className="font-semibold text-gray-700">
              Confirm password
            </label>
            <input
              type="text"
              className="w-full px-2 py-2 text-black transition bg-transparent border-2 border-gray-400 rounded-md outline-none focus:border-violet-400"
              placeholder="confirm password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>

          {isError &&  <p className="text-red-500">{axios.isAxiosError(error)? error.response?.data.error:"Error"}</p>}

          <button
            className="w-full px-4 py-2 mt-4 font-semibold text-white transition rounded-md bg-violet-500 hover:bg-violet-700"
            type="submit"
          >
            Reset password
          </button>
        </form>

        <Link to={"/login"} className="flex items-center mt-3 text-center">
              <RiArrowGoBackFill /> Back to login
            </Link>
      </div>
      )}

      {isSuccess && (
        <div className="flex flex-col items-center">
          <div className="flex items-center justify-center w-12 h-12 text-green-600 bg-green-300 rounded-full shadow-[0px_0px_0px_10px_#c6f6d5]"> 
            <SiTicktick size={25}/> 
          </div>
          <h2 className="mt-6 text-2xl font-bold text-center">Password reset</h2>
          <p>Your password has been successfully reset. <br /> Click below to login magically</p>
          <Link to={"/login"}
            className="w-full px-4 py-2 mt-4 font-semibold text-center text-white transition rounded-md bg-violet-500 hover:bg-violet-700"
          >
            Continue
          </Link>
        </div>
      )}
    </div>
  );
};

export default ResetPassword;
