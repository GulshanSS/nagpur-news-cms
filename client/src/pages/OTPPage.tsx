import OTPForm from "../components/Forms/OTPForm";

function OTPPage() {
  return (
    <>
      <div className="w-screen h-screen flex flex-col justify-center items-center">
        <h3 className="font-bold text-2xl mb-6">OTP Verfication</h3>
        <OTPForm />
      </div>
    </>
  );
}

export default OTPPage;
