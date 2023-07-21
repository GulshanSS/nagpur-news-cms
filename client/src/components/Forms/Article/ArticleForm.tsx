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
import { useCreateArticleMutation } from "../../../redux/api/articleApi";
import ActionButtonSubmit from "../../FormComponents/ActionButtonSubmit";
import { toast } from "react-toastify";

type Props = {
  buttonLabel: string;
  article?: Partial<Article>;
  schema: ZodSchema;
};

const ArticleForm = ({ buttonLabel, article, schema }: Props) => {
  type SchemaType = TypeOf<typeof schema>;

  const method = useForm<SchemaType>({
    resolver: zodResolver(schema),
  });

  const [createArticle, { isLoading, data, isSuccess, error, isError }] =
    useCreateArticleMutation();

  const { data: categoryResult, isLoading: isCategoryLoading } =
    useGetAllCategoriesQuery();

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
    createArticle({ ...values, state: "PUBLISHED" });
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
            />
            <TextAreaField
              label="Content"
              name="content"
              placeholder="Enter Content"
            />
            <div className="md:flex md:gap-2">
              <InputField
                label="YouTube Video URL"
                name="youtubeVideoUrl"
                type="text"
                placeholder="Enter YouTube Video URL"
              />
              <InputField
                label="Author"
                name="author"
                type="text"
                placeholder="Enter Author"
              />
            </div>
            <InputField
              label="Published On"
              name="publishedOn"
              type="date"
              placeholder="Published On"
              value={new Date().toISOString().slice(0, 10)}
            />
            <div className="flex gap-2">
              <ToggleSwitch label="Active" name="active" value={true} />
              <ToggleSwitch
                label="Set As Banner"
                name="setAsBanner"
                value={true}
              />
            </div>
            <div className="w-full md:flex md:gap-2">
              <div className="md:w-1/2">
                <MultiSelectField
                  options={{ category: categoryResult?.categories }}
                  isLoading={isCategoryLoading}
                  label="Category"
                  name="category"
                />
              </div>
              <div className="md:w-1/2">
                <MultiSelectField
                  options={{ tag: tagResult?.tags }}
                  isLoading={isTagLoading}
                  label="Tag"
                  name="tag"
                />
              </div>
            </div>

            <ImageInputField
              label="Article Media"
              name="media"
              multiple={true}
            />
            <div className="flex gap-2">
              <SubmitButton label={buttonLabel} />
              <ActionButtonSubmit
                label="Save As Draft"
                onClick={(e) =>
                  createArticle({ ...getValues(), state: "DRAFT" })
                }
              />
            </div>
          </form>
        </FormProvider>
      )}
    </>
  );
};

export default ArticleForm;
