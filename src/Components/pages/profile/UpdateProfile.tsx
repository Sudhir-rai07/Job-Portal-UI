import { useMutation, useQuery } from "@tanstack/react-query";
import React, { ReactElement, useCallback, useRef, useState } from "react";
import apiClient from "../../../api/axios";
import axios from "axios";
import toast from "react-hot-toast";
import { Button, Modal, Radio, Select } from "react-daisyui";
import skillsData from "../../../constants/skillsData";
import { RxCross1 } from "react-icons/rx";
import { User } from "../../../Types/types";

const UpdateProfile = () => {

  const {data:currentUser} = useQuery<User>({queryKey: ["getMe"]})

  // resume, about, skills profileImage
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [fullname, setFullname] = useState<string>(currentUser?.fullname || "");
  const [gender, setGender] = useState<string>(currentUser?.gender || "");
  const [about, setAbout] = useState<string>(currentUser?.about || "");
  const [skills, setSkills] = useState<string[]>(currentUser?.skills || []);
  const [resume, setResume] = useState<string>(currentUser?.resume || "");
  const [education, setEducation] = useState<string>(currentUser?.education || "");
  const [address, setAddress] = useState<string>(currentUser?.address || "");

  // Profile image refrance
  const profileImageRef = useRef<HTMLInputElement>(null);
  // Form Submit ref
  const submitRef = useRef<HTMLButtonElement>(null)

  // Handle Skills {add, remove}
  const handleSkills = (newSkill: string): void => {
    setSkills((prev) => {
      if (prev.includes(newSkill)) {
        return prev.filter((selectedSkill) => selectedSkill != newSkill);
      } else {
        return [...prev, newSkill];
      }
    });
  };

  // Form Data
  const formData = new FormData();
  if (profileImage) formData.append("profileImage", profileImage);
  formData.append("gender", gender);
  formData.append("about", about);
  formData.append("skills", JSON.stringify(skills));
  formData.append("resume", resume);
  formData.append("education", education);
  formData.append("address", address);

  // Mutation Function for Profile Update
  const handleProfileUpdate = async (formData: FormData) => {
    const response = await apiClient.put("/api/auth/update-profile", formData);
    return response;
  };

  // Mutation
  const { mutate: UpdateProfile } = useMutation({
    mutationFn: handleProfileUpdate,
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        const errorMessage =
          error.response?.data?.error || "Something went wrong";
        toast.error(errorMessage);
      }
    },
    onSuccess: ({ data }) => {
      console.log("Success");
      console.log(data);
    },
  });

  // Form 'submit' to update profile
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    UpdateProfile(formData);
    window.location.href = "/profile"
  };

  // React-daisy-UI modal refrance
  const ref = useRef<HTMLDialogElement>(null);
  const handleShow = useCallback(() => {
    ref.current?.showModal();
  }, [ref]);

  return (
    <div className="flex-1 px-4 py-2 bg-white rounded-md">
            {/* Profile image */}
            <div className="flex items-center gap-6">
              <img
                src={"profile-placeholder.png "}
                alt=""
                className="w-24 overflow-hidden border-2 border-blue-900 rounded-full lg:w-32 aspect-square"
              />
              <input
                type="file"
                className="hidden"
                name="profileImage"
                id="profileImage"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  if (e.target.files) {
                    setProfileImage(e.target?.files[0]);
                  }
                }}
                ref={profileImageRef}
              />
              <div className="flex gap-1 lg:gap-4">
                <button
                  onClick={() => profileImageRef.current?.click()}
                  className="px-2 py-2 text-sm font-semibold text-white bg-blue-500 rounded-md cursor-pointer"
                >
                  Upload new
                </button>
                <button className="px-2 py-2 text-sm font-semibold text-white bg-red-500 rounded-md cursor-pointer">
                  Delete avatar
                </button>
              </div>
            </div>

            <div className="mt-6">
              {/* Form */}
              <form className="" onSubmit={handleSubmit}>
                {/* Basic */}
                <div className="grid grid-cols-2 gap-6">
                  <div className="flex flex-col">
                    <label className="font-semibold" htmlFor="username">
                      Username
                    </label>
                    <input
                      type="text"
                      value={"usename"}
                      readOnly
                      id="username"
                      className="inline px-2 py-3 text-gray-500 transition-colors bg-transparent border-2 rounded-md outline-none focus:border-blue-500 focus:bg-blue-100 border-gray-700/50"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label className="font-semibold" htmlFor="fullname">
                      Fullname
                    </label>
                    <input
                      type="text"
                      value={fullname}
                      onChange={(e) => setFullname(e.target.value)}
                      id="fullname"
                      className="inline px-2 py-3 text-gray-500 transition-colors bg-transparent border-2 rounded-md outline-none focus:border-blue-500 focus:bg-blue-100 border-gray-700/50"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label className="font-semibold" htmlFor="email">
                      Email
                    </label>
                    <input
                      type="text"
                      value={"Email"}
                      id="email"
                      readOnly
                      className="inline px-2 py-3 text-gray-500 transition-colors bg-transparent border-2 rounded-md outline-none focus:border-blue-500 focus:bg-blue-100 border-gray-700/50"
                    />
                  </div>
                  <div className="flex items-center gap-3 bg-transparent">
                    <h2 className="font-semibold">Gender</h2>
                    <div className="flex items-center gap-2 px-2 py-2 bg-white border-2 border-gray-400 rounded-md ">
                      {/* <input type="radio" name="gender" value={"male"} className="bg"/> Male */}
                      <Radio
                        className="radio-md radio-primary"
                        name="gender"
                        value={"male"}
                        checked={gender==="male"}
                        onChange={() => setGender("male")}
                      />
                      <span>Male</span>
                    </div>
                    <div className="flex gap-2 px-2 py-2 bg-white border-2 border-gray-400 rounded-md">
                      <Radio
                        className="radio-md radio-primary"
                        name="gender"
                        value={"female"}
                        checked={gender==="female"}
                        onChange={() => setGender("female")}
                      />{" "}
                      <span>Female</span>
                    </div>
                  </div>
                </div>
                {/* Address */}
                <div className="min-w-full mt-8">
                  <h2 className="font-semibold">Address</h2>
                  <textarea
                    name="address"
                    id="address"
                    value={address}
                    onChange={(e)=> setAddress(e.target.value)}
                    placeholder="Your address here"
                    className="h-56 min-w-full px-2 py-2 bg-white border-2 rounded-md outline-none resize-none border-gray-700/50"
                  ></textarea>
                </div>
                {/* About */}
                <div className="min-w-full">
                  <h2 className="font-semibold">About</h2>
                  <textarea
                    name="about"
                    id="about"
                    value={about}
                    onChange={(e) => setAbout(e.target.value)}
                    placeholder="Write about yourself"
                    className="min-w-full px-2 py-2 bg-white border-2 rounded-md outline-none resize-none h-28 border-gray-700/50"
                  ></textarea>
                </div>
                {/* Resume */}
                <div className="min-w-full">
                  <h2 className="font-semibold">
                    Resume{" "}
                    <span className="font-normal">
                      (please provide link of your resume )
                    </span>
                  </h2>
                  <textarea
                    name="resume"
                    id="resume"
                    value={resume}
                    onChange={(e) => setResume(e.target.value)}
                    placeholder="ResumeLink"
                    className="min-w-full px-2 py-2 bg-white border-2 rounded-md outline-none resize-none h-28 border-gray-700/50"
                  ></textarea>
                </div>
                {/* Education */}
                <div className="min-w-full">
                  <h2 className="font-semibold">Education</h2>
                  <textarea
                    name="education"
                    id="education"
                    value={education}
                    onChange={(e) => setEducation(e.target.value)}
                    placeholder="Education"
                    className="min-w-full px-2 py-2 bg-white border-2 rounded-md outline-none resize-none h-28 border-gray-700/50"
                  ></textarea>
                </div>
                <button type="submit" ref={submitRef}></button>
              </form>

              {/* Skill part */}
              <div className="flex px-2 py-4 border-2 rounded-md justify-evenly border-gray-700/50">
                <div className="w-32 mr-auto">
                  <h2 className="font-semibold">Skills</h2>
                  <span className="text-sm text-gray-500">
                    This will help startups hone in on your strengths.
                  </span>
                </div>
                {/* React-daisy Modal */}
                <div className="flex flex-col items-center ">
                  <div className="font-sans">
                    <Button onClick={handleShow} type="button">
                      Select Skills
                    </Button>
                    <Modal ref={ref} dataTheme="light">
                      <Modal.Header className="font-bold">
                        Select skills
                      </Modal.Header>
                      <Modal.Body>
                        <ul className="grid grid-cols-3 gap-2 py-8 text-center">
                          {skillsData.map((skill: string, idx: number) => {
                            return (
                              <li
                                key={idx}
                                className={`flex justify-center min-h-14 my-auto items-center  border-2 border-gray-700/50 px-2 py-1 rounded-md  cursor-pointer ${skills.includes(skill) ? "bg-green-500" : ""
                                  }`}
                                onClick={() => handleSkills(skill)}
                              >
                                {skill} {skills.includes(skill) ? "✓" : ""}
                              </li>
                            );
                          })}
                        </ul>
                      </Modal.Body>
                      <Modal.Actions>
                        <form method="dialog">
                          <Button>Done</Button>
                        </form>
                      </Modal.Actions>
                    </Modal>
                  </div>

                  {/* Selected skills */}
                  <div className="grid grid-cols-3 gap-2 my-4">
                    {skills &&
                      skills.map((skill: string, idx: number): ReactElement => {
                        return (
                          <span key={idx} className="flex items-center px-2 mx-2 bg-green-100 border-2 border-green-500 rounded-md cursor-pointer min-w-32">
                            {skill}{" "}
                            {
                              <RxCross1
                                className="ml-auto"
                                onClick={() => handleSkills(skill)}
                              />
                            }
                          </span>
                        );
                      })}
                  </div>
                </div>
              </div>

              {/* Submit button */}
              <Button
                  className="w-full px-8 mt-4 text-white bg-black border-none"
                  type="submit"
                  onClick={()=>submitRef.current?.click()}
                >
                  Save
                </Button>
            </div>
          </div>
  )
}

export default UpdateProfile
