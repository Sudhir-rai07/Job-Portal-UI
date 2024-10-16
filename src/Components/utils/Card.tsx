import { Button } from "react-daisyui";
import { CiStopwatch } from "react-icons/ci";
import { FaLocationPin } from "react-icons/fa6";
import { HiOutlineBuildingOffice2 } from "react-icons/hi2";
import { JobType } from "../../Types/types";

const Card = ({company,location,role,employment_type
  ,description,tags,salary, imgUrl}:JobType) => {
  return (
    <div className="max-w-sm lg:px-4 px-3 min-w-[300px] py-2 mx-auto mt-6 overflow-hidden bg-white rounded-lg shadow-lg">
      <div className="flex ">
        <img src={imgUrl} alt="" className="w-12 h-12 mr-4 rounded-lg " />
        <div className="flex flex-col">
          <h2 className="text-2xl font-semibold text-black">{company}</h2>
          <span className="flex items-center">
            <FaLocationPin className="mr-1" /> {location}{" "}
          </span>
        </div>
      </div>
      <div>
        <div className="mt-2">
          <h2 className="text-2xl font-semibold text-black">
            {" "}
            {role}
          </h2>
        </div>
        <div className="flex text-sm">
          <div className="flex items-center">
            <HiOutlineBuildingOffice2 className="mr-1" /> {employment_type
            }{" "}
          </div>
          <div className="flex items-center ml-2">
            <CiStopwatch className="" /> {"Posted 4 months ago"}{" "}
          </div>
        </div>

        <div className="mt-6">
          <p>{description} </p>
          <div className="mt-4">
            
            {tags && tags.map((tag:string, idx:number)=>{
              return(
<span key={idx} className="px-2 py-1 mr-1 text-gray-400 rounded-sm bg-gray-200/70">{tag}</span>
              )
            })}
          </div>
        </div>

        <div className="flex items-center justify-between mt-8 text-xl">
          <div className="font-bold text-green-500">${salary}<span className="text-sm font-normal text-gray-400">/month</span></div>
          <Button className="btn btn-success btn-outline">Apply now</Button>
        </div>
      </div>
    </div>
  );
};

export default Card;
