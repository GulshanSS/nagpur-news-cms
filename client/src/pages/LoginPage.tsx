import LoginForm from "../components/Forms/LoginForm";

function LoginPage() {
  return (
    <>
      <div className="w-screen h-screen flex flex-col justify-center items-center bg-[#FEF9D5]">
        <div className="bg-white bg-opacity-60 px-2.5 py-6 rounded-2xl shadow-md text-[#614E5C]">
          <h3 className="font-bold text-3xl mb-6 text-center">Login</h3>
          <LoginForm />
        </div>
      </div>
    </>
  );
}

export default LoginPage;
