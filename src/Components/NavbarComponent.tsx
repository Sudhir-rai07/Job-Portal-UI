import { User } from "@/Types/types";
import { useQuery } from "@tanstack/react-query";
import { Bell, LayoutGrid, Plus } from "lucide-react";
import { Button, Dropdown, Navbar, Menu } from "react-daisyui";
import { FaBars } from "react-icons/fa";
import { Link } from "react-router-dom";

const NavbarComponent = () => {
  const { data: currentUser } = useQuery<User>({ queryKey: ["getMe"] });

  return (
    <Navbar className="sticky top-0 flex items-center bg-transparent bg-white shadow-md md:px-12">
      <Navbar.Start>
        <Dropdown dataTheme="light">
          <Button
            tag="label"
            color="ghost"
            tabIndex={0}
            className="lg:hidden"
            size="md"
          >
            <FaBars />
          </Button>
          <Dropdown.Menu tabIndex={0} className="w-52 menu-sm z-[1]">
            <Dropdown.Item>
              <Button>
                <Link to={"/"}>Home</Link>
              </Button>
            </Dropdown.Item>

            <Dropdown.Item>
              <Button>
                <Link to={"/post-job"}>Post a Job</Link>
              </Button>
            </Dropdown.Item>

            <Dropdown.Item>
              <Button>
                <Link to={"/notifications"}>Notifications</Link>
              </Button>
            </Dropdown.Item>

            {currentUser?.role === "job_seeker" && <Dropdown.Item>
              <Button>
                <Link to={"/jobs-applied"}>Jobs applied</Link>
              </Button>
            </Dropdown.Item>}
          </Dropdown.Menu>
        </Dropdown>
        <div className="flex items-center cursor-pointer">
          <img src="/Logo.svg" className="h-10" />
          <Link to={"/"} className="pl-1 text-xl font-bold">
            JobBox
          </Link>
        </div>
      </Navbar.Start>

      <Navbar.Center className="hidden lg:flex">
        <Menu
          horizontal
          className="p-1 font-semibold text-black text-md"
          size="lg"
        ></Menu>
      </Navbar.Center>

      {!currentUser ? (
        <Navbar.End>
          <Button size="md" variant="outline" className="mr-1" color="ghost">
            <Link to={"/signup"}>SignUp</Link>
          </Button>
          <Button
            size="md"
            className="text-pink-500 bg-pink-100 border-pink-600 hover:bg-pink-600 hover:border-pink-600 hover:text-white"
          >
            <Link to={"/login"}>Login</Link>
          </Button>
        </Navbar.End>
      ) : (
        <div className="gap-4 ml-auto">
          {currentUser && currentUser.role === "job_seeker" && <Link
            to={"/jobs-applied"}
            className="hidden p-2 bg-gray-200 rounded-full sm:inline-block"
            title="JobsApplied"
          >
            <LayoutGrid size={18} />
          </Link>}

          <Link
            to={"/notifications"}
            className="hidden p-2 bg-gray-200 rounded-full sm:inline-block"
            title="Notifications"
          >
            <Bell size={18} />
          </Link>
          {currentUser && currentUser.role === "recruiter" && (
            <Link
              to={"/post-job"}
              className="hidden p-2 bg-gray-200 rounded-full sm:inline-block"
              title="Post a job"
            >
              <Plus size={20} />
            </Link>
          )}

{currentUser && currentUser.role === "recruiter" && (
            <Link
              to={"/post/applications"}
              className="hidden p-2 bg-gray-200 rounded-full sm:inline-block"
              title="Post a job"
            >
              JobPosted
            </Link>
          )}
          <Link
            to={"/profile"}
            className="flex items-center justify-center w-10 h-10 overflow-hidden rounded-full"
          >
            <img
              src={currentUser.profileImage || "/profile-placeholder.png"}
              alt="Profile_img"
              className="object-cover w-full h-full"
            />
          </Link>
        </div>
      )}

      {/* <img src="/profile-placeholder.png" alt=""  className="w-8 h-8 overflow-hidden rounded-full"/> */}
    </Navbar>
  );
};

export default NavbarComponent;
