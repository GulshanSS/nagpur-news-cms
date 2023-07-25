import { Link } from "react-router-dom";
import { IoLogInOutline } from "react-icons/io5";

type Props = { to: string; label: string };

const LinkButton = ({ to, label }: Props) => {
  return (
    <>
      <Link to={to}>
        <button
          type="button"
          className=" text-custom-100 bg-custom-800 focus:ring-4 focus:outline-none focus:ring-custom-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center m-2"
        >
          <span className="text-lg text-custom-100 mr-2">
            <IoLogInOutline />
          </span>
          {label}
        </button>
      </Link>
    </>
  );
};

export default LinkButton;
