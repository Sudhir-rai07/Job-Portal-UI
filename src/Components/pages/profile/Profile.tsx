import { useMutation, useQuery } from "@tanstack/react-query";
import React, { ReactElement, useRef } from "react";
import {  FaGear } from "react-icons/fa6"
import { User } from "../../../Types/types";
import ProfileLeftMenuBar from "../../utils/ProfileLeftMenuBar";

const Profile = () => {
  // User data
  const { data: currentUser } = useQuery<User>({ queryKey: ["getMe"] });
  console.log(currentUser?.username);

  // Profile image refrance
  const profileImageRef = useRef<HTMLInputElement>(null);
  // Form Submit ref
  const submitRef = useRef<HTMLButtonElement>(null);


  // React-daisy-UI modal refrance
  // const ref = useRef<HTMLDialogElement>(null);
  // const handleShow = useCallback(() => {
  //   ref.current?.showModal();
  // }, [ref]);

  return (
    <div className="flex w-full h-screen text-black bg-slate-100">
      <div className="w-full h-[90%] mx-auto bg-slate-200 lg:w-2/3  overflow-y-scroll px-4 my-auto rounded-lg py-2">
        <div className="flex items-center gap-2 text-xl ">
          <span>
            <FaGear />
          </span>
          Account setting
        </div>

        <div className="flex gap-4 mt-6 grid-rows-12 ">
          {/* Leftnavbar action menu */}
        <ProfileLeftMenuBar />

          <div className="flex-1 px-4 py-2 bg-white rounded-md">
            {/* Profile image */}
            <div className="flex items-center gap-6">
              <img
                src={"/profile-placeholder.png"}
                alt=""
                className="w-24 overflow-hidden border-2 border-blue-900 rounded-full lg:w-32 aspect-square"
              />
            </div>

            <div className="mt-6">
              {/* Form */}
              <div className="">
                {/* Basic */}
                <div className="grid grid-cols-2 gap-6">
                  <div className="flex flex-col">
                    <label className="font-semibold" htmlFor="username">
                      Username
                    </label>
                    <div
                      id="username"
                      className="inline px-2 py-3 text-gray-500 transition-colors bg-transparent border-2 rounded-md outline-none"
                    >
                      {currentUser?.username}
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <label className="font-semibold" htmlFor="fullname">
                      Fullname
                    </label>
                    <div
                      id="fullname"
                      className="inline px-2 py-3 text-gray-500 transition-colors bg-transparent border-2 rounded-md outline-none focus:border-blue-500 focus:bg-blue-100 "
                    >
                      {currentUser?.fullname}
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <label className="font-semibold" htmlFor="email">
                      Email
                    </label>
                    <div
                      id="email"
                      className="inline px-2 py-3 text-gray-500 transition-colors bg-transparent border-2 rounded-md outline-none focus:border-blue-500 focus:bg-blue-100 "
                    >
                      {currentUser?.email}
                    </div>
                  </div>
                  <div className="flex items-center gap-3 bg-transparent">
                    <h2 className="font-semibold">Gender</h2>
                    <div className="flex items-center gap-2 px-2 py-2 bg-white border-2 rounded-md ">
                      <span>{currentUser?.gender}</span>
                    </div>
                  </div>
                </div>
                {/* Address */}
                <div className="min-w-full mt-8">
                  <h2 className="font-semibold">Address</h2>
                  <div
                    id="address"
                    className="min-w-full px-2 py-2 text-gray-500 bg-white border-2 rounded-md outline-none resize-none"
                  >
                    {currentUser?.address || <span className="text-gray-500">Update your address</span>}
                  </div>
                </div>
                {/* About */}
                <div className="min-w-full">
                  <h2 className="font-semibold">About</h2>
                  <div className="min-w-full px-2 py-2 text-gray-500 bg-white border-2 rounded-md outline-none resize-none">
                    {currentUser?.about || 
                    <span className="text-gray-500">Tell us a little about yourself. What do you do? What are your hobbies?</span>}
                  </div>
                </div>
                {/* Resume */}
                {/* <div className="min-w-full">
                  <h2 className="font-semibold">
                    Resume <span className="font-normal"></span>
                  </h2>
                  <a 
                    href={currentUser?.resume ||
                      "https://example.com/resume.pdf"
                    }
                    id="resume"
                    className="min-w-full px-2 py-2 underline bg-white border-2 rounded-md outline-none resize-none "
                  ></a>
                </div> */}
                {/* Education */}
                <div className="min-w-full">
                  <h2 className="font-semibold">Education</h2>
                  <div
                    id="education"
                    className="min-w-full px-2 py-2 text-gray-500 bg-white border-2 rounded-md outline-none resize-none "
                  >
                    {currentUser?.education ||
                    <span className="text-gray-500">Please Update about your education</span>}
                  </div>
                </div>
                {/* <button type="submit" ref={submitRef}></button> */}
              </div>

              {/* Skill part */}
              <div className="flex px-2 py-4 mt-4 border-2 rounded-md justify-evenly ">
                <div className="w-32 mr-auto">
                  <h2 className="font-semibold">Skills</h2>
                </div>

                {/* Selected skills */}
                <div className="grid grid-cols-3 gap-2 my-4">
                  {currentUser?.skills &&
                    currentUser.skills.map(
                      (skill: string, idx: number): ReactElement => {
                        return (
                          <span
                            key={idx}
                            className="flex items-center px-2 py-1 mx-2 bg-green-100 border-2 border-green-500 rounded-md cursor-pointer min-w-32"
                          >
                            {skill}
                          </span>
                        );
                      }
                    )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
