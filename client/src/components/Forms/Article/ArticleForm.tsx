import { TypeOf, ZodSchema } from "zod";
import { Article } from "../../../redux/api/types";
import InputField from "../../FormComponents/InputField";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import ToggleSwitch from "../../FormComponents/ToggleSwitch";
import SubmitButton from "../../FormComponents/SubmitButton";
import ImageInputField from "../../FormComponents/ImageInputField";
import MultiSelectField from "../../FormComponents/MultiSelectField";
import { useGetAllCategoriesQuery } from "../../../redux/api/categoryApi";
import { useGetAllTagsQuery } from "../../../redux/api/tagApi";
import TextAreaField from "../../FormComponents/TextAreaField";
import {
  useCreateArticleMutation,
  useUpdateArticleMutation,
} from "../../../redux/api/articleApi";
import ActionButtonSubmit from "../../FormComponents/ActionButtonSubmit";
import { toast } from "react-toastify";
import ImageCard from "../../ImageCard";

type Props = {
  buttonLabel: string;
  actionButtonLabel: string;
  article?: Partial<Article>;
  schema: ZodSchema;
};

const ArticleForm = ({
  buttonLabel,
  actionButtonLabel,
  article,
  schema,
}: Props) => {
  type SchemaType = TypeOf<typeof schema>;

  const method = useForm<SchemaType>({
    resolver: zodResolver(schema),
  });

  const [createArticle, { isLoading, data, isSuccess, error, isError }] =
    useCreateArticleMutation();

  const { data: categoryResult, isLoading: isCategoryLoading } =
    useGetAllCategoriesQuery();

  const [updateArticle] = useUpdateArticleMutation();

  const { data: tagResult, isLoading: isTagLoading } = useGetAllTagsQuery();

  const {
    handleSubmit,
    reset,
    getValues,
    formState: { isSubmitSuccessful },
  } = method;

  useEffect(() => {
    if (isSuccess) {
      if (data?.article.state === "DRAFT") {
        toast.success("Article saved as DRAFT");
      } else if (data?.article.state === "PUBLISHED") {
        toast.success("Article Published successfully");
      }
    }

    if (isError) {
      console.log(error);
    }
  }, [isLoading]);

  const handleArticleSubmit = (values: SchemaType) => {
    if (article) {
      updateArticle({ ...values, articleId: article.id, state: "PUBLISHED" });
    } else {
      createArticle({ ...values, state: "PUBLISHED" });
    }
  };

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  });

  return (
    <>
      {data?.article.state === "DRAFT" ? (
        <>
          <h1>Article saved as draft</h1>
        </>
      ) : (
        <FormProvider {...method}>
          <form
            onSubmit={handleSubmit(handleArticleSubmit)}
            className="mx-2 h-[500px] md:h-[700px] bg-slate-200 px-3 py-5 rounded-md overflow-hidden overflow-y-scroll"
            autoComplete="off"
            noValidate
          >
            <InputField
              label="Title"
              name="title"
              type="text"
              placeholder="Enter Title"
              value={article ? article.title : ""}
            />
            <TextAreaField
              label="Content"
              name="content"
              placeholder="Enter Content"
              value={article ? article.content : ""}
            />
            <div className="md:flex md:gap-2">
              <InputField
                label="YouTube Video URL"
                name="youtubeVideoUrl"
                type="text"
                placeholder="Enter YouTube Video URL"
                value={article ? article.youtubeVideoUrl : ""}
              />
              <InputField
                label="Author"
                name="author"
                type="text"
                placeholder="Enter Author"
                value={article ? article.author : ""}
              />
            </div>
            <InputField
              label="Published On"
              name="publishedOn"
              type="date"
              placeholder="Published On"
              value={
                article
                  ? new Date(article.publishedOn!).toISOString().slice(0, 10)
                  : new Date().toISOString().slice(0, 10)
              }
            />
            <div className="flex gap-2">
              <ToggleSwitch
                label="Active"
                name="active"
                value={article ? article.active! : true}
              />
              <ToggleSwitch
                label="Set As Banner"
                name="setAsBanner"
                value={article ? article.setAsBanner! : true}
              />
            </div>
            <div className="w-full md:flex md:gap-2">
              <div className="md:w-1/2">
                <MultiSelectField
                  options={{ category: categoryResult?.categories }}
                  isLoading={isCategoryLoading}
                  label="Category"
                  name="category"
                  value={article ? article?.category! : []}
                />
              </div>
              <div className="md:w-1/2">
                <MultiSelectField
                  options={{ tag: tagResult?.tags }}
                  isLoading={isTagLoading}
                  label="Tag"
                  name="tag"
                  value={article ? article?.tag! : []}
                />
              </div>
            </div>
            {article && (
              <>
                <div className="text-[10px]">Already Uploaded File</div>
                <div className="flex flex-wrap justify-start gap-2 mb-6">
                  {article.media?.map((media) => (
                    <ImageCard
                      key={media!.id}
                      id={media.id}
                      name={article.title!}
                      url={media!.key}
                    />
                  ))}
                </div>
              </>
            )}
            <ImageInputField
              label="Article Media"
              name="media"
              multiple={true}
            />
            <div className="flex flex-col md:flex-row gap-2">
              <SubmitButton label={buttonLabel} />
              <ActionButtonSubmit
                label={actionButtonLabel}
                onClick={() => {
                  if (article) {
                    updateArticle({
                      ...getValues(),
                      articleId: article.id,
                      state: "DRAFT",
                    });
                  } else {
                    createArticle({ ...getValues(), state: "DRAFT" });
                  }
                }}
              />
            </div>
          </form>
        </FormProvider>
      )}
    </>
  );
};

export default ArticleForm;
