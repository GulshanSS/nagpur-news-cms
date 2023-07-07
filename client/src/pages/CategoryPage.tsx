import { useState } from "react";
import DisplayAllCategory from "../components/Category/DisplayAllCategory";
import CategoryForm from "../components/Forms/CategoryForm";
import Modal from "../components/Modal";
import Navbar from "../components/Navbar";
import { AiFillPlusCircle, AiOutlinePlusCircle } from "react-icons/ai";
import { FiSearch } from "react-icons/fi";

const CategoryPage = () => {
  const [modalCloseForm, setModalCloseForm] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");

  return (
    <>
      <Navbar>
        <>
          <div className="md:w-[calc(100%-200px)] w-full fixed top-16 md:top-14 bg-white">
            <div className="flex md:justify-between justify-center items-center px-2.5 py-2 border-b">
              <div className="hidden md:block">
                <button
                  type="button"
                  onClick={(e) => setModalCloseForm(true)}
                  className="flex gap-1 justify-center items-center bg-slate-200 px-2.5 py-1.5 text-slate-500 rounded-md"
                >
                  <span className="text-xl">
                    <AiOutlinePlusCircle />
                  </span>
                  <span className="font-bold text-md">Create</span>
                </button>
              </div>
              <div className="w-80 flex items-center bg-slate-100 px-2.5 py-1.5 rounded-md">
                <input
                  id="keyword"
                  type="text"
                  name="keyword"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-72 bg-inherit focus:outline-none"
                  placeholder="Search"
                />
                <label htmlFor="keyword" className="ml-2">
                  <span className="text-slate-500 font-bold">
                    <FiSearch />
                  </span>
                </label>
              </div>
            </div>
          </div>
          <div className="w-auto py-32">
            <DisplayAllCategory searchQuery={searchQuery} />
          </div>
        </>
      </Navbar>
      <Modal
        id="categoryForm"
        close={modalCloseForm}
        setClose={setModalCloseForm}
      >
        <CategoryForm buttonLabel="Create" />
      </Modal>

      <div className="z-20 fixed bottom-6 right-6 md:hidden rounded-full">
        <button
          type="button"
          className="text-5xl"
          onClick={(e) => setModalCloseForm(true)}
        >
          <span className="text-slate-400">
            <AiFillPlusCircle />
          </span>
        </button>
      </div>
    </>
  );
};

export default CategoryPage;
