import { Router } from "express";
import uploader from "../utils/multer";
import {
  deleteMediaByIdHandler,
  getAllMediaHandler,
  updateMediaByIdHandler,
  uploadMutipleFileForArticleHandler,
  uploadMutipleFileForArticleSectionHandler,
  uploadSingleFileForPromotionaryArticleHandler,
  uploadSingleFileForTestimonialHandler,
} from "../controller/media.Controller";

const MediaRouter = Router();

MediaRouter.get("/", getAllMediaHandler);

MediaRouter.post(
  "/upload/single/testimonial",
  uploader.single("file"),
  uploadSingleFileForTestimonialHandler
);

MediaRouter.post(
  "/upload/single/promotionary-article",
  uploader.single("file"),
  uploadSingleFileForPromotionaryArticleHandler
);

MediaRouter.post(
  "/upload/multiple/article",
  uploader.array("files"),
  uploadMutipleFileForArticleHandler
);

MediaRouter.post(
  "/upload/multiple/article-section",
  uploader.array("files"),
  uploadMutipleFileForArticleSectionHandler
);

MediaRouter.delete("/:mediaId/delete", deleteMediaByIdHandler);

MediaRouter.put("/update", uploader.single("file"), updateMediaByIdHandler);

export default MediaRouter;
