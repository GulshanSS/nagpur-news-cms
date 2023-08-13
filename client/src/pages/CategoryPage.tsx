import { useState } from "react";
import DisplayAllCategory from "../components/Category/DisplayAllCategory";
import CategoryForm from "../components/Forms/CategoryForm";
import Modal from "../components/Modal";
import PageNav from "../components/PageNav";
import AddResourceButton from "../components/AddResourceButton";

const CategoryPage = () => {
  const [modalCloseForm, setModalCloseForm] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");

  return (
    <>
      <PageNav
        setModalCloseForm={setModalCloseForm}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        navigateToDifferentPage={false}
      />
      <div className="w-auto py-32">
        <DisplayAllCategory searchQuery={searchQuery} />
      </div>
      <Modal
        id="categoryForm"
        close={modalCloseForm}
        setClose={setModalCloseForm}
      >
        <CategoryForm buttonLabel="Create" />
      </Modal>
      <AddResourceButton
        navigateToDifferentPage={false}
        setModalCloseForm={setModalCloseForm}
      />
    </>
  );
};

export default CategoryPage;
