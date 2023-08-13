import { AiFillPlusCircle } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

type Props = {
  navigateToDifferentPage: boolean;
  navigateTo?: string;
  setModalCloseForm?: Function;
};

const AddResourceButton = ({
  setModalCloseForm,
  navigateToDifferentPage,
  navigateTo,
}: Props) => {
  const navigate = useNavigate();
  return (
    <>
      <div className="z-20 w-12 h-12 bg-custom-800 flex items-center justify-center fixed bottom-6 right-6 md:hidden rounded-full">
        <button
          type="button"
          className="text-5xl"
          onClick={(e) =>
            navigateToDifferentPage
              ? navigate(navigateTo!)
              : setModalCloseForm?.(true)
          }
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
