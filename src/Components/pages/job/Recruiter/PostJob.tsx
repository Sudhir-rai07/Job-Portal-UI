// PostJob.tsx
import React, { useState, FormEvent, useRef, useCallback } from "react";
import skillsData from "@/constants/skillsData";
import { RxCross1 } from "react-icons/rx";
import { Button, Modal } from "react-daisyui";
import { useMutation } from "@tanstack/react-query";
import apiClient from "@/api/axios";
import toast from "react-hot-toast";
import axios from "axios";

type JobPost = {
  role: string;
  company: string;
  location: string;
  employment_type: string;
  description: string;
  salary: string;
  experience: string;
  language: string;
};

const PostJob: React.FC = () => {
  const [jobPost, setJobPost] = useState<JobPost>({
    role: "",
    company: "",
    location: "",
    employment_type: "",
    description: "",
    salary: "",
    experience: "",
    language: "",
  });
  const [skills, setSkills] = useState<string[]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setJobPost((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const jobPayload = new FormData();
  jobPayload.append("role", jobPost.role);
  jobPayload.append("description", jobPost.description);
  jobPayload.append("company", jobPost.company);
  jobPayload.append("location", jobPost.location);
  jobPayload.append("employment_type", jobPost.employment_type);
  jobPayload.append("salary", jobPost.salary);
  jobPayload.append("experience", jobPost.experience);
  jobPayload.append("language", jobPost.language);
  jobPayload.append("requirements", JSON.stringify(skills));

  // Post job mutation
  const { mutate: postJob, isPending } = useMutation({
    mutationFn: async () => {
      const response = await apiClient.post("/api/job/post-job", jobPayload);
      return response.data;
    },
    onError: (error) => {
      if(axios.isAxiosError(error)){
        if (error.response && error.response.data.error) {
          toast.error(error.response.data.error);
        } else {
          toast.error("An error occurred");
        }
      }
    },
    onSuccess: () => {
      toast.success("Job posted");
      setJobPost({
        role: "",
        company: "",
        location: "",
        employment_type: "",
        description: "",
        salary: "",
        experience: "",
        language: "",
      });
      setSkills([]);
    },
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    postJob();
  };

  // Form Submit ref
  const submitRef = useRef<HTMLButtonElement>(null);

  // React-daisy-UI modal reference
  const ref = useRef<HTMLDialogElement>(null);
  const handleShow = useCallback(() => {
    ref.current?.showModal();
  }, [ref]);

  // Handle Skills {add, remove}
  const handleSkills = (newSkill: string): void => {
    setSkills((prev) =>
      prev.includes(newSkill)
        ? prev.filter((selectedSkill) => selectedSkill !== newSkill)
        : [...prev, newSkill]
    );
  };

  return (
    <div className="w-full h-full ">
      {/* <NavbarComponent /> */}
      <div className="flex flex-col items-center bg-[#f8fafc] w-full h-full overflow-y-scroll">
        <div className="pink-container">
        <h2 className="heading">
          Post a New Job
        </h2>
        <p className="heading_paragraph">Hundreds of candidates are waiting for you to post your job</p>
        </div>
        <form onSubmit={handleSubmit} className="max-w-[400px] w-full mt-4">
          {Object.keys(jobPost).map((field, idx) => (
            <div className="mb-4" key={idx}>
              <label
                htmlFor={field}
                className="block mb-2 font-semibold text-gray-700 text-[16px]"
              >
                {field.charAt(0).toUpperCase() + field.slice(1)}
              </label>
              <input
                type="text"
                id={field}
                name={field}
                value={jobPost[field as keyof JobPost]}
                onChange={handleChange}
                className="input-box"
                placeholder={`Enter ${field}`}
                required
              />
            </div>
          ))}
          <button type="submit" className="hidden" ref={submitRef}>
            Submit
          </button>
        </form>

        {/* Skills */}
        <div className="mb-4">
          <label htmlFor="skills" className="block mb-2 font-semibold text-gray-700 text-[16px]">
            Skills
          </label>
          <div className="flex px-2 w-[400px] py-4 border-2 rounded-md justify-evenly border-gray-700/50">
            <div className="">
              <Button onClick={handleShow} type="button" className="text-white bg-pink-600 border-none">
                Select required Skills
              </Button>
              <Modal ref={ref} dataTheme="dark">
                <Modal.Header className="font-bold">Select required skills</Modal.Header>
                <Modal.Body>
                  <ul className="grid grid-cols-3 gap-2 py-8 text-center">
                    {skillsData.map((skill, idx) => (
                      <li
                        key={idx}
                        className={`flex justify-center min-h-14 items-center border-2 border-gray-700/50 px-2 py-1 rounded-md cursor-pointer ${
                          skills.includes(skill) ? "border-green-600" : ""
                        }`}
                        onClick={() => handleSkills(skill)}
                      >
                        {skill}
                      </li>
                    ))}
                  </ul>
                </Modal.Body>
                <Modal.Actions>
                  <form method="dialog">
                    <Button onClick={() => ref.current?.close()}>Done</Button>
                  </form>
                </Modal.Actions>
              </Modal>
              <div className="grid grid-cols-3 gap-2 my-4">
                {skills.map((skill, idx) => (
                  <span
                    key={idx}
                    className="flex items-center px-2 py-1 text-black border-2 border-green-500 rounded-md cursor-pointer min-w-28"
                  >
                    {skill}
                    <RxCross1 className="ml-auto" onClick={() => handleSkills(skill)} />
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Submit button */}
        <Button
          className="w-[400px] px-8 mb-8 mt-4 text-white bg-pink-600 border-none hover:bg-pink-700 text-lg"
          type="submit"
          onClick={() => submitRef.current?.click()}
          disabled={isPending}
        >
          {isPending ? "Posting..." : "Post"}
        </Button>
      </div>
    </div>
  );
};

export default PostJob;
