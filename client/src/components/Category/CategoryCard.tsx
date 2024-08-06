import { HiPencil } from "react-icons/hi";
import { MdDelete } from "react-icons/md";
import { FaEye } from "react-icons/fa";
import ActionButton from "../ActionButton";
import Status from "../Status";
import { useDeleteCategoryMutation } from "../../redux/api/categoryApi";
import { useEffect, useState } from "react";
import Modal from "../Modal";
import ViewCategory from "./ViewCategory";
import CategoryForm from "../Forms/CategoryForm";
import RequireAdmin from "../Auth/RequireAdmin";
import { toast } from "react-toastify";
import { APIErrorResponse } from "../../redux/api/types";

type Props = {
  id: number;
  slug: string;
  name: string;
  active: boolean;
};

const CategoryCard = ({ id, slug, name, active }: Props) => {
  const [modalCloseForm, setModalCloseForm] = useState<boolean>(false);

  const [close, setClose] = useState<boolean>(false);

  const [deleteCategory, { isSuccess, isLoading, error, isError }] =
    useDeleteCategoryMutation();

  useEffect(() => {
    if (isSuccess) {
      toast.success("Category Deleted Successfully");
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
                onClick={() => deleteCategory(id)}
                Icon={<MdDelete />}
                color="red"
              />
            </RequireAdmin>
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
        <CategoryForm buttonLabel="Update" category={{ id, slug, name, active }} />
      </Modal>
    </>
  );
};

export default CategoryCard;
