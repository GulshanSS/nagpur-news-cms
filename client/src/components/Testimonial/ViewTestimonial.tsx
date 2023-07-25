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
import { UpdateTestimonialSchema } from "../../validationSchema/TestimonialSchema";
import ViewItem from "../ViewItem";

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
      <div className="w-80 md:w-96 bg-custom-50 rounded-md shadow-md">
        {data?.testimonial.media.type.startsWith("image/") && (
          <div className="w-full flex justify-center">
            <img
              alt={data?.testimonial.quotedBy}
              className=" w-28 h-28 rounded-full object-cover my-6"
              src={data?.testimonial.media.key}
            />
          </div>
        )}
        {data?.testimonial.media.type.startsWith("video/") && (
          <div className="w-full flex justify-center rounded-t-md">
            <video
              className="w-full h-[300px] mb-6 rounded-t-md bg-black"
              src={data?.testimonial.media.key}
              controls={true}
              autoPlay={false}
            />
          </div>
        )}
        <div className="w-full flex flex-col gap-4 p-5">
          <ViewItem label="ID" value={data!.testimonial.id.toString()} />
          {data?.testimonial.quote && (
            <ViewItem label="Quote" value={data!.testimonial.quote} />
          )}
          <ViewItem label="Quoted By" value={data!.testimonial.quotedBy!} />
          {data?.testimonial.designation && (
            <ViewItem
              label="Designation"
              value={data!.testimonial.designation}
            />
          )}
          <ViewItem
            label="Created At"
            value={new Intl.DateTimeFormat("en-GB", {
              year: "numeric",
              month: "long",
              day: "2-digit",
            }).format(new Date(data!.testimonial.createdAt))}
          />
          <ViewItem
            label="Updated At"
            value={new Intl.DateTimeFormat("en-GB", {
              year: "numeric",
              month: "long",
              day: "2-digit",
            }).format(new Date(data!.testimonial.updatedAt))}
          />
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
      </div>
      <Modal
        id="testimonialUpdateForm"
        close={modalCloseForm}
        setClose={setModalCloseForm}
      >
        <TestimonialForm
          buttonLabel="Update"
          testimonial={data?.testimonial}
          schema={UpdateTestimonialSchema}
        />
      </Modal>
    </>
  );
};

export default ViewTestimonial;
