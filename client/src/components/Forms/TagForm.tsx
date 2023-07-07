import { FormProvider, useForm } from "react-hook-form";
import InputField from "../FormComponents/InputField";
import ToggleSwitch from "../FormComponents/ToggleSwitch";
import SubmitButton from "../FormComponents/SubmitButton";
import { TagInput, TagSchema } from "../../validationSchema/TagSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";

const TagForm = () => {
  const methods = useForm<TagInput>({ resolver: zodResolver(TagSchema) });

  const {
    handleSubmit,
    reset,
    formState: { isSubmitSuccessful },
  } = methods;

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  });

  const handleTagSubmit = (values: TagInput) => {
    console.log(values);
  };

  return (
    <>
      <FormProvider {...methods}>
        <form
          className="w-80 mx-2"
          onSubmit={handleSubmit(handleTagSubmit)}
          noValidate
          autoComplete="off"
        >
          <InputField
            label="Name"
            name="name"
            type="text"
            placeholder="Enter Tag Name"
          />
          <ToggleSwitch value={true} name="active" label="Active" />
          <SubmitButton label="Create" />
        </form>
      </FormProvider>
    </>
  );
};

export default TagForm;
