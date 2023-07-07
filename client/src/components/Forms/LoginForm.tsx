import InputField from "../FormComponents/InputField";
import SubmitButton from "../FormComponents/SubmitButton";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginSchema, LoginInput } from "../../validationSchema/LoginSchema";
import { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useLoginUserMutation } from "../../redux/api/authApi";
import { useNavigate } from "react-router-dom";
import { OTPErrorResponse } from "../../redux/api/types";
import { toast } from "react-toastify";

const LoginForm = () => {
  const methods = useForm<LoginInput>({ resolver: zodResolver(LoginSchema) });

  const [loginUser, { isLoading, isSuccess, error, isError }] =
    useLoginUserMutation();

  const navigate = useNavigate();

  const {
    handleSubmit,
    reset,
    formState: { isSubmitSuccessful },
  } = methods;

  useEffect(() => {
    if (isSuccess) {
      toast.success("Login Successfully");
    }

    if (isError) {
      if ((error as OTPErrorResponse).data.userId !== undefined) {
        navigate("/verify-otp", {
          state: {
            userId: (error as OTPErrorResponse).data.userId,
            message: (error as OTPErrorResponse).data.message,
          },
        });
      }
      toast.error((error as OTPErrorResponse).data.message);
    }
  }, [isLoading]);

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  });

  const handleLogin = (values: LoginInput) => {
    loginUser(values);
  };

  return (
    <>
      <FormProvider {...methods}>
        <form
          className="w-80 mx-2"
          onSubmit={handleSubmit(handleLogin)}
          noValidate
          autoComplete="off"
        >
          <InputField
            label="Email"
            name="email"
            type="email"
            placeholder="example@org.xyz"
          />
          <InputField
            label="Password"
            name="password"
            type="password"
            placeholder="Enter Password"
          />
          <SubmitButton label="Login" />
        </form>
      </FormProvider>
    </>
  );
};

export default LoginForm;
