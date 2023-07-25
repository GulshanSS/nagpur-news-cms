import { APIErrorResponse, Tag } from "../../redux/api/types";
import { useDebounce } from "usehooks-ts";
import Spinner from "../Spinner";
import {
  useGetAllTagsQuery,
  useGetTagByNameQuery,
} from "../../redux/api/tagApi";
import TagCard from "./TagCard";

type Props = {
  searchQuery: string;
};

const DisplayAllTag = ({ searchQuery }: Props) => {
  const debouncedSearchQuery = useDebounce(searchQuery, 500);

  const {
    data: tagResult,
    isLoading: tagLoading,
    isFetching: tagFetching,
    error: tagError,
    isError: isTagError,
  } = useGetAllTagsQuery();

  const {
    data: tagByNameResult,
    isLoading: tagByNameLoading,
    isFetching: tagByNameFetching,
    error: tagByNameError,
    isError: isTagByNameError,
  } = useGetTagByNameQuery(debouncedSearchQuery, {
    skip: debouncedSearchQuery === "",
  });

  if (tagLoading || tagFetching || tagByNameLoading || tagByNameFetching) {
    return <Spinner />;
  }

  if (isTagError || isTagByNameError) {
    return (
      <div className="flex justify-center items-center bg-red-100 py-2">
        <span className="text-red-500 font-bold">
          {(
            (tagError as APIErrorResponse) ||
            (tagByNameError as APIErrorResponse)
          ).data.message || "Please enter valid search term"}
        </span>
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-wrap justify-center md:justify-start p-2 gap-2">
        {tagByNameResult !== undefined && searchQuery !== ""
          ? tagByNameResult.tags.map((tag: Tag) => (
              <TagCard
                key={tag.id}
                id={tag.id}
                name={tag.name}
                setAsCategory={tag.setAsCategory}
                active={tag.active}
              />
            ))
          : tagResult?.tags.map((tag: Tag) => (
              <TagCard
                key={tag.id}
                id={tag.id}
                name={tag.name}
                setAsCategory={tag.setAsCategory}
                active={tag.active}
              />
            ))}
      </div>
    </>
  );
};

export default DisplayAllTag;
