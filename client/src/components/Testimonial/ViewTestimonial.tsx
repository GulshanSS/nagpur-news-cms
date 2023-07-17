import { useState } from "react";
import { APIErrorResponse } from "../../redux/api/types";
import {
  useDeleteTestimonialMutation,
  useGetTestimonialQuery,
} from "../../redux/api/testimonialApi";
import { toast } from "react-toastify";
import Spinner from "../Spinner";
import Modal from "../Modal";
import ActionButton from "../ActionButton";
import { MdDelete } from "react-icons/md";
import Status from "../Status";
import { HiPencil } from "react-icons/hi";
import RequireAdmin from "../Auth/RequireAdmin";
import TestimonialForm from "../Forms/TestimonialForm";

type Props = {
  id: number;
};

const ViewTestimonial = ({ id }: Props) => {
  const [modalCloseForm, setModalCloseForm] = useState<boolean>(false);

  const { data, isLoading, isError, error } = useGetTestimonialQuery(id);

  const [deleteTestimonial] = useDeleteTestimonialMutation();

  if (isError) {
    toast.error((error as APIErrorResponse).data.message);
  }

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <div className="w-80 md:w-96 flex gap-4 flex-col items-center bg-slate-100 rounded-md p-5 shadow-md">
        {data?.testimonial.media.type.startsWith("image/") && (
          <img
            alt={data?.testimonial.quotedBy}
            className=" w-28 h-28 rounded-full object-cover my-6"
            src={data?.testimonial.media.key}
          />
        )}
        <div className="w-full flex flex-col">
          <span className="w-28 text-[12px] font-bold text-slate-800">ID</span>
          <span className="font-bold text-lg text-slate-500">
            {data?.testimonial.id}
          </span>
        </div>
        {data?.testimonial.quote && (
          <div className="w-full flex flex-col">
            <span className="w-28 text-[12px] font-bold text-slate-800">
              Quote
            </span>
            <span className="font-bold text-lg text-slate-500">
              {data?.testimonial.quote}
            </span>
          </div>
        )}
        <div className="w-full flex flex-col">
          <span className="w-28 text-[12px] font-bold text-slate-800">
            Quoted By
          </span>
          <span className="font-bold text-lg text-slate-500">
            {data?.testimonial.quotedBy}
          </span>
        </div>
        {data?.testimonial.designation && (
          <div className="w-full flex flex-col">
            <span className="w-28 text-[12px] font-bold text-slate-800">
              Designation
            </span>
            <span className="font-bold text-lg text-slate-500">
              {data?.testimonial.designation}
            </span>
          </div>
        )}
        <div className="w-full flex flex-col">
          <span className="w-28 text-[12px] font-bold text-slate-800">
            Created At
          </span>
          <span className="font-bold text-lg text-slate-500">
            {new Intl.DateTimeFormat("en-GB", {
              year: "numeric",
              month: "long",
              day: "2-digit",
            }).format(new Date(data?.testimonial.createdAt!))}
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
            }).format(new Date(data?.testimonial.updatedAt!))}
          </span>
        </div>
        <div className="w-full flex justify-between items-center gap-1">
          <div>
            {data?.testimonial.active ? (
              <Status label="Active" colorVariant="green" />
            ) : (
              <Status label="Active" colorVariant="slate" />
            )}
          </div>
          <div className="flex gap-1">
            <ActionButton
              onClick={() => setModalCloseForm(true)}
              Icon={<HiPencil />}
              color="blue"
            />
            <RequireAdmin>
              <ActionButton
                onClick={() => deleteTestimonial(id)}
                Icon={<MdDelete />}
                color="red"
              />
            </RequireAdmin>
          </div>
        </div>
      </div>
      <Modal
        id="testimonialUpdateForm"
        close={modalCloseForm}
        setClose={setModalCloseForm}
      >
        <TestimonialForm buttonLabel="Update" testimonial={data?.testimonial} />
      </Modal>
    </>
  );
};

export default ViewTestimonial;
