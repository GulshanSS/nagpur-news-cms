import { APIErrorResponse, User } from "../../redux/api/types";
import { useDebounce } from "usehooks-ts";
import Spinner from "../Spinner";
import {
  useGetAllUsersQuery,
  useGetUsersByNameQuery,
} from "../../redux/api/userApi";
import UserCard from "./UserCard";
import { useState } from "react";
import Pagination from "../Pagination";

type Props = {
  searchQuery: string;
};

const DisplayAllUser = ({ searchQuery }: Props) => {
  const [page, setPage] = useState<number>(1);
  const [searchPage, setSearchPage] = useState<number>(1);

  const debouncedSearchQuery = useDebounce(searchQuery, 500);

  const {
    data: userResult,
    isLoading: userLoading,
    isFetching: userFetching,
    error: userError,
    isError: isUserError,
  } = useGetAllUsersQuery(page);

  const {
    data: userByNameResult,
    isLoading: userByNameLoading,
    isFetching: userByNameFetching,
    error: userByNameError,
    isError: isUserByNameError,
  } = useGetUsersByNameQuery(
    { name: debouncedSearchQuery, page: searchPage },
    {
      skip: debouncedSearchQuery === "",
    }
  );

  if (isUserError || isUserByNameError) {
    return (
      <div className="flex justify-center items-center bg-red-100 py-2">
        <span className="text-red-500 font-bold">
          {(
            (userError as APIErrorResponse) ||
            (userByNameError as APIErrorResponse)
          ).data.message || "Please enter valid search term"}
        </span>
      </div>
    );
  }

  return (
    <>
      {userLoading ||
      userFetching ||
      userByNameLoading ||
      userByNameFetching ? (
        <Spinner />
      ) : (
        <>
          <Pagination
            page={
              userByNameResult !== undefined && searchQuery !== ""
                ? searchPage
                : page
            }
            pages={
              userByNameResult !== undefined && searchQuery !== ""
                ? userByNameResult!.pages
                : userResult!.pages
            }
            changePage={
              userByNameResult !== undefined && searchQuery !== ""
                ? setSearchPage
                : setPage
            }
          />
          <div className="flex flex-wrap justify-center md:justify-start p-2 gap-2">
            {userByNameResult !== undefined && searchQuery !== ""
              ? userByNameResult?.users.map((user: User) => (
                  <UserCard key={user.id} user={user} />
                ))
              : userResult?.users.map((user: User) => (
                  <UserCard key={user.id} user={user} />
                ))}
          </div>
        </>
      )}
    </>
  );
};

export default DisplayAllUser;
