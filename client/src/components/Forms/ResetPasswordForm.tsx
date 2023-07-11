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
import { useResetPasswordByTokenMutation } from "../../redux/api/authApi";
import LinkButton from "../LinkButton";
import { useSearchParams } from "react-router-dom";

type Props = {
  bg: boolean;
  token?: string;
};

const ResetPasswordForm = ({ bg, token }: Props) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const methods = useForm<ResetPasswordInput>({
    resolver: zodResolver(ResetPasswordSchema),
  });

  const {
    handleSubmit,
    reset,
    formState: { isSubmitSuccessful },
  } = methods;

  const [
    resetPassword,
    {
      data: resetPasswordResult,
      isLoading: isResetPasswordLoading,
      isSuccess: isResetPasswordSuccess,
      error: resetPasswordError,
      isError: isResetPasswordError,
    },
  ] = useResetPasswordMutation();

  const [
    resetPasswordByToken,
    {
      data: resetPasswordByTokenResult,
      isLoading: isResetPasswordByTokenLoading,
      isSuccess: isResetPasswordByTokenSuccess,
      error: resetPasswordByTokenError,
      isError: isResetPasswordByTokenError,
    },
  ] = useResetPasswordByTokenMutation();

  useEffect(() => {
    if (isResetPasswordSuccess || isResetPasswordByTokenSuccess) {
      if (token) {
        setSearchParams((params: any) => {
          params.delete("token");
          return params;
        });
      }
      toast.success(
        (resetPasswordResult || resetPasswordByTokenResult)?.message
      );
    }

    if (isResetPasswordError || isResetPasswordByTokenError) {
      toast.error(
        ((resetPasswordError || resetPasswordByTokenError) as APIErrorResponse)
          .data.message
      );
    }
  }, [isResetPasswordLoading, isResetPasswordByTokenLoading]);

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  });

  const handleResetPasswordSubmit = (values: ResetPasswordInput) => {
    if (token) {
      resetPasswordByToken({ token, ...values });
    } else {
      resetPassword(values);
    }
  };

  return (
    <>
      <div
        className={`w-80 md:w-96 mx-2 ${
          bg && "bg-slate-100"
        } px-3 py-5 rounded-md`}
      >
        {(resetPasswordByTokenResult || resetPasswordResult)?.success ? (
          <div className="flex flex-col justify-center items-center my-6">
            <div className="w-20 h-20 flex justify-center items-center bg-green-500 text-white rounded-full text-6xl mb-6">
              <TiTick />
            </div>
            <span>Password Reset Successfully</span>
            {resetPasswordByTokenResult && (
              <LinkButton to="/login" label="Back to Login" />
            )}
          </div>
        ) : (
          <FormProvider {...methods}>
            {token && (
              <h3 className="font-bold text-2xl mb-6">Reset Password</h3>
            )}
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
