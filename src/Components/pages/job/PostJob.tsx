import React, { useState, FormEvent } from "react";
import skillsData from "../../../constants/skillsData";

type JobPost = {
  role: string;
  company: string;
  location: string;
  employment_type: string;
  description: string;
  requirements: string[];
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
    requirements: [],
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setJobPost((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Here you would typically send the job post data to your backend
    console.log("Job Post Submitted:", jobPost);
    // Reset form after submission
    setJobPost({
      role: "",
      company: "",
      location: "",
      employment_type: "",
      description: "",
      salary: "",
      experience: "",
      language: "",
      requirements: [],
    });
  };

  return (
    <div className="w-full h-screen bg-[#f8fafc]">
      <div className="flex flex-col items-center w-full h-full">
        <h2 className="mt-12 text-2xl font-semibold text-gray-700">
          Post n new Job
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="role"
              className="block mb-2 text-[16px] font-semibold text-gray-700"
            >
              Job Role
            </label>
            <input
              type="text"
              id="role"
              name="role"
              value={jobPost.role}
              onChange={handleChange}
              className="w-full px-3 py-2 leading-tight text-gray-700 bg-transparent min-w-[350px] focus:border-violet-500 focus:border-2 transition border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
              placeholder="Enter job role"
              required
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="company"
              className="block mb-2 font-semibold text-gray-700 text-[16px]"
            >
              Company name
            </label>
            <input
              type="text"
              id="company"
              name="company"
              value={jobPost.company}
              onChange={handleChange}
              className="w-full px-3 py-2 leading-tight text-gray-700 bg-transparent min-w-[350px] focus:border-violet-500 focus:border-2 transition border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
              placeholder="Company name"
              required
            />
          </div>


          <div className="mb-4">
            <label
              htmlFor="location"
              className="block mb-2 font-semibold text-gray-700 text-[16px]"
            >
              location
            </label>
            <input
              type="text"
              id="location"
              name="location"
              value={jobPost.location}
              onChange={handleChange}
              className="w-full px-3 py-2 leading-tight text-gray-700 bg-transparent min-w-[350px] focus:border-violet-500 focus:border-2 transition border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
              placeholder="location"
              required
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="employment_type"
              className="block mb-2 font-semibold text-gray-700 text-[16px]"
            >
              Employment Type
            </label>
            <input
              type="text"
              id="employment_type"
              name="employment_type"
              value={jobPost.employment_type}
              onChange={handleChange}
              className="w-full px-3 py-2 leading-tight text-gray-700 bg-transparent min-w-[350px] focus:border-violet-500 focus:border-2 transition border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
              placeholder="employment_type"
              required
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="description"
              className="block mb-2 font-semibold text-gray-700 text-[16px]"
            >
              Description
            </label>
            <input
              type="text"
              id="description"
              name="description"
              value={jobPost.description}
              onChange={handleChange}
              className="w-full px-3 py-2 leading-tight text-gray-700 bg-transparent min-w-[350px] focus:border-violet-500 focus:border-2 transition border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
              placeholder="description"
              required
            />
          </div>


          <div className="mb-4">
            <label
              htmlFor="salary"
              className="block mb-2 font-semibold text-gray-700 text-[16px]"
            >
              Salary
            </label>
            <input
              type="text"
              id="salary"
              name="salary"
              value={jobPost.salary}
              onChange={handleChange}
              className="w-full px-3 py-2 leading-tight text-gray-700 bg-transparent min-w-[350px] focus:border-violet-500 focus:border-2 transition border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
              placeholder="salary"
              required
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="experience"
              className="block mb-2 font-semibold text-gray-700 text-[16px]"
            >
              Experience
            </label>
            <input
              type="text"
              id="experience"
              name="experience"
              value={jobPost.experience}
              onChange={handleChange}
              className="w-full px-3 py-2 leading-tight text-gray-700 bg-transparent min-w-[350px] focus:border-violet-500 focus:border-2 transition border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
              placeholder="experience"
              required
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="language"
              className="block mb-2 font-semibold text-gray-700 text-[16px]"
            >
              Language
            </label>
            <input
              type="text"
              id="language"
              name="language"
              value={jobPost.language}
              onChange={handleChange}
              className="w-full px-3 py-2 leading-tight text-gray-700 bg-transparent min-w-[350px] focus:border-violet-500 focus:border-2 transition border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
              placeholder="language"
              required
            />
          </div>


{/* Requirements */}
          <div className="mb-4">
            <label
              htmlFor="language"
              className="block mb-2 font-semibold text-gray-700 text-[16px]"
            >
              Language
            </label>
            <select name="skills" id="skills" className="w-full px-3 overflow-y-scroll py-2 leading-tight text-gray-700 bg-transparent min-w-[350px] focus:border-violet-500 focus:border-2 transition border rounded shadow appearance-none focus:outline-none focus:shadow-outline">
                <option value="default" disabled defaultValue={"select value"}>Select recuired skills</option>
                {skillsData.map((skill:string, idx:number): JSX.Element =>{
                    return (
                        <option key={idx} value={skill} onClick={()=> jobPost.requirements.push(skill)}>{skill}</option>
                    )
                })}
            </select>
          </div>


<button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default PostJob;
