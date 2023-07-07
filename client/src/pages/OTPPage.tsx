import { useState } from "react";
import OTPForm from "../components/Forms/OTPForm";
import { MdVerifiedUser } from "react-icons/md";
import { VerifiedContext } from "../context/VerifiedContext";
import LinkButton from "../components/LinkButton";

function OTPPage() {
  const [verified, setVerified] = useState<boolean>(false);
  return (
    <>
      <div className="w-screen h-screen flex flex-col justify-center items-center">
        <VerifiedContext.Provider value={{ verified, setVerified }}>
          {verified ? (
            <>
              <div className="w-80 flex flex-col justify-center items-center m-2 font-bold">
                <span className="text-green-600 text-8xl">
                  <MdVerifiedUser />
                </span>
                <h1 className="text-xl">Account Verified</h1>
                <LinkButton to="/login" label="Back to Login" />
              </div>
            </>
          ) : (
            <>
              <h3 className="font-bold text-2xl mb-6">OTP Verfication</h3>
              <OTPForm />
            </>
          )}
        </VerifiedContext.Provider>
      </div>
    </>
  );
}

export default OTPPage;
