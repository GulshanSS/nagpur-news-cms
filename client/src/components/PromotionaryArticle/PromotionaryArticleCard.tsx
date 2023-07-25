import { useState } from "react";
import { PromotionaryArticle } from "../../redux/api/types";
import ActionButton from "../ActionButton";
import Status from "../Status";
import RequireAdmin from "../Auth/RequireAdmin";
import { HiPencil } from "react-icons/hi";
import { MdDelete } from "react-icons/md";
import { FaEye } from "react-icons/fa";
import { useDeletePromotionaryArticleMutation } from "../../redux/api/promotionaryArticleApi";
import Modal from "../Modal";
import PromotionaryArticleForm from "../Forms/PromotionaryArticleForm";
import { UpdatePromotionaryArticleSchema } from "../../validationSchema/PromotionaeryArticleSchema";
import ViewPromotionaryArticle from "./ViewPromotionaryArticle";

type Props = {
  promotionaryArticle: PromotionaryArticle;
};

const PromotionaryArticleCard = ({ promotionaryArticle }: Props) => {
  const [modalCloseForm, setModalCloseForm] = useState<boolean>(false);

  const [close, setClose] = useState<boolean>(false);

  const [deletePromotionaryArticle] = useDeletePromotionaryArticleMutation();

  return (
    <>
      <div className="w-80 flex flex-col justify-between rounded-md bg-custom-50 border border-custom-600 hover:cursor-pointer hover:shadow-lg transition-shadow ease-in-out duration-300">
        {promotionaryArticle.media.type.startsWith("image/") && (
          <img
            alt={promotionaryArticle.title}
            className="object-cover h-[250px] mb-6 rounded-t-md"
            src={promotionaryArticle.media.key}
          />
        )}
        {promotionaryArticle.media.type.startsWith("video/") && (
          <video
            className="h-[250px] bg-black mb-6 rounded-t-md"
            src={promotionaryArticle.media.key}
            controls={true}
            autoPlay={false}
          />
        )}
        <div className="w-full flex flex-col justify-center items-center px-2.5 pb-3">
          <div>
            {promotionaryArticle.title && (
              <span className="w-full text-[18px] font-bold text-slate-600 italic text-center my-6">
                {promotionaryArticle.title}
              </span>
            )}
          </div>
          <div className="w-full flex justify-between items-center mt-6">
            <div className="flex gap-1">
              <Status
                label="Active"
                colorVariant={promotionaryArticle.active ? "green" : "slate"}
              />
              <Status
                label="SetAsBanner"
                colorVariant={
                  promotionaryArticle.setAsBanner ? "green" : "slate"
                }
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
                  onClick={() =>
                    deletePromotionaryArticle(promotionaryArticle.id)
                  }
                  Icon={<MdDelete />}
                  color="red"
                />
              </RequireAdmin>
            </div>
          </div>
        </div>
        <Modal
          id="promotionaryArticleDetails"
          close={close}
          setClose={setClose}
        >
          <ViewPromotionaryArticle id={promotionaryArticle.id} />
        </Modal>
        <Modal
          id="promotionaryArticleUpdateForm"
          close={modalCloseForm}
          setClose={setModalCloseForm}
        >
          <PromotionaryArticleForm
            buttonLabel="Update"
            promotionaryArticle={promotionaryArticle}
            schema={UpdatePromotionaryArticleSchema}
          />
        </Modal>
      </div>
    </>
  );
};

export default PromotionaryArticleCard;
