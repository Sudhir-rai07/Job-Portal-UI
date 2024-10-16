import Box from "./utils/Box";
import categoryData from "../constants/categoryData";
import { CategoryType } from "../Types/types";
import { Button } from "react-daisyui";
import { HiMiniArrowRightCircle } from "react-icons/hi2";

const Category = () => {
  return (
    <section className="w-full bg-[#F0F8FF] py-8">
      <div className="text-center">
        <h2 className="mb-2 text-2xl font-semibold text-center text-blue-900 lg:text-4xl">
          Browse by category
        </h2>
        <span className="text-gray-400">
          Find the job that is perfect for you.
        </span>
      </div>

      <div className="grid grid-cols-2 gap-3 p-4 mx-auto mt-4 place-items-center lg:w-4/5 sm:grid-cols-3 lg:grid-cols-4">
        {categoryData &&
          categoryData.map((item, idx: number) => {
            return (
              <div className="" key={idx} >
                <Box icon={item.icon} categoryName={item.name} />
              </div>
            );
          })}
      </div>

      <div className="flex justify-center w-full gap-3 mt-4">
        <p className="w-3 h-3 bg-blue-400 rounded-full animate-pulse"></p>
        <p className="w-3 h-3 bg-blue-400 rounded-full animate-pulse"></p>
        <p className="w-3 h-3 bg-blue-400 rounded-full animate-pulse"></p>
      </div>

      <div className="lg:w-1/2 w-[90%] flex items-center justify-evenly mx-auto lg:mt-10 mt-6 bg-white shadow-[1px_2px_12px_3px_#a0aec0] rounded-md py-2 lg:py-6 px-2 lg:px-4">
        <div className="flex items-center">
          <img src="/Hiring.svg" alt="" className="w-20 lg:w-28 lg:block" />
          <h3 className="text-sm text-gray-400 lg:text-2xl">
            We are <br />{" "}
            <span className="text-xl font-bold text-blue-900 lg:text-4xl">
              HIRING
            </span>
          </h3>
        </div>

        <div className="relative flex-row-reverse ml-3 text-sm lg:text-xl lg:top-4">
          <p className="hidden lg:inline-block">
            Let's <span className="font-semibold text-blue-900">Work</span>{" "}
            together <br />&{" "}
            <span className="font-semibold text-blue-900">Explore</span>{" "}
            Opportunities
          </p>
          <Button
            variant="outline"
            className="ml-1 text-lg text-white btn-sm lg:btn-md lg:ml-4"
            color="success"
          >
            <HiMiniArrowRightCircle className="mr-1 text-2xl text-black" />
            Apply now{" "}
          </Button>
        </div>

        <div className="">
          <img
            src="/Chat.svg"
            alt=""
            className="hidden w-20 sm:inline-block lg:w-32 lg:inline-block"
          />
        </div>
      </div>
    </section>
  );
};

export default Category;

