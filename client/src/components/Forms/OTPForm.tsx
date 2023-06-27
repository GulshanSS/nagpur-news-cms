import InputField from "../FormComponents/InputField";
import SubmitButton from "../FormComponents/SubmitButton";

const OTPForm = () => {
  return (
    <>
      <form className="w-80 mx-2">
        <InputField
          label="OTP"
          name="otp"
          type="text"
          placeholder="Enter OTP"
        />
        <SubmitButton label="Verify" />
      </form>
    </>
  );
};

export default OTPForm;
