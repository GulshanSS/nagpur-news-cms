import { Controller, useFormContext } from "react-hook-form";

const InputField = ({
  label,
  name,
  type,
  placeholder,
}: {
  label: string;
  name: string;
  type: string;
  placeholder: string;
}) => {
  const { control } = useFormContext();

  return (
    <>
      <Controller
        name={name}
        control={control}
        defaultValue=""
        render={({ field, fieldState }) => (
          <>
            <div className="mb-6">
              <label
                htmlFor={name}
                className="block mb-2 text-sm font-semibold text-gray-900"
              >
                {label}
              </label>
              <input
                {...field}
                type={type}
                id={name}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 focus:outline-none"
                placeholder={placeholder}
              />
              {fieldState.error ? (
                <span className="flex justify-end font-bold text-[10px] text-red-600 mr-2">
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

export default InputField;
