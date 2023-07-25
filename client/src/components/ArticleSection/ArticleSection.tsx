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
      <div className="w-80 md:w-[700px] bg-custom-50 flex flex-col justify-between items-center px-3 py-5 rounded-md overflow-hidden max-h-[500px] h-fit md:max-h-[700px] overflow-y-scroll">
        <DisplayAllArticleSection articleId={articleId} />
        <ArticleSectionButton
          label="Add Sub Section"
          setModalCloseForm={setModalCloseForm}
        />
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
