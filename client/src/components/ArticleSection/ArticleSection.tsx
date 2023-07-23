import { useState } from "react";
import DisplayAllArticleSection from "./DisplayAllArticleSection";
import ArticleSectionButton from "../Forms/Article/ArticleSectionButton";
import Modal from "../Modal";
import ArticleSectionForm from "../Forms/Article/ArticleSectionForm";
import { CreateArticleSectionSchema } from "../../validationSchema/ArticleSectionSchema";

type Props = {
  articleId: number;
};

const ArticleSection = ({ articleId }: Props) => {
  const [modalCloseForm, setModalCloseForm] = useState<boolean>(false);

  return (
    <>
      <div className="w-80 md:w-[500px] bg-slate-200 px-3 py-5 rounded-md overflow-hidden overflow-y-scroll">
        <DisplayAllArticleSection articleId={articleId} />
        <ArticleSectionButton setModalCloseForm={setModalCloseForm} />
      </div>
      <Modal
        id="articleSectionForm"
        close={modalCloseForm}
        setClose={setModalCloseForm}
      >
        <ArticleSectionForm
          buttonLabel="Add"
          articleId={articleId}
          schema={CreateArticleSectionSchema}
        />
      </Modal>
    </>
  );
};

export default ArticleSection;
