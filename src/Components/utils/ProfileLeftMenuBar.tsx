import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import React from 'react'
import toast from 'react-hot-toast'
import { CiBellOn, CiUser } from 'react-icons/ci'
import { MdAddCircleOutline, MdOutlineVerified } from 'react-icons/md'
import { PiUserCircleGear } from 'react-icons/pi'
import { TbLogout2 } from 'react-icons/tb'
import { Link } from 'react-router-dom'
import apiClient from '../../api/axios'

const ProfileLeftMenuBar = () => {


    const { mutate: Logout } = useMutation({
        mutationFn: async () => {
          const response = await apiClient.post("/api/auth/logout");
          return response.data;
        },
        onError: (err) => {
          if (axios.isAxiosError(err)) {
            if (err.response) {
              toast.error(err.response.data.error);
            }
          }
        },
        onSuccess: () => {
          toast.success("Logged out");
          window.localStorage.removeItem("token")
          window.location.href = "/login"
        },
      });
    
      const handleLogout = () => {
        Logout();
      };

  return (
    <div className="grid row-span-1 px-2 py-3 bg-white rounded-md max-h-64">
    <Link
      to={"/profile/"}
      className="flex items-center gap-1 px-2 py-2 text-black rounded-md cursor-pointer"
    >
      <CiUser size={25} />
      <span className="hidden lg:inline-block">Profile Setting</span>
    </Link>

    <Link to={"/update-profile"} className="flex items-center gap-1 px-2 py-2 text-black rounded-md cursor-pointer">
      <PiUserCircleGear size={25} />
      <span className="hidden lg:inline-block">
        Update
      </span>
    </Link>

    <div className="flex items-center gap-1 px-2 py-2 text-black rounded-md cursor-pointer">
      <CiBellOn size={25} />
      <Link to={"/otifications"} className="hidden lg:inline-block">
        Notification
      </Link>
    </div>

    <div className="flex items-center gap-1 px-2 py-2 text-black rounded-md cursor-pointer">
      <MdOutlineVerified size={25} />
      <span className="hidden lg:inline-block">Verification</span>
    </div>

    <Link to={"/post-a-job"} className="flex items-center gap-1 px-2 py-2 text-black rounded-md cursor-pointer">
      <MdAddCircleOutline  size={25} />
      <span className="hidden lg:inline-block">Post a job</span>
    </Link>

    <div
      onClick={handleLogout}
      className="flex items-center gap-1 px-2 py-2 text-black rounded-md cursor-pointer"
    >
      <TbLogout2 size={25} />
      <span className="hidden lg:inline-block">Logout</span>
    </div>
  </div>
  )
}

export default ProfileLeftMenuBar
