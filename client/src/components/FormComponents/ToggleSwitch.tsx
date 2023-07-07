import { Controller, useFormContext } from "react-hook-form";

type Props = {
  label: string;
  name: string;
  value: boolean;
};

const ToggleSwitch = ({ label, name, value }: Props) => {
  const { control } = useFormContext();
  return (
    <>
      <Controller
        name={name}
        control={control}
        defaultValue={value}
        render={({ field, fieldState }) => (
          <>
            <div className="mb-6">
              <label className="relative inline-flex items-center mb-4 cursor-pointer">
                <input
                  {...field}
                  type="checkbox"
                  value="false"
                  checked={field.value ? true : false}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-400 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                <span className="ml-3 text-sm font-medium text-gray-900">
                  {label}
                </span>
              </label>
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

export default ToggleSwitch;
