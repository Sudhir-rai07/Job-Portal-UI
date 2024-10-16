import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useCallback, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import apiClient from "../../../api/axios";
import axios from "axios";
import toast from "react-hot-toast";
import NavbarComponent from "../../NavbarComponent";
import { FaArrowRightToBracket } from "react-icons/fa6";
import { FaArrowLeft } from "react-icons/fa";
import { RiBuilding2Fill, RiGroupLine } from "react-icons/ri";
import { HiLocationMarker } from "react-icons/hi";
import { Button, Modal } from "react-daisyui";
import { JobType, User } from "../../../Types/types";

const ApplyJob = () => {
  const { id: jobId } = useParams<string>();
  
  // Query client
  const queryClient = useQueryClient()

  const [coverLetter, setCoverLetter] = useState<string>("");
  // MODAL REF
  const ref = useRef<HTMLDialogElement>(null);
  const handleShow = useCallback(() => {
    ref.current?.showModal();
  }, [ref]);

  // Current user
  const { data: currentUser } = useQuery<User>({ queryKey: ["getMe"] });


  // Fetching post with id
  const {data: PostData, isError:isJobFetchError, error:jobFetchError, isFetching:gettingPost} = useQuery<JobType>({queryKey: ["getPost"], queryFn: async ()=>{
    const response = await apiClient.get("/api/job/find-post/"+jobId)
    return response.data
  }})

// Chaeck if already applied
  const isAppliedAlready =
    jobId && currentUser && currentUser.jobsApplied?.includes(jobId);

    // Apply for job
  const {
    mutate: ApplyForJob,
    isPending,
  } = useMutation({
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
      queryClient.invalidateQueries({queryKey:["getPost"]})
    },
  });

  const handleSubmit = () => {
    if (!coverLetter) {
      toast.error("Please fill in the cover letter");
      return;
    }
    ApplyForJob();
  };
  return (
    <div className="w-full h-screen">
      <div className="w-full h-full bg-slate-200">
        <NavbarComponent />

        <div className="w-1/2 mx-auto mt-4">
          <Link to={"/find-jobs"} className="flex items-center gap-2">
            <FaArrowLeft />
            Back to jobs
          </Link>

{gettingPost && <div>Fetching <Button loading></Button></div>}

          {PostData ? (
            <>
            <div className="mt-3">
            <p className="flex items-center text-lg text-violet-600">
              <RiGroupLine color="violet" /> {PostData.applications.length} applicants
            </p>
            <div className="px-3 py-3 mt-3 bg-white rounded-md shadow-md">
              <h2 className="text-3xl font-semibold text-black">{PostData.role}</h2>
              <div className="flex gap-4">
                <p className="flex items-center text-blue-500">
                  <RiBuilding2Fill /> {PostData.company}
                </p>
                <p className="flex items-center text-pink-500">
                  <HiLocationMarker /> {PostData.location}
                </p>
              </div>
              <p className="w-1/2 mt-4">
                {PostData.description}
              </p>

              <div className="mt-4">
                <h3 className="mb-2 text-lg font-semibold text-gray-800">
                  Skills
                </h3>
                {PostData.requirements.map(
                  (skills, idx) => {
                    return (
                      <span key={idx} className="px-2 py-1 mr-3 text-blue-400 border-2 border-gray-300 rounded-lg">
                        {skills}
                      </span>
                    );
                  }
                )}
              </div>

              <div className="my-4 text-xl font-bold text-gray-700">
                Salary :
                <span className="font-semibold text-green-600">{PostData.salary}</span>{" "}
                INR
              </div>

              <div className="flex flex-col text-gray-700">
                <h3 className="my-3 text-xl font-bold ">Requirements</h3>
                <span className="text-lg font-semibold text-black">
                  Experience level: 
                  <span className="font-normal">{PostData.experience}</span>
                </span>
                <span className="text-lg font-semibold text-black">
                  Language: <span className="font-normal">{PostData.language}</span>
                </span>
              </div>

{/* Apply for job */}
              {isAppliedAlready ? (<div>
                <button className="px-4 py-2 mt-4 font-semibold text-white transition bg-green-500 rounded cursor-not-allowed open-email-app-btn hover:bg-green-700">
                Already Applied
            </button>
              </div>) : (<div>
                <div className="font-sans">
                <Button
                  onClick={handleShow}
                  className="mt-4 text-white btn-success"
                >
                  Apply for job
                </Button>
                <Modal ref={ref} dataTheme="light">
                  <Modal.Header className="font-bold">
                    Apply for {"Job role"}
                  </Modal.Header>
                  <Modal.Body>
                    <h2 className="text-lg font-semibold">
                      What interests you about working for this company?
                    </h2>

                    <textarea
                      name="cover-letter"
                      id="cover-letter"
                      placeholder="Write here"
                      className="w-full h-32 px-2 py-1 mt-2 border-2 border-gray-400 rounded-md resize-none"
                      value={coverLetter}
                      onChange={(e) => setCoverLetter(e.target.value)}
                    ></textarea>
                  </Modal.Body>
                  <Modal.Actions>
                    <form method="dialog">
                      <Button onClick={() => handleSubmit()}>Submit</Button>
                      <Button>Close</Button>
                    </form>
                  </Modal.Actions>
                </Modal>
              </div>
              </div>)}
            </div>
          </div>
            </>
          ):(
            <>
            {!gettingPost && <div className="font-semibold text-red-500">Can't find post</div>}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ApplyJob;
