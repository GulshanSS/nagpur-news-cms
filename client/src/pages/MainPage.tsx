import Logo from "../assets/logo.jpg";
import { Link } from "react-router-dom";

const MainPage = () => {
  return (
    <>
      <div className="w-screen h-screen flex flex-col flex-wrap items-center justify-center gap-2 bg-custom-50">
        <img className="w-[250px] mb-6 rounded-full ring-4 ring-custom-800" src={Logo} />
        <h1 className="text-3xl font-bold text-clip text-center text-custom-800 uppercase mb-6">
          Nagpur News CMS
        </h1>
        <Link to="/login">
          <button className="text-custom-100 w-32 bg-custom-800 border border-custom-800 font-extrabold px-2.5 py-3 rounded-md hover:shadow-lg duration-300">
            Login
          </button>
        </Link>
      </div>
    </>
  );
};

export default MainPage;
