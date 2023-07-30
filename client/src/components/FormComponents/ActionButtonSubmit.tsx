import ButtonSpinner from "../ButtonSpinner";

type Props = {
  label: string;
  onClick: (e: any) => void;
  isLoading?: boolean;
};

const ActionButtonSubmit = ({ label, onClick, isLoading }: Props) => {
  return (
    <>
      <button
        type="button"
        disabled={isLoading}
        onClick={onClick}
        className="text-custom-100 disabled:bg-custom-500 bg-custom-800 hover:shadow-xl focus:ring-4 focus:outline-none focus:ring-custom-800 font-medium rounded-lg w-full sm:w-auto text-sm px-5 py-2.5 text-center"
      >
        {isLoading ? <ButtonSpinner /> : label}
      </button>
    </>
  );
};

export default ActionButtonSubmit;
