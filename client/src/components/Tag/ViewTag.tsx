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
import ViewItem from "../ViewItem";

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
      <div className="w-80 md:w-96 flex gap-4 flex-col items-start bg-custom-50 rounded-md p-5 shadow-md">
        <ViewItem label="ID" value={data!.tag.id.toString()} />
        <ViewItem label="Name" value={data!.tag.name} />
        <ViewItem
          label="Created At"
          value={new Intl.DateTimeFormat("en-GB", {
            year: "numeric",
            month: "long",
            day: "2-digit",
          }).format(new Date(data!.tag.createdAt))}
        />
        <ViewItem
          label="Updated At"
          value={new Intl.DateTimeFormat("en-GB", {
            year: "numeric",
            month: "long",
            day: "2-digit",
          }).format(new Date(data!.tag.updatedAt))}
        />
        <div className="w-full flex justify-between items-center gap-1">
          <div className="flex gap-2">
            <Status
              label="Category"
              colorVariant={data?.tag.setAsCategory ? "green" : "slate"}
            />
            <Status
              label="Active"
              colorVariant={data?.tag.active ? "green" : "slate"}
            />
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
