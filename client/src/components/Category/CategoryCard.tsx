import { HiPencil } from "react-icons/hi";
import { MdDelete } from "react-icons/md";
import { FaEye } from "react-icons/fa";
import ActionButton from "../ActionButton";
import Status from "../Status";
import { useDeleteCategoryMutation } from "../../redux/api/categoryApi";
import { useState } from "react";
import Modal from "../Modal";
import ViewCategory from "./ViewCategory";
import CategoryForm from "../Forms/CategoryForm";

type Props = {
  id: string;
  name: string;
  active: boolean;
};

const CategoryCard = ({ id, name, active }: Props) => {
  const [modalCloseForm, setModalCloseForm] = useState<boolean>(false);

  const [close, setClose] = useState<boolean>(false);

  const [deleteCategory] = useDeleteCategoryMutation();

  return (
    <>
      <div className="w-80 rounded-md bg-slate-100 px-2.5 py-3 hover:cursor-pointer">
        <h1 className="text-xl font-bold mb-6">{name}</h1>
        <div className="flex justify-between items-center">
          <div className="flex gap-1">
            {active ? (
              <Status label="Active" colorVariant="green" />
            ) : (
              <Status label="Active" colorVariant="slate" />
            )}
          </div>
          <div className="flex">
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
            <ActionButton
              onClick={() => deleteCategory(id)}
              Icon={<MdDelete />}
              color="red"
            />
          </div>
        </div>
      </div>
      <Modal id="categoryDetails" close={close} setClose={setClose}>
        <ViewCategory id={id} />
      </Modal>
      <Modal
        id="categoryUpdateForm"
        close={modalCloseForm}
        setClose={setModalCloseForm}
      >
        <CategoryForm buttonLabel="Update" category={{ id, name, active }} />
      </Modal>
    </>
  );
};

export default CategoryCard;
