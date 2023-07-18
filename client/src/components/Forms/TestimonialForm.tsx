import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import InputField from "../FormComponents/InputField";
import ToggleSwitch from "../FormComponents/ToggleSwitch";
import SubmitButton from "../FormComponents/SubmitButton";
import ImageInputField from "../FormComponents/ImageInputField";
import { toast } from "react-toastify";
import { APIErrorResponse, Testimonial } from "../../redux/api/types";
import {
  useCreateTestimonialMutation,
  useUpdateTestimonialMutation,
} from "../../redux/api/testimonialApi";
import ImageCard from "../ImageCard";
import { TypeOf, ZodSchema } from "zod";

type Props = {
  buttonLabel: string;
  testimonial?: Partial<Testimonial>;
  schema: ZodSchema;
};

const TestimonialForm = ({ buttonLabel, testimonial, schema }: Props) => {
  type SchemaType = TypeOf<typeof schema>;

  const methods = useForm<SchemaType>({
    resolver: zodResolver(schema),
  });

  const {
    handleSubmit,
    reset,
    formState: { isSubmitSuccessful },
  } = methods;

  const [createTestimonial, { isLoading, isSuccess, isError, error }] =
    useCreateTestimonialMutation();

  const [updateTestimonial] = useUpdateTestimonialMutation();

  useEffect(() => {
    if (isSuccess) {
      toast.success("Testimonial created successfully");
    }

    if (isError) {
      toast.error((error as APIErrorResponse).data.message);
    }
  }, [isLoading]);

  const handleTestimonialSubmit = (values: SchemaType) => {
    if (testimonial) {
      updateTestimonial({
        ...values,
        testimonialId: testimonial.id,
        mediaId: testimonial.media?.id,
      });
    } else {
      createTestimonial(values);
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
