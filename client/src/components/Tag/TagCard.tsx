import { HiPencil } from "react-icons/hi";
import { MdDelete } from "react-icons/md";
import { FaEye } from "react-icons/fa";
import ActionButton from "../ActionButton";
import Status from "../Status";
import { useState } from "react";
import Modal from "../Modal";
import ViewTag from "./ViewTag";
import { useDeleteTagMutation } from "../../redux/api/tagApi";
import TagForm from "../Forms/TagForm";
import RequireAdmin from "../Auth/RequireAdmin";

type Props = {
  id: number;
  name: string;
  active: boolean;
};

const TagCard = ({ id, name, active }: Props) => {
  const [modalCloseForm, setModalCloseForm] = useState<boolean>(false);

  const [close, setClose] = useState<boolean>(false);

  const [deleteTag] = useDeleteTagMutation();

  return (
    <>
      <div className="w-80 rounded-md bg-slate-100 px-2.5 py-3 hover:cursor-pointer hover:shadow-lg transition-shadow ease-in-out duration-300">
        <h1 className="text-xl font-bold mb-6">{name}</h1>
        <div className="flex justify-between items-center">
          <div className="flex gap-1">
            <Status label="Active" colorVariant={active ? "green" : "slate"} />
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
        <TagForm buttonLabel="Update" tag={{ id, name, active }} />
      </Modal>
    </>
  );
};

export default TagCard;
