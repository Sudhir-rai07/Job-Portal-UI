import { Routes, Route, Navigate, Outlet } from "react-router-dom";
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

import ApplyJob from "./Components/pages/job/Seeker/ApplyJob";
import PostJob from "./Components/pages/job/Recruiter/PostJob";
import { User } from "./Types/types";
import Notification from "./Components/pages/profile/Notification";
import JobsApplied from "./Components/pages/job/JobsApplied";
import Applications from "./Components/pages/job/Recruiter/Applications";
import ProtectRecruiter from "./Components/protectRoutes/ProtectRecruiter";
import ApplicationPage from "./Components/pages/job/Recruiter/ApplicationPage";
import VerifyAccount from "./Components/pages/profile/VerifyAccount";


const App = () => {

  const GetMe = async () => {
    const response = await apiClient.get("/api/auth/me")
    return response.data
  }
  const { data: currentUser, isFetching } = useQuery<User>({
    queryKey: ["getMe"], 
    queryFn: GetMe, 
    retry: false, 
    staleTime: 5 * 60 * 1000 
  })

  const userRole = currentUser && currentUser.role


  return (
    <div className="bg-[#f8fafc] h-screen w-full">
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/login" element={currentUser ? <Navigate to={"/"} /> : <Login />} />
        <Route path="/signup" element={currentUser ? <Navigate to={"/"} /> : <SignUpPage />} />
        <Route path="/verify-account/:id" element={<VerifyAccount />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />

        <Route path="/" element={!isFetching && !currentUser ? <Navigate to={"/"} /> : <Outlet />}>
          <Route path="/profile" element={ <Profile /> } />
          <Route path="/notifications" element={<Notification />} />
          <Route path="/update-profile" element={<UpdateProfileLayout />}>
            <Route index element={<UpdateProfile />} />
            <Route path="change-password" element={<ChangePassword />} />
          </Route>


          <Route path="/" element={!isFetching && currentUser ? <ProtectRecruiter role={userRole}/>: <Navigate to={"/login"}/>}>
            <Route path="post-job" element={<PostJob />} />
            <Route path="post/applications" element={<Applications />} />
            <Route path="post/applications/:id" element={<ApplicationPage />} />
          </Route>


          <Route path="/" element={currentUser ? <Outlet/> : <Navigate to={"/login"}/>}>
            <Route path="jobs-applied" element={<JobsApplied />} />
            <Route path="job/:id" element={<ApplyJob />} />
          </Route>
        </Route>


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