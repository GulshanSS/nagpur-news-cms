import TagForm from "../components/Forms/TagForm";

const TagPage = () => {
  return (
    <>
      <div className="w-screen h-screen flex flex-col justify-center items-center">
        <h3 className="font-bold text-2xl mb-6">Tag</h3>
        <TagForm />
      </div>
    </>
  );
};

export default TagPage;
