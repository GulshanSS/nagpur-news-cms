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
  return (
    <>
      <div className="mb-6">
        <label
          htmlFor={name}
          className="block mb-2 text-sm font-semibold text-gray-900"
        >
          {label}
        </label>
        <input
          type={type}
          id={name}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 focus:outline-none"
          placeholder={placeholder}
        />
      </div>
    </>
  );
};

export default InputField;
