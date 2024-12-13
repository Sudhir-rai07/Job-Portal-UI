import { JobCardType } from "@/Types/types";
import { Building2, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";

const JobCard: React.FC<JobCardType> = ({_id, company,role, location, description, employment_type,salary,experience }) => {



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
      <Button className="flex mt-2 ml-auto text-white bg-pink-800 hover:bg-pink-800">
        <Link to={`/job/${_id}`}>Apply now</Link>
      </Button>
    </div>
  );
};

export default JobCard;
