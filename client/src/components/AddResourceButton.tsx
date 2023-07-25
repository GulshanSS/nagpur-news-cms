import { AiFillPlusCircle } from "react-icons/ai";

type Props = {
  setModalCloseForm: Function;
};

const AddResourceButton = ({ setModalCloseForm }: Props) => {
  return (
    <>
      <div className="z-20 w-12 h-12 bg-custom-800 flex items-center justify-center fixed bottom-6 right-6 md:hidden rounded-full">
        <button
          type="button"
          className="text-5xl"
          onClick={(e) => setModalCloseForm(true)}
        >
          <span className="text-custom-100">
            <AiFillPlusCircle />
          </span>
        </button>
      </div>
    </>
  );
};

export default AddResourceButton;
