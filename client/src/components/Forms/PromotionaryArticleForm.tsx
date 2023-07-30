import { TypeOf, ZodSchema } from "zod";
import { APIErrorResponse, PromotionaryArticle } from "../../redux/api/types";
import InputField from "../FormComponents/InputField";
import ToggleSwitch from "../FormComponents/ToggleSwitch";
import SubmitButton from "../FormComponents/SubmitButton";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import {
  useCreatePromotionaryArticleMutation,
  useUpdatePromotionaryArticleMutation,
} from "../../redux/api/promotionaryArticleApi";
import { toast } from "react-toastify";
import MediaCard from "../MediaCard";
import MediaInputField from "../FormComponents/MediaInputField";
import ContentField from "../FormComponents/ContentField";

type Props = {
  buttonLabel: string;
  promotionaryArticle?: Partial<PromotionaryArticle>;
  schema: ZodSchema;
};

const PromotionaryArticleForm = ({
  buttonLabel,
  promotionaryArticle,
  schema,
}: Props) => {
  type SchemaType = TypeOf<typeof schema>;

  const method = useForm<SchemaType>({
    resolver: zodResolver(schema),
  });

  const {
    handleSubmit,
    reset,
    formState: { isSubmitSuccessful },
  } = method;

  const [createPromotionaryArticle, { isLoading, isSuccess, error, isError }] =
    useCreatePromotionaryArticleMutation();

  const [
    updatePromotionaryArticle,
    {
      isLoading: isUpdatePromotionaryArticleLoading,
      isSuccess: isUpdatePromotionaryArticleSuccess,
      error: updatePromotionaryArticleError,
      isError: isUpdateCategoryError,
    },
  ] = useUpdatePromotionaryArticleMutation();

  useEffect(() => {
    if (isSuccess) {
      toast.success("Promotionary Article created successfully");
    }

    if (isUpdatePromotionaryArticleSuccess) {
      toast.success("Promotionary Article updated successfully");
    }

    if (isError || isUpdateCategoryError) {
      toast.error(
        (
          (error as APIErrorResponse) ||
          (updatePromotionaryArticleError as APIErrorResponse)
        ).data.message
      );
    }
  }, [isLoading, isUpdatePromotionaryArticleLoading]);

  const handlePromotionaryArticleSubmit = (values: SchemaType) => {
    if (promotionaryArticle) {
      updatePromotionaryArticle({
        ...values,
        promotionaryArticleId: promotionaryArticle.id,
        mediaId: promotionaryArticle.media?.id,
      });
    } else {
      createPromotionaryArticle(values);
    }
  };

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  });

  return (
    <>
      <FormProvider {...method}>
        <form
          onSubmit={handleSubmit(handlePromotionaryArticleSubmit)}
          className="mx-2 h-[500px] md:max-h-[700px] bg-custom-50 px-3 py-5 rounded-md overflow-hidden overflow-y-scroll"
          autoComplete="off"
          noValidate
        >
          <div className="sm:flex sm:gap-2">
            <div className="flex flex-col">
              <InputField
                label="Title"
                name="title"
                type="text"
                value={promotionaryArticle ? promotionaryArticle.title : ""}
                placeholder="Enter Title"
              />
              <InputField
                label="Priority"
                name="priority"
                type="text"
                value={
                  promotionaryArticle
                    ? promotionaryArticle.priority?.toString()
                    : ""
                }
                placeholder="Set Priority 0-9"
              />
              <InputField
                label="Website Link"
                name="websiteLink"
                type="text"
                value={
                  promotionaryArticle ? promotionaryArticle.websiteLink : ""
                }
                placeholder="Enter Website Link"
              />
              <div className="flex gap-2">
                <ToggleSwitch
                  label="Active"
                  name="active"
                  value={
                    promotionaryArticle ? promotionaryArticle.active! : true
                  }
                />
                <ToggleSwitch
                  label="Set As Banner"
                  name="setAsBanner"
                  value={
                    promotionaryArticle
                      ? promotionaryArticle.setAsBanner!
                      : true
                  }
                />
              </div>
            </div>
            <div className="flex flex-col">
              <InputField
                label="WhatsApp Link"
                name="whatsAppLink"
                type="text"
                value={
                  promotionaryArticle ? promotionaryArticle.whatsAppLink : ""
                }
                placeholder="Enter WhatsApp Link"
              />
              <InputField
                label="Instagram Link"
                name="instagramLink"
                type="text"
                value={
                  promotionaryArticle ? promotionaryArticle.instagramLink : ""
                }
                placeholder="Enter Instagram Link"
              />
              <InputField
                label="Address"
                name="address"
                type="text"
                value={promotionaryArticle ? promotionaryArticle.address : ""}
                placeholder="Enter Address"
              />
              <InputField
                label="Contact Details"
                name="contact"
                type="type"
                value={promotionaryArticle ? promotionaryArticle.contact : ""}
                placeholder="Enter Contact Details"
              />
            </div>
          </div>
          <ContentField
            label="Content"
            name="content"
            value={promotionaryArticle ? promotionaryArticle.content : ""}
            placeholder="Enter content"
          />
          {promotionaryArticle && (
            <>
              <div className="text-[10px] text-custom-800 font-bold">
                Already Uploaded File
              </div>
              <div className="flex flex-wrap justify-start gap-2 mb-6">
                <MediaCard
                  key={promotionaryArticle.media!.id}
                  name={promotionaryArticle.title!}
                  url={promotionaryArticle.media!.key}
                  type={promotionaryArticle.media!.type}
                />
              </div>
            </>
          )}
          <MediaInputField
            label="Promotionary Article Media"
            name="media"
            multiple={false}
          />
          <SubmitButton
            isLoading={isLoading || isUpdatePromotionaryArticleLoading}
            label={buttonLabel}
          />
        </form>
      </FormProvider>
    </>
  );
};

export default PromotionaryArticleForm;
