import apiClient from "@/api/axios";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Link, useParams } from "react-router-dom";

const VerifyAccount = () => {
  const { id: verificationToken } = useParams();
  console.log(verificationToken);


  const handleVerifyUser = async () => {
    const response = await apiClient.get(
      `/api/auth/verify-account/${verificationToken}`
    );
    return response.data;
  };

  const {isLoading, data, isError, error, isSuccess} = useQuery({queryKey: ['verifyUser'], queryFn: handleVerifyUser, enabled: !!verificationToken});
  if(data) console.log(data)
  if(axios.isAxiosError(error)){
    console.log(error.response)
  }
  

  return (
    <section className="w-full h-screen bg-white">

      {isLoading && <div className="text-lg font-semibold text-center">Loading...</div>}
      {isSuccess && (
        <div className="pink-container">
          <h1 className="heading"> Your account has been verified.</h1>
          <Link
            to={"/"}
            className="mt-5 text-lg text-white transition hover:underline"
          >
            Explore the portal
          </Link>
        </div>
      )}

      {isError && (
        <div>
          <p className="mt-8 text-lg font-semibold text-center text-red-600">ERROR: {axios.isAxiosError(error)? error.response?.data.error : ""}</p>
        </div>
      )}
    </section>
  );
};

export default VerifyAccount;
