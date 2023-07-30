import { useGetAllArticleSectionsForArticleQuery } from "../../redux/api/articleSectionApi";
import { APIErrorResponse, ArticleSection } from "../../redux/api/types";
import Spinner from "../Spinner";
import ArticleSectionCard from "./ArticleSectionCard";

type Props = {
  articleId: number;
};

const DisplayAllArticleSection = ({ articleId }: Props) => {
  const { data, isLoading, isFetching, error, isError } =
    useGetAllArticleSectionsForArticleQuery(articleId);

  if (isError) {
    return (
      <div className="w-full flex justify-center items-center bg-red-100 py-2">
        <span className="text-red-500 font-bold">
          {(error as APIErrorResponse).data.message}
        </span>
      </div>
    );
  }

  return (
    <>
      {(isLoading || isFetching) && <Spinner />}
      <div className="w-full flex flex-wrap justify-center gap-2 mb-6">
        {data?.articleSections &&
          data.articleSections.map((articleSection: ArticleSection) => (
            <ArticleSectionCard
              key={articleSection.id}
              articleSection={articleSection}
            />
          ))}
      </div>
    </>
  );
};

export default DisplayAllArticleSection;
