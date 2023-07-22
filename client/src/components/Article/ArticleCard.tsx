import { useState } from "react";
import { Article } from "../../redux/api/types";
import ActionButton from "../ActionButton";
import Carousel from "../Carousel";
import Status from "../Status";
import { FaEye } from "react-icons/fa";
import { HiPencil } from "react-icons/hi";
import RequireAdmin from "../Auth/RequireAdmin";
import { useDeleteArticleMutation } from "../../redux/api/articleApi";
import { MdDelete } from "react-icons/md";
import Modal from "../Modal";
import ViewArticle from "./ViewArticle";
import ArticleForm from "../Forms/Article/ArticleForm";
import { UpdateArticleSchema } from "../../validationSchema/ArticleSchema";

type Props = {
  article: Article;
};

const ArticleCard = ({ article }: Props) => {
  const [modalCloseForm, setModalCloseForm] = useState<boolean>(false);

  const [close, setClose] = useState<boolean>(false);

  const [deleteArticle] = useDeleteArticleMutation();

  return (
    <>
      <div className="w-80 h-fit rounded-md bg-slate-100 hover:cursor-pointer hover:shadow-lg transition-shadow ease-in-out duration-300">
        {article.media.length > 0 && (
          <Carousel slides={article.media} heightVariant="normal" />
        )}
        <div className="w-full flex flex-col justify-between items-center px-2.5 p-3">
          <div>
            {article.title && (
              <>
                <div className="flex justify-between items-center">
                  <span className="text-[18px] font-bold text-slate-600 italic">
                    {article.title}
                  </span>
                  <span className="text-[12px] font-bold text-slate-600">
                    {new Intl.DateTimeFormat("en-GB", {
                      year: "numeric",
                      month: "long",
                      day: "2-digit",
                    }).format(new Date(article.publishedOn!))}
                  </span>
                </div>
              </>
            )}
            {article.content && (
              <p className="text-[12px] text-slate-600 line-clamp-2">
                {article.content}
              </p>
            )}
            <div className="mt-6">
              <Status label={article.state} colorVariant="slate" />
            </div>
          </div>
          <div className="w-full flex justify-between items-center">
            <div className="flex gap-1">
              <Status
                label="Active"
                colorVariant={article.active ? "green" : "slate"}
              />
              <Status
                label="Banner"
                colorVariant={article.setAsBanner ? "green" : "slate"}
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
                  onClick={() => deleteArticle(article.id)}
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
          <ViewArticle id={article.id} />
        </Modal>
        <Modal
          id="articleUpdateForm"
          close={modalCloseForm}
          setClose={setModalCloseForm}
        >
          <ArticleForm
            buttonLabel="Update & Publish"
            actionButtonLabel="Update & Save As Draft"
            article={article}
            schema={UpdateArticleSchema}
          />
        </Modal>
      </div>
    </>
  );
};

export default ArticleCard;
