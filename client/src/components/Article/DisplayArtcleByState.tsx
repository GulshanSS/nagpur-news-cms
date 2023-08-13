import { useDebounce } from "usehooks-ts";
import {
  useGetArticleByStateAndTitleQuery,
  useGetArticleByStateQuery,
} from "../../redux/api/articleApi";
import { APIErrorResponse, Article } from "../../redux/api/types";
import Spinner from "../Spinner";
import ArticleCard from "./ArticleCard";

type Props = {
  searchQuery: string;
  state: string;
};

const DisplayArticleByState = ({ searchQuery, state }: Props) => {
  const debouncedSearchQuery = useDebounce(searchQuery, 500);

  const {
    data: articleStateResult,
    isLoading: isArticleStateLoading,
    isFetching: isArticleStateFetching,
    error: articleStateError,
    isError: isArticleStateError,
  } = useGetArticleByStateQuery(state);

  const {
    data: articleByStateAndTitleResult,
    isLoading: isArticleByStateAndTitleLoading,
    isFetching: isArticleByStateAndTitleFetching,
    error: articleByStateAndTitleError,
    isError: isArticleByStateAndTitleError,
  } = useGetArticleByStateAndTitleQuery(
    { state, title: debouncedSearchQuery },
    {
      skip: debouncedSearchQuery === "",
    }
  );

  if (isArticleStateError || isArticleByStateAndTitleError) {
    return (
      <div className="flex justify-center items-center bg-red-100 py-2">
        <span className="text-red-500 font-bold mx-2">
          {(
            (articleStateError as APIErrorResponse) ||
            (articleByStateAndTitleError as APIErrorResponse)
          ).data.message || "Please enter valid search term"}
        </span>
      </div>
    );
  }

  return (
    <>
      {(isArticleStateLoading ||
        isArticleStateFetching ||
        isArticleByStateAndTitleLoading ||
        isArticleByStateAndTitleFetching) && <Spinner />}
      <div className="flex flex-wrap justify-center md:justify-start p-2 gap-2">
        {articleByStateAndTitleResult !== undefined && searchQuery !== ""
          ? articleByStateAndTitleResult.articles.map((article: Article) => (
              <ArticleCard key={article.id} article={article} />
            ))
          : articleStateResult?.articles.map((article: Article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
      </div>
    </>
  );
};

export default DisplayArticleByState;
