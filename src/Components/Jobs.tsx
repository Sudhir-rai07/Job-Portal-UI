import { useQuery } from "@tanstack/react-query";
import JobCard from "./utils/JobCard";
import { JobType } from "@/Types/types";
import { Link, useSearchParams } from "react-router-dom";

const Jobs = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("filter");

  const { data: allJobs, isRefetching } = useQuery<JobType[]>({
    queryKey: ["AllJobs"],
  });
  console.log(allJobs);
  return (
    <section className="w-full mt-4">
      {!query && (
        <h1 className="my-4 mt-4 ml-2 text-xl font-semibold">latest Jobs:</h1>
      )}

      {query && (
        <h1 className="my-4 mt-4 ml-2 text-xl font-semibold">
          Results for : <span className="italic">{query}</span>
        </h1>
      )}
      {isRefetching && <p className="italic font-semibold text-center">Getting jobs...</p>}
      {!isRefetching && allJobs?.length == 0 && <p className="italic font-semibold text-center text-xl">Couldn't find anythnig... <br /> <Link className="text-blue-500" to={"/post-job"}>Post a job</Link></p>}
      <div className="grid w-full grid-cols-1 gap-6 px-4 pb-6 overflow-y-scroll md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 place-items-center">
        {!isRefetching && allJobs && allJobs.map((job) => <JobCard key={job._id} {...job} />)}
      </div>
    </section>
  );
};

export default Jobs;
