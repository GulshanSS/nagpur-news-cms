import CategoryCard from "./CategoryCard";
import {
  useGetAllCategoriesQuery,
  useGetCategoryByNameQuery,
} from "../../redux/api/categoryApi";
import { APIErrorResponse, Category } from "../../redux/api/types";
import { useDebounce } from "usehooks-ts";
import Spinner from "../Spinner";

type Props = {
  searchQuery: string;
};

const DisplayAllCategory = ({ searchQuery }: Props) => {
  const debouncedSearchQuery = useDebounce(searchQuery, 500);

  const {
    data: categoryResult,
    isLoading: categoryLoading,
    isFetching: categoryFetching,
    error: categoryError,
    isError: isCategoryError,
  } = useGetAllCategoriesQuery();

  const {
    data: categoryByNameResult,
    isLoading: categoryByNameLoading,
    isFetching: categoryByNameFetching,
    error: categoryByNameError,
    isError: isCategoryByNameError,
  } = useGetCategoryByNameQuery(debouncedSearchQuery, {
    skip: debouncedSearchQuery === "",
  });

  if (
    categoryLoading ||
    categoryFetching ||
    categoryByNameLoading ||
    categoryByNameFetching
  ) {
    return <Spinner />;
  }

  if (isCategoryError || isCategoryByNameError) {
    return (
      <div className="flex justify-center items-center bg-red-100 py-2">
        <span className="text-red-500 font-bold">
          {
            (
              (categoryError as APIErrorResponse) ||
              (categoryByNameError as APIErrorResponse)
            ).data.message
          }
        </span>
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-wrap justify-center md:justify-start p-2 gap-2">
        {categoryByNameResult !== undefined && searchQuery !== ""
          ? categoryByNameResult.categories.map((category: Category) => (
              <CategoryCard
                key={category.id}
                id={category.id.toString()}
                name={category.name}
                active={category.active}
              />
            ))
          : categoryResult?.categories.map((category: Category) => (
              <CategoryCard
                key={category.id}
                id={category.id.toString()}
                name={category.name}
                active={category.active}
              />
            ))}
      </div>
    </>
  );
};

export default DisplayAllCategory;
