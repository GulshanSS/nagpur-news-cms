import { useState } from "react";
import { ArticleSection } from "../../redux/api/types";
import { useDeleteArticleSectionMutation } from "../../redux/api/articleSectionApi";
import Carousel from "../Carousel";
import ActionButton from "../ActionButton";
import { FaEye } from "react-icons/fa";
import { HiPencil } from "react-icons/hi";
import RequireAdmin from "../Auth/RequireAdmin";
import { MdDelete } from "react-icons/md";
import Modal from "../Modal";
import ArticleSectionForm from "../Forms/Article/ArticleSectionForm";
import { UpdateArticleSectionSchema } from "../../validationSchema/ArticleSectionSchema";
import ViewArticleSection from "./ViewArticleSection";

type Props = {
  articleSection: ArticleSection;
};

const ArticleSectionCard = ({ articleSection }: Props) => {
  const [modalCloseForm, setModalCloseForm] = useState<boolean>(false);

  const [close, setClose] = useState<boolean>(false);

  const [deleteArticleSection] = useDeleteArticleSectionMutation();

  return (
    <>
      <div className="w-80 h-fit rounded-md bg-slate-100 hover:cursor-pointer hover:shadow-lg transition-shadow ease-in-out duration-300">
        {articleSection.media.length > 0 && (
          <Carousel slides={articleSection.media} heightVariant="normal" />
        )}
        <div className="w-full flex flex-col justify-between items-center px-2.5 p-3">
          <div>
            {articleSection.title && (
              <span className="text-[18px] font-bold text-slate-600 italic">
                {articleSection.title}
              </span>
            )}
            {articleSection.content && (
              <p className="text-[12px] text-slate-600 line-clamp-2">
                {articleSection.content}
              </p>
            )}
          </div>
          <div className="w-full flex justify-center items-center gap-1">
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
                onClick={() => deleteArticleSection(articleSection.id)}
                Icon={<MdDelete />}
                color="red"
              />
            </RequireAdmin>
          </div>
        </div>
        <Modal id="articleSectionDetails" close={close} setClose={setClose}>
          <ViewArticleSection id={articleSection.id} />
        </Modal>
        <Modal
          id="articleSectionUpdateForm"
          close={modalCloseForm}
          setClose={setModalCloseForm}
        >
          <ArticleSectionForm
            buttonLabel="Update"
            articleId={articleSection.articleId}
            articleSection={articleSection}
            schema={UpdateArticleSectionSchema}
          />
        </Modal>
      </div>
    </>
  );
};

export default ArticleSectionCard;
