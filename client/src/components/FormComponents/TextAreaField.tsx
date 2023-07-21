import { Controller, useFormContext } from "react-hook-form";

type Props = {
  value?: string;
  label: string;
  name: string;
  placeholder: string;
};

const TextAreaField = ({ value, label, name, placeholder }: Props) => {
  const { control } = useFormContext();

  return (
    <>
      <Controller
        name={name}
        control={control}
        defaultValue={value || ""}
        render={({ field, fieldState }) => (
          <>
            <div className="mb-6">
              <label
                htmlFor={name}
                className="block mb-2 text-sm font-semibold text-[#614E5C]"
              >
                {label}
              </label>
              <textarea
                {...field}
                id={name}
                className="bg-white h-36 bg-opacity-50 border border-gray-300 text-[#614E5C] text-sm rounded-lg focus:ring-[#614E5C] focus:border-[#614E5C] block w-full p-2.5 focus:outline-none"
                placeholder={placeholder}
              />
              {fieldState.error ? (
                <span className="flex justify-start font-bold text-[10px] text-red-600 mr-2">
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

export default TextAreaField;
