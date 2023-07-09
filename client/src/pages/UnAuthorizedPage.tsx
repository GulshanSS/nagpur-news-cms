const UnAuthorizedPage = () => {
  return (
    <>
      <div className="fixed inset-0 flex justify-center items-center">
        <div>
          <h1 className="text-5xl font-bold text-red-500 border-r border-slate-500">
            401
          </h1>
        </div>
        <div className="flex flex-col ml-2">
          <span className="text-lg uppercase tracking-wide font-bold">Access Denied</span>
          <span className="text-sm text-red-500 font-bold">
            Role required ADMIN
          </span>
        </div>
      </div>
    </>
  );
};

export default UnAuthorizedPage;
