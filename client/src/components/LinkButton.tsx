import { Link } from "react-router-dom";
import { IoLogInOutline } from "react-icons/io5";

type Props = { to: string; label: string };

const LinkButton = ({ to, label }: Props) => {
  return (
    <>
      <Link to={to}>
        <button
          type="button"
          className="text-white bg-[#4285F4] hover:bg-[#4285F4]/90 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#4285F4]/55 m-2"
        >
          <span className="text-lg text-white mr-2">
            <IoLogInOutline />
          </span>
          {label}
        </button>
      </Link>
    </>
  );
};

export default LinkButton;
