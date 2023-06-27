import ImageInputField from "../../FormComponents/ImageInputField";
import InputField from "../../FormComponents/InputField";
import SubmitButton from "../../FormComponents/SubmitButton";
import TextareaInputField from "../../FormComponents/TextareainputField";

const ArticleSectionForm = () => {
  return (
    <>
      <form className="w-80 mx-2 ">
        <div className="w-full mb-4 border border-gray-200 rounded-lg bg-gray-50 ">
          <div className="px-4 py-2 bg-white rounded-t-lg">
            <InputField
              label="Section Title"
              name="title"
              type="text"
              placeholder="Enter section title"
            />
            <TextareaInputField
              label="Section Content"
              name="content"
              placeholder="Enter section content..."
            />
            <ImageInputField name="sectionimage" />
          </div>
          <div className="flex items-center justify-between px-3 py-2 border-t ">
            <SubmitButton label="Add" />
          </div>
        </div>
      </form>
    </>
  );
};

export default ArticleSectionForm;
