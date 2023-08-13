import { IoIosArrowDown } from "react-icons/io";
import { NavLink } from "react-router-dom";
import NavItem from "./NavItem";
import { useState } from "react";

type Props = {
  icon: JSX.Element;
  text: string;
  to: string;
  groupItems: {
    text: string;
    to: string;
  }[];
};

const NavGroupItem = ({ icon, text, to, groupItems }: Props) => {
  const [dropdown, setDropdown] = useState<boolean>(true);

  return (
    <>
      <NavLink
        to={`/${to}`}
        className={({ isActive }) =>
          `flex items-center p-2 rounded-lg ${
            isActive
              ? "text-custom-800 bg-custom-100 border border-custom-600"
              : " text-custom-800  hover:bg-custom-100"
          }`
        }
      >
        <li className="w-full">
          <div className="flex justify-between items-center">
            <div className="flex">
              <span className="text-2xl">{icon}</span>
              <span className="ml-3">{text}</span>
            </div>
            <button
              onClick={() => setDropdown(!dropdown)}
              className={`text-lg rounded-full hover:bg-custom-800 hover:text-custom-100 p-1 ${
                dropdown ? "rotate-180" : "rotate-0"
              } duration-300`}
            >
              <IoIosArrowDown />
            </button>
          </div>
          <ul
            className={`${
              dropdown ? "inline" : "hidden"
            } duration-300 flex flex-col gap-2 mt-2`}
          >
            {groupItems.map((groupItem, index) => (
              <NavItem key={index} text={groupItem.text} to={groupItem.to} />
            ))}
          </ul>
        </li>
      </NavLink>
    </>
  );
};

export default NavGroupItem;
