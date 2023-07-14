import { useCookies } from "react-cookie";
import { userApi } from "../redux/api/userApi";
import Spinner from "./Spinner";

type Props = {
  children: JSX.Element;
};

const AuthMiddleware = ({ children }: Props) => {
  const [cookies] = useCookies(["logged_in"]);

  const { isLoading } = userApi.endpoints.getUser.useQuery(null, {
    skip: !cookies.logged_in,
  });


  if (isLoading) {
    return <Spinner />;
  }

  return children;
};

export default AuthMiddleware;
