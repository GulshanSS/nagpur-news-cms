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
                <div className="w-11 h-6 bg-custom-500 rounded-full peer-focus:ring-custom-800 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-custom-100 after:border-custom-100 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-custom-800"></div>
                <span className="ml-3 text-sm font-medium text-custom-800">
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
