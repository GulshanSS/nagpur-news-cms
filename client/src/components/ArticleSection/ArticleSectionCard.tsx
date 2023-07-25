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
      <div className="w-72 md:w-80 h-fit rounded-md bg-custom-50 border border-custom-600 hover:cursor-pointer hover:shadow-lg transition-shadow ease-in-out duration-300">
        {articleSection.media.length > 0 && (
          <Carousel slides={articleSection.media} heightVariant="normal" />
        )}
        <div className="w-full flex flex-col justify-between items-center px-2.5 p-3 text-custom-800">
          <div>
            {articleSection.sequence && (
              <span className="text-[18px] font-bold italic">
                {articleSection.sequence}.
                {articleSection.title && articleSection.title}
              </span>
            )}
            {articleSection.content && (
              <div
                className="text-[12px] line-clamp-2"
                dangerouslySetInnerHTML={{ __html: articleSection.content }}
              ></div>
            )}
          </div>
          <div className="w-full flex justify-center items-center gap-1 mt-4">
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
