import { Navigate, Outlet } from 'react-router-dom'
import NotAllowedpage from './NotAllowedpage'

interface ProtectSeekerProps {
    role: string |undefined
}

const ProtectSeeker: React.FC<ProtectSeekerProps> = ({role }) => {
  return (
    <>
    {!role && <Navigate to={"/login"}/>}
    {role === "job_seeker" ? <Outlet/> : <NotAllowedpage />}
    </>
  )
}

export default ProtectSeeker
