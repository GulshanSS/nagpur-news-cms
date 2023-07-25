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
import ViewItem from "../ViewItem";

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
      <div className="w-80 md:w-[500px] bg-custom-50 rounded-md shadow-md h-[500px] md:h-[700px] overflow-hidden overflow-y-scroll">
        {data?.promotionaryArticle.media.type.startsWith("image/") && (
          <img
            alt={data.promotionaryArticle.title}
            className="w-full object-cover mb-6 rounded-t-md"
            src={data.promotionaryArticle.media.key}
          />
        )}
        {data?.promotionaryArticle.media.type.startsWith("video/") && (
          <div className="w-full flex justify-center rounded-t-md">
            <video
              className="h-[300px] w-full mb-6 rounded-t-md bg-black"
              src={data.promotionaryArticle.media.key}
              controls={true}
              autoPlay={false}
            />
          </div>
        )}
        <div className="w-full flex gap-4 flex-col items-start p-5">
          <ViewItem
            label="ID"
            value={data!.promotionaryArticle.id.toString()}
          />
          {data?.promotionaryArticle.title && (
            <ViewItem label="Title" value={data!.promotionaryArticle.title} />
          )}
          {data?.promotionaryArticle.content && (
            <div className="w-full flex flex-col">
              <span className="w-28 text-[12px] font-bold text-custom-800">
                Content
              </span>
              <div
                className=""
                dangerouslySetInnerHTML={{
                  __html: data?.promotionaryArticle.content,
                }}
              ></div>
            </div>
          )}
          {data?.promotionaryArticle.priority.toString() && (
            <ViewItem
              label="Priority"
              value={data!.promotionaryArticle.priority.toString()}
            />
          )}
          {data?.promotionaryArticle.websiteLink && (
            <ViewItem
              label="Website Link"
              value={data!.promotionaryArticle.websiteLink}
            />
          )}
          {data?.promotionaryArticle.whatsAppLink && (
            <ViewItem
              label="WhatsApp Link"
              value={data!.promotionaryArticle.whatsAppLink}
            />
          )}
          {data?.promotionaryArticle.instagramLink && (
            <ViewItem
              label="Instagram Link"
              value={data!.promotionaryArticle.instagramLink}
            />
          )}
          {data?.promotionaryArticle.address && (
            <ViewItem
              label="Address"
              value={data!.promotionaryArticle.address}
            />
          )}
          {data?.promotionaryArticle.contact && (
            <ViewItem
              label="Contact"
              value={data!.promotionaryArticle.contact}
            />
          )}
          <ViewItem
            label="Created At"
            value={new Intl.DateTimeFormat("en-GB", {
              year: "numeric",
              month: "long",
              day: "2-digit",
            }).format(new Date(data!.promotionaryArticle.createdAt))}
          />
          <ViewItem
            label="Updated At"
            value={new Intl.DateTimeFormat("en-GB", {
              year: "numeric",
              month: "long",
              day: "2-digit",
            }).format(new Date(data!.promotionaryArticle.updatedAt))}
          />
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
