import ButtonSpinner from "../ButtonSpinner";

type Props = {
  label: string;
  isLoading?: boolean;
};

const SubmitButton = ({ label, isLoading }: Props) => {
  return (
    <>
      <button
        type="submit"
        disabled={isLoading}
        className="text-custom-100 disabled:bg-custom-500 font-bold bg-custom-800 hover:shadow-xl rounded-lg w-full sm:w-auto text-sm px-5 py-2.5 text-center"
      >
        {isLoading ? <ButtonSpinner /> : label}
      </button>
    </>
  );
};

export default SubmitButton;
