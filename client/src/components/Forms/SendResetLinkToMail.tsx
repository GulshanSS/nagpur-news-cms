import { FormProvider, useForm } from "react-hook-form";
import InputField from "../FormComponents/InputField";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { EmailInput, EmailSchema } from "../../validationSchema/EmailSchema";
import SubmitButton from "../FormComponents/SubmitButton";
import { useSendResetPasswordLinkMutation } from "../../redux/api/authApi";
import { toast } from "react-toastify";
import { APIErrorResponse } from "../../redux/api/types";
import Spinner from "../Spinner";
import { TiTick } from "react-icons/ti";

const SendResetLinkToMail = () => {
  const methods = useForm<EmailInput>({
    resolver: zodResolver(EmailSchema),
  });

  const {
    handleSubmit,
    reset,
    formState: { isSubmitSuccessful },
  } = methods;

  const [sendResetPasswordLink, { isLoading, isSuccess, isError, error }] =
    useSendResetPasswordLinkMutation();

  useEffect(() => {
    if (isSuccess) {
      toast.success("Password Reset Link sent to registered email");
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

  const handleSendResetLinkToEmailSubmit = (values: EmailInput) => {
    sendResetPasswordLink(values);
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      {isSuccess ? (
        <div className="flex flex-col justify-center items-center">
          <div className="w-20 h-20 flex justify-center items-center bg-green-500 text-white rounded-full text-6xl mb-6">
            <TiTick />
          </div>
          <span>Password reset link sent to registered email</span>
        </div>
      ) : (
        <>
          <FormProvider {...methods}>
            <h3 className="font-bold text-2xl mb-6 text-clip">
              Get Password Reset Link
            </h3>
            <form
              onSubmit={handleSubmit(handleSendResetLinkToEmailSubmit)}
              className="w-80 mx-2"
            >
              <InputField
                label="Email"
                name="email"
                type="email"
                placeholder="Enter Registered Email"
              />
              <SubmitButton label="Send" />
            </form>
          </FormProvider>
        </>
      )}
    </>
  );
};

export default SendResetLinkToMail;
