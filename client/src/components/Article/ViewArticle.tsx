import { useEffect, useState } from "react";
import {
  useDeleteArticleMutation,
  useGetArticleQuery,
} from "../../redux/api/articleApi";
import { toast } from "react-toastify";
import { APIErrorResponse } from "../../redux/api/types";
import Spinner from "../Spinner";
import Carousel from "../Carousel";
import Status from "../Status";
import ActionButton from "../ActionButton";
import { HiPencil } from "react-icons/hi";
import RequireAdmin from "../Auth/RequireAdmin";
import { MdDelete } from "react-icons/md";
import Modal from "../Modal";
import ArticleForm from "../Forms/Article/ArticleForm";
import { UpdateArticleSchema } from "../../validationSchema/ArticleSchema";
import ViewItem from "../ViewItem";
import ArticleSectionButton from "../Forms/Article/ArticleSectionButton";
import ArticleSection from "../ArticleSection/ArticleSection";

type Props = {
  id: number;
};

const ViewArticle = ({ id }: Props) => {
  const [modalCloseForm, setModalCloseForm] = useState<boolean>(false);

  const [modalArticleSection, setModalArticleSection] =
    useState<boolean>(false);

  const { data, isLoading, isError, error } = useGetArticleQuery(id);

  const [
    deleteArticle,
    {
      isSuccess: isDeleteArticleSuccess,
      isLoading: isDeleteArticleLoading,
      error: deleteArticleError,
      isError: isDeleteArticleError,
    },
  ] = useDeleteArticleMutation();

  useEffect(() => {
    if (isDeleteArticleSuccess) {
      toast.success("Article Deleted Successfully");
    }

    if (isDeleteArticleError) {
      toast.error((deleteArticleError as APIErrorResponse).data.message);
    }
  }, [isDeleteArticleLoading]);

  if (isError) {
    toast.error((error as APIErrorResponse).data.message);
  }

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <div className="w-80 md:w-[700px] bg-custom-50 rounded-md shadow-md h-[500px] md:h-[700px] overflow-hidden overflow-y-scroll">
        {data?.article.media.length! > 0 && (
          <Carousel slides={data?.article!.media!} heightVariant="large" />
        )}
        <div className="w-full flex gap-4 flex-col p-5">
          <ViewItem label="ID" value={data!.article.id.toString()} />
          {data?.article.title && (
            <ViewItem label="Title" value={data!.article.title} />
          )}
          {data?.article.location && (
            <ViewItem label="Location" value={data!.article.location} />
          )}
          {data?.article.content && (
            <div className="w-full flex flex-col">
              <span className="w-28 text-[12px] font-bold text-custom-800">
                Content
              </span>
              <div
                className=""
                dangerouslySetInnerHTML={{ __html: data?.article.content }}
              ></div>
            </div>
          )}
          <div className="w-full flex flex-col">
            <span className="w-28 text-[12px] font-bold text-custom-800">
              Sub Sections
            </span>
            <div className="flex mt-2">
              <ArticleSectionButton
                setModalCloseForm={setModalArticleSection}
                label="View Sub Sections"
              />
            </div>
          </div>
          {data?.article.category.length! > 0 && (
            <div className="w-full flex flex-col">
              <span className="w-28 text-[12px] font-bold text-custom-800">
                Categories
              </span>
              <div className="flex gap-1 mt-2">
                {data?.article.category.map((category) => (
                  <Status
                    key={category.id}
                    label={category.name}
                    colorVariant="green"
                  />
                ))}
              </div>
            </div>
          )}

          {data?.article.tag.length! > 0 && (
            <div className="w-full flex flex-col">
              <span className="w-28 text-[12px] font-bold text-custom-800">
                Tags
              </span>
              <div className="flex gap-1 mt-2">
                {data?.article.tag.map((tag) => (
                  <Status key={tag.id} label={tag.name} colorVariant="green" />
                ))}
              </div>
            </div>
          )}
          {data?.article.youtubeVideoUrl && (
            <ViewItem
              label="YouTube Video URL"
              value={data!.article.youtubeVideoUrl}
            />
          )}
          {data?.article.author && (
            <ViewItem label="Author" value={data!.article.author} />
          )}
          {data?.article.state && (
            <ViewItem label="State" value={data!.article.state} />
          )}
          <ViewItem
            label="Published On"
            value={new Intl.DateTimeFormat("en-GB", {
              year: "numeric",
              month: "long",
              day: "2-digit",
            }).format(new Date(data!.article.publishedOn))}
          />
          <div className="w-full flex gap-2">
            <ViewItem
              label="Created At"
              value={new Intl.DateTimeFormat("en-GB", {
                year: "numeric",
                month: "long",
                day: "2-digit",
              }).format(new Date(data!.article.createdAt))}
            />
            <ViewItem
              label="Updated At"
              value={new Intl.DateTimeFormat("en-GB", {
                year: "numeric",
                month: "long",
                day: "2-digit",
              }).format(new Date(data!.article.updatedAt))}
            />
          </div>
          <div className="w-full flex justify-between items-center gap-1">
            <div className="flex gap-1">
              <Status
                label="Active"
                colorVariant={data?.article!.active ? "green" : "slate"}
              />
              <Status
                label="SetAsBanner"
                colorVariant={data?.article!.setAsBanner ? "green" : "slate"}
              />
            </div>
            <div className="flex gap-1">
              <ActionButton
                onClick={() => setModalCloseForm(true)}
                Icon={<HiPencil />}
                color="blue"
              />
              <RequireAdmin>
                <ActionButton
                  onClick={() => deleteArticle(id)}
                  Icon={<MdDelete />}
                  color="red"
                />
              </RequireAdmin>
            </div>
          </div>
        </div>
      </div>
      <Modal
        id="articleUpdateForm"
        close={modalCloseForm}
        setClose={setModalCloseForm}
      >
        <ArticleForm
          buttonLabel="Update & Publish"
          actionButtonLabel="Update & Save As Draft"
          article={data?.article}
          schema={UpdateArticleSchema}
        />
      </Modal>
      <Modal
        id="articleSection"
        close={modalArticleSection}
        setClose={setModalArticleSection}
      >
        <ArticleSection articleId={id} />
      </Modal>
    </>
  );
};

export default ViewArticle;
