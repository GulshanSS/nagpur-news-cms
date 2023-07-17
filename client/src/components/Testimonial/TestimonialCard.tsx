import { FaEye } from "react-icons/fa";
import { Testimonial } from "../../redux/api/types";
import ActionButton from "../ActionButton";
import { useState } from "react";
import { HiPencil } from "react-icons/hi";
import RequireAdmin from "../Auth/RequireAdmin";
import { MdDelete } from "react-icons/md";
import Status from "../Status";
import { useDeleteTestimonialMutation } from "../../redux/api/testimonialApi";
import ViewTestimonial from "./ViewTestimonial";
import Modal from "../Modal";
import TestimonialForm from "../Forms/TestimonialForm";

type Props = {
  testimonial: Testimonial;
};

const TestimonialCard = ({ testimonial }: Props) => {
  const [modalCloseForm, setModalCloseForm] = useState<boolean>(false);

  const [close, setClose] = useState<boolean>(false);

  const [deleteTestimonial] = useDeleteTestimonialMutation();
  return (
    <>
      <div className="w-80 flex justify-between rounded-md bg-slate-100 px-2.5 py-5 hover:cursor-pointer hover:shadow-lg transition-shadow ease-in-out duration-300">
        <div className="w-full flex flex-col justify-center items-center">
          {testimonial.media.type.startsWith("image/") && (
            <img
              alt={testimonial.quotedBy}
              className=" w-24 h-24 rounded-full object-cover my-6"
              src={testimonial.media.key}
            />
          )}
          <div>
            {testimonial.quote && (
              <p className="w-full text-[14px] text-slate-600 italic text-center my-6">
                "{testimonial.quote}"
              </p>
            )}
            {testimonial.quotedBy && (
              <p className="w-full font-extrabold text-[14px] uppercase text-slate-600 text-center">
                {testimonial.quotedBy}
              </p>
            )}
            {testimonial.designation && (
              <p className="w-full font-bold text-[12px] uppercase text-slate-600 text-center">
                ({testimonial.designation})
              </p>
            )}
          </div>
          <div className="w-full flex justify-between items-center px-3 mt-6">
            <div className="flex gap-1">
              <Status
                label="Active"
                colorVariant={testimonial.active ? "green" : "slate"}
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
                  onClick={() => deleteTestimonial(testimonial.id)}
                  Icon={<MdDelete />}
                  color="red"
                />
              </RequireAdmin>
            </div>
          </div>
        </div>
        <Modal id="testimonialDetails" close={close} setClose={setClose}>
          <ViewTestimonial id={testimonial.id} />
        </Modal>
        <Modal
          id="testimonialUpdateForm"
          close={modalCloseForm}
          setClose={setModalCloseForm}
        >
          <TestimonialForm buttonLabel="Update" testimonial={testimonial} />
        </Modal>
      </div>
    </>
  );
};

export default TestimonialCard;
