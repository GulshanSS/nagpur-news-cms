import { FormProvider, useForm } from "react-hook-form";
import {
  CategoryInput,
  CategorySchema,
} from "../../validationSchema/CategorySchema";
import { zodResolver } from "@hookform/resolvers/zod";
import InputField from "../FormComponents/InputField";
import ToggleSwitch from "../FormComponents/ToggleSwitch";
import SubmitButton from "../FormComponents/SubmitButton";
import { useEffect } from "react";
import {
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
} from "../../redux/api/categoryApi";
import { toast } from "react-toastify";
import { APIErrorResponse, Category } from "../../redux/api/types";

type Props = {
  buttonLabel: string;
  category?: Partial<Category>;
};

const CategoryForm = ({ buttonLabel, category }: Props) => {
  const methods = useForm<CategoryInput>({
    resolver: zodResolver(CategorySchema),
  });

  const {
    handleSubmit,
    reset,
    formState: { isSubmitSuccessful },
  } = methods;

  const [createCategory, { isLoading, isSuccess, error, isError }] =
    useCreateCategoryMutation();

  const [updateCategory] = useUpdateCategoryMutation();

  useEffect(() => {
    if (isSuccess) {
      toast.success("Category Created Successfully");
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

  const handleCategorySubmit = (values: CategoryInput) => {
    if (category !== undefined && category.id) {
      updateCategory({ id: category.id, ...values });
    } else {
      createCategory(values);
    }
  };

  return (
    <>
      <FormProvider {...methods}>
        <form
          className="w-80 md:w-96 mx-2 bg-slate-200 px-3 py-5 rounded-md"
          onSubmit={handleSubmit(handleCategorySubmit)}
          noValidate
          autoComplete="off"
        >
          <InputField
            label="Name"
            name="name"
            type="text"
            value={category ? category.name : ""}
            placeholder="Enter Category Name"
          />
          <ToggleSwitch
            value={category ? category.active! : true}
            name="active"
            label="Active"
          />
          <SubmitButton label={buttonLabel} />
        </form>
      </FormProvider>
    </>
  );
};

export default CategoryForm;
