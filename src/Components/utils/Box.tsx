import { BoxProp } from "../../Types/types";

const Box: React.FC<BoxProp> = ({ categoryName, icon }) => {
    return (
      <div className="px-2 py-2 cursor-pointer min-w-[160px] bg-white text-black lg:font-semibold  rounded-md flex flex-col items-center justify-start text-sm lg:text-lg hover:shadow-[1px_2px_12px_3px_#a0aec0] shadow-[1px_2px_6px_1px_#a0aec0] transition-shadow duration-200">
        <span className="mr-2 text-3xl text-blue-400">{icon}</span>
        <span>{categoryName}</span>
      </div>
    );
  };

export default Box