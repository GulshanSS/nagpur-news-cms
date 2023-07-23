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

  if (isLoading || isFetching) {
    return <Spinner />;
  }

  if (isError) {
    return (
      <div className="flex justify-center items-center bg-red-100 py-2">
        <span className="text-red-500 font-bold">
          {(error as APIErrorResponse).data.message}
        </span>
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-wrap justify-center md:justify-start p-2 gap-2">
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