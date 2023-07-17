import { useEffect, useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import ImageCard from "../ImageCard";

type Props = {
  name: string;
  label: string;
};

const ImageInputField = ({ name, label }: Props) => {
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
                className="block mb-2 text-sm font-bold text-gray-900"
                htmlFor="file"
              >
                {label}
              </label>
              <label htmlFor="file">
                <div className="py-2.5 px-5 mr-2 mb-2 w-fit text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200">
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
                />
                {fieldState.error ? (
                  <span className="flex justify-start font-bold text-[10px] text-red-600 mr-2">
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
              <ImageCard
                key={i}
                name={file.name}
                url={URL.createObjectURL(file)}
              />
            ))
          : null}
      </div>
    </>
  );
};

export default ImageInputField;
