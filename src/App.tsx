import { Routes, Route, Navigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";

import apiClient from "./api/axios";

import Home from "./Components/Home";
import SignUpPage from "./Components/pages/auth/SignUpPage";
import Login from "./Components/pages/auth/Login";
import Profile from "./Components/pages/profile/Profile";
import ChangePassword from "./Components/pages/profile/ChangePassword";
import ForgotPassword from "./Components/pages/auth/ForgotPassword";
import ResetPassword from "./Components/pages/auth/ResetPassword";
import UpdateProfileLayout from "./Components/pages/profile/UpdateProfileLayout";
import UpdateProfile from "./Components/pages/profile/UpdateProfile";

import Jobs from "./Components/pages/job/Jobs";
import ApplyJob from "./Components/pages/job/ApplyJob";
import Footer from "./Components/Footer";
import PostJob from "./Components/pages/job/PostJob";
const App = () => {

  const GetMe = async () =>{
    const response = await apiClient.get("/api/auth/me")
    return response.data
  }
  const {data:currentUser, isFetching} = useQuery({queryKey: ["getMe"], queryFn:GetMe})


  return (
    <div className="bg-[#f8fafc]">
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/login" element={currentUser? <Navigate to={"/"} /> :<Login />} />
        <Route path="/signup" element={currentUser? <Navigate to={"/"} /> :<SignUpPage />} />
        <Route path="/profile" element={currentUser?<Profile />:<Navigate to={"/login"}/>} />
        <Route path="/update-profile" element={!currentUser? <Navigate to={"/"} /> :<UpdateProfileLayout />}>
                <Route index element={<UpdateProfile />}/>
                <Route path="change-password" element={<ChangePassword />}/>
        </Route>
        <Route path="/post-a-job" element={<PostJob />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />

        
        <Route path="/find-job?" element={<Jobs />} />
        {/* <Route path="/filter-jobs?" element={<FilterdJobs />} /> */}
        {/* <Route path="/find-job/:job-id" element={<Job />} /> */}
        <Route path="/job/:id" element={<ApplyJob />}/>

        

      </Routes>

      
         <Toaster />
    </div>
  );
};

export default App;


// TODO: 
// Find recruiters
// View all applied jobs
// Post a job
// Update a job

// Apply for us
// 