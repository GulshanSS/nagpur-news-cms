import { TypeOf, ZodSchema } from "zod";
import InputField from "../../FormComponents/InputField";
import SubmitButton from "../../FormComponents/SubmitButton";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  useCreateArticleSectionMutation,
  useUpdateArticleSectionMutation,
} from "../../../redux/api/articleSectionApi";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { APIErrorResponse, ArticleSection } from "../../../redux/api/types";
import MediaCard from "../../MediaCard";
import MediaInputField from "../../FormComponents/MediaInputField";
import ContentField from "../../FormComponents/ContentField";

type Props = {
  buttonLabel: string;
  articleId: number;
  articleSection?: ArticleSection;
  schema: ZodSchema;
};

const ArticleSectionForm = ({
  buttonLabel,
  articleId,
  articleSection,
  schema,
}: Props) => {
  type SchemaType = TypeOf<typeof schema>;

  const methods = useForm<SchemaType>({
    resolver: zodResolver(schema),
  });

  const [createArticleSection, { isLoading, isSuccess, error, isError }] =
    useCreateArticleSectionMutation();

  const [updateArticleSection] = useUpdateArticleSectionMutation();

  const {
    handleSubmit,
    reset,
    formState: { isSubmitSuccessful },
  } = methods;

  useEffect(() => {
    if (isSuccess) {
      toast.success("Section Added to the Article");
    }

    if (isError) {
      toast.error((error as APIErrorResponse).data.message);
    }
  }, [isLoading]);

  const handlerArticleSectionSubmit = (values: SchemaType) => {
    if (articleSection) {
      updateArticleSection({
        ...values,
        articleId: articleSection.articleId,
        articleSectionId: articleSection.id,
      });
    } else {
      createArticleSection({ ...values, articleId });
    }
  };

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  });

  return (
    <>
      <FormProvider {...methods}>
        <form
          onSubmit={handleSubmit(handlerArticleSectionSubmit)}
          className="mx-2 bg-custom-50 px-3 py-5 rounded-md w-80 md:w-[500px] h-[500px] md:h-fit md:max-h-[700px] overflow-hidden overflow-y-scroll"
          autoComplete="off"
          noValidate
        >
          <InputField
            label="Title"
            name="title"
            type="text"
            placeholder="Enter Title"
            value={articleSection ? articleSection.title : ""}
          />
          <ContentField
            label="Content"
            name="content"
            placeholder="Enter Content"
            value={articleSection ? articleSection.content : ""}
          />
          <InputField
            label="Sequence"
            name="sequence"
            type="text"
            value={articleSection ? articleSection.sequence.toString() : ""}
            placeholder="Set Priority 0-9"
          />
          {articleSection && (
            <>
              <div className="text-[10px]">Already Uploaded File</div>
              <div className="flex flex-wrap justify-start gap-2 mb-6">
                {articleSection.media?.map((media) => (
                  <MediaCard
                    key={media!.id}
                    id={media.id}
                    name={media.id!.toString()}
                    url={media!.key}
                    type={media!.type}
                  />
                ))}
              </div>
            </>
          )}
          <MediaInputField label="Article Media" name="media" multiple={true} />
          <SubmitButton label={buttonLabel} />
        </form>
      </FormProvider>
    </>
  );
};

export default ArticleSectionForm;
