import { useState } from "react";
import Modal from "../components/Modal";
import PageNav from "../components/PageNav";
import AddResourceButton from "../components/AddResourceButton";
import DisplayAllUser from "../components/User/DisplayAllUser";
import UserForm from "../components/Forms/UserForm";

const UserPage = () => {
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
        <DisplayAllUser searchQuery={searchQuery} />
      </div>
      <Modal id="userForm" close={modalCloseForm} setClose={setModalCloseForm}>
        <UserForm buttonLabel="Create" />
      </Modal>
      <AddResourceButton setModalCloseForm={setModalCloseForm} />
    </>
  );
};

export default UserPage;
