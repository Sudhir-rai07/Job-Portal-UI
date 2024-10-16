import React from "react";
import { FaSave } from "react-icons/fa";
import { JobType } from "../../Types/types";
import { Link } from "react-router-dom";

const JobCard = ({
  imgUrl,
  salary,
  company,
  location,
  employment_type,
  role,
  datePosted,
  _id
}: JobType) => {
  function convertMongoDateToDate(mongoDate: Date) {
    return mongoDate.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }
  return (
   <div>
     <div className="flex items-center w-full h-20 gap-4 px-2 mx-auto text-gray-500 border-b-2 border-gray-300">
      <Link to={`/job/${_id}`} className="flex items-center w-1/2 gap-2">
        <img
          src={imgUrl || "/profile-placeholder.png"}
          alt=""
          className="w-10 h-10 overflow-hidden rounded-full"
        />
        <div>
          <h2 className="text-lg font-semibold">{role}</h2>
          <p className="text-sm font-semibold text-gray-700">
            {company},{" "}
            <span className="text-sm text-gray-500">
              {datePosted && convertMongoDateToDate(datePosted)}
            </span>
          </p>
        </div>
      </Link>

      <div className="flex items-center justify-between w-1/2">
        <div className="text-sm">
          <p>
            in <span className="font-semibold text-black">{location}</span>
          </p>
          <p>
            {salary} <span className="font-sans">INR</span>
          </p>
        </div>
        <div className="flex items-center px-2 py-2 text-sm font-semibold text-black bg-green-200 rounded-md">
          <span className="inline-block w-3 h-3 mr-1 bg-green-500 rounded-full">
            {" "}
          </span>{" "}
          {employment_type}
        </div>
        <div className="cursor-pointer">
          <FaSave size={20} color="green" />
        </div>
      </div>
    </div>
   </div>
  );
};

export default JobCard;
