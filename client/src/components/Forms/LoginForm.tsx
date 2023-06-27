import InputField from "../FormComponents/InputField";
import SubmitButton from "../FormComponents/SubmitButton";

const LoginForm = () => {
  return (
    <>
      <form className="w-80 mx-2">
        <InputField
          label="Email"
          name="email"
          type="email"
          placeholder="example@org.xyz"
        />
        <InputField
          label="Password"
          name="password"
          type="password"
          placeholder="Enter Password"
        />
        <SubmitButton label="Login" />
      </form>
    </>
  );
};

export default LoginForm;
