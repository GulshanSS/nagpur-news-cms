import { useState } from "react";
import PageNav from "../components/PageNav";
import AddResourceButton from "../components/AddResourceButton";
import { useParams } from "react-router-dom";
import DisplayArticleByState from "../components/Article/DisplayArtcleByState";

const ArticleStatePage = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");

  const { state } = useParams();
  return (
    <>
      <>
        <PageNav
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          navigateToDifferentPage={true}
          navigateTo="/article/create"
        />
        <div className="w-auto py-32">
          <DisplayArticleByState state={state!} searchQuery={searchQuery} />
        </div>
        <AddResourceButton
          navigateToDifferentPage={true}
          navigateTo="/article/create"
        />
      </>
    </>
  );
};

export default ArticleStatePage;
