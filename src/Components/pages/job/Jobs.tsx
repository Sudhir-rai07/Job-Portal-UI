import React, { useState } from "react";
import NavbarComponent from "../../NavbarComponent";
import { Button, Checkbox, Select } from "react-daisyui";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { useNavigate, useNavigation, useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import apiClient from "../../../api/axios";
import JobCard from "../../utils/JobCard";
import { JobType } from "../../../Types/types";
import jobTypes from "../../../constants/jobTypes";
import jobRoles from "../../../constants/jobRoles";

const Jobs = () => {
  const locationOptions: string[] = [
    "Delhi",
    "Gurgaon",
    "Noida",
    "Banglore",
    "Pune",
    "Haydrabad",
  ];

  const [location, setLocation] = useState<string>("");
  const [keyword, setKeyword] = useState<string>("")
  const [jobType, setJobType] = useState<string>("")
  const [jobRole, setJobRole] = useState<string>("")
  const [searchParams, setSearchParams] = useSearchParams()
  const history = useNavigate()


  const {data:AllJobs, isError, error, isFetching} = useQuery<JobType[]>({queryKey: ["getAllJobs"], queryFn: async ()=>{
    const response = await apiClient.get("/api/job/get-all-jobs")
    return response.data
  }})


//   const {data: filterdJobs, isFetching:filteringJobs, isError:isFilterError, error:filterError, refetch:filterJobs} = useQuery({queryKey: ["filterJobs"], queryFn: async ()=>{
//     const response = await apiClient.get(`/api/job/search-job??role=${jobRole}&location=${location}&type=${jobType}`)
//     return response.data
//   },
//   enabled:false
// })


  const handleSubmit = async (e:  React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log(jobType)
    setSearchParams({role: jobRole, type: jobRole, location: location})
    // filterJobs()
  }


  return (
    <div className="w-full h-screen">
      <div className="w-full h-full overflow-y-scroll">
        <div className="w-full bg-[#e7f6fd] pb-8">
          <NavbarComponent />
          <form onSubmit={handleSubmit} className="flex items-center justify-between w-full px-4 py-4 mx-auto mt-6 bg-white rounded-md shadow-md lg:w-1/2">
            <div className="flex items-center w-1/2 gap-3 text-xl">
              <FaMagnifyingGlass color="gray" />
              <input
                type="text"
                value={keyword}
                onChange={e => setKeyword(e.target.value)}
                placeholder="Job title or keyword"
                className="w-full transition bg-white border-b-2 outline-none focus:border-b-blue-500"
              />
            </div>
            <Select
              dataTheme="light"
              value={location}
              className="flex-1 h-full border-none rounded-none outline-none"
              onChange={(event) => setLocation(event.target.value)}
            >
              <option value={"location"} disabled>
                Select location
              </option>
              {locationOptions.map((value: string, idx: number) => {
                return (
                  <option key={idx} value={value}>
                    {value}
                  </option>
                );
              })}
            </Select>

            <button
              type="submit"
              className="px-4 py-2 mt-4 font-semibold text-white transition rounded bg-violet-500 hover:bg-violet-700"
            >
              Search
            </button>
          </form>
        </div>
        
        

        {/* Jobs */}
        <div className="flex w-4/5 mx-auto">

        {/* JOBS AND ROLES */}
        <div className="">
          <div className="flex flex-col gap-2">
            <h2 className="text-lg font-semibold text-black">Job types</h2>
          {jobTypes.map((job:string, idx:number): JSX.Element =>{
            return (
              <div key={idx} className="flex items-center gap-1 cursor-pointer">
              <Checkbox size="sm" className="checkbox-primary" value={job} onChange={(e)=> setJobType(e.target.value)}/>
              <span className="text-gray-700">{job}</span>
            </div>
            )
          })}
          </div>
          <div className="flex flex-col gap-2 mt-4">
            <h2 className="text-lg font-semibold text-black">Job roles</h2>
          {jobRoles.map((role:string, idx:number): JSX.Element =>{
            return (
              <div key={idx} className="flex items-center gap-1 cursor-pointer">
              <Checkbox size="sm" className="checkbox-primary" value={role} onChange={(e)=> setJobRole(e.target.value)}/>
              <span className="text-gray-700">{role}</span>
            </div>
            )
          })}
          </div>
        </div>
        {!AllJobs && <div className="items-center"> <Button loading>Loading</Button></div>}
        <div className="flex flex-col w-4/5 mx-auto">
        {AllJobs && AllJobs.map((job, idx): JSX.Element =>{
          return (
            <JobCard key={idx} description={job.description} experience={job.experience} language={job.language} applications={job.applications} _id={job._id} requirements={job.requirements} location={job.location} company={job.company} employment_type
            ={job.employment_type
            } role={job.role} datePosted={new Date(`${job.datePosted}`)} salary={job.salary}/>
          )
        })}
        </div>
        </div>
      </div>
    </div>
  );
};

export default Jobs;
