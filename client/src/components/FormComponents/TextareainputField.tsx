const TextareaInputField = ({
  label,
  name,
  placeholder,
}: {
  label: string;
  name: string;
  placeholder: string;
}) => {
  return (
    <>
      <div className="mb-6">
        <label
          htmlFor="message"
          className="block mb-2 text-sm font-bold text-gray-900"
        >
          {label}
        </label>
        <textarea
          id="message"
          rows={4}
          className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          placeholder={placeholder}
          name={name}
        ></textarea>
      </div>
    </>
  );
};

export default TextareaInputField;
