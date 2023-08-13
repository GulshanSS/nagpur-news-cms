import { useLocation, useNavigate } from "react-router-dom";
import ArticleForm from "../components/Forms/Article/ArticleForm";
import {
  CreateArticleSchema,
  UpdateArticleSchema,
} from "../validationSchema/ArticleSchema";

import { IoIosArrowBack } from "react-icons/io";

const CreateArticlePage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <>
      <div className="my-20 flex flex-col justify-center items-center">
        <div className="px-5 md:px-2 w-full md:w-[600px] flex md:justify-start">
          <button
            className="flex justify-center items-center font-bold text-custom-50 bg-custom-800 rounded-md px-2.5 py-1.5"
            onClick={() => navigate("/article")}
          >
            <span className="text-lg">
              <IoIosArrowBack />
            </span>
            <span className="hidden md:inline text-sm">Back</span>
          </button>
        </div>
        <ArticleForm
          buttonLabel={location.state.article ? "Update & Publish" : "Publish"}
          actionButtonLabel={
            location.state.article ? "Update & Save As Draft" : "Save As Draft"
          }
          schema={
            location.state.article ? UpdateArticleSchema : CreateArticleSchema
          }
          article={location.state.article || undefined}
        />
      </div>
    </>
  );
};

export default CreateArticlePage;
