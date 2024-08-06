import { HiPencil } from "react-icons/hi";
import { MdDelete } from "react-icons/md";
import { FaEye } from "react-icons/fa";
import ActionButton from "../ActionButton";
import Status from "../Status";
import { useEffect, useState } from "react";
import Modal from "../Modal";
import ViewTag from "./ViewTag";
import { useDeleteTagMutation } from "../../redux/api/tagApi";
import TagForm from "../Forms/TagForm";
import RequireAdmin from "../Auth/RequireAdmin";
import { toast } from "react-toastify";
import { APIErrorResponse } from "../../redux/api/types";

type Props = {
  id: number;
  slug: string;
  name: string;
  setAsCategory: boolean;
  active: boolean;
};

const TagCard = ({ id, slug, name, active, setAsCategory }: Props) => {
  const [modalCloseForm, setModalCloseForm] = useState<boolean>(false);

  const [close, setClose] = useState<boolean>(false);

  const [deleteTag, { isSuccess, isLoading, error, isError }] =
    useDeleteTagMutation();

  useEffect(() => {
    if (isSuccess) {
      toast.success("Tag Deleted Successfully");
    }

    if (isError) {
      toast.error((error as APIErrorResponse).data.message);
    }
  }, [isLoading]);

  return (
    <>
      <div className="w-80 rounded-md bg-custom-50 border border-custom-600 text-custom-800  px-2.5 py-3 hover:cursor-pointer hover:shadow-lg transition-shadow ease-in-out duration-300">
        <h1 className="text-xl font-bold mb-6">{name}</h1>
        <div className="flex justify-between items-center">
          <div className="flex gap-2">
            <Status label="Active" colorVariant={active ? "green" : "slate"} />
            <Status
              label="Category"
              colorVariant={setAsCategory ? "green" : "slate"}
            />
          </div>
          <div className="flex gap-1">
            <ActionButton
              onClick={() => setClose(true)}
              Icon={<FaEye />}
              color="slate"
            />
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
      <Modal id="tagDetails" close={close} setClose={setClose}>
        <ViewTag id={id} />
      </Modal>
      <Modal
        id="tagUpdateForm"
        close={modalCloseForm}
        setClose={setModalCloseForm}
      >
        <TagForm buttonLabel="Update" tag={{ id, slug, name, active }} />
      </Modal>
    </>
  );
};

export default TagCard;
