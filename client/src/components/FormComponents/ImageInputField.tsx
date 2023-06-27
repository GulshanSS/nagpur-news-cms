const ImageInputField = ({ name }: { name: string }) => {
  return (
    <>
      <div className="mb-6">
        <label
          className="block mb-2 text-sm font-bold text-gray-900"
          htmlFor="multiple_files"
        >
          Upload multiple files
        </label>
        <label htmlFor="multiple_files">
          <div className="py-2.5 px-5 mr-2 mb-2 w-fit text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200">
            Browse
          </div>
          <input
            id="multiple_files"
            name={name}
            type="file"
            className="hidden"
            multiple
          />
        </label>
      </div>
    </>
  );
};

export default ImageInputField;
