import { IoLogOut } from "react-icons/io5";
import Logo from "../assets/logo.jpg";
import { useLogoutUserMutation } from "../redux/api/authApi";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { BiSolidCategory } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import NavItem from "./NavItem";
import { BsFillTagFill } from "react-icons/bs";
import { MdArticle, MdReviews } from "react-icons/md";
import { HiSpeakerphone, HiUserGroup } from "react-icons/hi";
import RequireAdmin from "./Auth/RequireAdmin";
import NavGroupItem from "./NavGroupItem";

type Props = {
  children: JSX.Element;
};

const Navbar = ({ children }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [logoutUser] = useLogoutUserMutation();

  const navigate = useNavigate();

  const handleLogoutUser = () => {
    logoutUser();
    navigate("/login");
  };

  return (
    <>
      <nav className="fixed top-0 z-50 w-full bg-custom-50 border-b border-custom-600">
        <div className="px-3 py-3 lg:px-5 lg:pl-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-start">
              <button
                onClick={() => setIsOpen(!isOpen)}
                type="button"
                className="inline-flex items-center p-2 text-sm text-custom-500 sm:hidden rounded-lg hover:bg-custom-800 focus:outline-none focus:ring-2 focus:ring-custom-100"
              >
                <span className="sr-only">Open sidebar</span>
                <svg
                  className="w-6 h-6"
                  aria-hidden="true"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    clipRule="evenodd"
                    fillRule="evenodd"
                    d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
                  ></path>
                </svg>
              </button>
              <a href="#" className="flex ml-2 md:mr-24">
                <img
                  src={Logo}
                  className="h-8 mr-3 rounded-full border border-custom-800 ring-custom-800"
                  alt="NagpurNews"
                />
                <span className="self-center font-semibold text-2xl whitespace-nowrap">
                  Nagpur News
                </span>
              </a>
            </div>
            <div className="flex items-center">
              <div className="flex items-center ml-3">
                <div>
                  <button
                    type="button"
                    className="flex text-3xl text-custom-800 focus:outline-none"
                    onClick={handleLogoutUser}
                  >
                    <span className="sr-only">Open user menu</span>
                    <IoLogOut />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <aside
        id="logo-sidebar"
        className={`fixed top-0 left-0 z-40 w-[200px] ${
          isOpen ? "-translate-x-0" : "-translate-x-full"
        } md:translate-x-0 h-screen pt-20 transition-transform  bg-custom-50 border-r border-custom-600`}
      >
        <div className="h-full px-3 pb-4 overflow-y-auto bg-custom-50">
          <ul
            className="space-y-2 font-bold"
            onClick={() => setIsOpen(!isOpen)}
          >
            <NavItem icon={<CgProfile />} text="Profile" to="me" />
            <NavItem icon={<BiSolidCategory />} text="Category" to="category" />
            <NavItem icon={<BsFillTagFill />} text="Tag" to="tag" />
            <NavGroupItem
              icon={<MdArticle />}
              text="Article"
              to="article"
              groupItems={[
                { text: "Published", to: "article/published" },
                { text: "Drafts", to: "article/draft" },
              ]}
            />
            <NavItem icon={<MdReviews />} text="Testimonial" to="testimonial" />
            <NavItem
              icon={<HiSpeakerphone />}
              text="Promotion"
              to="promotionary-article"
            />
            <RequireAdmin>
              <NavItem icon={<HiUserGroup />} text="Users" to="user" />
            </RequireAdmin>
          </ul>
          <ul className="pt-4 mt-4 space-y-2 font-bold border-t border-custom-600">
            <NavItem
              onClick={logoutUser}
              icon={<IoLogOut />}
              text="Logout"
              to="login"
            />
          </ul>
        </div>
      </aside>

      <div className="md:ml-[200px]">{children}</div>
    </>
  );
};

export default Navbar;
