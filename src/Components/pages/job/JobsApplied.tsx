import apiClient from "@/api/axios";
import { formatDate } from "@/Components/utils/formatDate";
import { ApplicationType } from "@/Types/types";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";

const JobsApplied = () => {
  const getAppliedJobs = async () => {
    const response = await apiClient.get("/api/job/jobs-applied");
    return response.data;
  };

  // QUERY
  const {
    data: jobsApplied,
    isError,
    error,
  } = useQuery<ApplicationType[]>({
    queryKey: ["jobsApplied"],
    queryFn: getAppliedJobs,
  });
  if (isError) console.log(error);

  console.log(jobsApplied?.length)

  const empType = (empType: string) => {
      switch (empType) {
        case "Fulltime":
          return "bg-green-400"
        case "Parttime":
          return "bg-orange-400"
          case "Internship":
            return "bg-blue-400"
      }
  }

  const applicationStatus = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-orange-400"
      case "accepted":
        return "bg-green-400"
        case "rejected":
          return "bg-red-400 text-white"
    }
}
  return (
    <section>
      <div className="pink-container">
        <h1 className="heading">Jobs Applied</h1>
        <p className="heading_paragraph">See all jobs you have applied for</p>
      </div>
{/* {jobsApplied
 && <div>You haven't applied for any job <br /> <Link to={"/"}>Go to home</Link></div>} */}
      
      <div className="w-full px-4 mx-auto md:w-full lg:w-2/3">
        <div>
          {jobsApplied && jobsApplied.length > 0 &&
            jobsApplied.map((application) => {
              return (
                <Link key={application._id} to={`/job/${application.job._id}`} >
                  <div className="flex flex-wrap justify-between p-4 m-4 text-lg font-semibold bg-white rounded-lg shadow-md">
                    <div>
                      {application.job.role} <br />
                      <span className="text-sm text-gray-400">
                        @{application.job.company}
                      </span>
                    </div>

                    <div>
                      Applied <br />
                      <span className="text-sm text-gray-400">
                        {formatDate(application.createdAt)}
                      </span>
                    </div>
                    
                    <div>
                      Employment Type <br />
                      <span className={`text-sm px-2 py-1  ${empType(application.job.employment_type)} text-black rounded-md`}>
                        {application.job.employment_type}
                      </span>
                    </div>
                    
                    <div>
                      Status <br />
                      <span className={`text-sm px-2 py-1  ${applicationStatus(application.status)} text-black rounded-md`}>
                        {application.status}
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })}
        </div>
      </div>
    </section>
  );
};

export default JobsApplied;
