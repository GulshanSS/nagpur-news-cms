import { useEffect, useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import MediaCard from "../MediaCard";

type Props = {
  name: string;
  label: string;
  multiple: boolean;
};

const MediaInputField = ({ name, label, multiple }: Props) => {
  const {
    control,
    formState: { isSubmitSuccessful },
  } = useFormContext();
  const [files, setFiles] = useState<File[]>();

  useEffect(() => {
    if (isSubmitSuccessful) {
      setFiles([]);
    }
  }, [isSubmitSuccessful]);

  return (
    <>
      <Controller
        name={name}
        control={control}
        defaultValue={[]}
        render={({ field: { value, onChange, ...field }, fieldState }) => (
          <>
            <div className="mb-6">
              <label
                className="block mb-2 text-sm font-bold text-custom-800"
                htmlFor="file"
              >
                {label}
              </label>
              <label htmlFor="file">
                <div className="py-2.5 px-5 mr-2 mb-2 w-fit text-sm font-medium text-custom-800 focus:outline-none bg-custom-100 rounded-lg border border-custom-600">
                  Browse
                </div>
                <input
                  id="file"
                  {...field}
                  type="file"
                  onChange={(e) => {
                    if (e.target.files) {
                      onChange(Array.from(e.target.files).map((file) => file));
                      setFiles(Array.from(e.target.files).map((file) => file));
                    }
                  }}
                  className="hidden"
                  multiple={multiple}
                />
                {fieldState.error ? (
                  <span className="flex justify-start font-bold text-[12px] text-red-600 mr-2">
                    {fieldState.error.message}
                  </span>
                ) : (
                  ""
                )}
              </label>
            </div>
          </>
        )}
      />
      <div className="flex flex-wrap justify-start gap-2 mb-6">
        {files !== undefined
          ? [...files].map((file: File, i) => (
              <MediaCard
                key={i}
                name={file.name}
                url={URL.createObjectURL(file)}
                type={file.type}
              />
            ))
          : null}
      </div>
    </>
  );
};

export default MediaInputField;
