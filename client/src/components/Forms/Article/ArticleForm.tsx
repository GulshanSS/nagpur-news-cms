import ImageInputField from "../../FormComponents/ImageInputField";
import InputField from "../../FormComponents/InputField";
import SubmitButton from "../../FormComponents/SubmitButton";
import ArticleSectionButton from "./ArticleSectionButton";
import ArticleSectionForm from "./ArticleSectionForm";

const ArticleForm = () => {
  return (
    <>
      <form className="w-80 mx-2">
        <InputField
          label="Title"
          name="title"
          type="text"
          placeholder="Enter Main Title"
        />
        <ImageInputField name="articlesectionmedia" />
        <div className="w-full flex justify-end">
          <ArticleSectionButton />
        </div>
        <SubmitButton label="Publish" />
      </form>
      <ArticleSectionForm />
    </>
  );
};

export default ArticleForm;
