import { useState } from "react";
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

type Props = {
  id: number;
};

const ViewArticle = ({ id }: Props) => {
  const [modalCloseForm, setModalCloseForm] = useState<boolean>(false);

  const { data, isLoading, isError, error } = useGetArticleQuery(id);

  const [deleteArticle] = useDeleteArticleMutation();

  if (isError) {
    toast.error((error as APIErrorResponse).data.message);
  }

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <div className="w-80 md:w-[700px] bg-slate-100 rounded-md shadow-md h-[500px] md:h-[700px] overflow-hidden overflow-y-scroll">
        {data?.article.media.length! > 0 && (
          <Carousel slides={data?.article!.media!} heightVariant="large" />
        )}
        <div className="w-full flex gap-2 flex-col items-center p-5">
          <div className="w-full flex flex-col">
            <span className="w-28 text-[12px] font-bold text-slate-800">
              ID
            </span>
            <span className="font-bold text-lg text-slate-500">
              {data?.article.id}
            </span>
          </div>
          {data?.article.title && (
            <div className="w-full flex flex-col">
              <span className="w-28 text-[12px] font-bold text-slate-800">
                Title
              </span>
              <span className="font-bold text-lg text-slate-500">
                {data?.article.title}
              </span>
            </div>
          )}
          {data?.article.content && (
            <div className="w-full flex flex-col">
              <span className="w-28 text-[12px] font-bold text-slate-800">
                Content
              </span>
              <span className="font-bold text-sm text-slate-500 text-justify">
                {data?.article.content}
              </span>
            </div>
          )}
          {data?.article.category.length! > 0 && (
            <div className="w-full flex flex-col">
              <span className="w-28 text-[12px] font-bold text-slate-800">
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
              <span className="w-28 text-[12px] font-bold text-slate-800">
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
            <div className="w-full flex flex-col">
              <span className="w-28 text-[12px] font-bold text-slate-800">
                YouTube URL
              </span>
              <span className="font-bold text-lg text-slate-500">
                {data?.article.youtubeVideoUrl}
              </span>
            </div>
          )}
          {data?.article.author && (
            <div className="w-full flex flex-col">
              <span className="w-28 text-[12px] font-bold text-slate-800">
                Author
              </span>
              <span className="font-bold text-lg text-slate-500">
                {data?.article.author}
              </span>
            </div>
          )}
          {data?.article.state && (
            <div className="w-full flex flex-col">
              <span className="w-28 text-[12px] font-bold text-slate-800">
                State
              </span>
              <span className="font-bold text-lg text-slate-500">
                {data?.article.state}
              </span>
            </div>
          )}
          <div className="w-full flex flex-col">
            <span className="w-28 text-[12px] font-bold text-slate-800">
              Published On
            </span>
            <span className="font-bold text-lg text-slate-500">
              {new Intl.DateTimeFormat("en-GB", {
                year: "numeric",
                month: "long",
                day: "2-digit",
              }).format(new Date(data?.article.publishedOn!))}
            </span>
          </div>
          <div className="w-full flex gap-2">
            <div className="flex flex-col">
              <span className="w-28 text-[12px] font-bold text-slate-800">
                Created At
              </span>
              <span className="font-bold text-lg text-slate-500">
                {new Intl.DateTimeFormat("en-GB", {
                  year: "numeric",
                  month: "long",
                  day: "2-digit",
                }).format(new Date(data?.article.createdAt!))}
              </span>
            </div>
            <div className="flex flex-col">
              <span className="w-28 text-[12px] font-bold text-slate-800">
                Updated At
              </span>
              <span className="font-bold text-lg text-slate-500">
                {new Intl.DateTimeFormat("en-GB", {
                  year: "numeric",
                  month: "long",
                  day: "2-digit",
                }).format(new Date(data?.article.updatedAt!))}
              </span>
            </div>
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
    </>
  );
};

export default ViewArticle;
