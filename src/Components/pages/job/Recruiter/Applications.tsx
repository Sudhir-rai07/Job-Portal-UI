import apiClient from "@/api/axios"
import { JobType } from "@/Types/types"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

const Applications = () => {

  const fetchJobsPostedByMe = async () => {
    const response = apiClient.get("/api/job/posted-by-me")
    return (await response).data
  }

  const {data:jobsPostedByMe, isFetching} = useQuery({queryKey: ["jobsPostedByMe"], queryFn: fetchJobsPostedByMe})
  console.log(jobsPostedByMe)

  return (
    <section className='w-full h-screen overflow-y-scroll text-black'>
      <div className="pink-container">
        <h1 className="heading">Jobs Posted By you</h1>
        <p className="heading_paragraph">Create || Update || Delete</p>
      </div>
      {isFetching && <p className="italic font-semibold text-center text-xl">Getting jobs...</p>}
      {!isFetching && jobsPostedByMe?.length == 0 && <p className="italic font-semibold text-center text-xl">Couldn't find anythnig... <br /> <Link to={"/post-job"} className="text-blue-500">Post a job</Link></p>}
      <div className="grid my-6 w-full grid-cols-1 gap-6 px-4 pb-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 place-items-center">
        {!isFetching && jobsPostedByMe && jobsPostedByMe.map((job:JobType) => <JobCard key={job._id} {...job} />)}
      </div>
    </section>
  )
}

export default Applications



// Application Card
import { JobCardType } from "@/Types/types";
import { Building2, MapPin, Trash } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/Components/ui/button"
import axios from "axios"
import toast from "react-hot-toast"

const JobCard: React.FC<JobCardType> = ({_id, company,role, location, description, employment_type,salary,experience }) => {

  const queryClient = useQueryClient()

const handleDeleteJobPost = async () => {
  const response = await apiClient.delete(`/api/job/delete/${_id}`)
  return response.data
}

// MUTATION
const {mutate: deletePost} = useMutation({mutationFn: handleDeleteJobPost,
onError: (err)=> {
  if(axios.isAxiosError(err)){
    console.log(err.response?.data.error)
    toast.error(err.response?.data.error)
  }
},
onSuccess: ()=>{
  toast.success("Deleted")
  queryClient.invalidateQueries({queryKey: ["jobsPostedByMe"]})
}
})

  return (
    <div className="max-w-[350px] shadow-black  px-4 py-2 w-full border-4 border-black shadow-[5px_5px_0px_0px_rgba(109,40,217)] rounded-md">
      <h2 className="flex items-center gap-2 text-xl font-semibold"> <Building2 size={16}/> {company}</h2>
      {/* <span className="text-sm text-gray-400">{convertMongoDateToDate(posted_date)}</span> */}

      <p className="flex items-center justify-between">
        <span className="text-lg font-semibold">{role}</span>{" "}
        <span className="flex items-center font-bold">
          <MapPin size={16} color="green" /> {location}
        </span>
      </p>
      <hr />
      {/* job description */}
      <p className="mt-2 text-gray-600 break-words">
        {description}
        ...
      </p>

      <p className="flex items-center mt-4 font-[300]">
        Job Type:{" "}
        <span className="ml-auto font-semibold">
          {employment_type}
        </span>
      </p>
      <p className="flex items-center font-[300]">
        Salary:{" "}
        <span className="ml-auto font-semibold">
          {salary}
        </span>
      </p>
      <p className="flex items-center font-[300]">
        Experience: <span className="ml-auto font-semibold">{experience}</span>
      </p>
      <div className="flex">
      <Button 
      onClick={()=>deletePost()}
       className="flex mt-2 text-white bg-pink-800 hover:bg-pink-800">
        <Trash />
      </Button>
      
      <Button className="flex mt-2 ml-auto text-white bg-pink-800 hover:bg-pink-800">
        <Link to={`${_id}`}>View Applications</Link>
      </Button>
      </div>
    </div>
  );
};
