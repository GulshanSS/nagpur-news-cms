import { MdDelete } from "react-icons/md";
import {
  useDeleteCategoryMutation,
  useGetCategoryQuery,
} from "../../redux/api/categoryApi";
import ActionButton from "../ActionButton";
import Status from "../Status";
import { HiPencil } from "react-icons/hi";
import Modal from "../Modal";
import CategoryForm from "../Forms/CategoryForm";
import { useState } from "react";
import { toast } from "react-toastify";
import { APIErrorResponse } from "../../redux/api/types";
import Spinner from "../Spinner";
import RequireAdmin from "../Auth/RequireAdmin";

type Props = {
  id: number;
};

const ViewCategory = ({ id }: Props) => {
  const [modalCloseForm, setModalCloseForm] = useState<boolean>(false);

  const { data, isLoading, isError, error } = useGetCategoryQuery(id);

  const [deleteCategory] = useDeleteCategoryMutation();

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
            {data?.category.id}
          </span>
        </div>
        <div className="w-full flex flex-col">
          <span className="w-28 text-[12px] font-bold text-slate-800">
            Name
          </span>
          <span className="font-bold text-lg text-slate-500">
            {data?.category.name}
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
            }).format(new Date(data?.category.createdAt!))}
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
            }).format(new Date(data?.category.updatedAt!))}
          </span>
        </div>
        <div className="w-full flex justify-between items-center gap-1">
          <div>
            {data?.category.active ? (
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
                onClick={() => deleteCategory(id)}
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
        <CategoryForm
          buttonLabel="Update"
          category={{
            id: data?.category.id,
            name: data?.category.name,
            active: data?.category.active,
          }}
        />
      </Modal>
    </>
  );
};

export default ViewCategory;
