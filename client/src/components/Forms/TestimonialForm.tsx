import { FormProvider, useForm } from "react-hook-form";
import {
  TestimonialInput,
  TestimonialSchema,
} from "../../validationSchema/TestimonialSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import InputField from "../FormComponents/InputField";
import ToggleSwitch from "../FormComponents/ToggleSwitch";
import SubmitButton from "../FormComponents/SubmitButton";
import ImageInputField from "../FormComponents/ImageInputField";
import { useUploadSingleFileMutation } from "../../redux/api/fileUploadApi";
import { toast } from "react-toastify";
import { APIErrorResponse, Testimonial } from "../../redux/api/types";
import { useCreateTestimonialMutation } from "../../redux/api/testimonialApi";
import ImageCard from "../ImageCard";

type Props = {
  buttonLabel: string;
  testimonial?: Partial<Testimonial>;
};

const TestimonialForm = ({ buttonLabel, testimonial }: Props) => {
  const methods = useForm<TestimonialInput>({
    resolver: zodResolver(TestimonialSchema),
  });

  const { handleSubmit, reset, getValues } = methods;

  const [
    uploadSingleFile,
    {
      isLoading: isMediaUploadLoading,
      isSuccess: isMediaUploadSuccess,
      data: mediaData,
      isError: isMediaUploadError,
      error: mediaError,
    },
  ] = useUploadSingleFileMutation();

  const [
    createTestimonial,
    {
      isLoading: isTestimonialLoading,
      isSuccess: isTestimonialSuccess,
      data: testimonialData,
      isError: isTestimonialError,
      error: testimonialError,
    },
  ] = useCreateTestimonialMutation();

  useEffect(() => {
    if (isTestimonialSuccess) {
      toast.success(testimonialData?.message);
      reset();
    }

    if (isTestimonialError) {
      toast.error((testimonialError as APIErrorResponse).data.message);
    }
  }, [isTestimonialLoading]);

  useEffect(() => {
    if (isMediaUploadSuccess) {
      const { media, ...rest } = getValues();
      createTestimonial({ ...rest, mediaId: mediaData?.media.id! });
    }

    if (isMediaUploadError) {
      toast.error((mediaError as APIErrorResponse).data.message);
    }
  }, [isMediaUploadLoading]);

  const handleTestimonialSubmit = (values: TestimonialInput) => {
    const formData = new FormData();
    if (values.media?.length! > 0) {
      values.media?.forEach((media) => formData.append("file", media));
    }
    uploadSingleFile(formData);
  };

  return (
    <>
      <FormProvider {...methods}>
        <form
          onSubmit={handleSubmit(handleTestimonialSubmit)}
          className="w-80 md:w-96 mx-2 bg-slate-200 px-3 py-5 rounded-md"
          autoComplete="off"
          noValidate
        >
          <InputField
            label="Quote"
            name="quote"
            type="text"
            value={testimonial ? testimonial.quote : ""}
            placeholder="Enter Quote"
          />
          <InputField
            label="Quoted By"
            name="quotedBy"
            type="text"
            value={testimonial ? testimonial.quotedBy : ""}
            placeholder="Enter Quoted By"
          />
          <InputField
            label="Designation"
            name="designation"
            type="text"
            value={testimonial ? testimonial.designation : ""}
            placeholder="Enter Designation"
          />
          <ToggleSwitch
            label="Active"
            name="active"
            value={testimonial ? testimonial.active! : true}
          />
          {testimonial && (
            <>
              <div className="text-[10px]">Already Uploaded File</div>
              <div className="flex flex-wrap justify-start gap-2 mb-6">
                <ImageCard
                  key={testimonial.media?.id}
                  name={testimonial.quotedBy!}
                  url={testimonial.media?.key!}
                />
              </div>
            </>
          )}
          <ImageInputField label="Testimonial Media" name="media" />
          <SubmitButton label={buttonLabel} />
        </form>
      </FormProvider>
    </>
  );
};

export default TestimonialForm;
