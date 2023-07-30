import { FormProvider, useForm } from "react-hook-form";
import { UserInput, UserSchema } from "../../validationSchema/UserSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import InputField from "../FormComponents/InputField";
import ToggleSwitch from "../FormComponents/ToggleSwitch";
import SubmitButton from "../FormComponents/SubmitButton";
import { toast } from "react-toastify";
import { APIErrorResponse } from "../../redux/api/types";
import { useCreateUserMutation } from "../../redux/api/userApi";

type Props = {
  buttonLabel: string;
};

const UserForm = ({ buttonLabel }: Props) => {
  const methods = useForm<UserInput>({
    resolver: zodResolver(UserSchema),
  });

  const {
    handleSubmit,
    reset,
    formState: { isSubmitSuccessful },
  } = methods;

  const [createUser, { isLoading, isSuccess, error, isError }] =
    useCreateUserMutation();

  useEffect(() => {
    if (isSuccess) {
      toast.success("User Created Successfully");
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

  const handleUserSubmit = (values: UserInput) => {
    createUser(values);
  };

  return (
    <>
      <FormProvider {...methods}>
        <form
          className="w-80 md:w-96 mx-2 bg-custom-50 px-3 py-5 rounded-md"
          onSubmit={handleSubmit(handleUserSubmit)}
          noValidate
          autoComplete="off"
        >
          <InputField
            label="Name"
            name="name"
            type="text"
            placeholder="Enter Full Name"
          />
          <InputField
            label="Email"
            name="email"
            type="email"
            placeholder="Enter Email"
          />
          <ToggleSwitch value={false} name="setAsAdmin" label="Admin" />
          <ToggleSwitch value={true} name="active" label="Active" />
          <SubmitButton isLoading={isLoading} label={buttonLabel} />
        </form>
      </FormProvider>
    </>
  );
};

export default UserForm;
