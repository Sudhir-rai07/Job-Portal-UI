import { FaGear } from "react-icons/fa6";
import {   CiLock, CiUser } from "react-icons/ci"; 
import { Link, Outlet } from "react-router-dom";

const UpdateProfileLayout = () => {
  return (
    <div className="flex w-full h-screen text-black bg-slate-100">
      <div className="w-full h-[90%] mx-auto bg-slate-200 lg:w-2/3  overflow-y-scroll px-4 my-auto rounded-lg py-2">
        <div className="flex items-center gap-2 text-xl ">
          <span>
            <FaGear />
          </span>
          Account setting
        </div>

        <div className="flex gap-4 mt-6 grid-rows-12 ">
          {/* Leftnavbar action menu */}
          <div className="grid row-span-1 max-w-[200px] lg:w-full px-2 py-3 bg-white rounded-md max-h-32">
            <Link
              to={"/profile"}
              className="flex items-center gap-1 px-2 py-2 text-black rounded-md cursor-pointer"
            >
              <CiUser size={25} />
              <span className="hidden lg:inline-block">Profile Setting</span>
            </Link>
            <Link
              to={"change-password"}
              className="flex items-center gap-1 px-2 py-2 text-black rounded-md cursor-pointer"
            >
              <CiLock size={25} />
              <span className="hidden lg:inline-block">Password</span>
            </Link>
          </div>

          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default UpdateProfileLayout;
