import { useState } from "react";
import Modal from "../components/Modal";
import Spinner from "../components/Spinner";
import Status from "../components/Status";
import { APIErrorResponse } from "../redux/api/types";
import { useGetUserQuery } from "../redux/api/userApi";
import { BiSolidUser } from "react-icons/bi";
import ResetPasswordForm from "../components/Forms/ResetPasswordForm";

const MePage = () => {
  const [close, setClose] = useState<boolean>(false);

  const {
    data: user,
    isLoading,
    isFetching,
    isError,
    error,
  } = useGetUserQuery(null);

  if (isLoading || isFetching) {
    return <Spinner />;
  }

  if (isError) {
    return (
      <div className="flex justify-center items-center bg-red-100 py-2">
        <span className="text-red-500 font-bold">
          {(error as APIErrorResponse).data.message}
        </span>
      </div>
    );
  }

  return (
    <>
      <div className="w-full h-screen flex justify-center items-center">
        <div className="w-80 md:w-96 flex gap-4 flex-col items-center bg-slate-100 rounded-md p-5 shadow-md">
          <div className="w-full flex justify-between items-center border-b border-slate-400 pb-2">
            <div className="flex flex-col justify-center items-center text-center gap-2">
              <div className="w-20 h-20 rounded-full text-6xl text-slate-500 bg-slate-200 flex justify-center items-center">
                <BiSolidUser />
              </div>
              <div className="w-full flex flex-col">
                <span className="font-bold text-sm text-slate-500">
                  {user?.name}
                </span>
              </div>
            </div>
            <div className="w-fit flex flex-col gap-2">
              <div className="flex gap-1">
                <Status
                  label="Active"
                  colorVariant={user?.active ? "green" : "slate"}
                />
                <Status
                  label="Verified"
                  colorVariant={user?.verified ? "green" : "slate"}
                />
              </div>
              <button
                className="p-2 bg-blue-500 font-bold text-sm text-white rounded-md shadow-md"
                type="button"
                onClick={() => setClose(true)}
              >
                Reset Password
              </button>
            </div>
          </div>
          <div className="w-full flex flex-col">
            <span className="w-28 text-[12px] font-bold text-slate-800">
              Role
            </span>
            <span className="font-bold text-lg text-slate-500">
              {user?.role}
            </span>
          </div>
          <div className="w-full flex flex-col">
            <span className="w-28 text-[12px] font-bold text-slate-800">
              Email
            </span>
            <span className="font-bold text-md text-slate-500">
              {user?.email}
            </span>
          </div>
          <div className="w-full flex flex-col">
            <span className="w-28 text-[12px] font-bold text-slate-800">
              Created At
            </span>
            <span className="font-bold text-lg text-slate-500">
              {new Intl.DateTimeFormat("en-GB", {
                year: "numeric",
                month: "long",
                day: "2-digit",
              }).format(new Date(user?.createdAt!))}
            </span>
          </div>
          <div className="w-full flex flex-col">
            <span className="w-28 text-[12px] font-bold text-slate-800">
              Updated At
            </span>
            <span className="font-bold text-lg text-slate-500">
              {new Intl.DateTimeFormat("en-GB", {
                year: "numeric",
                month: "long",
                day: "2-digit",
              }).format(new Date(user?.updatedAt!))}
            </span>
          </div>
          <div className="w-full flex justify-between items-center gap-1"></div>
        </div>
      </div>
      <Modal id="resetPasswordForm" close={close} setClose={setClose}>
        <ResetPasswordForm />
      </Modal>
    </>
  );
};

export default MePage;
