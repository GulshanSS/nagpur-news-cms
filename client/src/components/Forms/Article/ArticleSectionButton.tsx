type Props = {
  setModalCloseForm: Function;
  label: string;
};

const ArticleSectionButton = ({ setModalCloseForm, label }: Props) => {
  return (
    <>
      <button
        type="button"
        className="text-custom-800 border border-custom-600 bg-custom-100 focus:ring-4 focus:outline-none focus:ring-custom-600 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center"
        onClick={() => setModalCloseForm(true)}
      >
        {label}
      </button>
    </>
  );
};

export default ArticleSectionButton;
