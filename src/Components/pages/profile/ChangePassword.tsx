import { useMutation } from '@tanstack/react-query'
import React, { useState } from 'react'
import apiClient from '../../../api/axios'
import axios from 'axios'
import toast from 'react-hot-toast'

const ChangePassword = () => {
    const [currentPassword, setCurrentPassword] = useState<string>("")
    const [newPassword, setNewPassword] = useState<string>("")
    const [confirmPassword, setConfirmPassword] = useState<string>("")

    const userPayload = {
      currentPassword,
      newPassword
    }
    // Change password mutation
    const {mutate:changePassword, isError, error, isPending} = useMutation({mutationFn: async()=>{
        const response = await apiClient.put("/api/auth/change-password", userPayload)
        return response.data
    },
onError: (err)=>{
    if(axios.isAxiosError(err)){
            if(err.response){
                toast.error(err.response.data.error)
            }
            console.log(err)
    }
},
onSuccess: ()=>{
    toast.success("Password Changed")
}})

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault()
        console.log(currentPassword, newPassword)
        await changePassword()
        // setCurrentPassword("")
        // setNewPassword("")
        // setConfirmPassword("")
    }
  return (
    <div className='flex flex-col items-center justify-center w-full h-full'>
      <h2 className='text-3xl text-gray-500 transition lg:tex-3xl'>Change password</h2>
      <form className='flex flex-col' onSubmit={handleSubmit}>
        <input type="password" placeholder='Current password' className='bg-transparent mt-8 outline-none mb-8 min-w-[350px] w-full border-gray-400 border-2 rounded-md focus:border-violet-500 py-2 px-2 ' name='old-password' value={currentPassword} onChange={(e)=> setCurrentPassword(e.target.value)}  />

        <input type="password" placeholder='New password' className='bg-transparent outline-none  min-w-[350px] w-full border-gray-400 border-2 rounded-md focus:border-violet-500 py-2 px-2 ' name='old-password' value={newPassword} onChange={(e)=> setNewPassword(e.target.value)}  />
        
        <input type="password" placeholder='Confirm password' className='bg-transparent outline-none  min-w-[350px] w-full border-gray-400 border-2 mt-4 rounded-md focus:border-violet-500 py-2 px-2 ' name='old-password' value={confirmPassword} onChange={(e)=> setConfirmPassword(e.target.value)}  />

        {isError &&<p className='font-semibold text-red-500'>{axios.isAxiosError(error) ? error.response?.data.error:"Error"}</p>}
        {confirmPassword && confirmPassword !== newPassword &&<p className='font-semibold text-red-500'>Password doesn't match</p>}

        <div className="w-60 ">
            <button
              type="submit"
              className="w-[350px] py-2 mt-2 font-semibold text-center text-white rounded-lg bg-violet-500"
            >
              {isPending?"Changing...":"ChangePassword"}
            </button>
          </div>
      </form>
    </div>
  )
}

export default ChangePassword
