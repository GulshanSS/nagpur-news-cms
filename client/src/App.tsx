import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import LoginPage from "./pages/LoginPage";
import OTPPage from "./pages/OTPPage";
import CategoryPage from "./pages/CategoryPage";
import TagPage from "./pages/TagPage";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import Layout from "./layout/Layout";
import UserPage from "./pages/UserPage";
import MePage from "./pages/MePage";
import UnAuthorizedPage from "./pages/UnAuthorizedPage";
import RequireUser from "./components/Auth/RequireUser";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import ResetPasswordByTokenPage from "./pages/ResetPasswordByTokenPage";
import TestimonialPage from "./pages/TestimonialPage";
import PromotionaryArticlePage from "./pages/PromotionaryArticlePage";
import MainPage from "./pages/MainPage";
import ArticlePage from "./pages/ArticlePage";
import CreateArticlePage from "./pages/CreateArticlePage";
import ArticleStatePage from "./pages/ArticleStatePage";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route index element={<MainPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/verify-otp" element={<OTPPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route
            path="/reset-password"
            element={<ResetPasswordByTokenPage />}
          />
          <Route element={<RequireUser allowedRoles={["ADMIN", "TEAM"]} />}>
            <Route element={<Layout />}>
              <Route path="/me" element={<MePage />} />
              <Route path="/category" element={<CategoryPage />} />
              <Route path="/tag" element={<TagPage />} />
              <Route path="/testimonial" element={<TestimonialPage />} />
              <Route
                path="/promotionary-article"
                element={<PromotionaryArticlePage />}
              />
              <Route path="/article" element={<ArticlePage />} />
              <Route path="/article/create" element={<CreateArticlePage />} />
              <Route path="/article/:state" element={<ArticleStatePage />} />
            </Route>
          </Route>
          <Route element={<RequireUser allowedRoles={["ADMIN"]} />}>
            <Route element={<Layout />}>
              <Route path="/user" element={<UserPage />} />
            </Route>
          </Route>
          <Route path="/unauthorized" element={<UnAuthorizedPage />} />
        </Routes>
      </BrowserRouter>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
}

export default App;
