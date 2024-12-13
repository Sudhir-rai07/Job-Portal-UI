import { Navigate, Outlet } from 'react-router-dom'
import NotAllowedpage from './NotAllowedpage'

interface ProtectRecruiterProps {
    role: string |undefined
}

const ProtectRecruiter: React.FC<ProtectRecruiterProps> = ({role }) => {
  return (
    <>
    {!role && <Navigate to={"/login"}/>}
    {role === "recruiter" ? <Outlet/> : <NotAllowedpage />}
    </>
  )
}

export default ProtectRecruiter
