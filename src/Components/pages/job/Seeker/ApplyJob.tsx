import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import apiClient from "@/api/axios";
import axios from "axios";
import toast from "react-hot-toast";
import NavbarComponent from "@/Components/NavbarComponent";
import { FaArrowLeft } from "react-icons/fa";
import { RiBuilding2Fill, RiGroupLine } from "react-icons/ri";
import { HiLocationMarker } from "react-icons/hi";
import { Button } from "react-daisyui";
import { JobType, RecordErrorType, User } from '@/Types/types'
import { Textarea } from "@/Components/ui/textarea";
import { Label } from "@/Components/ui/label";
import { applyForJobSchema } from "@/zod/validation";
import { z } from "zod";
import { Input } from "@/Components/ui/input";

const ApplyJob = () => {
  const { id: jobId } = useParams<string>();
  const [errors, setErrors] = useState<RecordErrorType>({});

  // Query client
  const queryClient = useQueryClient();

  const [coverLetter, setCoverLetter] = useState<string>("");
  const [resume, setResume] = useState<string>("");

  // Current user
  const { data: currentUser } = useQuery<User>({ queryKey: ["getMe"] });

  // Fetching post with id
  const { data: Job, isFetching: gettingPost } = useQuery<JobType>({
    queryKey: ["getPost"],
    queryFn: async () => {
      const response = await apiClient.get("/api/job/get/" + jobId);
      return response.data;
    },
    refetchOnWindowFocus: false,
    staleTime: 5 * 60 * 1000,
  });

  

  // Chaeck if already applied
  const isAppliedAlready =
    currentUser && currentUser.jobsApplied.includes(jobId || "");
  // Apply for job
  const { mutate: ApplyForJob } = useMutation({
    mutationFn: async () => {
      const response = await apiClient.post("api/job/apply/" + jobId, {
        coverLetter,
      });
      return response.data;
    },
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          toast.error(error.response.data.error);
        } else {
          toast.error("Error");
        }
      }
    },
    onSuccess: () => {
      toast.success("Applied successfully");
      queryClient.invalidateQueries({ queryKey: ["getMe"] });
      queryClient.invalidateQueries({ queryKey: ["getPost"] });
      setCoverLetter("");
    },
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!currentUser)
      return toast.error("You must login to apply for this job");
    try {
      await applyForJobSchema.parseAsync({ resume, coverLetter });
      setErrors({});
      ApplyForJob();
    } catch (error) {
      if (error instanceof z.ZodError) {
        console.log("error : ", error.errors);
        const newErrors: RecordErrorType = {};
        error.errors.forEach((err) => {
          if (err.path.length > 0) {
            newErrors[err.path[0]] = err.message;
          }
        });
        setErrors(newErrors);
      }
    }
  };

  if(!currentUser) return <Navigate to={"/login"} state={{message: "You must login to see job"}} relative="path" replace/>


  return (
    <div className="w-full h-screen">
      <div className="w-full h-full bg-[#ffffff]">
        <NavbarComponent />

        <div className="w-full px-4">
          <Link to={"/"} className="flex items-center gap-2 mt-4">
            <FaArrowLeft />
          </Link>

          {gettingPost && (
            <div>
              Fetching <Button loading></Button>
            </div>
          )}

          {Job ? (
            <>
              <div className="mt-3">
                <p className="flex items-center text-lg text-violet-600">
                  <RiGroupLine color="violet" />{" "}
                  {Job.applications && Job.applications.length} applicants
                </p>
                <div className="px-3 py-3 mt-3 rounded-md">
                  <h2 className="text-3xl font-semibold text-black">
                    {Job.role}
                  </h2>
                  <div className="flex gap-4">
                    <p className="flex items-center text-blue-500">
                      <RiBuilding2Fill /> {Job.company}
                    </p>
                    <p className="flex items-center text-pink-500">
                      <HiLocationMarker /> {Job.location}
                    </p>
                  </div>

                  <div className="mt-4">
                    <p className="text-sm font-semibold">Job description</p>
                    <p className="w-1/2 rounded-md">{Job.description}</p>
                  </div>

                  <div className="mt-4">
                    <h3 className="mb-2 text-lg font-semibold text-gray-800">
                      Skills
                    </h3>
                    {Job.requirements.map((skills, idx) => {
                      return (
                        <span
                          key={idx}
                          className="px-2 py-1 mr-3 text-blue-400 border-2 border-gray-300 rounded-lg"
                        >
                          {skills}
                        </span>
                      );
                    })}
                  </div>

                  <div className="mt-4 text-lg font-bold text-gray-700">
                    Salary <br />
                    <span className="font-semibold text-green-600">
                      {Job.salary}
                    </span>{" "}
                    INR
                  </div>

                  <div className="flex flex-col text-gray-700">
                    <h3 className="my-3 text-xl font-bold ">Requirements</h3>
                    <span className="text-lg font-semibold text-black">
                      Experience level:
                      <span className="font-normal">{Job.experience}</span>
                    </span>
                    <span className="text-lg font-semibold text-black">
                      Language:{" "}
                      <span className="font-normal">{Job.language}</span>
                    </span>
                  </div>

                  {!currentUser && (
                    <>
                      <span>To apply this post , please login or register</span>
                      <Link
                        className="mt-10 text-lg text-blue-600 underline"
                        to={`/login?callbackUrl=/job/${jobId}`}
                      >
                        Login
                      </Link>
                      <Link
                        className="mt-10 text-lg text-blue-600 underline"
                        to={`/signup?callbackUrl=/job/${jobId}`}
                      >
                        SignUp
                      </Link>
                    </>
                  )}

                  {currentUser && !isAppliedAlready && (
                    <>
                      <form onSubmit={handleSubmit} className="mt-4 ">
                        <Label>Resume URL</Label>
                        <Input
                          type="text"
                          value={resume}
                          onChange={(e) => setResume(e.target.value)}
                          placeholder="Resume url"
                          className="w-full transition-colors duration-200 border-2 border-gray-400 rounded-md focus:ring-pink-600 focus:ring-2 md:w-1/3"
                        />
                        {errors && (
                          <p className="text-red-600">{errors?.resume}</p>
                        )}
                        <Label>Cover letter</Label>
                        <Textarea
                          placeholder="Write a cover letter"
                          className="w-full transition-colors duration-200 border-2 border-gray-400 rounded-md focus:ring-pink-600 md:w-1/3"
                          value={coverLetter}
                          onChange={(e) => setCoverLetter(e.target.value)}
                        />
                        {errors && (
                          <p className="text-red-600">{errors?.coverLetter}</p>
                        )}
                        <button
                          type="submit"
                          className="px-4 py-2 mt-4 font-semibold text-white transition bg-green-500 rounded open-email-app-btn hover:bg-green-700"
                        >
                          Apply
                        </button>
                      </form>{" "}
                    </>
                  )}

                  {/* Apply for job */}
                  {isAppliedAlready && (
                    <div>
                      <button className="px-4 py-2 mt-4 font-semibold text-white transition bg-gray-500 rounded cursor-not-allowed open-email-app-btn">
                        Already Applied
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </>
          ) : (
            <>
              {!gettingPost && (
                <div className="font-semibold text-red-500">
                  Can't find post
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ApplyJob;
