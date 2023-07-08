import { AiFillPlusCircle } from "react-icons/ai";

type Props = {
  setModalCloseForm: Function;
};

const AddResourceButton = ({ setModalCloseForm }: Props) => {
  return (
    <>
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

export default AddResourceButton;
