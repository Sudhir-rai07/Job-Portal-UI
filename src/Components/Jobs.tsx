import { FaHome } from "react-icons/fa"
import Box from "./utils/Box"
import categoryData from "../constants/categoryData";
import Card from "./utils/Card";
import jobData from "../constants/JobDummyData";

const Jobs = () => {
  return (
    <section className='w-full bg-[#F0F8FF]'>
      <div className='flex flex-col items-center justify-center pt-4'>
        <h2 className='text-2xl font-semibold text-center text-blue-900 lg:text-4xl'>Jobs of the today</h2>
        <p className='mt-1'>Search and connect with the right candidate</p>
      </div>

      <div className="grid grid-cols-2 gap-3 p-4 mx-auto place-items-center lg:w-[90%] sm:grid-cols-3 lg:grid-cols-8 overflow-x-scroll">
        {categoryData &&
          categoryData.map((item, idx: number) => {
            return (
              <div className="" key={idx}>
                <Box icon={item.icon} categoryName={item.name}/>
              </div>
            );
          })}
      </div>


      <div className="grid w-4/5 grid-cols-1 mx-auto lg:gap-3 md:grid-cols-2 lg:grid-cols-3 place-items-center">
        {jobData && jobData.map((job, idx)=>{
          return (
            <Card key={idx} company={job.company} location={job.location}
            role={job.role} employment_type
            ={job.employment_type
            } description={job.description}
            tags={job.tags} salary={job.salary} imgUrl={job.imgUrl}/>
          )
        })}
      </div>
    </section>
  )
}

export default Jobs
