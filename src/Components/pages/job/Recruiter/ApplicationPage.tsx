import apiClient from "@/api/axios"
import { Button } from "@/Components/ui/button";
import { formatDate } from "@/Components/utils/formatDate";
import { QueryClient, useMutation, useQuery } from "@tanstack/react-query"
import axios from "axios";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom"


type Applicant = {
  _id: string;
  fullname: string;
  email: string
}

type Application = {
  applicant: Applicant;
  coverLetter: string;
  createdAt: Date;
  job: string;
  status: string;
  _id: string
}

type Applications = {
  applications: Application[];
  job: string;
  description: string
}

const ApplicationPage = () => {

  const { id: jobId } = useParams()
  const queryClient = new QueryClient()
  const fetchApplications = async () => {
    const response = await apiClient.get(`/api/job/applications/${jobId}`)
    return response.data
  }

  const { data: applicantions, isFetching } = useQuery<Applications>({ queryKey: ["getApplications"], queryFn: fetchApplications })
  console.log(applicantions)

  const handleAcceptApplication = async (id: string) => {
    const response = await apiClient.patch(`/api/job/application/accept/${id}`)
    return response.data
  }

  const handleRejectApplication = async (id: string) => {
    const response = await apiClient.patch(`/api/job/application/reject/${id}`)
    return response.data
  }

  const { mutate: AcceptApplication } = useMutation({
    mutationFn: handleAcceptApplication, onError: (err) => {
      if (axios.isAxiosError(err)) {
        console.log(err.response?.data.error)
        toast.error(err.response?.data.error)
      }
    },
    onSuccess: () => {
      toast.success("Application Accepted")
      queryClient.invalidateQueries({queryKey:["getApplications"], refetchType:"all"})
    }
  })

  const { mutate: RejectApplication } = useMutation({
    mutationFn: handleRejectApplication,
    onError: (err) => {
      if (axios.isAxiosError(err)) {
        console.log(err.response?.data.error)
        toast.error(err.response?.data.error)
      }
    },
    onSuccess: () => {
      toast.success("Application Rejected")
      queryClient.invalidateQueries({queryKey:["getApplications"]})
    }
  })

  return (
    <section className="h-full w-full overflow-y-scroll">
      <div className="pink-container">
        <h1 className="heading">Applications for Job Post : <span className="text-pink-600">{applicantions?.job}</span></h1>
        <p className="heading_paragraph">{applicantions?.description}</p>
      </div>
      {isFetching && <div>Loading</div>}

      <div className="px-4 my-10 grid grid-1 lg:max-w-[60%] w-full gap-10 ">
        {!isFetching && applicantions?.applications &&
          applicantions.applications.map((applicantion: Application) => {

            return (
              <div key={applicantion._id} className="shadow-gray-400 px-4 py-2 rounded-md shadow-lg">
                <div>
                  <p className="text-lg"><span className="font-semibold">{applicantion.applicant.fullname}</span>
                  </p>

                  <p className="text-sm text-gray-400"><span className="">{applicantion.applicant.email}</span></p>
                </div>

                <div className="mt-4">
                  <span className="text-lg font-semibold">Cover Letter:</span>
                  <p className="text-gray-500 lg:max-w-[600px] max-w-[600px] w-full break-words">
                    {applicantion.coverLetter}
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam quos unde adipisci assumenda dignissimos, fugiat ratione labore minus eaque tenetur aliquid maiores omnis cumque ea non dolorum enim! Soluta molestiae ea ex expedita porro earum, quae rem fuga omnis molestias!
                  </p>
                </div>

                <div className="bg-gray-200 mt-4 inline-block px-2 py-2 rounded-sm">
                  {formatDate(applicantion.createdAt)}
                </div>

                <div className="flex justify-between items-center mt-2">
                  <div className="">
                    <span className="font-semibold text-lg">Status : </span>
                    <span className="text-lg">{applicantion.status}</span>
                  </div>

                  {applicantion.status === "pending" && <div className="space-x-4">
                    <Button
                      variant={"default"}
                      className="bg-green-500 hover:bg-green-600"
                      onClick={() => AcceptApplication(applicantion._id)}>Accept</Button>
                    <Button variant={"destructive"} className="hover:bg-red-600" onClick={() => RejectApplication(applicantion._id)}>Reject</Button>
                  </div>}
                </div>
              </div>
            )
          })
        }
      </div>
    </section>
  )
}

export default ApplicationPage
