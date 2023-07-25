import { Controller, useFormContext } from "react-hook-form";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

type Props = {
  value?: string;
  label: string;
  name: string;
  placeholder: string;
};

const ContentField = ({ value, label, name, placeholder }: Props) => {
  const { control } = useFormContext();

  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link"],
      ["clean"],
    ],
  };

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
  ];

  return (
    <>
      <Controller
        name={name}
        control={control}
        defaultValue={value || ""}
        render={({ field, fieldState }) => (
          <>
            <div className="mb-6 pb-[60px] md:pb-12">
              <label
                htmlFor={name}
                className="block mb-2 text-sm font-semibold text-custom-800"
              >
                {label}
              </label>
              <ReactQuill
                theme="snow"
                className="h-[200px] max-w-[600px]"
                {...field}
                modules={modules}
                formats={formats}
                placeholder={placeholder}
              />
              {fieldState.error ? (
                <span className="flex justify-start font-bold text-[12px] text-red-600 mr-2">
                  {fieldState.error.message}
                </span>
              ) : (
                ""
              )}
            </div>
          </>
        )}
      />
    </>
  );
};

export default ContentField;
