import { FormProvider, useForm } from "react-hook-form";
import InputField from "../FormComponents/InputField";
import SubmitButton from "../FormComponents/SubmitButton";
import { OTPInput, OTPSchema } from "../../validationSchema/OTPSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useContext, useEffect } from "react";
import {
  useSendOTPMutation,
  useVerifyOTPMutation,
} from "../../redux/api/authApi";
import { useLocation } from "react-router-dom";
import { VerifiedContext } from "../../context/VerifiedContext";
import { APIErrorResponse } from "../../redux/api/types";
import { toast } from "react-toastify";

const OTPForm = () => {
  const { verified, setVerified } = useContext(VerifiedContext);

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
      setVerified(true);
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

  useEffect(() => {
    sendOTP({ userId: location.state.userId });
  }, []);

  const handleVerifyOTP = (values: OTPInput) => {
    verifyOTP({ userId: location.state.userId, otp: values.otp });
  };

  return (
    <>
      <FormProvider {...methods}>
        <form
          onSubmit={handleSubmit(handleVerifyOTP)}
          className="w-80 mx-2 bg-inherit"
        >
          <InputField
            label="OTP"
            name="otp"
            type="text"
            placeholder="Enter OTP"
          />
          {location.state !== null && (
            <span className="flex justify-start font-bold text-[14px] text-green-600 mb-6">
              {location.state.message}
            </span>
          )}
          <SubmitButton isLoading={isLoading} label="Verify" />
        </form>
      </FormProvider>
    </>
  );
};

export default OTPForm;
