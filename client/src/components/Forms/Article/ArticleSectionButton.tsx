type Props = {
  setModalCloseForm: Function;
};

const ArticleSectionButton = ({ setModalCloseForm }: Props) => {
  return (
    <>
      <button
        type="button"
        className="text-gray-900 bg-gray-100 hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center mb-2"
        onClick={(e) => setModalCloseForm(true)}
      >
        <svg
          className="w-4 h-4 mr-2 -ml-1 text-[#626890]"
          xmlns="http://www.w3.org/2000/svg"
          width="31"
          height="31"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#000000"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <line x1="12" y1="5" x2="12" y2="19"></line>
          <line x1="5" y1="12" x2="19" y2="12"></line>
        </svg>
        Add Section
      </button>
    </>
  );
};

export default ArticleSectionButton;
