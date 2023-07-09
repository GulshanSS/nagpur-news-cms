import { MdDelete } from "react-icons/md";
import {
  useDeleteUserMutation,
  useGetUserByIdQuery,
} from "../../redux/api/userApi";
import ActionButton from "../ActionButton";
import Status from "../Status";
import { toast } from "react-toastify";
import { APIErrorResponse } from "../../redux/api/types";
import Spinner from "../Spinner";

type Props = {
  id: number;
};

const ViewUser = ({ id }: Props) => {
  const { data, isLoading, isError, error } = useGetUserByIdQuery(id);

  const [deleteUser] = useDeleteUserMutation();

  if (isError) {
    toast.error((error as APIErrorResponse).data.message);
  }

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <div className="w-80 md:w-96 flex gap-4 flex-col items-center bg-slate-100 rounded-md p-5 shadow-md">
        <div className="w-full flex flex-col">
          <span className="w-28 text-[12px] font-bold text-slate-800">ID</span>
          <span className="font-bold text-lg text-slate-500">
            {data?.user.id}
          </span>
        </div>
        <div className="w-full flex flex-col">
          <span className="w-28 text-[12px] font-bold text-slate-800">
            Name
          </span>
          <span className="font-bold text-lg text-slate-500">
            {data?.user.name}
          </span>
        </div>
        <div className="w-full flex flex-col">
          <span className="w-28 text-[12px] font-bold text-slate-800">
            Email
          </span>
          <span className="font-bold text-md text-slate-500">
            {data?.user.email}
          </span>
        </div>
        <div className="w-full flex flex-col">
          <span className="w-28 text-[12px] font-bold text-slate-800">
            Role
          </span>
          <span className="font-bold text-lg text-slate-500">
            {data?.user.role}
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
            }).format(new Date(data?.user.createdAt!))}
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
            }).format(new Date(data?.user.updatedAt!))}
          </span>
        </div>
        <div className="w-full flex justify-between items-center gap-1">
          <div className="flex gap-1">
            <Status
              label="Active"
              colorVariant={data?.user.active ? "green" : "slate"}
            />
            <Status
              label="Verified"
              colorVariant={data?.user.verified ? "green" : "slate"}
            />
          </div>
          <div className="flex">
            <ActionButton
              onClick={() => deleteUser(id)}
              Icon={<MdDelete />}
              color="red"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewUser;
