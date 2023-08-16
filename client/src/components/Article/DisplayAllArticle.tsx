import { useDebounce } from "usehooks-ts";
import {
  useGetAllArticleQuery,
  useGetArticleByTitleQuery,
} from "../../redux/api/articleApi";
import Spinner from "../Spinner";
import { APIErrorResponse, Article } from "../../redux/api/types";
import ArticleCard from "./ArticleCard";
import Pagination from "../Pagination";
import { useState } from "react";

type Props = {
  searchQuery: string;
};

const DisplayAllArticle = ({ searchQuery }: Props) => {
  const [page, setPage] = useState<number>(1);
  const [searchPage, setSearchPage] = useState<number>(1);

  const debouncedSearchQuery = useDebounce(searchQuery, 500);

  const {
    data: articleResult,
    isLoading: isArticleLoading,
    isFetching: isArticleFetching,
    error: articleError,
    isError: isArticleError,
  } = useGetAllArticleQuery(page);

  const {
    data: articleByTitleResult,
    isLoading: isArticleByTitleLoading,
    isFetching: isArticleByTitleFetching,
    error: articleByTitleError,
    isError: isArticleByTitleError,
  } = useGetArticleByTitleQuery(
    { title: debouncedSearchQuery, page: searchPage },
    {
      skip: debouncedSearchQuery === "",
    }
  );

  if (isArticleError || isArticleByTitleError) {
    return (
      <div className="flex justify-center items-center bg-red-100 py-2">
        <span className="text-red-500 font-bold">
          {(
            (articleError as APIErrorResponse) ||
            (articleByTitleError as APIErrorResponse)
          ).data.message || "Please enter valid search term"}
        </span>
      </div>
    );
  }

  return (
    <>
      {isArticleLoading ||
      isArticleFetching ||
      isArticleByTitleLoading ||
      isArticleByTitleFetching ? (
        <Spinner />
      ) : (
        <>
          <Pagination
            page={
              articleByTitleResult !== undefined && searchQuery !== ""
                ? searchPage
                : page
            }
            pages={
              articleByTitleResult !== undefined && searchQuery !== ""
                ? articleByTitleResult!.pages
                : articleResult!.pages
            }
            changePage={
              articleByTitleResult !== undefined && searchQuery !== ""
                ? setSearchPage
                : setPage
            }
          />
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
      )}
    </>
  );
};

export default DisplayAllArticle;
