import { MdDelete } from "react-icons/md";
import { useDeleteTagMutation, useGetTagQuery } from "../../redux/api/tagApi";
import ActionButton from "../ActionButton";
import Status from "../Status";
import { HiPencil } from "react-icons/hi";
import Modal from "../Modal";
import { useState } from "react";
import { toast } from "react-toastify";
import { APIErrorResponse } from "../../redux/api/types";
import Spinner from "../Spinner";
import TagForm from "../Forms/TagForm";
import RequireAdmin from "../Auth/RequireAdmin";

type Props = {
  id: number;
};

const ViewTag = ({ id }: Props) => {
  const [modalCloseForm, setModalCloseForm] = useState<boolean>(false);

  const { data, isLoading, isError, error } = useGetTagQuery(id);

  const [deleteTag] = useDeleteTagMutation();

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
            {data?.tag.id}
          </span>
        </div>
        <div className="w-full flex flex-col">
          <span className="w-28 text-[12px] font-bold text-slate-800">
            Name
          </span>
          <span className="font-bold text-lg text-slate-500">
            {data?.tag.name}
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
            }).format(new Date(data?.tag.createdAt!))}
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
            }).format(new Date(data?.tag.updatedAt!))}
          </span>
        </div>
        <div className="w-full flex justify-between items-center gap-1">
          <div>
            {data?.tag.active ? (
              <Status label="Active" colorVariant="green" />
            ) : (
              <Status label="Active" colorVariant="slate" />
            )}
          </div>
          <div className="flex">
            <ActionButton
              onClick={() => setModalCloseForm(true)}
              Icon={<HiPencil />}
              color="blue"
            />
            <RequireAdmin>
              <ActionButton
                onClick={() => deleteTag(id)}
                Icon={<MdDelete />}
                color="red"
              />
            </RequireAdmin>
          </div>
        </div>
      </div>
      <Modal
        id="categoryUpdateForm"
        close={modalCloseForm}
        setClose={setModalCloseForm}
      >
        <TagForm
          buttonLabel="Update"
          tag={{
            id: data?.tag.id,
            name: data?.tag.name,
            active: data?.tag.active,
          }}
        />
      </Modal>
    </>
  );
};

export default ViewTag;
