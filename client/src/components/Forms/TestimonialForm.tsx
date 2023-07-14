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

const TestimonialForm = () => {
  const methods = useForm<TestimonialInput>({
    resolver: zodResolver(TestimonialSchema),
  });

  const {
    handleSubmit,
    reset,
    formState: { isSubmitSuccessful },
  } = methods;

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset;
    }
  });

  const handleTestimonialSubmit = (values: TestimonialInput) => {
    console.log(values);
  };

  return (
    <>
      <FormProvider {...methods}>
        <form
          onSubmit={handleSubmit(handleTestimonialSubmit)}
          className="w-80 mx-2"
        >
          <InputField
            label="Quote"
            name="quote"
            type="text"
            placeholder="Enter Quote"
          />
          <InputField
            label="Quoted By"
            name="quotedBy"
            type="text"
            placeholder="Enter Quoted By"
          />
          <ToggleSwitch label="Active" name="active" value={true} />
          <ImageInputField label="Testimonial Media" name="media" />
          <SubmitButton label="Post" />
        </form>
      </FormProvider>
    </>
  );
};

export default TestimonialForm;
