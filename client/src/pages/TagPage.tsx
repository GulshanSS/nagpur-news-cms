import { useState } from "react";
import TagForm from "../components/Forms/TagForm";
import PageNav from "../components/PageNav";
import AddResourceButton from "../components/AddResourceButton";
import Modal from "../components/Modal";
import DisplayAllTag from "../components/Tag/DisplayAllTag";

const TagPage = () => {
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
        <DisplayAllTag searchQuery={searchQuery} />
      </div>
      <Modal id="tagForm" close={modalCloseForm} setClose={setModalCloseForm}>
        <TagForm buttonLabel="Create" />
      </Modal>
      <AddResourceButton setModalCloseForm={setModalCloseForm} />
    </>
  );
};

export default TagPage;
