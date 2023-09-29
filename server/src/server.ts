import express, { Request, Response } from "express";
import dotenv from "dotenv";
dotenv.config();

import config from "./config";
import logger from "./utils/logger";
import CategoryRouter from "./routes/category.routes";
import errorMiddlerware from "./middleware/errorMiddleware";
import AuthRouter from "./routes/auth.routes";
import cookieParser from "cookie-parser";
import cors from "cors";
import OtpRouter from "./routes/otp.routes";
import TagRouter from "./routes/tag.routes";
import createSuperAdmin from "./middleware/createSuperAdmin";
import UserRouter from "./routes/user.routes";
import TestimonialRouter from "./routes/testimonial.routes";
import MediaRouter from "./routes/media.routes";
import PromotionaryArticleRouter from "./routes/promotionaryArticle.routes";
import ArticleRouter from "./routes/article.routes";
import ArticleSectionRouter from "./routes/articleSection.routes";
import PublicCategoryRouter from "./public/category/category.routes";
import PublicTagRouter from "./public/tag/tag.routes";
import PublicArticleRouter from "./public/article/article.routes";
import PublicTestimonialRouter from "./public/testimonial/testimonial.route";
import PublicPromotionaryArticleRouter from "./public/promotionaryArticle/promotionaryArticle.routes";

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    credentials: true,
    origin: true,
  })
);

app.get("/test", (_: Request, res: Response) => {
  res.send("Nagpur News API");
});

app.use(createSuperAdmin);

//-------------Admin Routes---------------//
app.use("/api/v1", AuthRouter);
app.use("/api/v1/user", UserRouter);
app.use("/api/v1", OtpRouter);
app.use("/api/v1/category", CategoryRouter);
app.use("/api/v1/tag", TagRouter);
app.use("/api/v1/testimonial", TestimonialRouter);
app.use("/api/v1/promotionary-article", PromotionaryArticleRouter);
app.use("/api/v1/article", ArticleRouter);
app.use("/api/v1/article-section", ArticleSectionRouter);
app.use("/api/v1/media", MediaRouter);

//-------------Public Routes-------------//
app.use("/api/v1/public/category", PublicCategoryRouter);
app.use("/api/v1/public/tag", PublicTagRouter);
app.use("/api/v1/public/article", PublicArticleRouter);
app.use("/api/v1/public/testimonial", PublicTestimonialRouter);
app.use("/api/v1/public/promotionary-article", PublicPromotionaryArticleRouter);

app.use(errorMiddlerware);

const PORT = config.PORT;

app.listen(PORT, () => {
  logger.info(`Server listening on http://localhost:${PORT}`);
  logger.info(`Test URI http://localhost:${PORT}/test`);
});
