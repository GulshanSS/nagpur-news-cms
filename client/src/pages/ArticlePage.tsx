import ArticleForm from "../components/Forms/Article/ArticleForm";

const ArticlePage = () => {
  return (
    <>
      <div className="w-screen h-screen flex flex-col justify-center items-center">
        <h3 className="font-bold text-2xl mb-6">Article</h3>
        <ArticleForm />
      </div>
    </>
  );
};

export default ArticlePage;
