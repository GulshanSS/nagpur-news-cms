import { FiSearch } from "react-icons/fi";
import { AiOutlinePlusCircle } from "react-icons/ai";

type Props = {
  searchQuery: string;
  setSearchQuery: Function;
  setModalCloseForm: Function;
};

const PageNav = ({ searchQuery, setSearchQuery, setModalCloseForm }: Props) => {
  return (
    <>
      <div className="md:w-[calc(100%-200px)] w-full fixed top-16 md:top-14 bg-custom-50 z-30">
        <div className="flex md:justify-between justify-center items-center px-2.5 py-2 border-b border-custom-600">
          <div className="hidden md:block">
            <button
              type="button"
              onClick={(e) => setModalCloseForm(true)}
              className="flex gap-1 justify-center items-center bg-custom-800 px-2.5 py-1.5 text-custom-50 rounded-md"
            >
              <span className="text-xl">
                <AiOutlinePlusCircle />
              </span>
              <span className="font-bold text-md">Create</span>
            </button>
          </div>
          <div className="w-80 md:w-96 flex items-center bg-custom-50 border border-custom-600 px-2.5 py-1.5 rounded-md">
            <input
              id="keyword"
              type="text"
              name="keyword"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-inherit focus:outline-none text-custom-800 placeholder:text-custom-800"
              placeholder="Search"
            />
            <label htmlFor="keyword" className="ml-2">
              <span className="text-custom-800 text-xl font-bold">
                <FiSearch />
              </span>
            </label>
          </div>
        </div>
      </div>
    </>
  );
};

export default PageNav;
