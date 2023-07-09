import { FormProvider, useForm } from "react-hook-form";
import {
  ResetPasswordInput,
  ResetPasswordSchema,
} from "../../validationSchema/ResetPasswordSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import InputField from "../FormComponents/InputField";
import SubmitButton from "../FormComponents/SubmitButton";
import { useResetPasswordMutation } from "../../redux/api/userApi";
import { toast } from "react-toastify";
import { APIErrorResponse } from "../../redux/api/types";
import { TiTick } from "react-icons/ti";

const ResetPasswordForm = () => {
  const methods = useForm<ResetPasswordInput>({
    resolver: zodResolver(ResetPasswordSchema),
  });

  const {
    handleSubmit,
    reset,
    formState: { isSubmitSuccessful },
  } = methods;

  const [resetPassword, { data, isLoading, isSuccess, error, isError }] =
    useResetPasswordMutation();

  useEffect(() => {
    if (isSuccess) {
      toast.success("Password reset successfully");
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

  const handleResetPasswordSubmit = (values: ResetPasswordInput) => {
    resetPassword(values);
  };

  return (
    <>
      <div className="w-80 md:w-96 mx-2 bg-slate-200 px-3 py-5 rounded-md">
        {data?.success ? (
          <div className="flex flex-col justify-center items-center">
            <div className="w-20 h-20 flex justify-center items-center bg-green-500 text-white rounded-full text-6xl mb-6">
              <TiTick />
            </div>
            <span>Password Reset Successfully</span>
          </div>
        ) : (
          <FormProvider {...methods}>
            <form
              onSubmit={handleSubmit(handleResetPasswordSubmit)}
              noValidate
              autoComplete="off"
            >
              <InputField
                label="Password"
                name="password"
                type="password"
                placeholder="Enter password"
              />
              <InputField
                label="Confirm Password"
                name="confirmPassword"
                type="password"
                placeholder="Enter Confirm Password"
              />
              <SubmitButton label="Reset" />
            </form>
          </FormProvider>
        )}
      </div>
    </>
  );
};

export default ResetPasswordForm;
