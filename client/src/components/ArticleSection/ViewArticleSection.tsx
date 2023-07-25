import { useState } from "react";
import {
  useDeleteArticleSectionMutation,
  useGetArticleSectionQuery,
} from "../../redux/api/articleSectionApi";
import { APIErrorResponse } from "../../redux/api/types";
import Spinner from "../Spinner";
import { toast } from "react-toastify";
import Carousel from "../Carousel";
import ActionButton from "../ActionButton";
import { HiPencil } from "react-icons/hi";
import RequireAdmin from "../Auth/RequireAdmin";
import { MdDelete } from "react-icons/md";
import Modal from "../Modal";
import ArticleSectionForm from "../Forms/Article/ArticleSectionForm";
import { UpdateArticleSectionSchema } from "../../validationSchema/ArticleSectionSchema";
import ViewItem from "../ViewItem";

type Props = {
  id: number;
};

const ViewArticleSection = ({ id }: Props) => {
  const [modalCloseForm, setModalCloseForm] = useState<boolean>(false);

  const { data, isLoading, isError, error } = useGetArticleSectionQuery(id);

  const [deleteArticleSection] = useDeleteArticleSectionMutation();

  if (isError) {
    toast.error((error as APIErrorResponse).data.message);
  }

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <div className="w-80 md:w-[700px] bg-custom-50 rounded-md shadow-md max-h-[500px] h-fit md:max-h-[700px] overflow-hidden overflow-y-scroll">
        {data?.articleSection.media.length! > 0 && (
          <Carousel
            slides={data?.articleSection!.media!}
            heightVariant="large"
          />
        )}
        <div className="w-full flex gap-4 flex-col items-start p-5">
          <ViewItem label="ID" value={data!.articleSection.id.toString()} />
          {data?.articleSection.title && (
            <ViewItem label="Title" value={data!.articleSection.title} />
          )}
          {data?.articleSection.content && (
            <div className="w-full flex flex-col">
              <span className="w-28 text-[12px] font-bold text-custom-800">
                Content
              </span>
              <div
                className=""
                dangerouslySetInnerHTML={{
                  __html: data?.articleSection.content,
                }}
              ></div>
            </div>
          )}
          <div className="w-full flex gap-2">
            <ViewItem
              label="Created At"
              value={new Intl.DateTimeFormat("en-GB", {
                year: "numeric",
                month: "long",
                day: "2-digit",
              }).format(new Date(data!.articleSection.createdAt))}
            />
            <ViewItem
              label="Updated At"
              value={new Intl.DateTimeFormat("en-GB", {
                year: "numeric",
                month: "long",
                day: "2-digit",
              }).format(new Date(data!.articleSection.updatedAt))}
            />
          </div>
          <div className="w-full flex justify-center items-center gap-1">
            <ActionButton
              onClick={() => setModalCloseForm(true)}
              Icon={<HiPencil />}
              color="blue"
            />
            <RequireAdmin>
              <ActionButton
                onClick={() => deleteArticleSection(id)}
                Icon={<MdDelete />}
                color="red"
              />
            </RequireAdmin>
          </div>
        </div>
      </div>
      <Modal
        id="articleSectionUpdateForm"
        close={modalCloseForm}
        setClose={setModalCloseForm}
      >
        <ArticleSectionForm
          buttonLabel="Update"
          articleId={data?.articleSection.articleId!}
          articleSection={data?.articleSection}
          schema={UpdateArticleSectionSchema}
        />
      </Modal>
    </>
  );
};

export default ViewArticleSection;
