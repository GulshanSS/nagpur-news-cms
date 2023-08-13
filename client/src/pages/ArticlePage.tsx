import { useState } from "react";
import PageNav from "../components/PageNav";
import AddResourceButton from "../components/AddResourceButton";
import DisplayAllArticle from "../components/Article/DisplayAllArticle";

const ArticlePage = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
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
          <DisplayAllArticle searchQuery={searchQuery} />
        </div>
        <AddResourceButton
          navigateToDifferentPage={true}
          navigateTo="/article/create"
        />
      </>
    </>
  );
};

export default ArticlePage;
