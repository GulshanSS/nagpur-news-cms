import { useState } from "react";
import OTPForm from "../components/Forms/OTPForm";
import { MdVerifiedUser } from "react-icons/md";
import { VerifiedContext } from "../context/VerifiedContext";
import LinkButton from "../components/LinkButton";

function OTPPage() {
  const [verified, setVerified] = useState<boolean>(false);
  return (
    <>
      <div className="w-screen h-screen flex flex-col justify-center items-center bg-custom-100">
        <VerifiedContext.Provider value={{ verified, setVerified }}>
          {verified ? (
            <>
              <div className="w-80 flex flex-col justify-center items-center m-2 font-bold">
                <span className="text-green-500 text-8xl">
                  <MdVerifiedUser />
                </span>
                <h1 className="text-xl">Account Verified</h1>
                <LinkButton to="/login" label="Back to Login" />
              </div>
            </>
          ) : (
            <>
              <div className="bg-custom-800 px-2.5 py-6 rounded-2xl shadow-md text-custom-100">
                <h3 className="font-bold text-2xl text-center mb-6">
                  OTP Verfication
                </h3>
                <OTPForm />
              </div>
            </>
          )}
        </VerifiedContext.Provider>
      </div>
    </>
  );
}

export default OTPPage;
