import { useState } from "react";
import {
  useDeletePromotionaryArticleMutation,
  useGetPromotionaryArticleQuery,
} from "../../redux/api/promotionaryArticleApi";
import { toast } from "react-toastify";
import { APIErrorResponse } from "../../redux/api/types";
import Spinner from "../Spinner";
import Status from "../Status";
import ActionButton from "../ActionButton";
import { HiPencil } from "react-icons/hi";
import { MdDelete } from "react-icons/md";
import RequireAdmin from "../Auth/RequireAdmin";
import Modal from "../Modal";
import PromotionaryArticleForm from "../Forms/PromotionaryArticleForm";
import { UpdatePromotionaryArticleSchema } from "../../validationSchema/PromotionaeryArticleSchema";

type Props = {
  id: number;
};

const ViewPromotionaryArticle = ({ id }: Props) => {
  const [modalCloseForm, setModalCloseForm] = useState<boolean>(false);

  const { data, isLoading, isError, error } =
    useGetPromotionaryArticleQuery(id);

  const [deletePromotionaryArticle] = useDeletePromotionaryArticleMutation();

  if (isError) {
    toast.error((error as APIErrorResponse).data.message);
  }

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <div className="w-80 md:w-96 flex flex-col items-center bg-slate-100 rounded-md shadow-md h-[500px] md:h-full overflow-hidden overflow-y-scroll">
        {data?.promotionaryArticle.media.type.startsWith("image/") && (
          <img
            alt={data.promotionaryArticle.title}
            className="w-full object-cover mb-6 rounded-t-md"
            src={data.promotionaryArticle.media.key}
          />
        )}
        <div className="w-full flex gap-2 flex-col items-center p-5">
          <div className="w-full flex flex-col">
            <span className="w-28 text-[12px] font-bold text-slate-800">
              ID
            </span>
            <span className="font-bold text-lg text-slate-500">
              {data?.promotionaryArticle.id}
            </span>
          </div>
          {data?.promotionaryArticle.title && (
            <div className="w-full flex flex-col">
              <span className="w-28 text-[12px] font-bold text-slate-800">
                Title
              </span>
              <span className="font-bold text-lg text-slate-500">
                {data?.promotionaryArticle.title}
              </span>
            </div>
          )}
          {data?.promotionaryArticle.content && (
            <div className="w-full flex flex-col">
              <span className="w-28 text-[12px] font-bold text-slate-800">
                Content
              </span>
              <span className="font-bold text-lg text-slate-500">
                {data?.promotionaryArticle.content}
              </span>
            </div>
          )}
          {data?.promotionaryArticle.priority.toString() && (
            <div className="w-full flex flex-col">
              <span className="w-28 text-[12px] font-bold text-slate-800">
                Priority
              </span>
              <span className="font-bold text-lg text-slate-500">
                {data?.promotionaryArticle.priority.toString()}
              </span>
            </div>
          )}

          {data?.promotionaryArticle.whatsAppLink && (
            <div className="w-full flex flex-col">
              <span className="w-28 text-[12px] font-bold text-slate-800">
                WhatsApp Link
              </span>
              <span className="font-bold text-lg text-slate-500">
                {data?.promotionaryArticle.whatsAppLink}
              </span>
            </div>
          )}
          {data?.promotionaryArticle.instagramLink && (
            <div className="w-full flex flex-col">
              <span className="w-28 text-[12px] font-bold text-slate-800">
                Instagram Link
              </span>
              <span className="font-bold text-lg text-slate-500">
                {data?.promotionaryArticle.instagramLink}
              </span>
            </div>
          )}
          {data?.promotionaryArticle.contact && (
            <div className="w-full flex flex-col">
              <span className="w-28 text-[12px] font-bold text-slate-800">
                Contact
              </span>
              <span className="font-bold text-lg text-slate-500">
                {data?.promotionaryArticle.contact}
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
              }).format(new Date(data?.promotionaryArticle.createdAt!))}
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
              }).format(new Date(data?.promotionaryArticle.updatedAt!))}
            </span>
          </div>
          <div className="w-full flex justify-between items-center gap-1">
            <div className="flex gap-1">
              <Status
                label="Active"
                colorVariant={
                  data?.promotionaryArticle.active! ? "green" : "slate"
                }
              />
              <Status
                label="SetAsBanner"
                colorVariant={
                  data?.promotionaryArticle!.setAsBanner! ? "green" : "slate"
                }
              />
            </div>
            <div className="flex gap-1">
              <ActionButton
                onClick={() => setModalCloseForm(true)}
                Icon={<HiPencil />}
                color="blue"
              />
              <RequireAdmin>
                <ActionButton
                  onClick={() => deletePromotionaryArticle(id)}
                  Icon={<MdDelete />}
                  color="red"
                />
              </RequireAdmin>
            </div>
          </div>
        </div>
      </div>
      <Modal
        id="promotionaryArticleUpdateForm"
        close={modalCloseForm}
        setClose={setModalCloseForm}
      >
        <PromotionaryArticleForm
          buttonLabel="Update"
          promotionaryArticle={data?.promotionaryArticle}
          schema={UpdatePromotionaryArticleSchema}
        />
      </Modal>
    </>
  );
};

export default ViewPromotionaryArticle;
