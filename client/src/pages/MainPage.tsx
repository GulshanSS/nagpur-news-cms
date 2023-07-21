import Logo from "../assets/logo.jpg";
import LoginForm from "../components/Forms/LoginForm";

const MainPage = () => {
  return (
    <>
      <div className="w-screen h-screen flex flex-col flex-wrap items-center justify-center gap-2 bg-[#FEF9D5]">
        <img className="w-[150px]" src={Logo} />
        <LoginForm />
      </div>
    </>
  );
};

export default MainPage;
