import InputField from "../FormComponents/InputField";
import SubmitButton from "../FormComponents/SubmitButton";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginSchema, LoginInput } from "../../validationSchema/LoginSchema";
import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useLoginUserMutation } from "../../redux/api/authApi";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const [loginError, setLoginError] = useState<string>("");

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
      console.log("Login Successfull");
    }

    if (isError) {
      if (error?.data?.userId) {
        navigate("/verify-otp", {
          state: {
            userId: error?.data?.userId,
            message: error?.data?.message,
          },
        });
      }
      setLoginError(error?.data?.message);
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
          {loginError !== "" && (
            <span className="flex justify-center font-bold text-[10px] text-red-600 mb-6">
              {loginError}
            </span>
          )}
          <SubmitButton label="Login" />
        </form>
      </FormProvider>
    </>
  );
};

export default LoginForm;
