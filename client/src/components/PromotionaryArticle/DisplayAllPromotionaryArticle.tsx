import { useDebounce } from "usehooks-ts";
import {
  useGetAllPromotionaryArticleQuery,
  useGetPromotionaryArticleByTitleQuery,
} from "../../redux/api/promotionaryArticleApi";
import Spinner from "../Spinner";
import { APIErrorResponse, PromotionaryArticle } from "../../redux/api/types";
import PromotionaryArticleCard from "./PromotionaryArticleCard";

type Props = {
  searchQuery: string;
};

const DisplayAllPromotionaryArticle = ({ searchQuery }: Props) => {
  const debouncedSearchQuery = useDebounce(searchQuery, 500);

  const {
    data: promotionaryArticleResult,
    isLoading: isPromotionaryArticleLoading,
    isFetching: isPromotionaryArticleFetching,
    error: promotionaryArticleError,
    isError: isPromotionaryArticleError,
  } = useGetAllPromotionaryArticleQuery();

  const {
    data: promotionaryArticleByTitleResult,
    isLoading: isPromotionaryArticleByTitleLoading,
    isFetching: isPromotionaryArticleByTitleFetching,
    error: promotionaryArticleByTitleError,
    isError: isPromotionaryArticleByTitleError,
  } = useGetPromotionaryArticleByTitleQuery(debouncedSearchQuery, {
    skip: debouncedSearchQuery === "",
  });

  if (
    isPromotionaryArticleLoading ||
    isPromotionaryArticleFetching ||
    isPromotionaryArticleByTitleLoading ||
    isPromotionaryArticleByTitleFetching
  ) {
    return <Spinner />;
  }

  if (isPromotionaryArticleError || isPromotionaryArticleByTitleError) {
    return (
      <div className="flex justify-center items-center bg-red-100 py-2">
        <span className="text-red-500 font-bold">
          {
            (
              (promotionaryArticleError as APIErrorResponse) ||
              (promotionaryArticleByTitleError as APIErrorResponse)
            ).data.message
          }
        </span>
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-wrap justify-center md:justify-start p-2 gap-2">
        {promotionaryArticleByTitleResult !== undefined && searchQuery !== ""
          ? promotionaryArticleByTitleResult.promotionaryArticles.map(
              (promotionaryArticle: PromotionaryArticle) => (
                <PromotionaryArticleCard
                  key={promotionaryArticle.id}
                  promotionaryArticle={promotionaryArticle}
                />
              )
            )
          : promotionaryArticleResult?.promotionaryArticles.map(
              (promotionaryArticle: PromotionaryArticle) => (
                <PromotionaryArticleCard
                  key={promotionaryArticle.id}
                  promotionaryArticle={promotionaryArticle}
                />
              )
            )}
      </div>
    </>
  );
};

export default DisplayAllPromotionaryArticle;
