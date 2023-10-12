import { useEffect, useState } from "react";
import { APIErrorResponse, Article } from "../../redux/api/types";
import ActionButton from "../ActionButton";
import Carousel from "../Carousel";
import Status from "../Status";
import { FaEye } from "react-icons/fa";
import { HiPencil } from "react-icons/hi";
import RequireAdmin from "../Auth/RequireAdmin";
import { useDeleteArticleMutation } from "../../redux/api/articleApi";
import { MdDelete } from "react-icons/md";
import Modal from "../Modal";
import ViewArticle from "./ViewArticle";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

type Props = {
  article: Article;
};

const ArticleCard = ({ article }: Props) => {
  const navigate = useNavigate();

  const [close, setClose] = useState<boolean>(false);

  const [deleteArticle, { isSuccess, isLoading, error, isError }] =
    useDeleteArticleMutation();

  useEffect(() => {
    if (isSuccess) {
      toast.success("Article Deleted Successfully");
    }

    if (isError) {
      toast.error((error as APIErrorResponse).data.message);
    }
  }, [isLoading]);

  return (
    <>
      <div className="w-80 h-fit rounded-md bg-custom-50 border border-custom-600 hover:cursor-pointer hover:shadow-lg transition-shadow ease-in-out duration-300">
        {article.media.length > 0 && (
          <Carousel slides={article.media} heightVariant="normal" />
        )}
        <div className="w-full flex flex-col justify-between items-center px-2.5 p-3 text-custom-800">
          <div>
            {article.title && (
              <>
                <div className="flex justify-between items-center">
                  <span className="text-[14px] font-bold italic">
                    {article.title}
                  </span>
                  <span className="text-[12px] font-bold">
                    {new Intl.DateTimeFormat("en-GB", {
                      year: "numeric",
                      month: "long",
                      day: "2-digit",
                    }).format(new Date(article.publishedOn!))}
                  </span>
                </div>
              </>
            )}
            {article.content && (
              <div
                className="text-[12px] line-clamp-2"
                dangerouslySetInnerHTML={{ __html: article.content }}
              ></div>
            )}
            <div className="flex gap-1 mt-6">
              <Status
                label={article.state}
                colorVariant={
                  article.state === "PUBLISHED" ? "orange" : "slate"
                }
              />
              <Status
                label="Social Media"
                colorVariant={article.postToSocialMedia ? "green" : "slate"}
              />
            </div>
          </div>
          <div className="w-full flex justify-between items-center">
            <div className="flex gap-1">
              <Status
                label="Active"
                colorVariant={article.active ? "green" : "slate"}
              />
              <Status
                label="Banner"
                colorVariant={article.setAsBanner ? "green" : "slate"}
              />
            </div>
            <div className="flex gap-1">
              <ActionButton
                onClick={() => setClose(true)}
                Icon={<FaEye />}
                color="slate"
              />
              <ActionButton
                onClick={() =>
                  navigate("/article/create", {
                    state: {
                      article,
                    },
                  })
                }
                Icon={<HiPencil />}
                color="blue"
              />
              <RequireAdmin>
                <ActionButton
                  onClick={() => deleteArticle(article.id)}
                  Icon={<MdDelete />}
                  color="red"
                />
              </RequireAdmin>
            </div>
          </div>
        </div>
        <Modal id="articleDetails" close={close} setClose={setClose}>
          <ViewArticle id={article.id} />
        </Modal>
      </div>
    </>
  );
};

export default ArticleCard;
