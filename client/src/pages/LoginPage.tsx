import LoginForm from "../components/Forms/LoginForm";
import Logo from "../assets/logo.jpg";

function LoginPage() {
  return (
    <>
      <div className="min-w-screen min-h-screen flex flex-col justify-center items-center bg-custom-50 p-2.5">
        <div className="bg-custom-50 px-2.5 py-6 rounded-2xl text-custom-50">
          <div className="flex justify-center">
            <img className="w-[100px] mb-12 md:mb-2 rounded-full" src={Logo} />
          </div>
          <LoginForm />
        </div>
      </div>
    </>
  );
}

export default LoginPage;
