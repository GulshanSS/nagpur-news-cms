import LoginForm from "../components/Forms/LoginForm";

function LoginPage() {
  return (
    <>
      <div className="w-screen h-screen flex flex-col justify-center items-center">
        <h3 className="font-bold text-2xl mb-6">Admin Panel</h3>
        <LoginForm />
      </div>
    </>
  );
}

export default LoginPage;
