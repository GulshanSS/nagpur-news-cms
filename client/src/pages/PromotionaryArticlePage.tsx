import { useState } from "react";
import PageNav from "../components/PageNav";
import Modal from "../components/Modal";
import PromotionaryArticleForm from "../components/Forms/PromotionaryArticleForm";
import { CreatePromotionaryArticleSchema } from "../validationSchema/PromotionaeryArticleSchema";
import AddResourceButton from "../components/AddResourceButton";
import DisplayAllPromotionaryArticle from "../components/PromotionaryArticle/DisplayAllPromotionaryArticle";

const PromotionaryArticlePage = () => {
  const [modalCloseForm, setModalCloseForm] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");

  return (
    <>
      <PageNav
        setModalCloseForm={setModalCloseForm}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
      <div className="w-auto py-32">
        <DisplayAllPromotionaryArticle searchQuery={searchQuery} />
      </div>
      <Modal
        id="categoryForm"
        close={modalCloseForm}
        setClose={setModalCloseForm}
      >
        <PromotionaryArticleForm
          buttonLabel="Create"
          schema={CreatePromotionaryArticleSchema}
        />
      </Modal>
      <AddResourceButton setModalCloseForm={setModalCloseForm} />
    </>
  );
};

export default PromotionaryArticlePage;
