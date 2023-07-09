import { userApi } from "../../redux/api/userApi";

type Props = {
  children: JSX.Element;
};

const RequireAdmin = ({ children }: Props) => {
  const { isLoading, isFetching } = userApi.endpoints.getUser.useQuery(null, {
    skip: false,
  });

  const loading = isLoading || isFetching;

  const user = userApi.endpoints.getUser.useQueryState(null, {
    selectFromResult: ({ data }) => data!,
  });

  if (loading) {
    return (
      <>
        <div className="w-screen h-screen flex justify-center items-center">
          <h1>Loading</h1>
        </div>
      </>
    );
  }

  return <>{user.role === "ADMIN" ? children : null}</>;
};

export default RequireAdmin;
