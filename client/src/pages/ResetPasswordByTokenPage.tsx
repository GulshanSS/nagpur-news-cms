import { useLocation } from "react-router-dom";
import ResetPasswordForm from "../components/Forms/ResetPasswordForm";

const ResetPasswordByTokenPage = () => {
  const location = useLocation();

  const token = new URLSearchParams(location.search).get("token");

  return (
    <>
      <div className="w-screen h-screen flex flex-col justify-center items-center">
        <ResetPasswordForm bg={false} token={token!} />
      </div>
    </>
  );
};

export default ResetPasswordByTokenPage;