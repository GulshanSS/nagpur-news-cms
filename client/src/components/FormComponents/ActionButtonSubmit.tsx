type Props = {
  label: string;
  onClick: (e: any) => void;
};

const ActionButtonSubmit = ({ label, onClick }: Props) => {
  return (
    <>
      <button
        type="button"
        onClick={onClick}
        className="text-[#FEF9D5] bg-[#614E5C] hover:shadow-xl focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg w-full sm:w-auto text-sm px-5 py-2.5 text-center"
      >
        {label}
      </button>
    </>
  );
};

export default ActionButtonSubmit;
