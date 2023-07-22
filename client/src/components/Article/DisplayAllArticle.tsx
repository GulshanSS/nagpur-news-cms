import { useDebounce } from "usehooks-ts";
import {
  useGetAllArticleQuery,
  useGetArticleByTitleQuery,
} from "../../redux/api/articleApi";
import Spinner from "../Spinner";
import { APIErrorResponse, Article } from "../../redux/api/types";
import ArticleCard from "./ArticleCard";

type Props = {
  searchQuery: string;
};

const DisplayAllArticle = ({ searchQuery }: Props) => {
  const debouncedSearchQuery = useDebounce(searchQuery, 500);

  const {
    data: articleResult,
    isLoading: isArticleLoading,
    isFetching: isArticleFetching,
    error: articleError,
    isError: isArticleError,
  } = useGetAllArticleQuery();

  const {
    data: articleByTitleResult,
    isLoading: isArticleByTitleLoading,
    isFetching: isArticleByTitleFetching,
    error: articleByTitleError,
    isError: isArticleByTitleError,
  } = useGetArticleByTitleQuery(debouncedSearchQuery, {
    skip: debouncedSearchQuery === "",
  });

  if (
    isArticleLoading ||
    isArticleFetching ||
    isArticleByTitleLoading ||
    isArticleByTitleFetching
  ) {
    return <Spinner />;
  }

  if (isArticleError || isArticleByTitleError) {
    return (
      <div className="flex justify-center items-center bg-red-100 py-2">
        <span className="text-red-500 font-bold">
          {
            (
              (articleError as APIErrorResponse) ||
              (articleByTitleError as APIErrorResponse)
            ).data.message
          }
        </span>
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-wrap justify-center md:justify-start p-2 gap-2">
        {articleByTitleResult !== undefined && searchQuery !== ""
          ? articleByTitleResult.articles.map((article: Article) => (
              <ArticleCard key={article.id} article={article} />
            ))
          : articleResult?.articles.map((article: Article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
      </div>
    </>
  );
};

export default DisplayAllArticle;
