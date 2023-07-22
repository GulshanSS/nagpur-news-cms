import { useState } from "react";
import ArticleForm from "../components/Forms/Article/ArticleForm";
import { CreateArticleSchema } from "../validationSchema/ArticleSchema";
import PageNav from "../components/PageNav";
import Modal from "../components/Modal";
import AddResourceButton from "../components/AddResourceButton";
import DisplayAllArticle from "../components/Article/DisplayAllArticle";

const ArticlePage = () => {
  const [modalCloseForm, setModalCloseForm] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  return (
    <>
      <>
        <PageNav
          setModalCloseForm={setModalCloseForm}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />
        <div className="w-auto py-32">
          <DisplayAllArticle searchQuery={searchQuery} />
        </div>
        <Modal
          id="articleForm"
          close={modalCloseForm}
          setClose={setModalCloseForm}
        >
          <ArticleForm
            buttonLabel="Publish"
            actionButtonLabel="Save As Draft"
            schema={CreateArticleSchema}
          />
        </Modal>
        <AddResourceButton setModalCloseForm={setModalCloseForm} />
      </>
    </>
  );
};

export default ArticlePage;
