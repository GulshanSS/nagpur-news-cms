import { FormProvider, useForm } from "react-hook-form";
import InputField from "../FormComponents/InputField";
import ToggleSwitch from "../FormComponents/ToggleSwitch";
import SubmitButton from "../FormComponents/SubmitButton";
import { TagInput, TagSchema } from "../../validationSchema/TagSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { APIErrorResponse, Tag } from "../../redux/api/types";
import {
  useCreateTagMutation,
  useUpdateTagMutation,
} from "../../redux/api/tagApi";
import { toast } from "react-toastify";

type Props = {
  buttonLabel: string;
  tag?: Partial<Tag>;
};

const TagForm = ({ buttonLabel, tag }: Props) => {
  const methods = useForm<TagInput>({ resolver: zodResolver(TagSchema) });

  const {
    handleSubmit,
    reset,
    formState: { isSubmitSuccessful },
  } = methods;

  const [createTag, { isLoading, isSuccess, error, isError }] =
    useCreateTagMutation();

  const [updateTag] = useUpdateTagMutation();

  useEffect(() => {
    if (isSuccess) {
      toast.success("Tag Created Successfully");
    }

    if (isError) {
      toast.error((error as APIErrorResponse).data.message);
    }
  }, [isLoading]);

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  });

  const handleTagSubmit = (values: TagInput) => {
    if (tag !== undefined && tag.id) {
      updateTag({ id: tag.id, ...values });
    } else {
      createTag(values);
    }
  };

  return (
    <>
      <FormProvider {...methods}>
        <form
          className="w-80 md:w-96 mx-2 bg-custom-50 px-3 py-5 rounded-md"
          onSubmit={handleSubmit(handleTagSubmit)}
          noValidate
          autoComplete="off"
        >
          <InputField
            label="Name"
            name="name"
            type="text"
            value={tag ? tag.name : ""}
            placeholder="Enter Tag Name"
          />
          <ToggleSwitch
            value={tag ? tag.setAsCategory! : true}
            name="setAsCategory"
            label="Set As Category"
          />
          <ToggleSwitch
            value={tag ? tag.active! : true}
            name="active"
            label="Active"
          />
          <SubmitButton label={buttonLabel} />
        </form>
      </FormProvider>
    </>
  );
};

export default TagForm;
