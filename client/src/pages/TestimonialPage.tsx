import { useState } from "react";
import TestimonialForm from "../components/Forms/TestimonialForm";
import Modal from "../components/Modal";
import PageNav from "../components/PageNav";
import AddResourceButton from "../components/AddResourceButton";
import DisplayAllTestimonial from "../components/Testimonial/DisplayAllTestimonial";

const TestimonialPage = () => {
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
        <DisplayAllTestimonial searchQuery={searchQuery} />
      </div>
      <Modal
        id="categoryForm"
        close={modalCloseForm}
        setClose={setModalCloseForm}
      >
        <TestimonialForm buttonLabel="Create" />
      </Modal>
      <AddResourceButton setModalCloseForm={setModalCloseForm} />
    </>
  );
};

export default TestimonialPage;
