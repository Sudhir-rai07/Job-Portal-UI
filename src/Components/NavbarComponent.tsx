import { useQuery } from "@tanstack/react-query";
import { useCallback, useRef } from "react";
import { Button, Dropdown, Navbar, Menu} from "react-daisyui";
import { FaBars } from "react-icons/fa";
import { Link } from "react-router-dom";

const NavbarComponent = () => {
  const { data: currentUser } = useQuery({ queryKey: ["getMe"] });

  const ref = useRef<HTMLDialogElement>(null);
  const handleShow = useCallback(() => {
    ref.current?.showModal();
  }, [ref]);
  return (
    <Navbar className="sticky top-0 flex items-center bg-transparent shadow-md lg:bg-transparent md:px-12">
      <Navbar.Start>
        <Dropdown>
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
                <Link to={"/find-job"} className="text-gray-400">Find A Job</Link>
              </Button>
            </Dropdown.Item>
            <Dropdown.Item>
              <Button>
                <Link to={"/rectuiter"}>Recruiters</Link>
              </Button>
            </Dropdown.Item>
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
        >
          <Menu.Item className="px-2 ">
            <Button color="ghost" className="">
              <Link to={"/find-job"} className="text-gray-500">Find a job</Link>
            </Button>
          </Menu.Item>
          <Menu.Item>
            <Button color="ghost">
              <Link to={"/recruiter"} className="text-gray-500">Recruiter</Link>
            </Button>
          </Menu.Item>
        </Menu>
      </Navbar.Center>

      {!currentUser ? (
        <Navbar.End>
          <Button size="md" variant="outline" className="mr-1" color="ghost">
            <Link to={"/signup"}>SignUp</Link>
          </Button>
          <Button variant="outline" color={"accent"} size="md">
            <Link to={"/login"}>Login</Link>
          </Button>
        </Navbar.End>
      ): (
        <Link to={"/profile"} className="w-10 h-10 ml-auto overflow-hidden rounded-full">
          <img src="/profile-placeholder.png" alt="" />
        </Link>
      )}

      {/* <img src="/profile-placeholder.png" alt=""  className="w-8 h-8 overflow-hidden rounded-full"/> */}
      
    </Navbar>
  );
};

export default NavbarComponent;
