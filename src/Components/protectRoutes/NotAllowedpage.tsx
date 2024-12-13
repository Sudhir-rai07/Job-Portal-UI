import { User } from "@/Types/types"
import { useQuery } from "@tanstack/react-query"

const NotAllowedpage = () => {
  const { data: currentUser } = useQuery<User>({ queryKey: ["getMe"]})
  console.log(currentUser)
  return (
    <div>
      You are not allowed

      {/* {!currentUser && (
        <>
        <Navigate to={'/login'} replace state={{message: "You must login to access features"} }/>
      </>
    )} */}
    </div>
  )
}

export default NotAllowedpage
