import { NavLink } from "react-router-dom";

type Props = {
  onClick?: () => void;
  icon?: JSX.Element;
  text: string;
  to: string;
};

const NavItem = ({ icon, text, to, onClick }: Props) => {
  return (
    <>
      <li onClick={onClick}>
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
          {icon && <span className="text-2xl">{icon}</span>}
          <span className="ml-3">{text}</span>
        </NavLink>
      </li>
    </>
  );
};

export default NavItem;
