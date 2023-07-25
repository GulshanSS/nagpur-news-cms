type Props = {
  label: string;
};

const SubmitButton = ({ label }: Props) => {
  return (
    <>
      <button
        type="submit"
        className="text-custom-100 font-bold bg-custom-800 hover:shadow-xl focus:ring-4 focus:outline-none focus:ring-custom-800 rounded-lg w-full sm:w-auto text-sm px-5 py-2.5 text-center"
      >
        {label}
      </button>
    </>
  );
};

export default SubmitButton;
