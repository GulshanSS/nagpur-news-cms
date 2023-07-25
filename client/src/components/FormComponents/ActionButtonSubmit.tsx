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
        className="text-custom-100 bg-custom-800 hover:shadow-xl focus:ring-4 focus:outline-none focus:ring-custom-800 font-medium rounded-lg w-full sm:w-auto text-sm px-5 py-2.5 text-center"
      >
        {label}
      </button>
    </>
  );
};

export default ActionButtonSubmit;
