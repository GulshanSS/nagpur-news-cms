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
import ViewItem from "../ViewItem";

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
      <div className="w-80 md:w-96 flex gap-4 flex-col items-start bg-custom-50 rounded-md p-5 shadow-md">
        <ViewItem label="ID" value={data!.user.id.toString()} />
        <ViewItem label="Name" value={data!.user.name} />
        <ViewItem label="Email" value={data!.user.email} />
        <ViewItem label="Role" value={data!.user.role} />
        <ViewItem
          label="Created At"
          value={new Intl.DateTimeFormat("en-GB", {
            year: "numeric",
            month: "long",
            day: "2-digit",
          }).format(new Date(data!.user.createdAt))}
        />
        <ViewItem
          label="Updated At"
          value={new Intl.DateTimeFormat("en-GB", {
            year: "numeric",
            month: "long",
            day: "2-digit",
          }).format(new Date(data!.user.updatedAt))}
        />
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
