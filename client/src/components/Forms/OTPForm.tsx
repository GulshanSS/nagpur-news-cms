import { FormProvider, useForm } from "react-hook-form";
import InputField from "../FormComponents/InputField";
import SubmitButton from "../FormComponents/SubmitButton";
import { OTPInput, OTPSchema } from "../../validationSchema/OTPSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import {
  useSendOTPMutation,
  useVerifyOTPMutation,
} from "../../redux/api/authApi";
import { useLocation } from "react-router-dom";

const OTPForm = () => {
  const methods = useForm<OTPInput>({ resolver: zodResolver(OTPSchema) });

  const [sendOTP] = useSendOTPMutation();

  const [verifyOTP, { isLoading, isSuccess, error, isError }] =
    useVerifyOTPMutation();

  const location = useLocation();

  const {
    handleSubmit,
    reset,
    formState: { isSubmitSuccessful },
  } = methods;

  useEffect(() => {
    if (isSuccess) {
      console.log("Verified Successfully");
    }

    if (isError) {
      console.log(error);
    }
  }, [isLoading]);

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  });

  useEffect(() => {
    sendOTP({ userId: location.state.userId });
  }, []);

  const handleVerifyOTP = (values: OTPInput) => {
    verifyOTP({ userId: location.state.userId, otp: values.otp });
  };

  return (
    <>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(handleVerifyOTP)} className="w-80 mx-2">
          {location.state !== undefined && (
            <span className="flex justify-center font-bold text-sm text-white">
              {location.state.message}
            </span>
          )}
          <InputField
            label="OTP"
            name="otp"
            type="text"
            placeholder="Enter OTP"
          />
          <SubmitButton label="Verify" />
        </form>
      </FormProvider>
    </>
  );
};

export default OTPForm;
