import SendResetLinkToMail from "../components/Forms/SendResetLinkToMail";

const ForgotPasswordPage = () => {
  return (
    <>
      <div className="w-screen h-screen flex flex-col justify-center items-center">
        <SendResetLinkToMail />
      </div>
    </>
  );
};

export default ForgotPasswordPage;
