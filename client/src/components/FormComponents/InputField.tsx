import { Controller, useFormContext } from "react-hook-form";

type Props = {
  value?: string;
  label: string;
  name: string;
  type: string;
  placeholder: string;
};

const InputField = ({ value, label, name, type, placeholder }: Props) => {
  const { control } = useFormContext();

  return (
    <>
      <Controller
        name={name}
        control={control}
        defaultValue={value || ""}
        render={({ field, fieldState }) => (
          <>
            <div className="w-full mb-6">
              <label
                htmlFor={name}
                className="block mb-2 text-sm font-semibold text-custom-800"
              >
                {label}
              </label>
              <input
                {...field}
                type={type}
                id={name}
                className="bg-custom-50 placeholder:text-custom-600 border border-custom-600 text-custom-800 text-sm rounded-lg focus:ring-custom-800 focus:border-custom-800 block w-full p-2.5 focus:outline-none"
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

export default InputField;
