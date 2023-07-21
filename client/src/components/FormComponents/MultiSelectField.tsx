import { Controller, useFormContext } from "react-hook-form";
import Select from "react-select";
import { Category, Tag } from "../../redux/api/types";
import { useEffect, useRef } from "react";

type Props = {
  value?: string;
  label: string;
  name: string;
  isLoading: boolean;
  options: {
    category?: Category[];
    tag?: Tag[];
  };
};

const MultiSelectField = ({
  value,
  label,
  name,
  options,
  isLoading,
}: Props) => {
  const {
    control,
    formState: { isSubmitSuccessful },
  } = useFormContext();

  const selectInputRef = useRef<any>();

  let selectOptions = [] as any[];

  if (options.category !== undefined) {
    options.category.map((option) =>
      selectOptions.push({ label: option.name, value: { id: option.id } })
    );
  }

  if (options.tag !== undefined) {
    options.tag.map((option) =>
      selectOptions.push({ label: option.name, value: { id: option.id } })
    );
  }

  useEffect(() => {
    if (isSubmitSuccessful) {
      selectInputRef.current.clearValue();
    }
  }, [isSubmitSuccessful]);

  return (
    <>
      <Controller
        name={name}
        control={control}
        render={({ field: { onChange, onBlur, value, name }, fieldState }) => (
          <>
            <div className="mb-6">
              <label
                htmlFor={name}
                className="block mb-2 text-sm font-semibold text-[#614E5C]"
              >
                {label}
              </label>
              <Select
                isMulti
                options={selectOptions}
                isLoading={isLoading}
                onChange={onChange}
                onBlur={onBlur}
                value={value}
                name={name}
                ref={selectInputRef}
                className="bg-white w-80 md:w-72 bg-opacity-50 border border-gray-300 text-[#614E5C] text-sm rounded-lg focus:ring-[#614E5C] focus:border-[#614E5C] focus:outline-none"
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

export default MultiSelectField;
