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
                className="block mb-2 text-sm font-semibold text-custom-800"
              >
                {label}
              </label>
              <textarea
                {...field}
                id={name}
                className="bg-custom-50 h-36 border placeholder:text-custom-500 border-custom-600 text-custom-800 text-sm rounded-lg focus:ring-custom-800 focus:border-custom-800 block w-full p-2.5 focus:outline-none"
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

export default TextAreaField;
